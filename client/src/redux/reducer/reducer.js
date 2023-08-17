//Importamos las action types.
import { ActionTypes } from "../action-types/action-types";
//Declaramos el estado inicial de la aplicación con arregles y objetos vacios.
const initialState = {
  allDogs: [],
  dogs: [],
  temperaments: [],
  allTemperaments: [],
  breeds: [],
  dogDetails: {},
};
//Definimos el redux que toma el estado actual(state) y una accion
const reducer = (state = initialState, { type, payload }) => {
//Declaramos el manejo de casos basado en su tipo de accion
  switch (type) {
//Actualizamos el estado con los detalles del perro
    case ActionTypes.DETAILS:      
      return {
        ...state,
        dogDetails: payload,
      };
//Caso para buscar los perros por raza
    case ActionTypes.SEARCH_BREED:
//Preguntamos si el payload(nombre)esta vacio
//Si lo está, mostramos todas las razas, si no esta bacio filtramos las razas por el nombre proporcionado
      if (payload === "") return { ...state, breeds: state.allDogs };
      const breed = state.allDogs.filter((dog) => {
        return dog.name.toLowerCase().includes(payload.toLowerCase());
      });
      return { ...state, breeds: breed };
//Caso para buscar temperamento por nombre
    case ActionTypes.SEARCH_TEMPERAMENT:
//Si payload esta vacio, tomamos todos los temperamentos,
//Si no, filtramos los temperamoetnos basados en el nombre proporcionado
      if (payload === "")
        return { ...state, temperaments: state.allTemperaments };

      const temp = state.allTemperaments.filter((e) => {
        return e.name.toLowerCase().includes(payload.toLowerCase());
      });
      return { ...state, temperaments: temp };
// Caso para filtrar perros por temperamento
    case ActionTypes.FILTER_BY_TEMPERAMENT:
        // Creamos un arreglo vacío para almacenar los perros filtrados por temperamento.
      let filterTemperament = [];
// Si payload está vacío, se restablece el estado mostrando todos los perros.
      if (payload.length === 0) {
        return { ...state, dogs: state.allDogs };
      }
// Iteramos a través de los perros en el estado.
      state.dogs.forEach((dog) => {
        if (dog.temperament) {
// Verificamos si el perro tiene una propiedad "temperament".
          let cont = 0;
// Inicializamos un contador en 0 para contar cuántos temperamentos
// del payload coinciden con los del perro.
          payload.forEach((e) => {
// Si el temperamento actual (e) del payload está presente, incrementamos el contador.
            if (dog.temperament.includes(e)) {
              cont++;
            }
          });
          if (cont === payload.length) {
// Si el contador es igual a la longitud del payload,
// significa que el perro coincide con todos los temperamentos del payload.
            filterTemperament.push(dog); // Agregamos el perro al arreglo de perros filtrados.
          }
        } else {
// Si el perro no tiene temperamentos asociados, no hacemos nada.
          return false;
        }
      });
// Filtramos los perros duplicados en el arreglo filterTemperament.
      filterTemperament = filterTemperament.filter(
        (e, i) => filterTemperament.indexOf(e) === i
      );
// Actualizamos el estado con los perros filtrados por temperamento.
      return { ...state, dogs: filterTemperament };
// Caso para filtrar perros por raza
    case ActionTypes.FILTER_BY_BREED:
// Si payload está vacío, se restablece el estado mostrando todos los perros.
      if (payload.length === 0) {
        return { ...state, dogs: state.allDogs };
      }
// Filtramos los perros por nombre de raza basado en el payload.
      const filterBreed = state.allDogs.filter((e) => payload.includes(e.name));
// Actualizamos el estado con los perros filtrados por raza.
      return { ...state, dogs: filterBreed };
// Caso para filtrar perros por su origen de creación (API O BD)
    case ActionTypes.FILTER_CREATED:
// Creamos una constante para almacenar todos los perros en el estado.
      const allDogs = state.allDogs;
// Filtramos los perros según el payload. Si el payload es "created", filtramos los perros creados en la base de datos;
// de lo contrario, filtramos los perros que no están creados en la base de datos.
      const filterCreated =
        payload === "created"
          ? allDogs.filter((d) => d.createdInDb)
          : allDogs.filter((d) => !d.createdInDb);
// Si el payload es "all", mostramos todos los perros; de lo contrario, mostramos los perros filtrados por origen.
      return {
        ...state,
        dogs: payload === "all" ? state.allDogs : filterCreated,
      };
// Caso para obtener y mostrar todos los perros   
    case ActionTypes.GET_ALL_DOGS:
// Actualizamos el estado con la lista completa de perros en el payload.
      return {
        ...state,
        allDogs: payload,
        dogs: payload,
        breeds: payload,
      };
//Caso para obtener y mostrar por raza específica
    case ActionTypes.GET_BY_BREED:
// Actualizamos el estado con la lista de perros correspondiente a la raza específica en el payload.
      return {
        ...state,
        dogs: payload,
      };
//Caso para obtener y mostrar temperamentos
    case ActionTypes.GET_TEMPERAMENTS:
// Actualizamos el estado con la lista completa de temperamentos en el payload.
      return {
        ...state,
        allTemperaments: payload,
        temperaments: payload,
      };
//Caso para ordernar alfabeticamente
    case ActionTypes.ORDER_BY_ALPHABET:
// Creamos una copia de la lista de perros en el estado.
      const copy = [...state.dogs];
// Ordenamos la copia de los perros alfabéticamente en orden ascendente (Ascendent).
      const ordered = copy.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });
// Si el payload es "Ascendent", actualizamos el estado con los perros ordenados.
      if (payload === "Ascendent") {
        return { ...state, dogs: ordered };
// Si el payload es "Descendent", actualizamos el estado con los perros ordenados en orden descendente.
      } else if (payload === "Descendent") {
// Si el payload no ninguno, no hacemos cambios en el estado.
        return { ...state, dogs: ordered.reverse() };
      }
      return state;
//Caso para ordenar por peso:   
    case ActionTypes.ORDER_BY_WEIGHT:
// Creamos una copia del array de perros en el estado actual.
      const copyWeight = [...state.dogs];
// Ordenamos la copia del array de perros por el valor de weightMin
      const orderedWeight = copyWeight.sort((a, b) => {
// Obtenemos los valores numéricos de weightMin de los objetos a y b
        const weightA = Number(a.weightMin) || 0;
        const weightB = Number(b.weightMin) || 0;
// Comparamos los valores de peso y determinar el orden
        if (weightA < weightB) return -1;//a debe ir antes que b
        if (weightA > weightB) return 1; // a debe ir después que b
        return 0;
      });
// Comprobamos el valor de payload para decidir el orden ascendente o descendente
      if (payload === "Ascendent") {
// Devolvemos un nuevo estado con el array de perros ordenado de forma ascendente
        return { ...state, dogs: orderedWeight };
      } else if (payload === "Descendent") {
//Devolvemos un nuevo estado con el array de perros ordenado de forma descendente
        return { ...state, dogs: orderedWeight.reverse() };
      }
// Si el valor de payload no es válido, devolver el estado original sin cambios
      return state;
//Caso de la acción para limpiar los detalles del perro
    case ActionTypes.CLEAN_DETAIL:
// Devuelve un nuevo estado con los detalles del perro vacíos
      return {
        ...state,
// Se establece un objeto vacío para los detalles del perro
        dogDetails: {},
      };
// Si la acción no coincide con ningún caso anterior, devuelve un estado nuevo con todos los datos sin alterar.
    default:
      return { ...state };
  }
};

export default reducer;
