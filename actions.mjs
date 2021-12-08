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
}

function displayJSON (object){
    if (document.querySelector('pre')){
        document.querySelector('pre').remove();
    }

    console.log(object)
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
                console.log("item.innerText: ", item.innerText)
                console.log("nonograms: ", nonograms)
                console.log("Test correspondance: ", nonograms[0].title===item.innerText)


                console.log(nonogram_in_page)
                displayJSON (nonogram_in_page)
                createTable(nonogram_in_page)
            }
            )
          })
    
      } catch (error) {
        console.log(error)
      }

}

// function loadNonogram () {
//     nonogram = 
// }

// async function nonogramPicker() {
//     await displayAvailableNonograms()
//     document.querySelectorAll('.titre_nono').forEach(item => {
//         item.addEventListener('click',
//           loadNonogram
//         )
//       })
 
// }

function tabToJSON() {
    const tbody = document.getElementsByTagName("tbody")[0]
    const tab_array = Array.from(tbody.children);
    console.log("tabarray: ", tab_array);
    json_table = {
        nom_du_nonogramme: form.titre.value,
        data:[]
    }
    tab_array.forEach((row,i) => {
        const row_array = Array.from(row.children)
        console.log('row_array:', row_array)
        json_table.data.push(
            row_array.map(cell => cell.classList.contains("clicked"))
        )
    })
    console.log("JSON: ", json_table);
    return json_table
}

function exporterNono () {
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
    console.log("Column tips: ", columns)
    nonogram_in_page["title"] = json_table.nom_du_nonogramme
    nonogram_in_page["data"] = {"rows":rows,"columns":columns}
    nonogram_in_page["size"] = {"rows":json_table.data.length, "columns":json_table.data[0].length}
    console.log("nonogramme: ", nonogram_in_page)
    displayJSON (nonogram_in_page)
}
  
function createTable(nonogram) {
    if (document.querySelector('table')){
        document.querySelector('table').remove();
    }
    console.log(form.lignes.value)
    let table = document.createElement("table")
    let tbody = document.createElement("tbody")
    console.log(nonogram)

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
        console.log(cell)
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