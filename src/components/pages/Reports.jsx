import React, { useState } from "react";
import Navbar from "../Navbar";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import "./reports.css";

const Reports = () => {

  const isUserLoggedIn = () => {
    return localStorage.getItem("isLoggedIn") === "true";
  };

  const mostrarToastDescarga = () => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    icon: 'info',
    title: 'Descargando...'
  });
};



  const [reservasActivas, setReservasActivas] = useState([]);
    const MySwal = withReactContent(Swal);
    const [espaciosReservados, setEspaciosReservados] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");



    const handleLogout = () => {
      localStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false); // Actualizar el estado de autenticación
    };
    
    
    const handleReservarEspacio = async (espacio) => {
        let validHours = false;
        let formValues = null;


        
        if (!isLoggedIn) {
          MySwal.fire({
              icon: 'error',
              title: 'No autenticado',
              text: 'Debes iniciar sesión para realizar una reserva.',
          });
          return;
      }

          // Verificar si el espacio ya está reservado
    if (espaciosReservados.includes(espacio)) {
      MySwal.fire({
        icon: 'error',
        title: 'Espacio no disponible',
        text: 'Este espacio ya ha sido reservado.',
      });
      return;
    }

        while (!validHours) {
            const horasResult = await MySwal.fire({
                title: `Reserva para el Espacio ${espacio}`,
                showCancelButton: true,
                confirmButtonText: 'Reservar',
                cancelButtonText: 'Cancelar',
                html: `
                    <div>Formulario de Reserva</div>
                    <input type="time" id="horaInicio" class="swal2-input" placeholder="Hora de inicio">
                    <input type="time" id="horaFin" class="swal2-input" placeholder="Hora de fin">
                `,
                preConfirm: () => {
                    const horaInicio = Swal.getPopup().querySelector('#horaInicio').value;
                    const horaFin = Swal.getPopup().querySelector('#horaFin').value;
                    if (!horaInicio || !horaFin) {
                        Swal.showValidationMessage('Completa todos los campos.');
                        return;
                    }
                    return { horaInicio, horaFin };
                }
            });

            if (horasResult.isConfirmed) {
                formValues = horasResult.value;
                validHours = true;
            } else {
                break;
            }
        }

        if (formValues) {
          localStorage.setItem(`reservaEspacio${espacio}`, JSON.stringify(formValues));
          MySwal.fire({
              icon: 'success',
              title: 'Reserva confirmada',
              text: `Espacio ${espacio} reservado de ${formValues.horaInicio} a ${formValues.horaFin}.`,
              
          });
          const nuevaReserva = `Espacio ${espacio} reservado de ${formValues.horaInicio} a ${formValues.horaFin}`;
          setReservasActivas(prevReservas => [...prevReservas, nuevaReserva]);
          setEspaciosReservados(prev => [...prev, espacio]);
        }
    };

    const mostrarToastMantenimiento = () => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: 'info',
        title: 'En mantenimiento...'
      });
    };
    




  return (
    <div>
    <Navbar />
    <main>
      <div className="vertical-menu">
        <ul>
          <li>
            <NavLink className={"lik"} to={"/"}>
              Inicio
            </NavLink>
          </li>

          <li onClick={mostrarToastMantenimiento}>Tarifas y pagos</li>
        </ul>
      </div>
      <div className="main-content">
      <div className='cards-container'>
        <div className="card-report">
          <h2>Informe Mensual</h2>
          <p>Este informe presenta un resumen de las actividades del mes anterior.</p>
          <button className='info-card'  onClick={mostrarToastDescarga}>Ver informacion</button>
        </div>
        <div className="card-report">
          <h2>Informe anual</h2>
          <p>El resumen anual con estadísticas clave y proyecciones futuras.</p>
          <button className='info-card'  onClick={mostrarToastDescarga}>Ver informacion</button>
        </div>
     </div>
      <div className='cards-container'>
        <div className="card-report">
          <h2>Informe Trimestral</h2>
          <p>Un análisis detallado de los resultados del último trimestre.</p>
          <button className='info-card'  onClick={mostrarToastDescarga}>Ver informacion</button>
        </div>
      </div>
      </div>
      <div className="right-content">
                      <div className="title-container">
                          <h1>Espacios Reservados</h1>
                      </div>
                      <div className="reserved-spaces">
                          {reservasActivas.map((reserva, index) => (
                              <div key={index} className="reserved-btn">{reserva}</div>
                          ))}
                      </div>
                  </div>
    </main>
  </div>
  )
}

export default Reports