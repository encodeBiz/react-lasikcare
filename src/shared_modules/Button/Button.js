import React from 'react'
import "./Button.scss";

const Button = ({action, actionParams, label, type}) => {

    return (
        <button onClick={() => action(actionParams)} className={`button ${type}`}>
            {label}
        </button>
    )
}

export default Button
