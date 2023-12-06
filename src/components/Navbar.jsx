import React from 'react'
import Logo from "../../public/logo.png";
import DefaultUser from "../../public/perfil.png";
import "./navbar.css"
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  const isUserLoggedIn = () => {
    return localStorage.getItem("isLoggedIn") === "true";
  };
  return (
    <header>
      <div>
        <NavLink to={"/"}><img src={Logo} alt="" id='logo'/></NavLink>
      </div>
      <div>
        Software para control de parqueadero en la ULEAM
      </div> 
      <div className='profile-section'>
      <NavLink to={"/profile"}>
      <div className="container">
          <img src={DefaultUser} alt="" id='profile' />
          <p>Nombre Usuario</p>
        </div>
      </NavLink>
      </div>
    </header>
  )
}

export default Navbar