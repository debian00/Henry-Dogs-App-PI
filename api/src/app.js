//Importamos las dependencias y modulos necesarios para configurar el server de Express y manejar solicitudes.
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');//Importamos la conexion a DB

const server = express();//Instanciamos Express en la constante server

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));// Usamos el middleware morgan en modo "dev" para registrar las solicitudes entrantes en la consola.
//Configuramos las cabeceras del CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); //Le damos todos los permisos para recibir peticiones
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
//Montamos las rutas definidas en index en la raiz del server
server.use('/', routes);
// Definimos un middleware para manejar errores.
//Si se produce un error, el middleware lo captura y enviara el error a la consola
//tambien envia una respuesta de error al cliente con el número de estado y el mensaje.

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
