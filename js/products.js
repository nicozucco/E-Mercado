//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const products_url = "https://nicozucco.github.io/listado/listado.json";

document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("data").innerHTML = "";

    fetch(products_url)

        .then(respuesta => respuesta.json())

        .then(datos => {

            datos.forEach(datos => {

                let row = "";
                row = `
                <tr>
                    <td> ` + datos.nombre + ` </td>
                    <td> ` + datos.descripcion + ` </td>
                    <td> ` + datos.categoria + `</td>
                    <td> ` + datos.precio + `</td>
                    <td> ` + datos.fotos + `</td>
                    <td> ` + datos.codigo + `</td>
                </tr>
                `;

                document.getElementById("data").innerHTML += row;
            });
        })

        .catch(error => alert("Hubo un error: " + error));

});