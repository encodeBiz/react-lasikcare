import React from 'react'
import "./Navbar.scss"

const Navbar = () => {
    return (
        <div className="navbar-container" >
            <div>Logo</div>
            <button>0800 8888 60 60</button>
            <div className="hamburguer">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Navbar
