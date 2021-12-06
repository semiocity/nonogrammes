let table = document.getElementsByName('table')

// function getValuesAndMultiply() {
//     // valeur_gauche = document.getElementsByName("gauche")[0].value;
//     // valeur_droite = document.getElementsByName("droite")[0].value;
//     // champ_produit = document.getElementsByName("produit")[0]
//     // console.log(valeur_gauche)
//     // console.log(valeur_droite)

//     // const produit = valeur_droite * valeur_gauche
//     // champ_produit.value = produit;
//     console.log(form)
//     form.produit.value = form.gauche.value * form.droite.value
// }

function clickedCell(event) {
    console.log("3")
    event.target.classList.toggle('clicked');
}

function init () {
    console.log("1")
    const cellules = document.querySelectorAll("td")
    console.log("2")
    cellules.forEach(cell => {
        console.log(cell)
        cell.addEventListener("click", clickedCell)
    })
}
window.addEventListener("load", init)