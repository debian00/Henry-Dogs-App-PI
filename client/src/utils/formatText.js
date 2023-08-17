
// Creamos una función que  formatea la altura de los perros
// en una cadena de texto más legible.
export const getHeightText = (heightMin, heightMax) => {
// Preguntamos si los valores existen
  if (heightMin && heightMax) {
// Si ambos están presentes, devuelve un string formateado
    return `${heightMin} - ${heightMax} Cm`;
// Si solo uno de ellos está presente, devuelve una cadena formateada.
  } else if (heightMin || heightMax) {
    return `${heightMin || heightMax} Cm`;
  } else {
// Si ninguno está presente, devuelve un valor predeterminado.
    return " - - ";
  }
};
//Creamos una funcion que formatea el peso de los perros
export const getWeightText = (weightMin, weightMax) => {
  // Preguntamos si los valores existen
  if (weightMin && weightMax) {
// Si ambos están presentes, devuelve un string formateado.
    return `${weightMin} - ${weightMax} Kg`;
// Si solo uno de ellos está presente, devuelve una cadena formateada.
  } else if (weightMin || weightMax) {
    return `${weightMin || weightMax} Kg`;
  } else {
// Si ninguno está presente, devuelve un valor predeterminado.
    return " - - ";
  }
};
// Creamos una función que formatea la esperanza de vida de los perros en una cadena de texto legible.
export const getLifeSpanText = (lifeSpanMin, lifeSpanMax) => {
// Preguntamos si existen los valors.
  if(lifeSpanMin && lifeSpanMax) {
// Si ambos están presentes, devuelve una cadena formateada.
    return `${lifeSpanMin} - ${lifeSpanMax} Years`;
// Si solo uno de ellos está presente, devuelve una cadena formateada.
  }else if(lifeSpanMin || lifeSpanMax) {
    return `${lifeSpanMin || lifeSpanMax} Years`;
  } else {
        // Si ninguno está presente, devuelve un valor predeterminado.
    return " - - ";
  }
}
// Creamos un función que formatea una lista de temperamentos
// para mostrar en en las tarjetas.
export const getTempTextCard = (temperament) => {
  // Divide la cadena de temperamentos en un arreglo.
  let arr = temperament?.split(",");
  // Tomamos los primeros tres elementos del arreglo (si existen).
  const firstThree = arr?.slice(0, 3);
  // Concatenamos los elementos con comas y espacio para formar una cadena y retornarla.
  let tempTxt = firstThree?.join(", ");
  return tempTxt;
}
//Creamos unalista detemperamentos para mostrar en detalle
export const getTempTextDetail = (temperament) => {
// Dividimos el arreglo de temperamentos en un arreglo con coma como separador.
  let temp = temperament?.split(",");
// Concatenamos los elementos del arreglo con comas y espacio para formar una cadena y la retornamos.
  let tempTxt = temp?.join(", ");
  return tempTxt;
}

