var autosArray = [];

var minPrice;
var maxPrice;

// El botón que lleva al articulo especifico
function showDetails(id){
    localStorage.setItem('auto', JSON.stringify({autoId: id}));
    window.location = 'product-info.html';
}

// Funcion para mostrar los autos
function showAutos(array) {

    let contenido = "";
    for (let i = 0; i < array.length; i++) {
        let auto = array[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(auto.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(auto.cost) <= maxPrice))) {

            contenido +=`
            <div class="card col-sm-6 col-md-4 col-lg-3 col-xl-2 bg-light rounded mb-3 ml-1">
            <a onclick="showDetails(${auto.id})" class="my-3 shadow-sm custom-card">
              <img class="bd-placeholder-img card-img-top"
                src="${auto.imgSrc}">
            </a>
            <h3 class="m-3">${auto.name}</h3>
            <div class="card-body">
              <p class="card-text">${auto.description}
                <br>
                ${auto.currency} ${auto.cost}
              </p>
                <small class="text-muted">${auto.soldCount} vendidos</small>
            </div>
          </div>
            `       
        }
    }
    document.getElementById("productos").innerHTML = contenido;
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultado) {
        if (resultado.status === "ok") {
            autosArray = resultado.data;

            showAutos(autosArray);
        }
    });

    // Filtrar por rango de precios (botón filtrar)
    document.getElementById("filter").addEventListener("click", function () {

        minPrice = document.getElementById("priceMin").value;
        maxPrice = document.getElementById("priceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        } else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        } else {
            maxPrice = undefined;
        }

        showAutos(autosArray);
    })

    // Filtrar por rango de precios (botón limpiar)
    document.getElementById("clean").addEventListener("click", function () {
        document.getElementById("priceMin").value = "";
        document.getElementById("priceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showAutos(autosArray);
    })


    // Ordenar Descendente por precio
    document.getElementById("sortDes").addEventListener("click", function () {
        autosArray = autosArray.sort((a, b) => {
            if (a.cost < b.cost) { return 1 }
            if (a.cost > b.cost) { return -1 }
            return 0
        });

        showAutos(autosArray);
    })

    // Ordenar Ascendente por precio (lo mismo con los <> cambiados)
    document.getElementById("sortAsc").addEventListener("click", function () {
        autosArray = autosArray.sort((a, b) => {
            if (a.cost > b.cost) { return 1 }
            if (a.cost < b.cost) { return -1 }
            return 0
        });

        showAutos(autosArray);
    })

    //   Ordenar Descendente por relevancia
    document.getElementById("relevance").addEventListener("click", function () {
        autosArray = autosArray.sort((a, b) => {
            if (a.soldCount < b.soldCount) { return 1 }
            if (a.soldCount > b.soldCount) { return -1 }
            return 0
        });

        showAutos(autosArray)
    })
});