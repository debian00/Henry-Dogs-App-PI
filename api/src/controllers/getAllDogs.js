//Creamos los controladores para:  getAllDogs que nos permitira acceder o manipular la BD.


const axios = require("axios");//Importamos axios para realizar solicitudes HTTP
const { API_URL, API_KEY } = process.env;//Importamos las variables de entorno donde se guarda la api url y key.
const { Dog, Temperament } = require("../db");//Importamos los modelos Dog y Temperament


//Definimos la funcion createDogObjDB recibe res por param y craea dog
const createDogObjDB = (res) => {
  //Destrucuramos dataValues (data) con las propiedades que recibimos en response
  let {
    id,
    name,
    image,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    lifeSpanMin,
    lifeSpanMax,
    Temperaments,
    createdInDb
  } = res[0].dataValues;

  //Mapeamos el array Temperaments y obtenemos el nombre de datavalues
  //Lo guardamos en un nuevo array.
  let dogTemperaments = Temperaments.map((data) => data.dataValues.name);
  //Realizamos una copia de dogTemperaments y lo concatenamos en un array nuevo
  dogTemperaments = [...dogTemperaments].join();
  //Retornamos un objeto con las propiedades obtenidas
  return (dogObj = {
    id,
    name,
    image,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    lifeSpanMin,
    lifeSpanMax,
    temperament: dogTemperaments,
    createdInDb
  });
};
//Obtiene la lista de perros desde la API de manera asíncrona
const getAllDogsApi  = async () => {
  try {
    //Realizamos una solicitud http con la URL y la API_Key
    const response = await axios(`${API_URL}?api_key=${API_KEY}`);
    //Mapeamos el arreglo data de la respuesta para llenar cada perro.
    const allDogs = await response.data.map((dog) => {
      //Retornamos un nuevo objeto con sus respectivas propiedades
      return {
        id: dog.id,
        name: dog.name,
        heightMin: dog.height.metric.split("-")[0],
        heightMax: dog.height.metric.split("-")[1],
        weightMin: dog.weight.metric.split("-")[0],
        weightMax: dog.weight.metric.split("-")[1],
        temperament: dog.temperament,
        image:`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
        lifeSpanMin: dog.life_span.slice(0, 7).split("-")[0],
        lifeSpanMax: dog.life_span.slice(0, 7).split("-")[1],
      };
    });
    return allDogs;
  } catch (error) {
    throw new Error(error.message);
  }
};
  //Definimos la funcion async getDogsDb que retorna los Dogs de la DB
const getDogsDb = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
    },
  }).then((response) => {
    return response.map((res) => createDogObjDB([res]));
  });
};
  //Definimos la funcion async getAllDogs que recibe name por parametro opcional nombre
const getAllDogs = async (name) => {
  //Esperamos la promesa de Dogsapi y lo guardamos en una constante
  const dogsApi = await getAllDogsApi();
  //Esperamos la promersa de dogsDB y lo guardamos en una constante
  const dogsDB = await getDogsDb();
  //Concatenamos dogsApi y dogsDb en una sola constante. 
  const getAllDogs = dogsDB.concat(dogsApi);
 //Declaramos una variable dogFound con valor inicial nulo
  let dogFound = null;
  //Si se proporciona un valor name, o si existe,
  //filtramos los perros en el arreglo getalldogs(concatenado)
  //y normalizamoss mayusculas y minusculas
  if (name) {
    dogFound = getAllDogs.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );
 // if (oneDog.length === 0) return "No se encotraron perritos con ese nombre."
    //Retornamos el perrito encontrado por nombre.
    return dogFound;
  }
  return await getAllDogs;
  //Si no se proporciona un valor name, o después de manejar el filtrado por nombre, 
  //se devuelve el arreglo completo getAllDogs, que contiene todos los datos de perros tanto de la API como de la base de datos local.
};
//Definimos la funcion async getDogsById que recibe por parametro ID
const getDogsById = async (id) => {
//Se espera a que se resuelva la promesa devuelta por getAllDogs 
//se asigna el resultado a la variable dogsInfo.
const dogsInfo = await getAllDogs();  
// Se busca un perro específico en el arreglo dogsInfo utilizando el método find.
// Se compara el valor de la propiedad id de cada perro con el valor del id.
// Se parsea el id proporcionado a un número usando Number(id).
// El resultado de esta búsqueda se asigna a la variable dogsById.
const dogsById = await dogsInfo.find((dog) => dog.id === Number(id));  
 //Se verifica si dogsById es un arreglo vacío, si es así, muestra mensaje que no fue encontrado
  if (dogsById.length === 0) return "No se encontraron perros con ese ID";
 //Si se encontró un perro con el ID proporcionado, se devuelve ese perro en forma de objeto. 
  return dogsById; 
};
//Definimos la funcion  Asincrona createDog con los parametros que se van a crear en bd
const createDog = async (
  name,
  image,
  heightMin,
  heightMax,
  weightMin,
  weightMax,
  lifeSpanMin,
  lifeSpanMax,
  temperament
) => {
  const dogsInfo = await getAllDogs();//Obtenemos la info de todos los perros desde la api y bd
                                      //para saber cual es el id maximo en ese momento  
  let maxId = 0;//Iniciamos una variable para almacenarl el valor máximo de id
//Recorremos todos los perros par encontrar el ID máximo
//Si el ID actual de un perro es mayor que maxId, se actualiza el valor de maxId con ese ID.
  dogsInfo.forEach(dog => {
    if (dog.id > maxId) {
      maxId = dog.id
    }
  });
  //Calculamos el nuevo ID sumando 1 al ID máximo
  const id = maxId + 1;
  //Se realiza una búsqueda en la base de datos de temperamentos utilizando el nombre del temperamento
  //proporcionado como parámetro.
  let getTemperaments = await Temperament.findAll({
    where: { name: temperament },
  });
  //Se mapea el resultado de la búsqueda para obtener un arreglo de IDs de temperamentos
  // que coinciden con el nombre proporcionado.
  getTemperaments = getTemperaments.map((el) => el.id);
  // Se utiliza el modelo Dog para buscar un perro existente con el mismo nombre en la base de datos.
  // Si no se encuentra, se crea uno nuevo con las propiedades proporcionadas.
  const [dog, created] = await Dog.findOrCreate({
    where: { name },
    defaults: {
      id,
      name,
      image: image,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      lifeSpanMin,
      lifeSpanMax
    },
  });
 // Si el perro ya existía en la base de datos, devuelve un mensaje de error
  if (!created) {
    return "El perro ya existe";    
  }
  // Asocia los temperamentos al perro recién creado en bd
  await dog.addTemperaments(getTemperaments);
  //Se busca el perro recién creado en la bd cons sus propiedades, 
  //incluidos los temperamentos asociados.
  let newDog;
  await Dog.findOne({
    where: {name},
    include: {
      model: Temperament,
      attributes: ['name']
    }
  })
  .then(res => newDog = createDogObjDB([res]))
// Retorna el objeto del perro recién creado con información completa
  return newDog
};
//Definimos la funcion Asincrona deleteDogById
const deleteDogsById = async(id)=>{
  try{
await Dog.destroy({
where : {id},
});

return "Se elimino el perrito";

}catch(error){
  throw error;
}
};

module.exports = {
  getAllDogs,
  getDogsById,
  getAllDogsApi,
  getDogsDb,
  createDog,
  deleteDogsById
}
