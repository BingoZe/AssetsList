async function importCsv(){

    const file =
        document.getElementById("fileInput")
        .files[0];

    if(!file){
        console.log("No file selected");
        return;
    }

    Papa.parse(file, {

        complete: function(results){

            console.log(results.data);

        },

        error: function(error){

            console.log(error);

        }

    });

}

function initCsvImport(){

    const fileInput =
        document.getElementById("fileInput");

    if(!fileInput){
        return;
    }

    fileInput.addEventListener(
        "change",
        importCsv
    );

}
