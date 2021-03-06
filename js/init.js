const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://nicozucco.github.io/json-mercado/products.json";
const PRODUCT_INFO_URL = "https://nicozucco.github.io/json-mercado/products-info.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const USUARIOS_URL = "https://danielk2020.github.io/biblioteca/usuarios.json"

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      return result;
    });
}

// Funcion de Login

document.addEventListener("DOMContentLoaded", function (e) {

  let userLogged = localStorage.getItem('User-Logged');
  let infouser = document.getElementById("info-user");
  let user = document.getElementById("user");
  let salir = document.getElementById("salir");

  if (userLogged) {
    userLogged = JSON.parse(userLogged);
    user.innerText = userLogged.email;
    infouser.style = 'display: inline-block';
    salir.style = 'display: inline-block';
  }

  if (document.getElementById("salir")) {
    document.getElementById("salir").addEventListener("click", function () {
      localStorage.removeItem('User-Logged');
      window.location = 'index.html';
    })
  }

});