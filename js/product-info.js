var auto;
var autosarray = [];
var INFO_URL = "https://nicozucco.github.io/json-mercado/" + JSON.parse(localStorage.getItem('auto')).autoId + ".json"

// Muestra los detalles de un producto en específico
function showAuto(car) {

  let details = "";
  let imgs = "";

  details += `
                <h2> ${car.name} </h2>
                ${car.description} <br><br>
                <b>Precio:</b>
                ${car.currency} ${car.cost} <br>
                <b>Vendidos:</b>
                ${car.soldCount} <br>
                <b>Categoría:</b>
                ${car.category} <br>
                `;

  imgs += `
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="img/prod${car.id}_1.jpg" class="d-block w-50 mx-auto" alt="...">
    </div>
    <div class="carousel-item">
      <img src="img/prod${car.id}_2.jpg" class="d-block w-50 mx-auto" alt="...">
    </div>
    <div class="carousel-item">
      <img src="img/prod${car.id}_3.jpg" class="d-block w-50 mx-auto" alt="...">
    </div>
    <div class="carousel-item">
      <img src="img/prod${car.id}_4.jpg" class="d-block w-50 mx-auto" alt="...">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
`;

  document.getElementById("detalles").innerHTML = details;
  document.getElementById("imagenes").innerHTML = imgs;
}

// Funcion para cargar comentarios
var comentario

function loadComments(comentario) {
  let comments = "";

  comments += `
                <div class="row">
                <div class="col-3 mb-2"><b>Usuario:</b>${comentario.user}</div>
                <div class="col-3 mb-2">${comentario.dateTime}</div>
                </div>
                <div class="row">
                <div class="col-8 mb-2">${comentario.description}</div>
                </div>
                <div class="row">
                <div class="col-4"><b>Calificación:</b>
                `
    + showRating(comentario.score) +
    `
                </div>
                </div>
                <hr>
                `;
  document.getElementById("comments").innerHTML += comments;
};

// Mostrar Estrellitas
function showRating(score) {
  starsRating = "";

  for (y = 0; y < score; y++) {
    starsRating += `<i class="fa fa-star checked"></i>`
  }
  for (x = 0; x < (5 - score); x++) {
    starsRating += `<i class="fa fa-star"></i>`
  }

  return starsRating;
}

// Productos relacionados
function loadRelated(arraylistado, arrayrelacionado) {
  let contenido = '<div class="row">';

  arrayrelacionado.forEach(function (indice) {
    contenido += `
<div class="col-sm-4">
    <a href="javascript:showDetails(${[indice + 1]})">
      <div class="card" style="width: 18rem;">
        <img src="${arraylistado[indice].imgSrc}" class="card-img-top" alt="...">
    </a>
    <div class="card-body">
      <p class="card-text">${arraylistado[indice].name}</p>
    </div>
  </div>
</div>
`
  });

  document.getElementById("related").innerHTML = contenido
}


// Add Event Listener Encadenados
document.addEventListener("DOMContentLoaded", function (e) {
  // Llamado a la función según el auto que sea para INFO_URL
  getJSONData(INFO_URL).then(function (result) {
    if (result.status === "ok") {
      auto = result.data;
      showAuto(auto);
    }
    // Llamado a la función de comentarios
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
      if (result.status === "ok") {
        result.data.forEach(comentario => {
          loadComments(comentario);
        });
      }
      // Llamado a la función de productos relacionados
      getJSONData(PRODUCTS_URL).then(function (result) {
        if (result.status === "ok") {
          autosarray = result.data;
          loadRelated(autosarray, auto.relatedProducts);
        }
      });
    });
  });
});
