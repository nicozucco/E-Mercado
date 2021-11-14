var CART_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
let porcentajeenvio = 0.15;



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
    <div class="row" id="producto_${i}">
      <div class="col-2 border"><img src='${articles.src}' width=100px></div>
      <div class="col-3 border pt-2">${articles.name}</div>
      <div class="col-2 border pt-2">${articles.currency} ${articles.unitCost}</div>
      <div class="col-2 border pt-2">
      <input style="width:60px;" onchange="calcSubtotal(${precio}, ${i})" type="number" min="1" id="cantidad${i}" value="${articles.count}">
      </div>
      <div class="col-2 border pt-2">
      <span class="subtotal" id="prodSubtotal${i}">${subs}</span>
      </div>
      <div class="col-1 border text-center pt-2"><button type="button" class="btn btn-danger center">X</button></div>
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
    calcEnvio();
};

function calcTotal() {

    let total = 0;
    let subt = document.getElementsByClassName("subtotal");

    for (let i = 0; i < subt.length; i++) {
        total += parseInt(subt[i].innerHTML);
    }

    document.getElementById("total").innerHTML = total;
    document.getElementById("totalsinenvio").innerHTML = total;
};

// Calcular el porcentaje del envio
function cambiarporcentaje(porcentaje){
  porcentajeenvio = porcentaje;
  calcEnvio();
};

// Calcula el envio y el total
function calcEnvio(){
  let totalsinenvio = document.getElementById("totalsinenvio").innerHTML
  let costoenvio = Math.round(parseInt(totalsinenvio * porcentajeenvio));
  document.getElementById("costoenvio").innerHTML = costoenvio;
  document.getElementById("totalconenvio").innerHTML = Math.round(parseInt(totalsinenvio) + costoenvio);
};

// Seleccionar el método de pago
function paymethod(){
  card = document.getElementById("validationPay01");
  bank = document.getElementById("validationPay02");

  if(card.checked){
    document.getElementById("cardnumber").removeAttribute("disabled");
    document.getElementById("cardvalid").removeAttribute("disabled");
    document.getElementById("bankaccount").setAttribute("disabled", "disabled");
  }else if (bank.checked){
    document.getElementById("cardnumber").setAttribute("disabled", "disabled");
    document.getElementById("cardvalid").setAttribute("disabled", "disabled");
    document.getElementById("bankaccount").removeAttribute("disabled");
  }
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cart = resultObj.data.articles;

            showCart(cart);
            calcEnvio();
        }
    })
});

// Validación de Bootstrap
(function() {
    'use strict';
    window.addEventListener('load', function() {
      var forms = document.getElementsByClassName('needs-validation');
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();