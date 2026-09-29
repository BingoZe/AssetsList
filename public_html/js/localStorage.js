   
/*localstorage*/


/*
 -------------
 HELPERS
 -------------
    */


function getAssets(){
    if(!localStorage.getItem("assets")){
        return;
    } else
        return JSON.parse(localStorage.getItem("assets")) || [];

}

function saveAssets(assets){
    return localStorage.setItem("assets", JSON.stringify(assets));
}



/* -------------implemantacao do CRUD-------------*/


/*
 -------------
 CREATE
 -------------
    */

/*initAssetForm retorna os assets em tela - AssetRegister*/

function initAssetForm(){
    const assetForm = document.querySelector(".asset-form");
    
    if(!assetForm){
        return;
    }
    
    
    assetForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    
    
    const randomAssetNumber = Math.floor(Math.random() * 1000);
    const assetId = `AST${randomAssetNumber.toString().padStart(3, "0")}`;        
            
    
    
    const assetName = document.getElementById("assetName").value;
    const serviceTag = document.getElementById("serviceTag").value;
    const model = document.getElementById("model").value;
    const type = document.getElementById("type").value;
    const assetStatus = document.getElementById("assetStatus").value;
    const user = document.getElementById("user").value;
    const userEmail = document.getElementById("userEmail").value;
    const location = document.getElementById("location").value;
    const notes = document.getElementById("notes").value;
    const warrantyDetails = document.getElementById("warrantyDetails").value;
    const warrantyExpiryDate = document.getElementById("warrantyExpiryDate").value;
    const warrantyDocs = document.getElementById("warrantyDocs").value;
    const acquisitionDate = document.getElementById("acquisitionDate").value;
    const acquisitionvalue = document.getElementById("acquisitionvalue").value;
    const usefulLife = document.getElementById("usefulLife").value;
    const depreciation = document.getElementById("depreciation").value;
    const netValue = document.getElementById("netValue").value;
    const purchaseInvoice = document.getElementById("purchaseInvoice").value;
    const issueDescription = document.getElementById("issueDescription").value;
    const issueDate = document.getElementById("issueDate").value;
    const supportTicketNumber = document.getElementById("supportTicketNumber").value;
    const repairCost = document.getElementById("repairCost").value;
    const repairInvoice = document.getElementById("repairInvoice").value;
    const technicianNotes = document.getElementById("technicianNotes").value;    
    
    const asset = {
    assetId,
    assetName,
    serviceTag,
    model,
    type,
    assetStatus,
    user,
    userEmail,
    location,
    notes,
    warrantyDetails,
    warrantyExpiryDate,
    warrantyDocs,
    acquisitionDate,
    acquisitionvalue,
    usefulLife,
    depreciation,
    netValue,
    purchaseInvoice,
    issueDescription,
    issueDate,
    supportTicketNumber,
    repairCost,
    repairInvoice,
    technicianNotes
};

    const assets = getAssets();

    assets.push(asset);

    saveAssets(assets);
    
    assetForm.reset();

    alert("Record saved");
    
    renderAssets();
    
    });
}



/*
 -------------
 READ
 -------------
    */
   
/* renderAssets representa READ apenas para table no Add asset*/

function renderAssets(){
        
    const assets = getAssets();
    let output = "";
    assets.forEach((asset) => {
        output += `
        <tr>
            <td>${asset.assetId}</td>
            <td>${asset.assetName}</td>
            <td>${asset.serviceTag}</td>
            <td>${asset.type}</td>
            <td>${asset.location}</td>
            <td>${asset.status}</td>
            <td>${asset.user}</td>
            <td>
                <button class="btTdItemView" onclick="viewAsset('${asset.assetId}','view')">View</button>
                <button class="btTdItemEdit" onclick="viewAsset('${asset.assetId}','edit')">Edit</button>
                <button class="btTdItemDelete" onclick="deleteAsset('${asset.assetId}')">Delete</button>
            </td>
                    
        </tr>
        `;
    });
    
    console.log(document.getElementById("tableBody"));
    
    document.querySelector(".tableBody").innerHTML = output;
};

/*renderViewAsset - Exibe apenas no View*/


