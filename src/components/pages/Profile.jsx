import React, { useState } from 'react';
import Navbar from '../Navbar';
import Swal from 'sweetalert2';

import DefaultUser from "../../../public/perfil.png";
import "./profile.css";

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);

  const validarPlaca = (placa) => {
    const regex = /^[A-Za-z]{3,4}\d{3,4}$/;
    return regex.test(placa);
  };

  const [vehiculos, setVehiculos] = useState([
    // Suponiendo que tengas una lista inicial de vehículos
    { id: 1, modelo: "Normal", placa: "ABC123" },
    // ...otros vehículos...
  ]);
  const [vehiculoEditado, setVehiculoEditado] = useState({});
  const [estaEditando, setEstaEditando] = useState(null);

  const handleEdit = (id) => {
    setEstaEditando(id);
    const vehiculo = vehiculos.find(v => v.id === id);
    setVehiculoEditado(vehiculo);
  };

  const handleSave = (id) => {
    if (!validarPlaca(vehiculoEditado.placa)) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: 'error',
        title: 'Placa no valida'
      });
      return;
    }
    setVehiculos(vehiculos.map(v => v.id === id ? vehiculoEditado : v));
    setEstaEditando(null);
  };

  const handleDelete = (id) => {
    setVehiculos(vehiculos.filter(v => v.id !== id));
  };

  const handleAddVehicle = () => {
    const newVehicle = {
      id: vehiculos.length + 1, // Asumiendo que el ID es simplemente el siguiente número
      modelo: "",
      placa: ""
    };
    setVehiculos([...vehiculos, newVehicle]);
    setEstaEditando(newVehicle.id); // Opcionalmente, poner el nuevo vehículo en modo edición
  };

  return (
    <div>
      <Navbar />
      <main>
        <div className='right'>
          <div>
            <img src={DefaultUser} alt="profile img" id='logo-profile'/>
            <div>
              <div className='input-container'>
                <h2>Datos de usuario</h2>
                <div className='text-user'>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.nombre}
                      onChange={(e) => setEditedData({...editedData, nombre: e.target.value})}
                    />
                  ) : (
                    <p>{userData.nombre || "No registrado"}</p>
                  )}
                </div>
                <div className='text-user'>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedData.email}
                      onChange={(e) => setEditedData({...editedData, email: e.target.value})}
                    />
                  ) : (
                    <p>{userData.email || "No registrado"}</p>
                  )}
                </div>
                <div className='text-user'>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.telefono}
                      onChange={(e) => setEditedData({...editedData, telefono: e.target.value})}
                    />
                  ) : (
                    <p>{userData.telefono || "No registrado"}</p>
                  )}
                </div>
                <div className='text-user'>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.cedula}
                      onChange={(e) => setEditedData({...editedData, cedula: e.target.value})}
                    />
                  ) : (
                    <p>{userData.cedula || "No registrado"}</p>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className='left'>
          <h1>Vehiculos</h1>

          <div className='vehicle-card-container'>
            {vehiculos.map(vehiculo => (
              <div key={vehiculo.id} className='vehicle-card'>
                <h3>Vehículo {vehiculo.id}</h3>
                {estaEditando === vehiculo.id ? (
                  <>
                    <input 
                      type="text" 
                      value={vehiculoEditado.modelo} 
                      onChange={(e) => setVehiculoEditado({ ...vehiculoEditado, modelo: e.target.value })}
                    />
                    <input 
                      type="text" 
                      value={vehiculoEditado.placa} 
                      onChange={(e) => setVehiculoEditado({ ...vehiculoEditado, placa: e.target.value })}
                    />
                  </>
                ) : (
                  <>
                    <h4>{vehiculo.modelo}</h4>
                    <h4>{vehiculo.placa}</h4>
                  </>
                )}
                <div className='btn-container'>
                  {estaEditando === vehiculo.id ? (
                    <button className='info-card' onClick={() => handleSave(vehiculo.id)}>Guardar Información</button>
                  ) : (
                    <>
                      <button className='info-card' onClick={() => handleEdit(vehiculo.id)}>Editar Información</button>
                      <button className='info-card' onClick={() => handleDelete(vehiculo.id)}>Eliminar</button>
                    </>
                    
                  )}
                   <button className='info-card' onClick={handleAddVehicle}>Agregar Vehículo</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile