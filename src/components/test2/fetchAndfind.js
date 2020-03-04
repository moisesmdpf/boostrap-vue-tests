/* eslint-disable no-console */
import { getInfoFromApi } from './../../utils/utils.js';

/**
 * Metodo de ejecucion principal del script. Ejecuta la consulta en base
 * al parametro solicitado
 *
 * @param {string} endPoint Api URL del endpoint al cual se consultara informacion
 * @param {number} userAge Edad del usuario o persona a consultar
 */
export const main = async (endPoint, userAge) => {
    const infoUsers = await getInfoFromApi(endPoint);
    const userByAge = findUsersByAge(userAge, infoUsers.results);
    console.log(userByAge);
    return userByAge;
}

/**
 * Encuentra el primer usuario que posea una edad superior a la indicada
 * @param {number} age Eddad del Usuario
 * @param {array} users Array con los usuarios obtenidos desde el api
 */
const findUsersByAge = (age, users) => {
    const usersByAge = (users) ? users.find(i => i.dob.age > age) : undefined;
    return usersByAge;
}
