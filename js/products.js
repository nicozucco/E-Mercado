var autosArray = [];

function showAutos(array){

  let contenido = "<br><hr><br>";
  for (let i = 0; i < array.length; i++){
    let auto = array[i];

    contenido += 'Producto: ' + auto.name + '<br>';
    contenido += 'Precio: ' + auto.currency +' '+ auto.cost + '<br>';
    contenido += 'Descripción: ' + auto.description + '<br>';
    contenido += '<div class="autoimagen"><img src=' + auto.imgSrc + '></div><br>';
    contenido += '<br><hr><br>'
  }
  document.getElementById("productos").innerHTML = contenido;
}

document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(PRODUCTS_URL).then(function (resultado) {
    if (resultado.status === "ok"){
      autosArray = resultado.data;

      showAutos(autosArray);
    }
  });
});