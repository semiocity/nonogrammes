let table = document.getElementsByName('table')
let form = document.getElementById('creation_table')
let body = document.body
let y_size = 0
let x_size = 0
let mode_resolution = false

let json_table = {
    nom_du_nonogramme: "",
    data:[]
}
let nonogram_in_page = {}

function isEmpty(object){
    return Object.keys(object).length === 0 && object.constructor === Object
}

function clickedCell(event) {
    event.target.classList.toggle('clicked');
    if (mode_resolution) {
        console.log("Avant appel")
        if (exporterNono()) {
            console.log("gagné!")
        }
    }
}

function displayJSON (object){
    if (document.querySelector('pre')){
        document.querySelector('pre').remove();
    }

    let pre = document.createElement("pre")
    pre.innerText = JSON.stringify(object)
    body.appendChild(pre)

}

async function nonogramPicker() {
    try {
        
        const response = await fetch("http://localhost:8000/picross.json");

        const nonograms = await response.json();
        
        const ul = document.body.appendChild(document.createElement("ul"));

        nonograms.map(nonogram => {
            const li = document.createElement("li");
            li.textContent = nonogram.title;
            li.classList.add("titre_nono")

            // li.addEventListener("click", loadPicross)
            ul.appendChild(li);
        
        })
        /* process your data further */
        document.querySelectorAll('.titre_nono').forEach(item => {
            item.addEventListener('click', ev => {
                nonogram_in_page = nonograms.filter(nonogram => nonogram.title===item.innerText)[0]
                displayJSON (nonogram_in_page)
                createTable(nonogram_in_page)
                console.log(nonogram_in_page)
            }
            )
          })
    
      } catch (error) {
        console.log(error)
      }

}

function tabToJSON() {
    const tbody = document.getElementsByTagName("tbody")[0]
    const tab_array = Array.from(tbody.children);
    json_table = {
        nom_du_nonogramme: form.titre.value,
        data:[]
    }
    tab_array.forEach((row,i) => {
        const row_array = Array.from(row.children)
        json_table.data.push(
            row_array.map(cell => cell.classList.contains("clicked"))
        )
    })
    return json_table
}

function exporterNono () {
    const json_table = tabToJSON()
    rows = []
    columns = []
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

    columns = []
    for (let i=0; i<json_table.data[0].length; i++){
        columns[i] = []
        let cell_on = false
        cell_on_counter = 0
        for (let j=0; j<json_table.data.length; j++){
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
    if (mode_resolution) {
        // console.log("nonogram_in_page :", nonogram_in_page)
        // console.log("rows: ", rows.slice(1))
        // console.log("columns: ", columns.slice(1))
        // console.log("nono_in_page_rows: ", nonogram_in_page.data.rows)
        // console.log("nono_in_page_columns: ", nonogram_in_page.data.columns)
        // if (JSON.stringify(nonogram_in_page.data.rows) === JSON.stringify(rows.slice(1))) {
        //     console.log("Wesh rows")
        // }
        if ((JSON.stringify(nonogram_in_page.data.rows) === JSON.stringify(rows.slice(1))) && (JSON.stringify(nonogram_in_page.data.columns) === JSON.stringify(columns.slice(1)))) {
            return true
        } else {
            return false
        }
    }
    nonogram_in_page["title"] = json_table.nom_du_nonogramme
    nonogram_in_page["data"] = {"rows":rows,"columns":columns}
    nonogram_in_page["size"] = {"rows":json_table.data.length, "columns":json_table.data[0].length}
    displayJSON (nonogram_in_page)
}
  
function createTable(nonogram) {
    if (document.querySelector('table')){
        document.querySelector('table').remove();
    }
    let table = document.createElement("table")
    let tbody = document.createElement("tbody")

    if (!(isEmpty(nonogram))) {
        mode_resolution = true
        y_size = nonogram.size.rows + 1
        x_size = nonogram.size.columns
    } else {
        y_size = form.lignes.value
        x_size = form.colonnes.value
    }
    for (y=0; y<y_size; y++){
        ligne = document.createElement("tr")

        if ((mode_resolution) && y!==0) {
            data = document.createElement("td")
            text = document.createTextNode(JSON.stringify(nonogram.data.rows[y-1]))
            data.appendChild(text)
            ligne.appendChild(data)
        }
        if ((mode_resolution) && y===0) {
            data = document.createElement("td")
            text = document.createTextNode("")
            data.appendChild(text)
            ligne.appendChild(data)
            for (x=0; x<x_size; x++){
                data = document.createElement("td")
                text = document.createTextNode(JSON.stringify(nonogram.data.columns[x]))
                data.appendChild(text)
                ligne.appendChild(data)
            }
    
        } else {
        for (x=0; x<x_size; x++){
            data = document.createElement("td")
            text = document.createTextNode("[**]")
            data.appendChild(text)
            ligne.appendChild(data)
        }}
        tbody.appendChild(ligne)
    }

    table.appendChild(tbody)
    body.appendChild(table)
    const cellules = document.querySelectorAll("td")
    cellules.forEach(cell => {
        cell.addEventListener("click", clickedCell)
    })
}

function createNewTable() {
    nonogram_in_page = {}
    createTable({})
}

function init () {
    const bouton_afficher = document.getElementById("afficher")
    bouton_afficher.addEventListener('click', createNewTable)
    // const bouton_convertir = document.getElementById("convertir")
    // bouton_convertir.addEventListener('click', tabToJSON)
    const bouton_convertir2 = document.getElementById("convertir2")
    bouton_convertir2.addEventListener('click', exporterNono)
    nonogramPicker()
    

}
window.addEventListener("load", init)