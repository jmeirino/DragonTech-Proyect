//Capturar formulario
window.addEventListener ('DOMContentLoaded', function () {
    document.querySelector("form").addEventListener('submit', validarFormulario); 
});

function validarFormulario(event) {
    event.preventDefault();

    const campoNombre = document.querySelector('input.nombre');
    const campoApellido = document.querySelector('input.apellido');
    //const campoFechaNacimiento = document.querySelector('input.fechaNacimiento');
    const campoTelefono = document.querySelector('input.telefono');
    const campoEmail = document.querySelector('input.email');
    const campoPassword = document.querySelector('input.password');
    const submitButton = document.querySelector('button');

    
    let error = false;
    campoEmail.classList.remove('error');
    campoNombre.classList.remove('error');
    campoApellido.classList.remove('error');
    //campoFechaNacimiento.classList.remove('error');
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
    //if(!validateFecha(campoFechaNacimiento.value.trim())){
        //error = true;
        //campoFechaNacimiento.classList.add('error');
    //}
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

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
   dd = '0' + dd;
}

if (mm < 10) {
   mm = '0' + mm;
} 
    
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("datefield").setAttribute("max", today);



//funcion validar fecha
//function validateFecha(fechaNacimiento) {
    //if (fechaNacimiento && fechaNacimiento.match && /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(fechaNacimiento)){
        //return true;
    //} else {
        //return false;
    //}
//}