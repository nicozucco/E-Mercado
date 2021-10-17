var CART_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json"

function showCart(array) {

    let contenido = "";

    for (let i = 0; i < array.length; i++) {

        let articles = array[i];

        let moneda = articles.currency;
        let precio = articles.unitCost;
        if (moneda == "USD") {
            precio = precio * 40
        }

        let subs = (precio * articles.count)

        contenido += `
    <div class="row">
      <div class="col-2 border"><img src='${articles.src}' width=100px></div>
      <div class="col-3 border">${articles.name}</div>
      <div class="col-2 border">${articles.currency} ${articles.unitCost}</div>
      <div class="col-2 border">
      <input style="width:60px;" onchange="calcSubtotal(${precio}, ${i})" type="number" min="1" id="cantidad${i}" value="${articles.count}">
      </div>
      <div class="col-2 border">
      <span class="subtotal" id="prodSubtotal${i}">${subs}</span>
      </div>
      <div class="col-1 border"><button type="button" class="btn btn-danger">Eliminar</button></div>
    </div>
`
        document.getElementById("carrito").innerHTML = contenido;
    }
    calcTotal();
};

function calcSubtotal(costo, i) {

    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    subtotal = (costo * cantidad)

    document.getElementById(`prodSubtotal${i}`).innerHTML = subtotal;

    calcTotal();
};

function calcTotal() {

    let total = 0;
    let subt = document.getElementsByClassName("subtotal");

    for (let i = 0; i < subt.length; i++) {
        total += parseInt(subt[i].innerHTML);
    }

    document.getElementById("total").innerHTML = total;
};


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cart = resultObj.data.articles;

            showCart(cart);
        }
    })

});