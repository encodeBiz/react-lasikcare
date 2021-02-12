import React from 'react'
import Button from '../Button/Button';
import "./Navbar.scss";
import logoLasik from "../../assets/images/icons/logo_lasik.jpg";

const Navbar = () => {
const handleEventAccept = () => '';

    return (
        <div className="navbar-container" >
            <div className="logo"><img src={logoLasik}></img></div>
            <div className="second-nav">
            <Button action={handleEventAccept} styleType={"nav-number"} label={"0800 8888 60 60"} />
            <div className="hamburguer">
                <div></div>
                <div></div>
                <div></div>
            </div>
            </div>
        </div>
    )
}

export default Navbar
