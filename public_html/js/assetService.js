   
/*localstorage*/


/*
 -------------
 HELPERS
 -------------
    */


function getAssets(){
     
    try{
        return JSON.parse(localStorage.getItem("assets")) || [];
    }
    catch(error){
        return [];
    }
}

function saveAssets(assets){
    return localStorage.setItem("assets", JSON.stringify(assets));
}

function getMode(){
    try{
     return sessionStorage.getItem("mode");
    }
    catch(error){
        return [];
    }
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
    
    const mode = getMode();
    console.log(mode);
 
    if(mode === "edit"){
        saveUpdatedAsset();
        return;
    }else if (mode === "view"){
        
        return closeViewAsset();
    }

    /*criacao e validacao de assetID*/
    const generatedId = setAssetId();
    const assetId = `AST${generatedId.toString().padStart(3,"0")}`;
    
    
    /*name validation*/
    const assetName = setAssetName();
    if(!assetName){
        alert("Invalid name!");
        return;
    }
         
    /*serviceTag validation*/
    const serviceTag = setServiceTag();
    if(!serviceTag){
        alert("Service Tag not unique!");
        return;
    }
      
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
    
        
    const acquisitionValue = setAcquisitionValue();
    if(!acquisitionValue){
        alert("Invalid Acquisition Value");
        return;
    }    
    
    const usefulLife = setUsefulLife();
    if(!usefulLife){
        alert("Invalid Useful Life");
        return;
    }
    
    
    const depreciation = Math.floor(Number(acquisitionValue) / Number(usefulLife));
    
    const netValue = Math.floor(Number(acquisitionValue) - Number(depreciation));
    
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
    acquisitionValue,
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
    closeViewAsset();
        
    renderAssets();
      
    });
}



/*
 -------------
 READ
 -------------
    */
   
/* renderAssets representa READ apenas para table no Add asset*/

function renderAssets(assets = getAssets()){

    let output = "";
    assets.forEach((asset) => {
        output += `
        <tr>
            <td>${asset.assetId}</td>
            <td>${asset.assetName}</td>
            <td>${asset.serviceTag}</td>
            <td>${asset.type}</td>
            <td>${asset.location}</td>
            <td>${asset.assetStatus}</td>
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
            document.getElementById("acquisitionValue").value =assets[i].acquisitionValue;
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
            }else {
                document.querySelectorAll("input, textarea, select").forEach(field => {field.disabled = true;});
                document.querySelector(".resave").style.display="none";
            }
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
   


function saveUpdatedAsset(){
    const selectedAssetId = sessionStorage.getItem("viewAssetId"); 

    const assets = getAssets();
    
    /*iterando sobre todos os registros*/
    for(let i= 0; i <assets.length;i++){
        
        /*procurando ID selecionada e puxando atributos*/
        if(assets[i].assetId===selectedAssetId){
   
            assets[i].assetName = setAssetName();
            if(!assets[i].assetName){
                alert("Invalid name!");
                return;
            }
            
      
            assets[i].serviceTag = setServiceTag();
            if(!assets[i].serviceTag){
                alert("Service Tag not unique!");
                return;
            }
            
            
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
            
            assets[i].acquisitionValue = setAcquisitionValue();
            if(!assets[i].acquisitionValue){
                alert("Invalid Acquisition Value");
                return;
            }

            assets[i].usefulLife = setUsefulLife();
            if(!assets[i].usefulLife){
                alert("Invalid Useful Life");
                return;
            }


            assets[i].depreciation = Math.floor(Number(assets[i].acquisitionDate) / Number(assets[i].usefulLife));
            assets[i].netValue = Math.floor(Number(assets[i].acquisitionValue) - Number(assets[i].depreciation));
            
            
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
    
    saveAssets(assets);  

    alert("Record saved");
      
    closeViewAsset();
    
}

/*
 -------------
 ASSET VALIDATION
 -------------
    */

function setAssetId(){
    const asset = getAssets();
    /*Busca o maior assetId*/
      let max= 0;  

        for(let j = 0; j < asset.length;j++){
            let assetItem = parseInt(asset[j].assetId.slice(3));

            if(assetItem > max){
                max = assetItem;
            }
        }

    return max+1;

}


/*validacao do nome. Se for vazio, recusa.*/
function setAssetName(){
    const assetName = document.getElementById("assetName").value.trim();
    
    if(assetName ===""){
        document.getElementById("assetName").classList.add("inputError");
        
        return false;
    }
    document.getElementById("assetName").classList.remove("inputError");
    return assetName;
}
    
/* validacao service tag, se nao for unico, recusa.*/
function setServiceTag(){
    const serviceTag = document.getElementById("serviceTag").value.trim();
    const currentId = sessionStorage.getItem("viewAssetId"); /*evita bug no modo editar com o proprio registro*/
    
    const assets = getAssets();
    
    for(let i = 0; i<assets.length;i++){
        if(assets[i].serviceTag ===serviceTag && assets[i].assetId !==currentId){
            document.getElementById("serviceTag").classList.add("inputError");
            return false;
        }
    }
    
    document.getElementById("serviceTag").classList.remove("inputError");
    return serviceTag;  
    
}


/*----------------------------*/
/*validacao atributos financeiros*/
/*----------------------------*/

/*Valor de aquisicao*/
function setAcquisitionValue(){
   const acquisitionValue = document.getElementById("acquisitionValue").value;
   
    if(acquisitionValue <0){
        document.getElementById("acquisitionValue").classList.add("inputError");
        
        return false;
    }
    document.getElementById("acquisitionValue").classList.remove("inputError");
    return acquisitionValue;
}

/*vida util*/
function setUsefulLife(){
   const usefulLife = document.getElementById("usefulLife").value;
   
    if(usefulLife <=0){
        document.getElementById("usefulLife").classList.add("inputError");
        
        return false;
    }
    document.getElementById("usefulLife").classList.remove("inputError");
    return usefulLife;
}
