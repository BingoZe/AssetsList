   
/*Assets Service*/


/* HELPERS    */


async function getAssets(){
     
    try{
        const {data, error} = 
            await supabaseClient.from('assets').select('*');
                if(error){
                console.log(error);
                return [];
            }
        return data;
    }
    catch(error){
        console.log(error);
        return [];
    }
}

async function createAsset(asset){

    const { data, error } =
        await supabaseClient
            .from('assets')
            .insert([asset]);

    if(error){
        console.log("ERROR:");
        console.log(error);
        return null;
    }

    return data;
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

async function initAssetForm(){
    const assetForm = document.querySelector(".asset-form");
    
    if(!assetForm){
        return;
    }
              
    assetForm.addEventListener("submit",async (event)=>{
    event.preventDefault();
    
    const mode = getMode();
 
    if(mode === "edit"){
        saveUpdatedAsset();
        return;
    }else if (mode === "view"){
        
        return closeViewAsset();
    }


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
    
 

    
    const warrantyDocs = document.getElementById("warrantyDocs").value;
    const acquisitionDate = document.getElementById("acquisitionDate").value;
    
    if(!acquisitionDate){
        alert("Invalid Acquisition Date");
        return;
    } 
    const acquisitionYear = new Date(acquisitionDate).getFullYear();
    if(!acquisitionDate){
        alert("Invalid Acquisition Date");
        return;
    } 
    
    const warrantyExpiryDate = setWarrantyExpiryDate(acquisitionDate);
    if(!warrantyExpiryDate){
        alert("Warranty expire date cannot be before Acquisition Date");
        return;
    }     
        
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
    
    const depreciation = setDepreciation(acquisitionValue,usefulLife);
     if(!depreciation){
        alert("Invalid Depreciation");
        return;
    }   
    
    const netValue = setNetValue(acquisitionValue,depreciation);
     if(!netValue){
        alert("Invalid Net Value");
        return;
    }       
    
    const purchaseInvoice = document.getElementById("purchaseInvoice").value;
    const issueDescription = document.getElementById("issueDescription").value;
    const issueDate = document.getElementById("issueDate").value;
    const supportTicketNumber = document.getElementById("supportTicketNumber").value;
    const repairCost = document.getElementById("repairCost").value;
    const repairInvoice = document.getElementById("repairInvoice").value;
    const technicianNotes = document.getElementById("technicianNotes").value;    
    
    const asset = {
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
    acquisitionYear,
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
    await createAsset(asset);
    
    alert("Record saved");
    
    assetForm.reset();
    
    closeViewAsset();
        
    renderAssets();
      
    });
}



/* READ */
   
/* renderAssets representa READ para table no Add User*/

async function renderAssets(assets = null){
    
    if(!assets){
        assets = await getAssets();
    }

    let output = "";
    assets.forEach((asset) => {
        output += `
        <tr>
            <td>AST-${asset.assetId}</td>
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


async function renderViewAsset(){
    
    const selectedAssetId = sessionStorage.getItem("viewAssetId");
    const selectedMode = sessionStorage.getItem("mode");
    
    const assets = await getAssets();
    
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

async function deleteAsset(assetId){
    
    /*confirmando com usuario antes de deletar*/
    if(!confirm("Are you sure you want to delete it?")){
        return;
    }   
    
    const {error} = await supabaseClient
            .from('assets')
            .delete()
            .eq('assetId',assetId);
    
    if(error){
        console.log(error);
        return;
    }
    
    await renderAssets();    
}


/* UPDATE */
  
async function saveUpdatedAsset(){
    const selectedAssetId = sessionStorage.getItem("viewAssetId"); 

    const assets = await getAssets();
    
    const updatedAsset = assets.find(updatedAsset=>
        updatedAsset.assetId===selectedAssetId
    );
     
        /*procurando ID selecionada e puxando atributos*/
        if(updatedAsset.assetId===selectedAssetId){
   
            updatedAsset.assetName = setAssetName();
            if(!updatedAsset.assetName){
                alert("Invalid name!");
                return;
            }
            
            updatedAsset.serviceTag = setServiceTag();
            if(!updatedAsset.serviceTag){
                alert("Service Tag not unique!");
                return;
            }
                   
            updatedAsset.model = document.getElementById("model").value;
            updatedAsset.type = document.getElementById("type").value;
            updatedAsset.assetStatus = document.getElementById("assetStatus").value;
            updatedAsset.user = document.getElementById("user").value;
            updatedAsset.userEmail = document.getElementById("userEmail").value;
            updatedAsset.location = document.getElementById("location").value;
            updatedAsset.warrantyDetails = document.getElementById("warrantyDetails").value;
            
            updatedAsset.warrantyDocs = document.getElementById("warrantyDocs").value;
            updatedAsset.acquisitionDate = document.getElementById("acquisitionDate").value;
            if(!updatedAsset.acquisitionDate){
                alert("Invalid Acquisition Date");
                return;
            }    
            
            updatedAsset.acquisitionYear = new Date(updatedAsset.acquisitionDate).getFullYear();
            
            updatedAsset.warrantyExpiryDate = setWarrantyExpiryDate(updatedAsset.acquisitionDate);
            if(!updatedAsset.warrantyExpiryDate){
                alert("Warranty expire date cannot be before Acquisition Date");
                return;
            }                 
             
            updatedAsset.acquisitionValue = setAcquisitionValue();
            if(!updatedAsset.acquisitionValue){
                alert("Invalid Acquisition Value");
                return;
            }

            updatedAsset.usefulLife = setUsefulLife();
            if(!updatedAsset.usefulLife){
                alert("Invalid Useful Life");
                return;
            }


            updatedAsset.depreciation = setDepreciation(updatedAsset.acquisitionValue,updatedAsset.usefulLife);
            if(!updatedAsset.depreciation){
                alert("Invalid Depreciation");
                return;
            }            
            
            updatedAsset.netValue = setNetValue(updatedAsset.acquisitionValue,updatedAsset.depreciation);
            if(!updatedAsset.netValue){
                alert("Invalid Net Value");
                return;
            }            
                       
            
            updatedAsset.purchaseInvoice = document.getElementById("purchaseInvoice").value;
            updatedAsset.issueDescription = document.getElementById("issueDescription").value;
            updatedAsset.issueDate = document.getElementById("issueDate").value;
            updatedAsset.supportTicketNumber = document.getElementById("supportTicketNumber").value;
            updatedAsset.repairCost = document.getElementById("repairCost").value;
            updatedAsset.repairInvoice = document.getElementById("repairInvoice").value;
            updatedAsset.technicianNotes = document.getElementById("technicianNotes").value;
        }
            
        const {error} = await supabaseClient.from('assets')
            .update({
                assetName = updateAsset.assetName,
                serviceTag =updateAsset.serviceTag,
                model = updateAsset.model,
                type = updateAsset.type,
                assetStatus = updateAsset.assetStatus,
                user = updateAsset.assetName,
                userEmail = updateAsset.userEmail,
                location = updateAsset.location,
                notes = updateAsset.notes,
                warrantyDetails = updateAsset.warrantyDetails,
                warrantyExpiryDate = updateAsset.warrantyExpiryDate,
                warrantyDocs = updateAsset.warrantyDocs,
                acquisitionDate = updateAsset.acquisitionDate,
                acquisitionYear = updateAsset.acquisitionYear,
                acquisitionValue = updateAsset.acquisitionValue,
                usefulLife = updateAsset.usefulLife,
                depreciation = updateAsset.depreciation,
                netValue = updateAsset.netValue,
                purchaseInvoice = updateAsset.purchaseInvoice,
                issueDescription = updateAsset.issueDescription,
                issueDate = updateAsset.issueDate,
                supportTicketNumber = updateAsset.supportTicketNumber,
                repairCost = updateAsset.repairCost,
                repairInvoice = updateAsset.repairInvoice,
                technicianNotes = updateAsset.technicianNotes
            })
            .eq('assetId'.updatedAsset.assetId);
    
        if(error){
            console.log(error);
            return;
        }
   
    alert("Record saved");
      
    closeViewAsset();
    
}

/* ASSET VALIDATION */

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
async function setServiceTag(){
    const newServiceTag = document.getElementById("serviceTag").value.trim();
    const currentId = sessionStorage.getItem("viewAssetId"); /*evita bug no modo editar com o proprio registro*/
    
    const assets = await getAssets();
    
    const checkedAsset = assets.find(
        asset => asset.serviceTag === newServiceTag
    );
   
    if(checkedAsset && checkedAsset.assetId !==currentId){
            document.getElementById("serviceTag").classList.add("inputError");
        return false;
    }
    
    document.getElementById("serviceTag").classList.remove("inputError");
    return newServiceTag;  
    
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

/*depreciacao*/

function setDepreciation(acquisitionValue,usefulLife){
    if(acquisitionValue !==0 && acquisitionValue !==null){
    return Math.floor(Number(acquisitionValue)/Number(usefulLife));
    }else
        return;        
}

function setNetValue(acquisitionValue,depreciation){
    if(acquisitionValue !==0 && acquisitionValue !==null){
    return Math.floor(Number(acquisitionValue) - Number(depreciation));
    }else
        return;        
}

/*data de garantia nao pode ser menor do que data de aquisicao*/
function setWarrantyExpiryDate(acquisitionDate){
    const warrantyExpiryDate = document.getElementById("warrantyExpiryDate").value;
    
    if(warrantyExpiryDate >= acquisitionDate){
        return warrantyExpiryDate;
    }else
        return;  
}