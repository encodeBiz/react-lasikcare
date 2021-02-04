import { useState, useEffect } from "react";

// Hook
/**
 * @description Este hook configura un listener que escucha el ancho y la altura de la pantalla
 * para que puedan ser utilizados en cualquier parte de la aplicación
 */

function useWindowSize() {
  // Inicializa el estado con una width/height undefined

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Función que gestiona el redimensionado
    function handleResize() {
      // Almacena el width/height en el estado
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Añade un event listener
    window.addEventListener("resize", handleResize);

    // Se llama al handler para que el estado se actualice
    handleResize();

    // Cuando se desmonte el componente se destruye el listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
