import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./register.css";
import {
  validarCampoPersonalizado,
  comprobarCoincidenciaContraseñas,
  validarCorreoElectronicoPersonalizado,
  validarNumeroTelefonoPersonalizado,
  verificarContrasePersonalizada,
  validarCedulaPersonalizada,
} from './validaciones'; // Asegúrate de que la ruta de importación sea correcta

const Register = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    telefono: "",
    cedula: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ejecutar validaciones
    const esNombreValido = validarCampoPersonalizado(document.getElementById("name"));
    const esTelefonoValido = validarNumeroTelefonoPersonalizado();
    const esCedulaValida = validarCedulaPersonalizada();
    const esEmailValido = validarCorreoElectronicoPersonalizado();
    const sonContraseñasValidas = comprobarCoincidenciaContraseñas();

    if (esNombreValido && esTelefonoValido && esCedulaValida && esEmailValido && sonContraseñasValidas) {
      localStorage.setItem("userData", JSON.stringify(formData));
      alert("Registrado con éxito");
      navigate('/login');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Navbar />
      <div className="main">
        <div className="form-container">
          <h2>Registro</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Nombres completos</label>
              <br />
              <input
                type="text"
                placeholder="Nombres"
                required
                id="name"
                onChange={handleChange}
                name="name"
                value={formData.name}
              />
            </div>
            <div>
              <label htmlFor="telefono">Telefono</label>
              <br />
              <input
                type="number"
                placeholder="Número de Teléfono"
                required
                id="numeroTelefonoPersonalizado"
                onChange={handleChange}
                name="telefono"
                value={formData.telefono}
              />

              <p id="resultadoNumeroTelefonoPersonalizado"></p> {/* Agrega un elemento para mostrar mensajes de validación */}
            </div>
            <div>
              <label htmlFor="cedula">Cedula</label>
              <br />
              <input
                type="number"
                placeholder="Número de Cédula"
                required
                id="numeroCedulaPersonalizada"
                onChange={handleChange}
                name="cedula"
                value={formData.cedula}
              />

              <p id="mensajeCedulaPersonalizada"></p> {/* Agrega un elemento para mostrar mensajes de validación */}
            </div>
            <div>
              <label htmlFor="email">Correo Electronico</label>
              <br />
              <input
                type="email"
                placeholder="Correo Electrónico"
                required
                id="inputEmailPersonalizado"
                onChange={handleChange}
                name="email"
                value={formData.email}
              />

              <p id="resultadoCorreoElectronicoPersonalizado"></p> {/* Agrega un elemento para mostrar mensajes de validación */}
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <br />
              <input
              type="password"
              placeholder="Contraseña"
              required
              id="passwordPersonalizado" // Asegúrate de que esta ID sea correcta
              onChange={handleChange}
              name="password"
              value={formData.password}
            />

              <p id="resultadoContraseñaPersonalizada"></p> {/* Agrega un elemento para mostrar mensajes de validación */}
            </div>
            <div>
              <label htmlFor="confirmarPasswordPersonalizado">Confirmar Contraseña</label>
              <br />
              <input
                type="password"
                placeholder="Confirmar Contraseña"
                required
                id="confirmarPasswordPersonalizado" // Asegúrate de que esta ID sea correcta
                onChange={handleChange}
                name="confirmPassword"
                value={formData.confirmPassword}
              />

              <p id="mensajeContraseñaPersonalizada"></p> {/* Agrega un elemento para mostrar mensajes de validación */}
            </div>
            <button type="submit" className="info-card bg-green text-white">
              Registrarse
            </button>
          </form>
          <NavLink to={"/login"}>Iniciar Sesion</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
