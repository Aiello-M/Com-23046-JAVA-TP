// (1) FORMULARIO CONTACTO
document.addEventListener("DOMContentLoaded", function() {

    const datos = {
        nombre: "",
        apellido: "",
        mensaje: "",
    };

    const nombre = document.querySelector("#nombre");
    const apellido = document.querySelector("#apellido");
    const mensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector("#formulario");
    const nombreError = document.querySelector("#nombre-error");
    const apellidoError = document.querySelector("#apellido-error");
    const mensajeError = document.querySelector("#mensaje-error");
    const alertContainer = document.querySelector("#alert-container");

    apellido.disabled = true;
    mensaje.disabled = true;


    nombre.addEventListener("blur", function (event) {
        const nombreValue = event.target.value;
        datos.nombre = nombreValue;

        if (nombreValue.trim() === "") {
            mostrarError(nombreError, "Ingrese un nombre");
            apellido.disabled = true;
            mensaje.disabled = true;
            
        } else if (!nombreValue || !/^[a-zA-Z\s]+$/.test(nombreValue)) {
            mostrarError(nombreError, "El nombre es inválido. No puede contener números.");
            apellido.disabled = true;
            mensaje.disabled = true;
        } else {
            mostrarError(nombreError, "");
            apellido.disabled = false;
            
        }
    });

    apellido.addEventListener("blur", function (event) {
        const apellidoValue = event.target.value;
        datos.apellido = apellidoValue;

        if (apellidoValue.trim() === "") {
            mostrarError(apellidoError, "Ingrese un apellido");
            mensaje.disabled = true;
        } else if (!apellidoValue || !/^[a-zA-Z\s]+$/.test(apellidoValue)) {
            mostrarError(apellidoError, "El apellido es inválido. No puede contener números");
            mensaje.disabled = true;
        } else {
            mostrarError(apellidoError, "");
            mensaje.disabled = false;
        }
    });

    mensaje.addEventListener("keyup", function (event) {
        const mensajeValue = event.target.value;
        datos.mensaje = mensajeValue;
        
        if (mensajeValue.length >= 100) {
            mostrarError(mensajeError, "El mensaje es demasiado largo");
        } else if (mensajeValue === "") {
            mostrarError(mensajeError, "Ingrese un mensaje");
        } else  {
            mostrarError(mensajeError, "");
        }
    });

    
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const { nombre, apellido, mensaje } = datos;

        if (!nombre || !apellido) {
            mostrarMensajeError("Alguno de los campos está incompleto o no es válido.");
        } else if (mensaje.trim() === "") {
            mostrarError(mensajeError, "Ingrese un mensaje");
            mostrarMensajeError("Alguno de los campos está incompleto o no es válido.");
        } else if (mensaje.length >= 100) {
            mostrarError(mensajeError, "El mensaje es demasiado largo");
            mostrarMensajeError("Alguno de los campos está incompleto o no es válido.");
        } else {
            mostrarMensajeExitoso("Formulario enviado exitosamente");
        }
    });
    
    function mostrarMensajeExitoso(mensaje) {
        const alertElement = document.createElement("div");
        alertElement.classList.add("alert", "alert-success");
        alertElement.innerText = mensaje;
    
        alertContainer.innerHTML = "";
        alertContainer.appendChild(alertElement);
    
        setTimeout(function () {
            alertContainer.innerHTML = "";
            formulario.reset(); // Resetear el formulario
            datos.nombre = ""; 
            datos.apellido = ""; 
            datos.mensaje = ""; 
        }, 3000);
    }
    
    function mostrarMensajeError(mensaje) {
        const alertElement = document.createElement("div");
        alertElement.classList.add("alert", "alert-danger");
        alertElement.innerText = mensaje;
    
        alertContainer.innerHTML = "";
        alertContainer.appendChild(alertElement);
    
        setTimeout(function () {
            alertContainer.innerHTML = "";
        }, 3000);
    }

    function mostrarError(elemento, mensaje) {
        elemento.innerHTML = mensaje;
        elemento.style.color = 'red';
    
        if (!mensaje) {
            elemento.innerHTML = '';
        }
    
        setTimeout(function () {
            elemento.innerHTML = '';
        }, 3000);
    }

});