import React from 'react'
import "./Card.scss"

const Card = ({children, handleClick, clickParam, customClass=''}) => {

    const onClick = () => handleClick ? handleClick(clickParam) : null; 

    return (
        <div className={`card ${customClass}`} onClick={onClick}>
            {children}
        </div>
    )
}

export default Card
