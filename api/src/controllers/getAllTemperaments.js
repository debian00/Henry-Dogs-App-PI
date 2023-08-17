//Importamos el modelo Temperament y la funcion getAllDogsApi 
const { Temperament } = require("../db");
const { getAllDogsApi } = require("./getAllDogs");

//Definimos la funcion asincrona getAllTemperaments
const getAllTemperaments = async () => {  
  //Se declara un arreglo vacio para almacenar los temperamentos
  let allTemperaments = [];
  //Obtenemos información de todos los perros desde la API externa y se asigna a la variable apiInfo.
  const apiInfo = await getAllDogsApi();
  //Se mapea el arreglo apiInfo para obtener la propiedad temperament de cada perro, 
  //luego se concatenan todos los temperamentos en una cadena separada por comas. 
  //Finalmente se divide la cadena en un nuevo arreglo allTemp.
  let allTemp = apiInfo.map((dog) => dog.temperament).join(", ").split(", ");
  //Se recorre el arreglo allTemp y se agrega cada elemento único a allTemperaments, 
  //asegurándose de que no se agreguen duplicados.
  allTemp.forEach((el) => {
    if (!allTemperaments.includes(el)) allTemperaments.push(el);
  });
  //Se ordena alfabéticamente el arreglo allTemperaments.
  allTemperaments.sort();
  //Usamos Promisall de manera asincronica donde busca o crea un temperamento en la bd
  //usando el modelo Temperament, si no existe, se crear con el nombre proporcionado
  await Promise.all(
    allTemperaments.map((temperament) => {
      Temperament.findOrCreate({
        where: { name: temperament },
        defaults: { name: temperament },
      });
    })
  );
  //Buscamos y obtenemos  todos los temperamentos en la base de datos y los guardamos en allTemperamentsDb
  const allTemperamentsDb = await Temperament.findAll();
  //retornamos TODOS los temperamentos existentes en la bd.
  return allTemperamentsDb;
};

module.exports = getAllTemperaments;
