//Importaciones de React
import { useState, useEffect } from "react";
//Creamos un hook personalizado 
export const useLoading = (time = 800) => {
// Estado local para controlar si se está cargando
  const [loading, setLoading] = useState(false);
// Sse ejecuta cuando cambia el valor de 'time' o cuando se monta el componente
  useEffect(() => {
// Al montar el componente, establece el estado 'loading' en true
    setLoading(true);
// Luego del timeout en ms, establece el estado 'loading' en false
    setTimeout(() => {
      setLoading(false);
    }, `${time}`);
  }, [time]);// Se ejecutará cada vez que cambie el valor de 'time'
//Devuelve el estado Loading
  return {loading};
}