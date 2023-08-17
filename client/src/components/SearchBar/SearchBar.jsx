import styles from "./SearchBar.css";
// Importaciones de React
import { useState } from "react";
import { useNavigate } from "react-router-dom";


// Definición del componente SearchBar
const SearchBar = ({ onSearch }) => {
// Estados locales para controlar si la barra de búsqueda está abierta y para almacenar el valor de la búsqueda
  const [searchOpen, setSearchOpen] = useState(false);
  const [race, setRace] = useState("");
// Hook useNavigate para navegar a diferentes rutas
  const navigate = useNavigate();
// Función para manejar el cambio en el campo de entrada de búsqueda
  const handleInputChange = (event) => {
    setRace(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
// Llama a la función 'onSearch' pasada como prop y envía el valor de la búsqueda
    onSearch(race);
    setRace("");// Limpia el valor de la búsqueda
    navigate("/home");// Navega a la ruta "/home"
  };
  //Renderizamos  la searchbar
  return (
    <div className={styles.searchcont}>
    <input onChange={handleInputChange}
          value={race}
          type="search"
          placeholder="Buscar por nombre"
        />   
        <button className={styles.btn} onClick={handleSubmit} type="button"> Buscar </button>  
    </div>
  );
};

export default SearchBar;
