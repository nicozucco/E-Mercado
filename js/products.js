var autosArray = [];

var minPrice;
var maxPrice;

function showAutos(array) {

    let contenido = "<br><hr><br>";
    for (let i = 0; i < array.length; i++) {
        let auto = array[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(auto.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(auto.cost) <= maxPrice))) {

            contenido += 'Producto: ' + auto.name + '<br>';
            contenido += 'Precio: ' + auto.currency + ' ' + auto.cost + '<br>';
            contenido += 'Descripción: ' + auto.description + '<br>';
            contenido += '<div class="autoimagen"><img src=' + auto.imgSrc + '></div><br>';
            contenido += 'Vendidos: ' + auto.soldCount + '<br>';
            contenido += '<br><hr><br>';
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