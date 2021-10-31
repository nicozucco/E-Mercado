// Función que toma los valores de los input y lo guarda en un objeto
function saveUserData() {
    var userName = document.getElementById("inputUsername").value
    var userSurname = document.getElementById("inputSurname").value
    var userAge = document.getElementById("inputAge").value
    var userPhone = document.getElementById("inputPhone").value
    var userMail = document.getElementById("inputMail").value

    var userData = {
        name: userName,
        surname: userSurname,
        age: userAge,
        phone: userPhone,
        mail: userMail
    }

    let datos = JSON.stringify(userData);
    localStorage.setItem('userData', datos);

    loadUserData();
}

// Función que toma el objeto userData y lo carga en el perfil
function loadUserData() {

    let data = JSON.parse(localStorage.getItem('userData'))

    let nombre = ""
    nombre += data.name
    document.getElementById("Username").innerHTML = nombre

    let apellido = ""
    apellido += data.surname
    document.getElementById("Surname").innerHTML = apellido

    let edad = ""
    edad += data.age
    document.getElementById("Age").innerHTML = edad

    let telefono = ""
    telefono += data.phone
    document.getElementById("Phone").innerHTML = telefono

    let correo = ""
    correo += data.mail
    document.getElementById("Mail").innerHTML = correo
}

// Al apretar el botón guarda los datos
document.getElementById("saveprofile").addEventListener("click", function () {
    saveUserData();
});



document.addEventListener("DOMContentLoaded", function (e) {
    if (localStorage.getItem('userData') != null) {
        loadUserData();
    }
});