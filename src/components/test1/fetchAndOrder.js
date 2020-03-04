/* eslint-disable no-console */
import { getInfoFromApi } from './../../utils/utils.js';

/**
 * metodo de ejecucion inicial del script
 *
 * @param {string} apiEndpoint String que contiene el URL del endpoint donde se obtiene la informacion de usuarios aleatoreamente
 */
export const main = async (apiEndpoint) => {
    const users = await getInfoFromApi(apiEndpoint);
    const usersByName = orderUsersByName(users.results);
    console.table(usersByName);
    return usersByName;
};

/**
 * Recibe como parametro un array de usuarios y los ordena segun su primer nombre
 * usando el metodo de localeCompare.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare#Browser_compatibility
 *
 * @param {array} users Array de usuarios aleatoreos obtenido desde el API
 */
const orderUsersByName = (users) => {
    const orderedUsers = users.sort((a, b) => a.name.first.localeCompare(b.name.first, 'en'));
    return orderedUsers;
}
