// Validación de un campo de entrada
export function validarCampoPersonalizado(inputElement) {
    const valor = inputElement.value.trim();
    if (valor === '') {
      Swal.fire({
        icon: 'error',
        title: 'Campo Inválido',
        text: 'Por favor, completa este campo.',
      });
      return false;
    }
    return true;
  }
  
  // Validación de contraseñas personalizada
 export function verificarContrasePersonalizada() {
    const regexContraseñaPersonalizada = /^(?=.*[A-Z])(?=.*\d).{10,}$/;
    const inputContraseñaPersonalizada = document.getElementById("passwordPersonalizado");
    const resultadoContraseñaPersonalizada = document.getElementById("resultadoContraseñaPersonalizada");
  
    if (!regexContraseñaPersonalizada.test(inputContraseñaPersonalizada.value)) {
      resultadoContraseñaPersonalizada.textContent = "La contraseña no es válida. Debe contener al menos un carácter en mayúscula, al menos un dígito y tener al menos 10 caracteres.";
      return false;
    }
    resultadoContraseñaPersonalizada.textContent = "";
    return true;
  }
  
  // Validación de la coincidencia de contraseñas personalizada
  export function comprobarCoincidenciaContraseñas() {
    const contraseña = document.getElementById("passwordPersonalizado").value;
    const confirmarContraseña = document.getElementById("confirmarPasswordPersonalizado").value;
    const mensajeContraseña = document.getElementById("mensajeContraseñaPersonalizada");
  
    if (contraseña !== confirmarContraseña) {
      mensajeContraseña.textContent = "Las contraseñas no coinciden.";
      return false;
    } else {
      mensajeContraseña.textContent = "";
      return true;
    }
  }
  
  // Validación de una dirección de correo electrónico personalizada
  export function validarCorreoElectronicoPersonalizado() {
    const regexCorreoElectronicoPersonalizado = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const inputCorreoElectronicoPersonalizado = document.getElementById("inputEmailPersonalizado");
    const resultadoCorreoElectronicoPersonalizado = document.getElementById("resultadoCorreoElectronicoPersonalizado");
  
    if (!regexCorreoElectronicoPersonalizado.test(inputCorreoElectronicoPersonalizado.value)) {
      resultadoCorreoElectronicoPersonalizado.textContent = "La dirección de correo electrónico no es válida.";
      return false;
    } else {
      resultadoCorreoElectronicoPersonalizado.textContent = "";
      return true;
    }
  }
  
// Validación de un número de teléfono personalizado
export function validarNumeroTelefonoPersonalizado() {
    const regexNumeroTelefonoPersonalizado = /^\d{10}$/;
    const inputNumeroTelefonoPersonalizado = document.getElementById("numeroTelefonoPersonalizado");
    const resultadoNumeroTelefonoPersonalizado = document.getElementById("resultadoNumeroTelefonoPersonalizado");
  
    if (!regexNumeroTelefonoPersonalizado.test(inputNumeroTelefonoPersonalizado.value.replace(/\D/g, ''))) {
      resultadoNumeroTelefonoPersonalizado.textContent = "El número de teléfono no es válido. Debe contener 10 dígitos.";
      return false;
    } else {
      resultadoNumeroTelefonoPersonalizado.textContent = "";
      return true;
    }
  }  
  
  // Validación de una cédula personalizada
  export  function validarCedulaPersonalizada() {
    const cedulaPersonalizada = document.getElementById("numeroCedulaPersonalizada").value;
    const mensajeCedulaPersonalizada = document.getElementById("mensajeCedulaPersonalizada");
    
    if (cedulaPersonalizada.length !== 10) {
      mensajeCedulaPersonalizada.textContent = "La cédula debe tener 10 dígitos.";
      return false;
    }
  
    if (!/^[0-9]+$/.test(cedulaPersonalizada)) {
      mensajeCedulaPersonalizada.textContent = "La cédula debe contener solo números.";
      return false;
    }
  
    const provincia = Number(cedulaPersonalizada.substring(0, 2));
    if (provincia < 1 || provincia > 24) {
      mensajeCedulaPersonalizada.textContent = "El primer número de la cédula debe estar entre 1 y 24.";
      return false;
    }
  
    const coeficientesCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const digitoVerificadorCedula = Number(cedulaPersonalizada[9]);
  
    let sumaCedula = 0;
    for (let i = 0; i < 9; i++) {
      let valorCedula = Number(cedulaPersonalizada[i]) * coeficientesCedula[i];
      if (valorCedula > 9) {
        valorCedula -= 9;
      }
      sumaCedula += valorCedula;
    }
  
    const totalCedula = (Math.ceil(sumaCedula / 10) * 10);
    const digitoVerificadorCalculadoCedula = totalCedula - sumaCedula;
  
    if (digitoVerificadorCalculadoCedula === 10) {
      if (digitoVerificadorCedula !== 0) {
        mensajeCedulaPersonalizada.textContent = "La cédula es inválida.";
        return false;
      }
    } else {
      if (digitoVerificadorCedula !== digitoVerificadorCalculadoCedula) {
        mensajeCedulaPersonalizada.textContent = "La cédula es inválida.";
        return false;
      }
    }
  
    mensajeCedulaPersonalizada.textContent = "";
    return true;
  }
  
  


  
  export  function validarPlacaEcuatoriana(placa) {
    // Eliminar espacios en blanco y convertir todo a mayúsculas
    placa = placa.replace(/\s/g, '').toUpperCase();
  
    // Patrón para placas de tres letras seguidas de tres números (ABC123)
    const regexPatron1 = /^[A-Z]{3}\d{4}$/;
  
    // Patrón para placas de una letra seguida de dos números y cuatro letras (A12BCDEF)
    const regexPatron2 = /^[A-Z]\d{3}[A-Z]{4}$/;
  
    // Elemento <p> para mostrar mensajes
    const mensajePlaca = document.getElementById("mensaje_placa");
  
    // Comprobar si la placa cumple con alguno de los patrones
    if (regexPatron1.test(placa) || regexPatron2.test(placa)) {
      mensajePlaca.textContent = ""; // Limpiar mensaje (placa válida)
      return true; // Válida
    } else {
      mensajePlaca.textContent = "Placa inválida. Por favor, ingrese una placa válida."; // Mostrar mensaje (placa inválida)
      return false; // Inválida
    }
  }
  
  
  
  export function validarFormulario() {
    // Realiza las validaciones utilizando las funciones que has definido
    if (!validarCampoPersonalizado(document.getElementById("inputUsuario"))) {
        esValido = false;
    }
    if (!validarCorreoElectronicoPersonalizado()) {
        esValido = false;
    }
    if (!validarNumeroTelefonoPersonalizado()) {
        esValido = false;
    }
    if (!validarCedulaPersonalizada()) {
        esValido = false;
    }

    // Devuelve true si todas las validaciones son exitosas, de lo contrario, devuelve false
    return esValido;
}

