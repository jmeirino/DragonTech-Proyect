//Capturar formulario
window.addEventListener ('DOMContentLoaded', function () {
    document.querySelector("form").addEventListener('submit', validarFormulario); 
});

function validarFormulario(event) {
    event.preventDefault();

    const campoNombre = document.querySelector('input.nombre');
    const campoApellido = document.querySelector('input#apellido');
    const campoFechaNacimiento = document.querySelector('input.fechaNacimiento');
    const campoTelefono = document.querySelector('input.telefono');
    const campoEmail = document.querySelector('input.email');
    const campoPassword = document.querySelector('input.password');
    const submitButton = document.querySelector('button');

    
    let error = false;
    campoEmail.classList.remove('error');
    campoNombre.classList.remove('error');
    campoApellido.classList.remove('error');
    campoTelefono.classList.remove('error');
    campoPassword.classList.remove('error');
    
    if (!validateEmail(campoEmail.value.trim())) {
        error = true;
        campoEmail.classList.add('error');
    } 
    if(campoNombre.value.trim().length < 2){
        error = true;
        campoNombre.classList.add('error');
    } 
    if(campoApellido.value.trim().length < 2){
        error = true;
        campoApellido.classList.add('error');
    }
    if (campoTelefono.value.trim().length < 8){
        error = true;
        campoTelefono.classList.add('error');
    }
    if (campoPassword.value.trim().length < 5){
        error = true;
        campoPassword.classList.add('error');
    }

    if(error){
        submitButton.disabled = true;
    }
    else {
        submitButton.disabled = false;
        this.submit();
    }

};

//funcion validar email
function validateEmail(email) {
    if (email && email.length >= 5 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true;
    }

    alert("Introduzca una dirección de mail válida")
    return false;
}