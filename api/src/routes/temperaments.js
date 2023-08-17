

const express = require("express");//Importamos express
const router = express.Router();//Creamos un router de express
//Importamos el handler
const allTemperaments = require("../handlers/temperamentsHandler");
//Definimos la ruta GET en el router y el handler a ejecutar.
router.get("/", allTemperaments);

module.exports = router;
