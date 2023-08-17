import Card from "../Card/Card";
import styles from "./Cards.module.css"

const Cards = ({ dogs }) => {
  return (
    <div className={styles.paginationContainer}>
{/* Mapeo a través de la lista de perros para renderizar cada tarjeta */}
      {dogs.map((dog) => {
// Extraemos las propiedades específicas del perro
        const { id, name, image, temperament, weightMin, weightMax } = dog;
        return (
// Renderizar la tarjeta para el perro actual
          <Card
            key={id}// Clave única para la tarjeta (se usa en el mapeo
            id={id}
            name={name}
            image={image}
            temperament={temperament}
            weightMin={weightMin}
            weightMax={weightMax}
          />
        );
      })}
    </div>
  );
};

export default Cards;
