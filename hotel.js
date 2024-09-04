/**
* @author      Steve Fallet <steve.fallet@divtec.ch>
* @version     1.0
* @since       2018-11-19
*
* http://usejsdoc.org/
*/

"use strict";

/** Eléments HTML globaux **/
const forReservation = document.querySelector("form"); // formulaire
const divMessage = document.getElementById("message"); // div pour message d'erreurs
const divReservation = document.getElementById("reservation"); // div pour confirmation de réservation

/* Elements du formulaire */
const lisHotel = document.getElementById("lis_hotel");
const txtNbChambre = document.getElementById("txt_nbrChambre");
console.log(lisHotel, txtNbChambre);

/* Elements de la confirmation*/
const imgPhotoHotel = document.getElementById("photo");
const h2NomHotel = divReservation.querySelector("h2");
const spanChambreNombre = document.getElementById("chambre_nombre");
const spanChambreType =  document.getElementById("chambre_type");
const ulOptions = document.getElementById("options");


/**
 * Retourne le nom de l'hotel sélectionné par le visiteur
 *
 * @returns {String} Nom de l'hotêl ou "0" si pas de sélection
 */
function getHotel() {
    return lisHotel.value;
}

/**
 * Retourne le nombre de chambres saisi par le visiteur
 *
 * @returns {Number} Nombre de chambres ou NaN (Not A Number)
 */
function getNbChambre() {
    return parseInt(txtNbChambre.value);
}

/**
 * Retourne le type de chambre sélectionné ou ""
 *
 * @returns {String} Type de chambre ou ""
 */

function getChambre() {
    const chambre = forReservation.querySelector('[name="opt_type_chambre"]:checked');

    if (chambre === null) {
        return "";
    }

    return chambre.value;
}

/**
 * Retourne les options choisies par le visiteur
 *
 * @returns {NodeList} tableau des checkbox cochées
 */
function getOptions() {
    return forReservation.querySelectorAll('[name="chk_options[]"]:checked');
}

/**
 * Valide la saisie utilisateur
 *
 * @returns {String}    Chaine vide si pas d'erreur
 *                      Message d'erreur au format HTML
 */
function valideSaisie() {

    let erreurs = "";

    // Test choix hôtel
    if (getHotel() === "0") {
        erreurs += "<li>Choisir un hôtel</li>";
    }

    // Test nombre de chambres
    let nbChambre = getNbChambre();

    if (Number.isNaN(nbChambre) || nbChambre < 1 || nbChambre > 12) {
        erreurs += "<li>Entrer un nombre de chambre, maximum 12</li>";
    }

    // Test type de chambre
    if (getChambre() === "") {
        erreurs += "<li>Choisir un type de chambre</li>";
    }

    return erreurs;
}

/**
 * Affiche la confirmation de réservation
 */
function afficheConfirmation() {

    // Photo hôtel
    imgPhotoHotel.src = "images/" +
      getHotel().toLowerCase() +
      ".jpg";

    // Nom de l'hôtel
    h2NomHotel.innerText = getHotel();

    // Chambre
    spanChambreNombre.innerText = getNbChambre().toString();
    spanChambreType.innerText = getChambre();

    // Liste des options
    ulOptions.innerHTML = ""; // Vide la liste

    for (let option of getOptions()) {
        ulOptions.innerHTML += "<li>" + option.value + "</li>";
    }

    divReservation.style.display = "block";
}

/**
 * Fonction appellé lors de l'envoi du formulaire
 * Test la saisie et affiche la confirmation
 *
 * @param event Objet représentant l'événement
 */
function reserver(event) {
    // Stoppe l'envoi du formulaire
    event.preventDefault();

    // Vide et cache les message d'erreurs
    divMessage.innerHTML = "";
    divMessage.style.display = "none";

    // Valide les saisies du visiteur
    let erreurs = valideSaisie();

    /*
    Si erreur de saisie :
        - crée et affiche les messages d'erreurs
        - cache la réservation
        - sort de la fonction, fin du script
     */
    if (erreurs) {
        divMessage.innerHTML = "<ul>" + erreurs + "</ul>";
        divMessage.style.display = "block";

        divReservation.style.display = "none";

        return;
    }

    // Créer et affiche la confirmation de la réservation
    afficheConfirmation();
}

/** Evénements du formulaire : envoi et réinitialisation **/

forReservation.addEventListener("submit", reserver);

forReservation.addEventListener("reset", function () {
    divMessage.style.display = "none";
    divReservation.style.display = "none";
});
