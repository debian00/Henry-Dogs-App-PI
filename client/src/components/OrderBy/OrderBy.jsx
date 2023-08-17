import styles from "./OrderBy.module.css";
//Importaciones de react y actions
import { useDispatch } from "react-redux";
import {
  orderByAlphabet,
  orderWeight,
} from "../../redux/actions/actions";
// Definición del componente OrderBy
const OrderBy = () => {
// Obtenemos el dispatch de Redux
  const dispatch = useDispatch();
// Función para manejar el orden alfabético
  const handleAlphabetOrder = (event) => {
//Obtiene el valor seleccionado del elemento HTML que desencadenó el evento.
    const order = event.target.value;
//Despacha la acción  con el valor seleccionado como argumento, lo que activará el correspondiente reducer en la store
    dispatch(orderByAlphabet(order));
  };
// Función para manejar el orden por peso
  const handleWeightOrder = (event) => {
    const order = event.target.value;
// Dispatch de la acción de ordenar por peso
    dispatch(orderWeight(order));
  };
// Renderización del componente
  return (
    <div className={styles.orderContainer}>
      <h2>Ordenar</h2>
      <span> x Nombre</span>
      <select
        name="Alphabetic"
        onChange={handleAlphabetOrder}
        defaultValue={"DEFAULT"}
      >
        <option disabled value={"DEFAULT"}>
        Seleccionar orden
        </option>
        <option value="Ascendent">Ascendente</option>
        <option value="Descendent">Descendente</option>
      </select>
      <span>X PESO:</span>
      <select
        name="Weight"
        onChange={handleWeightOrder}
        defaultValue={"DEFAULT"}
      >
        <option className={styles.orderContainer} disabled value={"DEFAULT"}>Seleccionar orden</option>
        <option value="Ascendent">Ascendente</option>
        <option value="Descendent">Descendente</option>
      </select>
    </div>
  );
};

export default OrderBy;
