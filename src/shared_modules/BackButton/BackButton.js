import React from 'react'
import "./BackButton.scss"

/**
 * Componente reutilizable de btn lasikcare
 * @param {Object} properties
 * @param {Function} properties.onClick CallBack del clikc
 * @param {Function} properties.type Tipo de boton a pintar [btn, backbtn, etc]
 */
const Button =(properties) => {
    return (
        <button onClick={properties.onClick} className={properties.type || 'btn'}>
            Volver
        </button>
    )
}

export default Button
