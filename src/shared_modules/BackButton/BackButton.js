import React from 'react'
import { useHistory } from 'react-router'
import "./BackButton.scss"


const BackButton = () => {
    const history = useHistory()

    return (
        <div className="top-content">
            <button onClick={() => history.goBack()} className="back">
                Volver
            </button>
        </div>
    )
}

export default BackButton
