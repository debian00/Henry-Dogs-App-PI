import styles from "./Home.module.css";
// Importaciones de módulos y componentes de React
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBreeds } from "../../redux/actions/actions";
import { useLoading } from "../../hooks/useLoading";
// Importación de componentes
import Cards from "../../components/Cards/Cards";
import Pagination from "../../components/Pagination/Pagination.jsx";
import OrderBy from "../../components/OrderBy/OrderBy";
import Filter from "../../components/Filter/Filter";
import Loading from "../../components/Loading/Loading";




// Definición del componente Home 
const Home = ({ allDogs, allTemps }) => {
// Uso del hook useLoading para simular un loading
  const { loading } = useLoading();
// Instanciamos useDispatch de redux
  const dispatch = useDispatch();
// Obtenemos la lista de perros desde el estado global de Redux
  const dogs = useSelector((state) => state.dogs);
// Configuración de la paginación
  const [currentPage, setCurrentPage] = useState(1);//Almacena el numero de la pagina actual y cambia ese número cuando el usuario navega entre páginas.
  const [dogsPerPage] = useState(8);// Esta variable de estado almacena la cantidad de perros que se mostrarán en cada página. 
  const indexOfLastDog = currentPage * dogsPerPage;//Calculamos los índices de los perros que se mostrarán en la página actual.
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);//
    // Función para cambiar de página en la paginación
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Estado local para los temperamentos seleccionados en el filtro
  const [checksTemperaments, setChecksTemperaments] = useState([]);
  //  useEffect: se ejecuta cuando el componente se monta
  useEffect(() => {
// Despacha la acción "getAllBreeds()" para obtener todas las razas de perros
    dispatch(getAllBreeds());
  }, [dispatch]);
  // Renderización del componente Home
  return (
    <div className={styles.container}> 
    <div style={{display: "flex"}}>         
          <OrderBy />
          <Filter paginate={paginate} allDogs={allDogs}allTemps={allTemps}
            setChecksTemperaments={setChecksTemperaments}checksTemperaments={checksTemperaments}/>
          
    </div>
    <div className={styles.dogsContainer}>
          {loading ? <Loading /> : <Cards dogs={currentDogs} />}     
    </div>       
    <div className={styles.paginado}>        
      <Pagination
        dogsPerPage={dogsPerPage}
        totalDogs={dogs.length}
        currentPage={currentPage}
        allDogs={allDogs}
        paginate={paginate}
        checksTemperaments={checksTemperaments}
        setChecksTemperaments={setChecksTemperaments}
      />     
    </div>
    </div>
  );
};

export default Home;
