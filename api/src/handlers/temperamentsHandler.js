
// Importamos la función getAllTemperaments
const getAllTemperaments = require("../controllers/getAllTemperaments");

// Define una función asincrónica  que toma dos parámetros: req (solicitud) y res (respuesta)
const allTemperamentsHandler = async (request, response) => {
  try {
// Llamamos a la función getAllTemperaments()
// para obtener todos los temperamentos.
    const allTemp = await getAllTemperaments();
// Retornamos una respuesta con un estado 200 y envía el arreglo JSON de todos los temperamentos en el body de response
    return response.status(200).json(allTemp);
    // Si ocurre un error, captura el error y devuelve un 400 con el mensaje de error.
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
};

module.exports = allTemperamentsHandler