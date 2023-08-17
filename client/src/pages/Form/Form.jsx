import styles from "./Form.module.css";
// Importaciones de módulos y componentes de React
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { postDog } from "../../redux/actions/actions";
import validation from "../../utils/validation";
import FormData from "form-data";
import axios from "axios";

// Definimosdel componente Form
const Form = () => {  
// Estado para controlar si el botón está deshabilitado o no
  const [isDisabled, setIsDisabled] = useState(false);
// Estado para manejar el archivo de imagen seleccionado
  const [file, setFile] = useState(null);
// Estado para manejar la carga
  const [loading, setLoading] = useState(false);
//Instanciamos useDispatch de redux
  const dispatch = useDispatch();
// Obtenemos los temperamentos desde el estado global de Redux
  const temperaments = useSelector((state) => state.allTemperaments);
// Estado para manejar los temperamentos seleccionados
  const [dogTemperaments, setDogTemperament] = useState([]);
// Estado para manejar si el formulario se ha enviado
  const [formSubmitted, setFormSubmitted] = useState(false);
  //Estado para manejar si la raza fue creada exitosamente
  const [razaCreadaExitosamente, setRazaCreadaExitosamente] = useState(false);
// Estado para almacenar los datos del perro ingresados en el formulario

  const [dogData, setDogData] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    lifeSpanMin: "",
    lifeSpanMax: "",
  });
  
// Estado para manejar los errores de validación del formulario
  const [errors, setErrors] = useState({
    name: "",
    height: "",
    weight: "",
    lifeSpan: "",
    temperaments: "",
  });
