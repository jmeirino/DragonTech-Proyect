//Login Validations Capturar formulario
window.addEventListener ('DOMContentLoaded', function () {
    document.querySelector("form").addEventListener('submit', validarFormulario); 
});

function validarFormulario(event) {
    event.preventDefault();

    const campoEmail = document.querySelector('input.email');
    const campoPassword = document.querySelector('input.password');
    const submitButton = document.querySelector('button');

    const emailValido = validateEmail(campoEmail.value.trim());

    if ( !emailValido|| campoPassword.value.trim().length < 5) {
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