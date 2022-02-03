// Depuis la page Panier, récupérer le panier (l’array) via localStorage.
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
// Parcourir l’array.
console.table(produitLocalStorage);
const cartItemsPosition = document.getElementById("cart__items");

// Créer et insérer des éléments dans la page Panier pour chaque produit.
function affichagePanier() {
  if (produitLocalStorage === null || produitLocalStorage == 0) {
    const panierVide = `<p>Vous n'avez aucun kanap dans votre panier</p>`;
    cartItemsPosition.innerHTML = panierVide;
  } else {
    let affichageProduits = "";

    produitLocalStorage.forEach(function (produit) {
      affichageProduits += `
        <article class="cart__item" data-id="${produit.idProduit}" data-color="${produit.couleurProduit}">
                <div class="cart__item__img">
                  <img src="${produit.imgProduit}" alt="${produit.altImgProduit}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${produit.nomProduit}</h2>
                    <p>${produit.couleurProduit}</p>
                    <p>${produit.prixProduit} € / unité</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantiteProduit}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
      `;
    });
    cartItemsPosition.innerHTML = affichageProduits;
  }
}
affichagePanier();

// créer la fonction affichant le total quantité et total prix du panier.
function totalPrixQuantite() {
  // création d'un array avec la quantité total par produit
  var qttProduit = document.getElementsByClassName("itemQuantity");
  var qttLength = qttProduit.length,
    totalQtt = 0;

  for (var i = 0; i < qttLength; ++i) {
    totalQtt += qttProduit[i].valueAsNumber;
  }

  let quantiteTotal = document.getElementById("totalQuantity");
  quantiteTotal.innerHTML = totalQtt;
  console.log(totalQtt);

  // somme des prix totaux pour l'ensemble des produits
  let totalPrix = 0;

  for (var i = 0; i < qttLength; i++) {
    totalPrix +=
      qttProduit[i].valueAsNumber * produitLocalStorage[i].prixProduit;
  }

  let prixEnsemble = document.getElementById("totalPrice");
  prixEnsemble.innerHTML = totalPrix;
  console.log(totalPrix);
}
totalPrixQuantite();

// créer la fonction permettant de modifier la quantité d'un objet dans le panier et local storage.
function modifQttAndSave() {
  let selectItemQtt = document.querySelectorAll(".itemQuantity");

  for (let j = 0; j < selectItemQtt.length; j++) {
    selectItemQtt[j].addEventListener("change", (event) => {
      event.preventDefault();

      // modification et rafraichissement de la quantité de produit
      let modifQtt = produitLocalStorage[j].quantiteProduit;
      let valeurModifQtt = selectItemQtt[j].valueAsNumber;
      const findModif = produitLocalStorage.find(
        (el) => el.valeurModifQtt !== modifQtt
      );
      findModif.quantiteProduit = valeurModifQtt;
      produitLocalStorage[j].quantiteProduit = findModif.quantiteProduit;

      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
      // recharge de la ressource depuis l'url actuelle
      location.reload();
    });
  }
}
modifQttAndSave();

// créer la fonction permettant de supprimer un article du panier et du local storage.
function deleteProduct() {
  let btn_supprimer = document.querySelectorAll(".deleteItem");

  for (let k = 0; k < btn_supprimer.length; k++) {
    btn_supprimer[k].addEventListener("click", (event) => {
      event.preventDefault();

      //suppression du produit
      let idDelete = produitLocalStorage[k].idProduit;
      let colorDelete = produitLocalStorage[k].couleurProduit;

      produitLocalStorage = produitLocalStorage.filter(
        (el) => el.idProduit !== idDelete || el.couleurProduit !== colorDelete
      );

      localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

      //Alerte produit supprimé et refresh
      alert("Ce produit a bien été supprimé du panier");
      location.reload();
    });
  }
}
deleteProduct();

//Récupérer et analyser les données saisies par l’utilisateur dans le formulaire
function getForm() {
  // Ajout des Regex
  let form = document.querySelector(".cart__order__form");

  //Création des expressions régulières
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp("[A-Za-z0-9'.-s,]", "g");

  // Ecoute de la modification du prénom
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  // Ecoute de la modification du prénom
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  // Ecoute de la modification du prénom
  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  // Ecoute de la modification du prénom
  form.city.addEventListener("change", function () {
    validCity(this);
  });

  // Ecoute de la modification du prénom
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  //validation du prénom
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "Merci de renseigner votre prénom.";
    }
  };

  //validation du nom
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Merci de renseigner votre nom.";
    }
  };

  //validation de l'adresse
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Merci de renseigner une adresse valide.";
    }
  };

  //validation de la ville
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Merci de renseigner votre ville.";
    }
  };

  //validation de l'email
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Merci de renseigner votre email.";
    }
  };
}
getForm();

//Envoi des informations client au localstorage
function postForm() {
  const btn_commander = document.getElementById("order");

  //Ecouter le panier
  btn_commander.addEventListener("click", (event) => {
    //Récupération des coordonnées du formulaire client
    let inputName = document.getElementById("firstName");
    let inputLastName = document.getElementById("lastName");
    let inputAdress = document.getElementById("address");
    let inputCity = document.getElementById("city");
    let inputMail = document.getElementById("email");

    //Construction d'un array depuis le local storage
    let idProducts = [];
    for (let i = 0; i < produitLocalStorage.length; i++) {
      idProducts.push(produitLocalStorage[i].idProduit);
    }
    console.log(idProducts);

    const order = {
      contact: {
        firstName: inputName.value,
        lastName: inputLastName.value,
        address: inputAdress.value,
        city: inputCity.value,
        email: inputMail.value,
      },
      products: idProducts,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);

        document.location.href = "confirmation.html";
      })
      .catch((err) => {
        alert("Problème avec fetch : " + err.message);
      });
  });
}
postForm();

//correction erreur adresse
var correctionAdresse = document.getElementsByTagName("li");
correctionAdresse[2].innerHTML = `<img
                src="../images/icons/adress.svg"
                alt="logo d'un point de géolocalisation"
                class="informations__address"
              />10 quai de la charente - 75019 Paris 19`;
