let table = document.getElementsByName('table')
let form = document.getElementById('creation_table')
let body = document.body
let json_table = {
    nom_du_nonogramme: "",
    data:[]
}
let nonogramme = {}
function clickedCell(event) {
    event.target.classList.toggle('clicked');
}



function tabToJSON() {
    const tbody = document.getElementsByTagName("tbody")[0]
    const tab_array = Array.from(tbody.children);
    console.log("tabarray: ", tab_array);
    json_table = {
        nom_du_nonogramme: form.titre.value,
        data:[]
    }
    tab_array.forEach((row,i) => {
        // json_line = {}
        // json_table[i] = {}
        const row_array = Array.from(row.children)
        console.log('row_array:', row_array)
        json_table.data.push(
            row_array.map(cell => cell.classList.contains("clicked"))
        )
        // row_array.forEach((cell, j) => {
        //     json_table[i][j]=cell.classList.contains("clicked")
        // })
    })
    console.log("JSON: ", json_table);
    return json_table
}

function JSONtoTips () {
    const json_table = tabToJSON()
    rows = []
    columns = []
    console.log("json table: ", json_table)
    for (let i=0; i<json_table.data.length; i++){
        rows[i] = []
        columns[i] = []

        let cell_on = false
        cell_on_counter = 0
        for (let j=0; j<json_table.data[0].length; j++){
            cell_on = json_table.data[i][j] 
            if (cell_on) {
                cell_on_counter++
                if (j===json_table.data[0].length-1) {
                    rows[i].push(cell_on_counter)
                    columns[i].push(cell_on_counter)

                }
            }
            else {
                if (cell_on_counter!==0) {
                    if (j===json_table.data[0].length-1) {
                        rows[i].push(cell_on_counter)
                        columns[i].push(cell_on_counter)

                    }
                else {
                    columns[i].push(cell_on_counter)
                    rows[i].push(cell_on_counter)
                    cell_on_counter = 0
                }
                }
            }
        }
    }
    console.log("Rows tips: ", rows)

    columns = []
    for (let i=0; i<json_table.data.length; i++){
        columns[i] = []
        let cell_on = false
        cell_on_counter = 0
        for (let j=0; j<json_table.data[0].length; j++){
            cell_on = json_table.data[j][i] 
            if (cell_on) {
                cell_on_counter++
                if (j===json_table.data[0].length-1) {
                    columns[i].push(cell_on_counter)
                }
            }
            else {
                if (cell_on_counter!==0) {
                    if (j===json_table.data[0].length-1) {
                        columns[i].push(cell_on_counter)
                    }
                else {
                    columns[i].push(cell_on_counter)
                    cell_on_counter = 0
                }
                }
            }
        }
    }
    console.log("Column tips: ", columns)
    nonogramme["rows"]=rows
    nonogramme["columns"]=columns
    nonogramme["nom"]=json_table.nom_du_nonogramme
    console.log("nonogramme: ", nonogramme)
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
            text = document.createTextNode("[**]")
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
    bouton_convertir.addEventListener('click', tabToJSON)
    const bouton_convertir2 = document.getElementById("convertir2")
    bouton_convertir2.addEventListener('click', JSONtoTips)

}
window.addEventListener("load", init)