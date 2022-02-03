// identifer l'id du produit grace au href et à l'url
var str = window.location.href;
var url = new URL(str);
var idProduit = url.searchParams.get("id");
console.log(idProduit);
let product = "";

infoDuProduit();

// charger seulement les informations du produit correspondant à l'id
function infoDuProduit() {
  fetch("http://localhost:3000/api/products/" + idProduit)
    .then((res) => {
      return res.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (resultatAPI) {
      product = await resultatAPI;
      console.table(product);
      if (product) {
        ficheDuProduit(product);
      }
    })
    .catch((error) => {
      console.log("Erreur de la requête API");
    });
}

// création de la fiche produit et récupération des infos
function ficheDuProduit(product) {
  document.querySelector(
    ".item__img"
  ).innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.getElementById("title").innerHTML += product.name;
  document.getElementById("price").innerHTML += product.price;
  document.getElementById("description").innerHTML += product.description;
  //couleur du kanap
  product.colors.forEach((color) => {
    let choixCouleur = `<option value="${color}">${color}</option>`;
    document.getElementById("colors").innerHTML += choixCouleur;
  });
  addToCart(product);
}

//Gestion du panier
const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");
function addToCart(article) {
  const btn_envoyerPanier = document.querySelector("#addToCart");

  //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
  btn_envoyerPanier.addEventListener("click", (event) => {
    if (
      quantityPicked.value > 0 && //quantité supérieur à zéro kanap
      quantityPicked.value <= 100 && // quantité inférieur à 100 kanap
      colorPicked.value != "" // au moins une couleur de choisit
    ) {
      //Recupération du choix de la couleur
      let choixCouleur = colorPicked.value;

      //Recupération du choix de la quantité
      let choixQuantite = quantityPicked.value;

      //Récupération des options de l'article à ajouter au panier
      let optionsProduit = {
        idProduit: idProduit,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt,
      };

      //Initialisation du local storage
      let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

      //fenêtre pop-up
      const popupConfirmation = () => {
        if (
          window.confirm(`Votre commande de ${choixQuantite} ${article.name} de couleur ${choixCouleur} est ajoutée au panier
Consulter votre panier en cliquant sur le bouton OK`)
        ) {
          window.location.href = "cart.html";
        }
      };

      //Importation dans le local storage
      //Si le panier comporte déjà au moins 1 article
      if (produitLocalStorage) {
        const resultFind = produitLocalStorage.find(
          (el) =>
            el.idProduit === idProduit && el.couleurProduit === choixCouleur
        );
        //Si le produit commandé est déjà dans le panier
        if (resultFind) {
          let newQuantite =
            parseInt(optionsProduit.quantiteProduit) +
            parseInt(resultFind.quantiteProduit);
          resultFind.quantiteProduit = newQuantite;
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
          popupConfirmation();
          //Si le produit commandé n'est pas dans le panier
        } else {
          produitLocalStorage.push(optionsProduit);
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
          popupConfirmation();
        }
        //Si le panier est vide
      } else {
        produitLocalStorage = [];
        produitLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        popupConfirmation();
      }
    }
  });
}

//correction erreur adresse
var correctionAdresse = document.getElementsByTagName("li");
correctionAdresse[2].innerHTML = `<img
                src="../images/icons/adress.svg"
                alt="logo d'un point de géolocalisation"
                class="informations__address"
              />10 quai de la charente - 75019 Paris 19`;