// Maneja los cambios en los temperamentos seleccionados
  const handleTemperaments = (e) => {
    const { value, checked } = e.target;
    // Actualiza la lista de temperamentos seleccionados según la acción del usuario
    let updatedTemperaments = [...dogTemperaments];
    // Realiza validación y actualiza los errores
    if (checked) {
      updatedTemperaments = [...dogTemperaments, value];
    } else {
      updatedTemperaments = dogTemperaments.filter(
        (temperament) => temperament !== value
      );
    }

    setDogTemperament(updatedTemperaments);
 // Realiza validación y actualiza los errores
    setErrors(validation(dogData, updatedTemperaments));
  };
  // Maneja el cambio de la imagen seleccionada
  const handleImage = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  // Maneja el cambio en los campos de entrada del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDogData({
      ...dogData,
      [name]: value,
    });
        // Realiza validación y actualiza los errores
    setErrors(
      validation(
        {
          ...dogData,
          [name]: value,
        },
        dogTemperaments
      )
    );
  };
  //Creamos un estado local para manejar si el formulario se ha enviado con exito.
 
  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let image = null;
      if (file) {
// URL y ID para la carga de imágenes en Cloudinary
        const cloudinaryUrl =
        "https://api.cloudinary.com/v1_1/dqiah55rm/image/upload";
        const cloudiPreset = "icieqqlf";
// Creación de un objeto FormData para cargar la imagen
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", cloudiPreset);
// Realiza la solicitud POST a Cloudinary para cargar la imagen
        const res = await axios.post(cloudinaryUrl, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
// Obtiene la URL segura de la imagen cargada
        image = res.data.secure_url;
      }
// Creación del objeto perro con los datos del formulario
      const dog = {
        name: dogData.name,
        image,
        heightMin: dogData.heightMin,
        heightMax: dogData.heightMax,
        weightMin: dogData.weightMin,
        weightMax: dogData.weightMax,
        lifeSpanMin: dogData.lifeSpanMin,
        lifeSpanMax: dogData.lifeSpanMax,
        temperament: dogTemperaments,
      };
// Despacha la acción para agregar un nuevo perro al bd
      dispatch(postDog(dog));    
// Limpia los campos del formulario y restablece los valores
      setDogData({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        lifeSpanMin: "",
        lifeSpanMax: "",
      });
      setDogTemperament([]);

      document
        .querySelectorAll("input[type=checkbox]")
        .forEach((el) => (el.checked = false));
      setFile(null);
      document
        .querySelectorAll("input[type=file]")
        .forEach((el) => (el.value = null));

      setLoading(false);   

      setFormSubmitted(true);
      setRazaCreadaExitosamente(true);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };
  // Actualiza el estado de deshabilitación del botón según validación y cambios
  useEffect(() => {
    if (
      formSubmitted ||
      Object.values(errors).some((error) => error !== "") ||
      dogTemperaments.length === 0
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [formSubmitted, errors, dogTemperaments]);

  return (


// Renderización del form
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.back}>
        <NavLink className="" to="/home">
          <button className={styles.backBtn}>Regresar           
          </button>
        </NavLink>
      </div>
      <label className={styles.formLabel}>Agrega tu propia raza!</label>      
      <div className={styles.form}>
        <div className={styles.box}>        
          <input
            className={`${errors.name && styles.warning} ${styles.inputForm}`}
            onChange={(e) => handleInputChange(e)}
            name="name"
            type="text"
            value={dogData.name}
            placeholder="Nombre"
          />
        </div>
        <p className={styles.error}> {errors.name}</p>
        <div className={styles.contenedor}>
          <div className={styles.box}>           
            <input
              className={`${
                errors.height ? styles.warningNumber : styles.number
              } ${styles.inputForm}`}
              onChange={(e) => handleInputChange(e)}
              type="number"
              name="heightMin"
              value={dogData.heightMin}
              placeholder="Altura mínima (cm)"
              min="1"
              max="200"
            />
            <input
              className={`${
                errors.height ? styles.warningNumber : styles.number
              } ${styles.inputForm}`}
              onChange={(e) => handleInputChange(e)}
              type="number"
              min="1"
              value={dogData.heightMax}
              name="heightMax"
              placeholder="Altura máxima (cm)"
              max="200"
            />
          </div>
          <div className={styles.box}>           
            <input
              className={`${
                errors.weight ? styles.warningNumber : styles.number
              } ${styles.inputForm}`}
              onChange={(e) => handleInputChange(e)}
              type="number"
              value={dogData.weightMin}
              placeholder="Peso mínimo (kg)"
              name="weightMin"
              min="1"
              max="100"
            />
            <input
              className={`${
                errors.weight ? styles.warningNumber : styles.number
              } ${styles.inputForm}`}
              onChange={(e) => handleInputChange(e)}
              type="number"
              placeholder="Peso máximo (kg)"
              name="weightMax"
              value={dogData.weightMax}
              min="1"
              max="100"
            />
          </div>
          <div className={styles.box}>           
            <input
              className={`${
                errors.lifeSpan ? styles.warningNumber : styles.number
              } ${styles.inputForm}`}
              onChange={(e) => handleInputChange(e)}
              type="number"
              value={dogData.lifeSpanMin}
              placeholder="Vida mínima (años)"
              name="lifeSpanMin"
              min="1"
              max="200"
            />
            <input
              className={`${
                errors.lifeSpan ? styles.warningNumber : styles.number
              } ${styles.inputForm}`}
              onChange={(e) => handleInputChange(e)}
              type="number"
              placeholder="Vida máxima (años)"
              min="1"
              max="200"
              value={dogData.lifeSpanMax}
              name="lifeSpanMax"
            />
          </div>
        </div>
      </div>
      <p className={styles.error}>
        {errors.height || errors.weight || errors.lifeSpan}
      </p>
      <div className={styles.temperaments}>
        <strong>Temperamento</strong>
        <section className={styles.section}>
          {temperaments?.map((e) => {
            return (
              <div key={e.id}>
                <input
                  className={styles.inputForm}
                  onChange={handleTemperaments}
                  value={e.name}
                  type="checkbox"
                ></input>
                <span>{e.name}</span>
              </div>
            );
          })}
        </section>
      </div>
      <p className={styles.error}>{errors.temperaments}</p>
      <div className={styles.inputImage}>
        <input className={styles.loadinput}
          type="file"
          onChange={handleImage}
          accept="image/png, image/jpeg"
          name="image"
        />
      </div>
      <p className={styles.error}> {errors.image}</p>
      {razaCreadaExitosamente && (
        <p className={styles.successMessage}>¡Raza agregada exitosamente!</p>
      )}
      <button 
        className={styles.button}type="submit"disabled={isDisabled} >
                  {loading ? "Agregando nueva raza..." :  "Crear raza"}
      </button>      
    
    </form>
    
  );
};

export default Form;
