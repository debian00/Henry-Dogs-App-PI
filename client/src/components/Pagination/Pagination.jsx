import { useState, useEffect } from "react";
import styles from "./Pagination.module.css";

// Definición del componente Pagination
const Pagination = ({  dogsPerPage,  totalDogs,  paginate,  currentPage,  allDogs,  checksTemperaments,  setChecksTemperaments
}) => {
//Declaramos un  arreglo que almacenará los números de página
  const pageNumbers = [];
// Estado local para el número de página actual
  const [numPage, setNumPage] = useState(currentPage);
// Estado local para el valor del input
  const [input, setInput] = useState(numPage);
// Llenamos el arreglo pageNumbers con los números de página disponibles
  for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
// Función para manejar el cambio en el campo de entrada de página
  const handleInputChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    if (value >= 0 && value <= pageNumbers.length) {
      setInput(value);
      setNumPage(value);
      paginate(value);
    } else {
      setInput(1);
      setNumPage(1);
      paginate(1);
    }
  };
  // Función para retroceder una página
  const handleBack = () => {
    if (numPage - 1 > 0) {
      const num = numPage - 1;
      setInput(num);
      setNumPage(num);
      paginate(num);
    } else {
      setInput(pageNumbers.length);
      setNumPage(pageNumbers.length);
      paginate(pageNumbers.length);
    }
  };
  // Función para avanzar una página
  const handleForward = () => {
    if (Number(numPage) + 1 <= pageNumbers.length) {
      const num = Number(numPage) + 1;
      setInput(num);
      setNumPage(num);
      paginate(num);
    } else {
      setInput(1);
      setNumPage(1);
      paginate(1);
    }
  };
  // Función para reiniciar la paginación y limpiar los filtros
  const handleReset = () => {
    paginate(1);
    setInput(1);
    setNumPage(1);
    allDogs();
    setChecksTemperaments([])
  };
  // Efecto que se ejecuta cuando cambian los temperamentos seleccionados
  useEffect(() => {
    setInput(1);
    setNumPage(1);
  }, [checksTemperaments]);
  // Renderización de pagination
  return (
    <div className={styles.paginationContainer}>
      <p onClick={handleBack}>BACK</p>
      <input
        className={styles.inputP}
        onChange={(e) => handleInputChange(e)}
        value={input}
      />
      <input        
        value={pageNumbers.length}
        readOnly
      />
      <p onClick={handleForward}>NEXT</p>
     
    </div>
  );
};

export default Pagination;
