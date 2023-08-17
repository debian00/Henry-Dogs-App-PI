import styles from "./DogDetail.module.css";
// Importaciones de React y React Router
import { useEffect } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
// Importaciones de Redux
import { details, cleanDetail } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
// Importaciones de hooks y componentes
import { useLoading } from "../../hooks/useLoading";
import Loading from "../Loading/Loading";
// Importaciones de utilidades para formateo de texto

//Agregan cm y en temperaments los concatena en un solo string si tienve varios.
import {
  getHeightText,
  getWeightText,
  getLifeSpanText,
  getTempTextDetail
} from "../../utils/formatText";
// Definición del componente DogDetail
const DogDetail = () => {
  // Utilización del hook useLoading para manejar el estado de carga
  const {loading} = useLoading(2000)
// Utilización del hook useLoading para manejar el estado de carga
  const dispatch = useDispatch();
    // Obtenemos el parámetro de la URL usando useParams
  const { id } = useParams();
// Obtenemos los detalles del perro desde el estado de Redux
  const detail = useSelector((state) => state.dogDetails);
  console.log(detail)
// Useeffect para cargar los detalles del perro y limpiarlos al desmontar
  useEffect(() => {
    dispatch(details(id));
    return () => dispatch(cleanDetail());
  }, [id, dispatch]);
// Obtenemos el texto formateado para altura, peso, esperanza de vida y temperamento
  let heightTxt = getHeightText(detail.heightMin, detail.heightMax);
  let weightTxt = getWeightText(detail.weightMin, detail.weightMax);
  let lifeSpanTxt = getLifeSpanText(detail.lifeSpanMin, detail.lifeSpanMax);
  let tempTxt = getTempTextDetail(detail?.temperament)
// Renderización del componente
  return (
    <div className={`container ${styles.containerDetail}`}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.maincontainer}>
            <NavLink className={styles.backDetaila}  to="/home">
              <button className={styles.backDetail}>BACK</button>
            </NavLink>
          </div>
          <div className={styles.detail}>
            <div className={styles.detail_header}>
              <img
                className={styles.img}
                src={detail.image}
                alt={detail.name}
              ></img>
            </div>
            <div className={styles.detail_body}>
              <div className={styles.detail_info}>
                <h2>{detail.name}</h2>
                <div className={styles.detail_content}>
                  <div className={styles.detail_data}>
                    <div className="detail_item">
                      <h3>Peso</h3> {weightTxt}
                    </div>
                    <div className="detail_item">
                      <h3>Altura</h3> {heightTxt}
                    </div>
                    <div className="detail_item">
                      <h3>Esperanza de vida</h3> {lifeSpanTxt}
                    </div>
                  </div>
                </div>
                <div className={styles.detail_temperament}>
                  <h4>Temperamento:</h4>
                  <span className="temperament-tag">{tempTxt}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DogDetail;
