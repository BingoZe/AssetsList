let yolo = [];

async function loadCsv() {

    const read = document.getElementById("read");
    console.log("Clicado");
    if (!read) {
        return;
    }

    read.addEventListener("click", () => {

        const file = document
            .getElementById("fileInput")
            .files[0];

        if (!file) {
            console.log("No file selected");
            return;
        }
        
        
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,

            complete(results) {
                console.table(results.data);
                yolo = results.data;
            },

            error(error) {
                console.log(error);
            }
        });

    });

}

function mostrarRows() {

    const mostrar = document.getElementById("mostrar");
console.log("CARREGADO");
    mostrar.addEventListener("click", () => {
        console.log("CARREGADO");
        let output = "";

        yolo.forEach(row => {

            output += `
            
            
                <tr>
                    <td>${row["Asset ID"]}</td>
                    <td>${row["Service Tag"]}</td>
                    <td>${row["Asset Name"]}</td>
                    <td>${row["UserId"]}</td>
                    <td>${row["UserId_1"]}</td>
                </tr>
            `;

        });

        console.table(output);

    });

}
