let url = "http://localhost:3000/api/products/";

(function () {
  const ficheProduit = document.getElementById("items");

  async function chargeEtAfficheProduits() {
    //promise
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const products = await response.json();
    console.log(products);
    let affichageProduits = "";

    products.forEach(function (product) {
      //creation html card produit à afficher
      affichageProduits += `
            <a href="./product.html?id=${product._id}">
              <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
            </a>
          `;
    });
    //modification du html de l'element items, intégration de la fiche produit avec info recuperer
    ficheProduit.innerHTML = affichageProduits;
  }

  chargeEtAfficheProduits();
})();

//correction erreur adresse
var correctionAdresse = document.getElementsByTagName("li");
correctionAdresse[2].innerHTML = `<img
                src="../images/icons/adress.svg"
                alt="logo d'un point de géolocalisation"
                class="informations__address"
              />10 quai de la charente - 75019 Paris 19`;