function renderViewAsset(){
    
    const selectedAssetId = sessionStorage.getItem("viewAssetId");
    const selectedMode = sessionStorage.getItem("mode");
    
    const assets = getAssets();
    
    for(let i = 0; i<assets.length;i++){
        if(assets[i].assetId ===selectedAssetId){
           
            document.getElementById("assetId").value =assets[i].assetId;
            document.getElementById("assetName").value =assets[i].assetName;
            document.getElementById("serviceTag").value =assets[i].serviceTag;
            document.getElementById("model").value =assets[i].model;
            document.getElementById("type").value =assets[i].type;
            document.getElementById("assetStatus").value =assets[i].assetStatus;
            document.getElementById("user").value =assets[i].user;
            document.getElementById("userEmail").value =assets[i].userEmail;
            document.getElementById("location").value =assets[i].location;
            document.getElementById("notes").value =assets[i].notes;
            document.getElementById("warrantyDetails").value =assets[i].warrantyDetails;
            document.getElementById("warrantyExpiryDate").value =assets[i].warrantyExpiryDate;
            document.getElementById("warrantyDocs").value =assets[i].warrantyDocs;
            document.getElementById("acquisitionDate").value =assets[i].acquisitionDate;
            document.getElementById("acquisitionvalue").value =assets[i].acquisitionvalue;
            document.getElementById("usefulLife").value =assets[i].usefulLife;
            document.getElementById("depreciation").value =assets[i].depreciation;
            document.getElementById("netValue").value =assets[i].netValue;
            document.getElementById("purchaseInvoice").value =assets[i].purchaseInvoice;
            document.getElementById("issueDescription").value =assets[i].issueDescription;
            document.getElementById("issueDate").value =assets[i].issueDate;
            document.getElementById("supportTicketNumber").value =assets[i].supportTicketNumber;
            document.getElementById("repairCost").value =assets[i].repairCost;
            document.getElementById("repairInvoice").value =assets[i].repairInvoice;
            document.getElementById("technicianNotes").value =assets[i].technicianNotes;
   
   
            /*avalia modo - se for editavel, campos sao ativados. Senao, apenas leitura.*/
            if(selectedMode === "edit"){                                       
                document.querySelectorAll("input, textarea, select").forEach(field => {field.disabled = false;});
            }else
                document.querySelectorAll("input, textarea, select").forEach(field => {field.disabled = true;});
            
        }
    }
    
}

/*
 -------------
 DELETE
 -------------
    */
   
/*deleteAsset() representa o DELETE*/

function deleteAsset(assetId){
    const assets = getAssets();
    
    /*confirmando com usuario antes de deletar*/
    if(!confirm("Are you sure you want to delete it?")){
        return;
    }   
    
    /*buscando o assetID dentro do array de assets*/
     for(let i = 0; i < assets.length;i++){
         if(assets[i].assetId === assetId){
             assets.splice(i,1);
             break;
            }
        
        }
    
        saveAssets(assets);
    
        renderAssets();    
}


/*
 -------------
 UPDATE
 -------------
    */
   
/*update 

function saveUpdatedAsset(){
    const selectedAssetId = sessionStorage.getItem("viewAssetId"); 
    
    console.log("selectedAssetId:", selectedAssetId);
    
    const assets = getAssets();
    
    
    console.log("assets:", assets);
    
    for(let i= 0; i <assets.length;i++){
        
        console.log("comparando:", assets[i].assetId, selectedAssetId);
        
        if(assets[i].assetId===selectedAssetId){
            
            console.log("asset encontrado");
            
            assets[i].assetName = document.getElementById("assetName").value;
            assets[i].serviceTag = document.getElementById("serviceTag").value;
            assets[i].model = document.getElementById("model").value;
            assets[i].type = document.getElementById("type").value;
            assets[i].assetStatus = document.getElementById("assetStatus").value;
            assets[i].user = document.getElementById("user").value;
            assets[i].userEmail = document.getElementById("userEmail").value;
            assets[i].location = document.getElementById("location").value;
            assets[i].warrantyDetails = document.getElementById("warrantyDetails").value;
            assets[i].warrantyExpiryDate = document.getElementById("warrantyExpiryDate").value;
            assets[i].warrantyDocs = document.getElementById("warrantyDocs").value;
            assets[i].acquisitionDate = document.getElementById("acquisitionDate").value;
            assets[i].acquisitionvalue = document.getElementById("acquisitionvalue").value;
            assets[i].warrantyExpiryDate = document.getElementById("warrantyExpiryDate").value;
            assets[i].usefulLife = document.getElementById("usefulLife").value;
            assets[i].depreciation = document.getElementById("depreciation").value;
            assets[i].netValue = document.getElementById("netValue").value;
            assets[i].purchaseInvoice = document.getElementById("purchaseInvoice").value;
            assets[i].issueDescription = document.getElementById("issueDescription").value;
            assets[i].issueDate = document.getElementById("issueDate").value;
            assets[i].supportTicketNumber = document.getElementById("supportTicketNumber").value;
            assets[i].repairCost = document.getElementById("repairCost").value;
            assets[i].repairInvoice = document.getElementById("repairInvoice").value;
            assets[i].technicianNotes = document.getElementById("technicianNotes").value;

            break;
   
        }
    }
    
     
    saveAssets();   
    alert("Record saved");
     
    closeViewAsset();
    
}*/

/*function saveUpdatedAsset(){

    const selectedAssetId =
        sessionStorage.getItem("viewAssetId");

    console.log("selectedAssetId:", selectedAssetId);

    const assets = getAssets();

    console.log("assets:", assets);

    for(let i = 0; i < assets.length; i++){

        console.log("comparando:",
            assets[i].assetId,
            selectedAssetId
        );

        if(assets[i].assetId === selectedAssetId){

            console.log("asset encontrado");

            // resto do código...

            saveAssets(assets);

            break;
        }
    }
}*/