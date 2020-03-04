/* eslint-disable no-console */

/**
 * Propiedades comunes para solicitud de data a api de prueba
 */
const requestProperties = {
    method: "GET",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
};

/**
 * getInfoFromApi
 * Devuelve la informacion solicitada de un api que responde en formato JSON
 *
 * @param {String} endPoint URL del endpoint a consultar
 * @return {array} Array of users randomly generated
 */
export const getInfoFromApi = async (endPoint) => {
    try {
        const response = await fetch(endPoint, requestProperties);
        const users = await response.json();
        return users;
    } catch (error) {
        console.log('Failied fetch', error);
    }
}
