import React from 'react'
import "./Card.scss"

const Card = ({children, handleClick, clickParam}) => {

    const onClick = () => handleClick ? handleClick(clickParam) : null; 

    return (
        <div className="card" onClick={onClick}>
            {children}
        </div>
    )
}

export default Card
