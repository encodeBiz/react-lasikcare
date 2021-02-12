import React from "react";
import "./ErrorDialog.scss"

/**
 * 
 * @param {string} text Texto del error que se renderizará
 * @description Renderiza un texto de error. 
 * Está siendo utilizado tanto para renderizar 
 * algunos errores de formulario como 
 * para renderizar errores de servidor 
 */

const ErrorDialog = ({ text }) => {
  const defaultText =
    "Es ist ein Fehler aufgetreten, bitte versuchen Sie es später noch einmal.";

  return (
    <p className="form-error">{text ?? defaultText}</p>
  );
};

export default ErrorDialog;
