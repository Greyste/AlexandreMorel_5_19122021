function main() {
  const idNode = document.getElementById("orderId");
  idNode.innerText = localStorage.getItem("orderId");
  console.log(localStorage.getItem("orderId"));
  localStorage.clear();
}

main();

//correction erreur adresse
var correctionAdresse = document.getElementsByTagName("li");
correctionAdresse[2].innerHTML = `<img
                src="../images/icons/adress.svg"
                alt="logo d'un point de géolocalisation"
                class="informations__address"
              />10 quai de la charente - 75019 Paris 19`;
