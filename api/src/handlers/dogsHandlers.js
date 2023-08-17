//Importamos las funciones desde el controlador getAllDogs.
const {
  getAllDogs,
  getDogsById,
  createDog,
  deleteDogsById,
} = require("../controllers/getAllDogs");

//Definimos el handler para la ruta que obtiene todos los perros.
const allDogsHandler = async (req, res) => {
  try {
    //Obtenemos el valor del parámetro 'name' de la consulta (query) de la solicitud HTTP
    const { name } = req.query;
    //Llamamos a la funcion getAllDogs para obtener todos los perros.
    const apiInfo = await getAllDogs(name);
    // Devuelve una respuesta con un estado 200 (OK)
    // y envía la información de los perros en JSON.
    return res.status(200).json(apiInfo);
    // Si ocurre un error, lo captura y maneja el bloque catch.
  } catch (error) {   
     // Devuelve una respuesta con un estado 400 y envía un  JSON con un mensaje y descripción del error.
    return res.status(400).json({
      message: "Lo siento, no pudimos obtener el listado de perros",
      error: error.message,
    });
  }
};
//Definimos el handler para la ruta que obtiene todos los perros por id
const dogsByIdHandler = async (req, res) => {
    // Obtiene el valor del parámetro 'id' de los parámetros de la solicitud HTTP
  const { id } = req.params;
  try {
    // Llama a la función getDogsById(id) para obtener información sobre un perro por su ID.
    const dogsId = await getDogsById(id);
    //Devuelve una respuesta con un estado 200 y envía la información del perro por su ID en formato JSON
    return res.status(200).json(dogsId);
  } catch (error) { 
        // Devuelve una respuesta con un estado 400 y envía un  JSON con la descripción del error
    return res.status(400).json({ error: error.message });
  }
};
//Definimos el handler para la ruta que crea nuevos perros
const createDogsHandler = async (req, res) => {
  try {
     // Extraemos las propiedades necesarias del cuerpo de la solicitud HTTP
    const {
      name,
      image,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      lifeSpanMin,
      lifeSpanMax,
      temperament,
    } = req.body;
// Llama a la función createDog() para crear un nuevo perro con las propiedades proporcionadas
    let newDog = await createDog(
      name,
      image,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      lifeSpanMin,
      lifeSpanMax,
      temperament,
    );
 // Devuelve una respuesta con un estado HTTP 201 (Creado)
 // y envía el objeto del nuevo perro creado en formato JSON
    return res.status(201).json(newDog);
  } catch (error) {
 //Devuelve una respuesta con un estado 400
  // y envía un objeto JSON con la descripción del error.
    return res.status(400).send({
      message: "There was an error creating the dog",
      error: error.message,
    });
  }
};
//Definimos el handler para la ruta que elimina perritos por id
const deleteDogsHandler = async (req, res) => {
    // Obtiene el valor del parámetro 'id' de los parámetros de la solicitud HTTP
  const { id } = req.params;
  try {
    // Llama a la función deleteDogs(id) para eliminar un perro por su ID.
    await deleteDogsById(id);
    //Devuelve una respuesta con un estado 200 y envía la información del perro por su ID en formato JSON
    return res.status(200).json("Perrito eliminado exitosamente");
  } catch (error) { 
        // Devuelve una respuesta con un estado 400 y envía un  JSON con la descripción del error
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  allDogsHandler,
  dogsByIdHandler,
  createDogsHandler,
  deleteDogsHandler
};
