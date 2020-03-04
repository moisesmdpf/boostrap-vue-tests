/* eslint-disable no-console */
import { getInfoFromApi } from './../../utils/utils.js';

/**
 * Punto de inicio
 *
 * @param {string} apiEndpoint URL de endpoint de la api para consulta de datos
 */
export const main = async (apiEndpoint) => {
    const users = await getInfoFromApi(apiEndpoint);
    const fullNames = getFullNameOfUsers(users.results);
    console.table(fullNames);
    const mostMostUsedLetters = countLetterOcurrency(fullNames);
    console.table(mostMostUsedLetters);
    const maxLetterOcurrency = getMaxLetterOcurrency(mostMostUsedLetters);
    console.log(maxLetterOcurrency);
    return { maxLetterOcurrency, fullNames };
};

/**
 * Retorna los nombres completos de los usuarios compuesto por
 * Nombre y Apellido (Fitstname y Lastname)
 *
 * @param {array} users Array con los datos de usuarios
 */
const getFullNameOfUsers = (users) => {
    const fullNames = [];
    users.forEach(item => {
        fullNames.push(`${item.name.first} ${item.name.last}`);
    });
    return fullNames;
}

/**
 * Efectua un calculo sobre el array de nombres escaneando cada nombre
 * y contando la ocurrencia de cada letra nueva que vaya descubriendo
 * Retorna al final un array con las letras encontradas y su cantidad de
 * ocurrencias entre los nombres
 *
 * @param {*} fullNames
 */
const countLetterOcurrency = (fullNames) => {
    const storedLetters = [];
    fullNames.forEach(fullName => {
        const fullNameWithoutSpaces = fullName.replace(' ', '');
        for (let i = 0; i < fullNameWithoutSpaces.length; i++) {

            if (storedLetters.length === 0) {
                storedLetters.push({ letter: fullNameWithoutSpaces[i].toLowerCase(), count: 1 });
            } else {
                const letterIndex = storedLetters.findIndex(item => item.letter.toLowerCase() === fullNameWithoutSpaces[i].toLowerCase());
                if (letterIndex !== -1) {
                    storedLetters[letterIndex].count = storedLetters[letterIndex].count + 1;
                } else {
                    storedLetters.push({ letter: fullNameWithoutSpaces[i], count: 1 });
                }
            }
        }
    });
    return storedLetters;
}

/**
 * Obtiene la letra con mayor ocurrencia dentro de un array de
 * letras almacenadas. Devuelve un string indicando que letra
 * es la mas usada y cuantas veces se uso
 *
 * @param {array} storedLetters Array que contiene objetos clave valor de las letras usadas y sus ocurrencias
 */
const getMaxLetterOcurrency = (storedLetters) => {
    const maxLetterOcurrency = storedLetters.reduce((prev, curr) => { return (prev.count > curr.count) ? prev : curr; });
    const response = `La letra mas usada es "${maxLetterOcurrency.letter}" con ${maxLetterOcurrency.count} ocurrencias`;
    return response;
}
