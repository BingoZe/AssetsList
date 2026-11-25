let yolo = [];

async function loadCsv() {

    const importFile = document.getElementById("importFile");
    
    if (!importFile) {
        return;
    }

    importFile.addEventListener("click", () => {

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

async function getTemplate() {

    const downloadTemplate = document.getElementById("downloadTemplate");
    
    if (!downloadTemplate) {
        return;
    }

    downloadTemplate.addEventListener("click", () => {
        
        const link =
            document.createElement("a");

        link.href = "https://shorturl.at/fN41v";

        link.download = "template";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        

    });

}

async function getInstructions() {

    const downloadInstructions = document.getElementById("downloadInstructions");
    
    if (!downloadInstructions) {
        return;
    }

    downloadInstructions.addEventListener("click", () => {
        
        const link =
            document.createElement("a");

        link.href = "https://shorturl.at/1Ghxr";

        link.download = "instructions";
        link.target = "_blank";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        

    });

}

