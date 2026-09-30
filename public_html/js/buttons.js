
/*exporta os assets para CSV*/

function btnExport(){

    const disparaExport = document.getElementById("buttonExport");
    
    disparaExport.addEventListener("click",()=>{
           
    const assets = getAssets();

    let csvContent =
        "Asset ID,Asset Name,Service Tag,Type,Location,Status,User\r\n";

    assets.forEach(asset => {

        csvContent +=
            `${asset.assetId},` +
            `${asset.assetName},` +
            `${asset.serviceTag},` +
            `${asset.type},` +
            `${asset.location},` +
            `${asset.assetStatus},` +
            `${asset.user}\r\n`;

    });

    const encodedUri =
        encodeURI("data:text/csv;charset=utf-8," + csvContent);

    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "assets.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);    

    });
    
}
