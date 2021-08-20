var usersArray = [];

// ESTO NO ES REAL, LO USO POR FALTA DE SERVIDOR
function validateUser(array, userIn, passwordIn) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].email == userIn && array[i].password == passwordIn) {
            return true;
        }
    }
    return false;
}

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("submitButton").addEventListener("click", function () {

        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;

        if (inputEmail.value === '') {
            inputEmail.classList.add("invalid");
            camposCompletos = false;
        } else {
            inputEmail.classList.remove("invalid");
        }

        if (inputPassword.value === '') {
            inputPassword.classList.add("invalid");
            camposCompletos = false;
        } else {
            inputPassword.classList.remove("invalid");
        }

        if (camposCompletos) {
            getJSONData(USUARIOS_URL).then(function (resultado) {
                if (resultado.status === "ok") {
                    usersArray = resultado.data;

                    if (validateUser(usersArray, inputEmail.value, inputPassword.value)) {
                        window.location = 'inicio.html';
                    } else {
                        alert("Usuario o contraseña incorrectas");
                    }
                }
            });
        } else {
            alert("Debe ingresar ambos campos")
        }
    });
});