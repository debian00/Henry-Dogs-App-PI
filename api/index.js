require("dotenv").config();//Importamos dotenv para las variables de entorno
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const getAllTemperaments = require("./src/controllers/getAllTemperaments.js")
const {PORT} = process.env

// Sicronizamos todos los modelos
conn.sync({ alter: true }).then(() => {
// Levantamos el servidor
  server.listen(PORT, () => {
    getAllTemperaments();
    console.log(`server listening at port ${PORT}...`);
  });
});


