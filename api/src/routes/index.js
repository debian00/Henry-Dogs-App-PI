//Creamos el Router para gestionar las rutas de Dogs dentro del server
const { Router } = require('express');//Importamos Router de express
// Importamos los módulos del enrutador donde estan definadas las rutas.
const dogsRouter = require('./routesDogs');
const temperamentsRouter = require("./temperaments")


const router = Router();//Instanciamos un enrrutador llamado router

//Montamos los enrutadores  en rutas especifcias
router.use("/dogs", dogsRouter)
router.use("/temperaments", temperamentsRouter)


module.exports = router;//Exportamos router que contiene todas las rutas definidas en los routers.
