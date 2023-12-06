import React, { useState } from "react";
import Navbar from "./Navbar";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (storedData) {
      if (storedData.email === formData.email && storedData.password === formData.password) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
        alert("Inicio de sesión exitoso");
      } else {
        alert("Credenciales inválidas");
      }
    } else {
      alert("No se encontraron datos de usuario registrados");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Navbar />
      <div className="main">
        <div className="form-container">
          {isLogin ? (
            <div>
              <h2>¡Bienvenido!</h2>
              <p>Has iniciado sesión correctamente.</p>
              <NavLink to={"/"}>Ir a la página principal</NavLink>
            </div>
          ) : (
            <div>
              <h2>Iniciar sesión</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    required
                    onChange={handleChange}
                    name="email"
                    value={formData.email}
                  />
                </div>
                <div>
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    required
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                  />
                </div>
                <button className="info-card bg-green text-white">
                  Iniciar Sesión
                </button>
              </form>
              <NavLink to={"/register"}>Registrarse</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
