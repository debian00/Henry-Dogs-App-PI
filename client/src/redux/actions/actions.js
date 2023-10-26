import { ActionTypes } from "../action-types/action-types";
import axios from "axios";

//Declaramos una función asíncrona para obtener los detalles de un perro por su ID
export const details = (detailID) => {
  return async (dispatch) => {
    try {
// Realizamos una solicitud HTTP GET para obtener los detalles del perro
      const { data } = await axios(`https:henry-dogs-app-pi-production.up.railway.app/dogs/${detailID}`);
// Despachamos una acción con el tipo "DETAILS" y los detalles del perro como payload
      dispatch({
        type: ActionTypes.DETAILS,
        payload: data,
      });
    } catch (error) {
      console.error("Details" + error.message);
    }
  };
};
//Declaramos una funcion síncrona para buscar por raza
export const searchBreed = (value) => {
  return {
// Despachamos una acción con el tipo "SEARCH_BREED" y la búsqueda ingresada como payload
    type: ActionTypes.SEARCH_BREED,
    payload: value,
  };
};
// Declaramos una funcion síncrona para buscar por temperamento
export const searchTemperament = (value) => {
  return {
    type: ActionTypes.SEARCH_TEMPERAMENT,
    payload: value,
  };
};
// Declaramos una funcion síncrona para filtrar por temperamento
export const filterByTemperament = (value) => {
  return {
    type: ActionTypes.FILTER_BY_TEMPERAMENT,
    payload: value,
  };
};
// Declaramos una funcion síncrona para filtrar por creados en DB
export const filterCreated = (value) => {
  return {
    type: ActionTypes.FILTER_CREATED,
    payload: value,
  };
};
// Declaramos una funcion síncrona para ordenar por alfabeto
export const orderByAlphabet = (value) => {
  return {
    type: ActionTypes.ORDER_BY_ALPHABET,
    payload: value,
  };
};
// Declaramos una funcion síncrona para ordenar por peso.
export const orderWeight = (value) => {
  return {
    type: ActionTypes.ORDER_BY_WEIGHT,
    payload: value,
  };
};
// Acción asíncrona para agregar un nuevo perro
export const postDog = (dog) => {
  return async (dispatch) => {
    try {
// Realizamos una solicitud HTTP POST para agregar un nuevo perro
      const { data } = await axios.post(`https:henry-dogs-app-pi-production.up.railway.app/dogs`, dog);
// Despachamos una acción con el tipo "POST_DOG" y los datos del nuevo perro como payload
      dispatch({
        type: ActionTypes.POST_DOG,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};
//Declaramos una acción asíncrona para obtener todas las razas de perros
export const getAllBreeds = () => {
  return async (dispatch) => {   
// Realizamos una solicitud para obtener todas las razas de perros desde la API
    const { data } = await axios.get("https:henry-dogs-app-pi-production.up.railway.app/dogs");
// Despachamos una acción con el tipo "GET_ALL_DOGS" y los datos de las razas como payload
    dispatch({
      type: ActionTypes.GET_ALL_DOGS,
      payload: data,
    });
  }
};
//Declaramos una Acción asíncrona para obtener perros por raza
export const getByBreed = (breed) => {
  return async (dispatch) => {
    try {
// Realizar una solicitud para obtener los perros por la raza especificada
      const { data } = await axios(`https:henry-dogs-app-pi-production.up.railway.app/dogs?name=${breed}`);
  // Verificar si no se encontraron resultados
      if (data.length === 0) {
        alert("No se encontró la raza especificada")
        return;
      }
// Despachamos una acción y los datos de los perros por raza como payload
      dispatch({
        type: ActionTypes.GET_BY_BREED,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
// Acción asíncrona para obtener todos los temperamentos
export const getTemperaments = () => {
  return async (dispatch) => {
// Realizamos una solicitud para obtener todos los temperamentos desde la API
    const { data } = await axios("https:henry-dogs-app-pi-production.up.railway.app/temperaments");
// Despachamos una acción y los datos de los temperamentos como payload
    dispatch({
      type: ActionTypes.GET_TEMPERAMENTS,
      payload: data,
    });
  };
};
// Acción síncrona para limpiar los detalles de un perro
export const cleanDetail = () => {
    // Despachar una acción con el tipo "CLEAN_DETAIL" para indicar la limpieza de los detalles del perro
  return { type: ActionTypes.CLEAN_DETAIL };
};
