let table = document.getElementsByName('table')
let form = document.getElementById('creation_table')
let body = document.body

function clickedCell(event) {
    event.target.classList.toggle('clicked');
}

function createTable() {
    if (document.querySelector('table')){
        document.querySelector('table').remove();
    }
    console.log(form.lignes.value)
    let table = document.createElement("table")
    let tbody = document.createElement("tbody")
    for (x=0; x<form.lignes.value; x++){
        ligne = document.createElement("tr")
        for (y=0; y<form.colonnes.value; y++){
            data = document.createElement("td")
            text = document.createTextNode("blabla")
            data.appendChild(text)
            ligne.appendChild(data)
        }
        tbody.appendChild(ligne)
    }

    table.appendChild(tbody)
    body.appendChild(table)
    const cellules = document.querySelectorAll("td")
    cellules.forEach(cell => {
        console.log(cell)
        cell.addEventListener("click", clickedCell)
    })

}



function init () {
    const bouton_afficher = document.getElementById("afficher")
    bouton_afficher.addEventListener('click', createTable)

}
window.addEventListener("load", init)