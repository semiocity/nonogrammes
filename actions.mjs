let table = document.getElementsByName('table')
let form = document.getElementById('creation_table')
let body = document.body

function clickedCell(event) {
    event.target.classList.toggle('clicked');
}


function tabToJSON() {
    const tbody = document.getElementsByTagName("tbody")[0]
    const tab_array = Array.from(tbody.children);
    console.log("tabarray: ", tab_array);
    json_table = {}
    tab_array.forEach((row,i) => {
        // json_line = {}
        json_table[i] = {}
        const row_array = Array.from(row.children)
        console.log('row_array:', row_array)
        
        row_array.forEach((cell, j) => {
            json_table[i][j]=cell.classList.contains("clicked")
        })
    })
    console.log("JSON: ", json_table);
}



//     json_table = tabAray.reduce ((json_nono, tr, i) => {
//         let row_key = i
//         let row_value = Array.from(tr).reduce ((json_line, td,j) => {
//             let td_key = j
//             let td_value = (td.classList.includes("clicked"))
//             return ({td_key:td_value})
//         }
//         , {} )
//         return({row_key: row_value})

//         }
//         , {}
//     )
//     console.log(json_table)
// }
  
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
    const bouton_convertir = document.getElementById("convertir")
    bouton_convertir.addEventListener('click', () => {let nono = tabToJSON()})

}
window.addEventListener("load", init)