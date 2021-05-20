import React from 'react';
import './Loading.scss';
import loader from "../../assets/images/loader.svg"

/**
 * @description Componente que renderiza una animación mientras se cargan datos. 
 */

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading">
      <img src={loader} alt=""/>
      </div>
    </div>
  )
}

export default Loading;

