import styles from "./Filter.module.css";
// Importaciones de React y Redux
import { useSelector, useDispatch } from "react-redux";
import {
  filterByTemperament,
  filterCreated,
  searchTemperament,
} from "../../redux/actions/actions";
import { useState, useEffect } from "react";
// Definición del componente Filter
const Filter = ({
  paginate,
  allDogs,
  allTemps,
  checksTemperaments,
  setChecksTemperaments,
}) => {
// Obtenemos el dispatcher de Redux
  const dispatch = useDispatch();
// Obtenemos la lista de temperamentos desde el estado de Redux
  const temperaments = useSelector((state) => state.temperaments);
// Estado local para almacenar la búsqueda de temperamentos
  const [searchTemp, setSearchTemp] = useState("");
// Efecto para buscar temperamentos cuando cambie la búsqueda
  useEffect(() => {
    dispatch(searchTemperament(searchTemp));
  }, [dispatch, searchTemp]);
// Handler para el cambio de checkboxes de temperamentos
  const handleChecksTemp = (e) => {
    const { checked, value } = e.target;
    let updateList = checked
      ? [...checksTemperaments, value]
      : checksTemperaments.filter((temp) => temp !== value);
    setChecksTemperaments(updateList);
    dispatch(filterByTemperament(updateList));
    paginate(1);
  };
// Manejador para filtrar por origen
  const handleFilterCreated = (e) => {
    dispatch(filterCreated(e.target.value));
    paginate(1);
  };
// Manejador para resetear los filtros y búsquedas
  const handleReset = () => {
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach((el) => (el.checked = false));
    setChecksTemperaments([]);
    setSearchTemp("");
    dispatch(filterByTemperament([]));
    allTemps();
    allDogs();
  };
// Renderización del componente
  return (
    <div className={styles.filterContainer}>
      <h2>Filtrar</h2>     
      <span>Temperamentos</span>
      <section className={styles.section}>
        <div>
          <input
            className={styles.searchTemp}
            placeholder="Buscar"
            value={searchTemp}
            type="search"
            onChange={(e) => setSearchTemp(e.target.value)}
          />
          <div>
            <button className={styles.btnReset} onClick={handleReset}> Reset </button>
          </div>
        </div>
        <section>
          {temperaments.map((temp) => {
            if (checksTemperaments.find((e) => e === temp.name)) {
              return (
                <div key={temp.id}>
                  <label htmlFor={temp.id}>
                    <input
                      onChange={handleChecksTemp}
                      key={temp.id}
                      value={temp.name}
                      type="checkbox"
                      checked
                    ></input>
                    <span>{temp.name}</span>
                  </label>
                </div>
              );
            } else {
              return (
                <div key={temp.id}>
                  <label htmlFor={temp.id}>
                    <input
                      onChange={handleChecksTemp}
                      key={temp.id}
                      value={temp.name}
                      type="checkbox"
                    ></input>
                    <span>{temp.name}</span>
                  </label>
                </div>
              );
            }
          })}
        </section>
      </section>
      <span> Filtrar por origen</span>
      <section>
        <select
          className={styles.selectFilter}
          onChange={handleFilterCreated} >        
          <option value="all">Todas las razas</option>
          <option value="created">Agregadas</option>
          <option value="api">Api externa</option>
        </select>
      </section>
    </div>
  );
};

export default Filter;
