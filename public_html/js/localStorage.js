   
/*localstorage*/

/*implemantacao do CRUD - initAssetForm corresponde ao Create*/

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
    const status = document.getElementById("assetStatus").value;
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
    status,
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

    const assets = JSON.parse(localStorage.getItem("assets")) || [];

    assets.push(asset);

    localStorage.setItem("assets", JSON.stringify(assets));
    
    assetForm.reset();

    alert("Record saved");
    
    renderAssets();
    
    });
}


/*implementacao CRUD - renderAssets representa READ apenas para table no Add asset*/

function renderAssets(){
       
    const assets = JSON.parse(localStorage.getItem("assets")) || [];
    let output = "";
    assets.forEach((asset,index) => {
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
                <button class="btTdItemView">View</button>
                <button class="btTdItemEdit">Edit</button>
                <button class="btTdItemDelete" onclick="deleteAsset('${asset.assetId}')">Delete</button>
            </td>
                    
        </tr>
        `;
    });
    
    console.log(document.getElementById("tableBody"));
    
    document.querySelector(".tableBody").innerHTML = output;
};

function viewAsset(index){
    const assets = JSON.parse(localStorage.getItem("assets")) || []; 
    const asset = assets[index];
    
    
}

/*deleteAsset() representa o DELETE*/

function deleteAsset(assetId){
    const assets = JSON.parse(localStorage.getItem("assets")) || [];
    
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
    
        localStorage.setItem("assets",JSON.stringify(assets));
    
        renderAssets();    
}

/*update */

function updateAsset(index){
    const assets = JSON.parse(localStorage.getItem("assets")) || [];
    const asset = assets[index];
    
    document.getElementById("assetId").value = asset.assetId;
    

}