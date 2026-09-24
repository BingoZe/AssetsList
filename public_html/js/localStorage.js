   
/*localstorage*/

function initAssetForm(){
    const assetForm = document.querySelector(".asset-form");
    
    if(!assetForm){
        return;
    }
    
    
    assetForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    
    const assetID = document.getElementById("assetId").value;
    const assetName = document.getElementById("assetName").value;
    const serviceTag = document.getElementById("serviceTag").value;
    const model = document.getElementById("model").value;
    const type = document.getElementById("type").value;
    const status = document.getElementById("assetStatus").value;
    const user = document.getElementById("user").value;
    const userEmail = document.getElementById("userEmail").value;
    const location = document.getElementById("location").value;
    const additionalNotes = document.getElementById("notes").value;
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
    assetID,
    assetName,
    serviceTag,
    model,
    type,
    status,
    user,
    userEmail,
    location,
    additionalNotes,
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

    alert("Record saved");
    
    });
}