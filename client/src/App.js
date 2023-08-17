// Importa los módulos necesarios de React y React Router.
import { useEffect, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
// Importamos las actions necesarias
import {getAllBreeds, getTemperaments, getByBreed,} from "./redux/actions/actions";
//Importamos los componentes y pages necesarias
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Form from "./pages/Form/Form";
import DogDetail from "./components/DogDetail/DogDetail";
import axios from "axios";
import NotFound from "./components/NotFound/NotFound";

//Definimos la función principal del componente App
function App() {
// Obtenemose una instancia del  (dispatch) de Redux.
  const dispatch = useDispatch();
  // Obtenemos la ruta actual de la aplicación con el hook useLocation  
  const location = useLocation();
  //Si la ruta actual no es raiz, show cambia a true y muestra la navbar en la pagina actual.
  const show = location.pathname !== "/";
// Definimos una función que obtiene todas las razas de perros.
  const allDogs = useCallback(() => {
    dispatch(getAllBreeds());
  }, [dispatch]);
// Definimos una función que obtiene todos los temperamentos.
  const allTemps = useCallback(() => {
    dispatch(getTemperaments());
  }, [dispatch]);
// Definimos una función que realiza una búsqueda por raza de perro.
  const onSearch = (race) => {
    dispatch(getByBreed(race));
  };
  //Usamos UseEffect para cargar los datos de temperamentos y razas al inicio.
  useEffect(() => {
    allTemps();
    allDogs();
  }, [allDogs, allTemps]);


  //{show && <Navbar onSearch={onSearch} />}
  
  //Renderizamos la UI
  return (
    <div>
      {/* Configurar las rutas */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <>
              <Navbar onSearch={onSearch} />
              <Home allDogs={allDogs} allTemps={allTemps} />
            </>
          }
        />
        <Route path="/create" element={<Form />} />
        <Route
          path="/detail/:id"
          element={
            <>
              <Navbar onSearch={onSearch} />
              <DogDetail />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;