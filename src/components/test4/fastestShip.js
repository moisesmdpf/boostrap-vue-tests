/* eslint-disable no-console */
import { getInfoFromApi } from '../../utils/utils.js';


/**
 * Metodo de ejecucion principal del script. Ejecuta la consulta en base
 * a los parametros solicitados
 *
 * @param {string} apiEndpoint String que contiene la url en donde se realizaran los requests para obtener la data
 * @param {number} passengersCount Numero de pasajeros que debe contener la nave (Startship) para su viaje
 */
export const main = async (apiEndpoint, passengersCount) => {
    const starships = await getInfoFromApi(apiEndpoint);
    console.log(`starships obtainded: ${starships.results.length}`);
    const startship = findStarship(passengersCount, starships.results);
    console.log('starships by requirements');
    console.table(startship);
    const fastestStarship = getFastestShipName(startship);
    console.log(fastestStarship);
    return fastestStarship;
}

/**
 * Encuentra la nave (Startship) en funcion de los siguientes criterios:
 *
 * - Capacidad de personas (People capacity)
 * - Autonomia de la nave (Startship autonomy)
 * - Pertenencia a la trilogia original (Startship trilogy)
 *
 * @param {number} passengers Numero de pasajeros que debe contener la nave (Startship) para su viaje
 * @param {array} starships Array que contiene todas las naves (starships) obtenidas desde el API
 */
const findStarship = (passengers, starships) => {
    const selectedStarships = starships.filter(
        item =>
            checkPeopleCapacity(item.passengers, passengers) &&
            checkStarhipAutonomy(item.consumables) &&
            checkStarshipTrilogy(item.films)
    );
    return selectedStarships;
}

/**
 * Verifica la autonomia de provisiones (Consumables) de la nave. Asumiendo que:
 * la informacion obtenida es actual. Contada desde el dia de hoy.
 *
 * @param {string} consumables String que contiene un indicativo de la autonomia de consumibles que posee la nave (starship) para un viaje
 */
const checkStarhipAutonomy = (consumables) => {
    const autonomy = consumables.trim().split(' '); // Example: '3 days' => ['3', 'days']
    if(autonomy[1].includes('day')){
        return autonomy[0] > 7;
    }
    if(autonomy[1].includes('month') || autonomy[1].includes('year')){
        return autonomy[0] >= 1;
    }
    return false;
}

/**
 * Verifica si la cantidad de pasajeros indicada para el viaje
 * esta dentro de la capacidad de pasajeros tolerada por la nave (starship)
 *
 * @param {number} passengersCapacity Numero que indica la capacidad de pasajeros maxima de la nave (starship)
 * @param {number} passengersOfTravel Numero que indica la cantidad de pasajeros del viaje
 */
const checkPeopleCapacity = (passengersCapacity, passengersOfTravel) => {
    return passengersCapacity >= passengersOfTravel;
}

/**
 * Verifica que la nave (starship) haya aparecido en la trilogia original de start wars (epidodios: IV, V, VI)
 * Retorna un booleano true si ha aparecido en algun film de la trilogia original y false si no ha aparecido
 *
 * @param {array} trilogyFilms Array que contiene las URL para consultar la informacion de los films en que aparece la nave
 */
const checkStarshipTrilogy = async (trilogyFilms) => {
    const spectedTrilogies = [4, 5, 6];
    for (const fimUrl of trilogyFilms) {
        const trilogy = await getInfoFromApi(fimUrl);
        if(spectedTrilogies.includes(trilogy.episode_id)) {
            return true;
        }
    }
    return false;
}

/**
 * Retorna la nave (starship) mas rapida del conjunto de naves proporcionado.
 *
 * @param {array} startship Objeto con las naves (starships) que han coincidido con las condiciones anteriores
 */
const getFastestShipName = (startship) => {
    if (startship.length > 0) {
        const fastestShip = startship.reduce((prev, current) => {
            return prev.MGLT > current.MGLT ? prev : current;
        });
        return fastestShip.name;
    }
    return 'N/A';
}
