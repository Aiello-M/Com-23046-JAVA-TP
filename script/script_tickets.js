
// (2) FORMULARIO: COMPRAR TICKETS
document.addEventListener("DOMContentLoaded", function() {


    const form = document.getElementById("form");
    const nombre2 = document.querySelector('#nombre2');
    const apellido2 = document.querySelector('#apellido2');
    const email = document.querySelector('#email'); 
    const cant = document.getElementById("cantidad");
    const errorCant = document.getElementById("errorCant");
    const categ = document.getElementById("categoria");
    const monto = document.getElementById("montoTotal");

    cant.addEventListener("input", function() {
        errorCant.textContent = "";
    });
  



    // Boton 'Resumen' --> agregar evento click para calcular monto total
    const btnResumen = document.querySelector(".btn-resumen");
    btnResumen.addEventListener("click", function(event) {
        event.preventDefault();

        let cantidad = parseFloat(cant.value);
        if (isNaN(cantidad) || !Number.isInteger(cantidad) || cantidad <= 0) {
            errorCant.textContent = "Ingrese una cantidad válida (número entero mayor a cero)";
            monto.innerHTML = "Total a Pagar: $";
            return;
        }

        let categoria = categ.value;
        const precioEntrada = 200;
        let descuento = 0;
  
        if (categoria === "estudiante") {
            descuento = 0.8;
        } else if (categoria === "trainee") {
            descuento = 0.5;
        } else if (categoria === "junior") {
            descuento = 0.15;
        }
  
        let montoTotal = cantidad * precioEntrada * (1 - descuento);
        montoTotal = Math.round(montoTotal);
        monto.innerHTML = "Total a Pagar: $" + montoTotal; //mostrar monto
    });


    // Botón 'Borrar' --> agregar evento click para reestablecer valores iniciales del formulario
    const btnBorrar = document.querySelector(".btn-borrar");
    btnBorrar.addEventListener("click", function(event) {
        event.preventDefault();

        nombre2.value = "";
        apellido2.value = "";
        email.value = "";
        cant.value = "";
        categ.value = "general";
        monto.textContent = "Total a Pagar: $";
    });



    

   //VALIDAR (formulario comprar tickets)

   const datos = {
    nombre2: "",
    apellido2: "",
    email: "",
    };

    const nombreError = document.querySelector("#nombre-error");
    const apellidoError = document.querySelector("#apellido-error");
    const emailError = document.querySelector("#email-error");
    const alertContainer = document.querySelector("#alert-container");

    apellido2.disabled = true;
    email.disabled = true;


    nombre2.addEventListener("blur", function (event) {
        const nombreValue = event.target.value;
        datos.nombre2 = nombreValue;

        if (nombreValue.trim() === "") {
            mostrarError(nombreError, "Ingrese un nombre");
            apellido2.disabled = true;
            email.disabled = true;
            
        } else if (!nombreValue || !/^[a-zA-Z\s]+$/.test(nombreValue)) {
            mostrarError(nombreError, "El nombre es inválido. No puede contener números.");
            apellido2.disabled = true;
            email.disabled = true;
        } else {
            mostrarError(nombreError, "");
            apellido2.disabled = false;
            
        }
    });

    apellido2.addEventListener("blur", function (event) {
        const apellidoValue = event.target.value;
        datos.apellido2 = apellidoValue;

        if (apellidoValue.trim() === "") {
            mostrarError(apellidoError, "Ingrese un apellido");
            email.disabled = true;
        } else if (!apellidoValue || !/^[a-zA-Z\s]+$/.test(apellidoValue)) {
            mostrarError(apellidoError, "El apellido es inválido. No puede contener números");
            email.disabled = true;
        } else {
            mostrarError(apellidoError, "");
            email.disabled = false;
        }
    });


    email.addEventListener("keyup", function (event) {
        const emailValue = event.target.value;
        datos.email = emailValue;
        
        if (emailValue === "") {
            mostrarError(emailError, "Ingrese un email");
        } else  if (!emailValue || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailValue)) {
            mostrarError(emailError, "El mail debe contener un apodo, seguido por un @, seguido por el dominio.");
        } else  {
            mostrarError(emailError, "");
        }
    });


    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const { nombre2, apellido2, email } = datos;

        if (!nombre2 || !apellido2 || !email) {
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