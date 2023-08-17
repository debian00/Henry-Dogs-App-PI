// Creamos un función que valida los datos de un perro y sus temperamentos.
const validation = (dogData, dogTemperaments) => {
// Creamos un objeto vacío que guardará los errores encontrados.
  const errors = {};
// Verificamos si el nombre del perro está vacío.
  if (!dogData.name) {
    errors.name = "Por favor, ingrese el nombre";
// Verificamos si falta información en la altura mínima o máxima.
  } else if (!dogData.heightMin || !dogData.heightMax) {
    errors.height = "Por favor, ingrese ambos valores";
// Verificamos si la altura mínima es mayor que la altura máxima, parseamos.
  } else if (parseInt(dogData.heightMin) > parseInt(dogData.heightMax)) {
    errors.height = "La altura mínima debe ser menor que la altura maxima";
  } else if (!dogData.weightMin || !dogData.weightMax) {
// Verificamos si falta información en el peso (mínimo o máximo).
    errors.weight = "Por favor, ingrese ambos valores";
// Verificamos si el peso mínimo es mayor que el peso máximo.
  } else if (parseInt(dogData.weightMin) > parseInt(dogData.weightMax)) {
    errors.weight = "El peso minimo debe ser menor que el peso máximo";
// Verificamos si falta información en la esperanza de vida (mínima o máxima).
  } else if (!dogData.lifeSpanMin || !dogData.lifeSpanMax) {
    errors.lifeSpan = "Por favor, ingrese ambos valores";
// Verificamos si la esperanza de vida mínima es mayor que la máxima.
  } else if (parseInt(dogData.lifeSpanMin) > parseInt(dogData.lifeSpanMax)) {
    errors.lifeSpan = "La esperanza de vida mínima, debe ser menor que la esperanza de vida máxima";
// Verificamos si no se han seleccionado temperamentos para el perro.
  } else if (dogTemperaments.length === 0) {
    errors.temperaments = "Por favor, seleccione al menos una opcion";
  }
//Retornamos el objeto que contiene los errores(si los hay).
  return errors;
};

export default validation;
