import React, { useState } from "react";
import Navbar from "../Navbar";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import "./home.css";

const Home = () => {
  const isUserLoggedIn = () => {
    return localStorage.getItem("isLoggedIn") === "true";
  };
  
  const [reservasActivas, setReservasActivas] = useState([]);
    const MySwal = withReactContent(Swal);
    const [espaciosReservados, setEspaciosReservados] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
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


    const anularReserva = () => {
      // Obtener todas las reservas de localStorage
      const reservas = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('reservaEspacio')) {
          const reserva = JSON.parse(localStorage.getItem(key));
          reservas.push({
            id: key,
            nombre: `Espacio ${key.replace('reservaEspacio', '')} - ${reserva.horaInicio} a ${reserva.horaFin}`
          });
        }
      }
  
      if (reservas.length === 0) {
        MySwal.fire('No hay reservas para anular');
        return;
      }
  
      MySwal.fire({
        title: 'Anular Reserva',
        text: 'Selecciona la reserva que deseas anular:',
        input: 'select',
        inputOptions: reservas.reduce((options, reserva) => {
          options[reserva.id] = reserva.nombre;
          return options;
        }, {}),
        inputPlaceholder: 'Selecciona una reserva',
        showCancelButton: true,
        confirmButtonText: 'Sí, anular',
        cancelButtonText: 'No, cancelar',
        preConfirm: (reservaId) => {
          if (reservaId === '') {
            Swal.showValidationMessage('Debes seleccionar una reserva.');
          } else {
            return reservaId;
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const reservaId = result.value;
          localStorage.removeItem(reservaId);
  
          MySwal.fire({
            icon: 'success',
            title: 'Reserva anulada',
            text: `La reserva ha sido anulada con éxito.`,
          });
        }
      });

      
      
    };

    return (
        <div>
            <Navbar />
            <main>
                <div className="vertical-menu">
                <ul>
          <li><NavLink className={"lik"} to={"/"}>Inicio</NavLink></li>
          <li onClick={mostrarToastMantenimiento}>Tarifas y pagos</li>
          {isUserLoggedIn() ? (
            
            <li onClick={handleLogout}>Desconectarse</li>,
            <li onClick={anularReserva}>Anular Reserva</li>,
            <li><NavLink className={"lik"} to={"/reports"}>Reportes</NavLink></li>
            
          ) : (
            <li><NavLink to={"/login"}>Iniciar sesión</NavLink></li>

            
          )}
        </ul>
                </div>
                <div className="main-content">
                    <h1>Espacios Generales</h1>
                    <div className="space-container">
                    <div className="card-container">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((espacio) => (
                      <div key={espacio} className="card" onClick={() => handleReservarEspacio(espacio)}>
                        <div className="card-text">Espacio {espacio}</div>
                        <div className={`color ${espaciosReservados.includes(espacio) ? 'reservado' : ''}`}></div>
                      </div>
                    ))}
                  </div>

                    </div>
                    <div className="btn-container">
                        <div className="info-card bg-green text-white">Disponible</div>
                        <div className="info-card bg-red text-white">No disponible</div>
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
    );
};

export default Home;
