   
/*Assets Service*/


/* HELPERS    */


async function getAssets(){
     
    try{
        const { data, error } = await supabaseClient
            .from('assets')
            .select(`
                *,
                users (
                    userId,
                    firstName,
                    lastName,
                    userEmail
                ),
                maintenance(
                    maintenanceId
                ),
                assetStatus(
                    assetStatusId,
                    name
                ),
                specs(
                    specsId,
                    specsGroup
                ),
                assetLocation(
                    assetLocationId,
                    name
                ),
                assetType(
                    assetTypeId,
                    name
                ),
                settings(
                    settingsId,
                    defaultUsefulLife
                )
            `);

        if (error) {
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
            updateAsset();
            return;
        }else if (mode === "view"){

            return closeViewAsset();
        }

        /*name validation*/
        const assetName = document.getElementById("assetName").value.trim();
        if(!assetName){
            errorPopUp("Please enter a valid name.");
            addErrorCss("assetName");
            return;
        }
        removeErrorCss("assetName");

        /*serviceTag validation*/
        const serviceTag = await setServiceTag();
        if(!serviceTag){
            errorPopUp("Service Tag not unique!");
            addErrorCss("serviceTag");
            return;
        }
        removeErrorCss("serviceTag");    

        const specsId = 
                Number(document.getElementById("specsSelect").value);  
        
        if(!specsId){
            errorPopUp("Please select a model/family group.");
            addErrorCss("specsSelect");
            return;
        }
        removeErrorCss("specsSelect");              
        
        const assetTypeId = 
                Number(document.getElementById("typeSelect").value);
        
        if(!assetTypeId){
            errorPopUp("Please select a type");
            addErrorCss("typeSelect");
            return;
        }
        removeErrorCss("typeSelect"); 
        
        const assetStatusId = 
                Number(document.getElementById("statusSelect").value);

        if(!assetStatusId){
            errorPopUp("Please select a status");
            addErrorCss("statusSelect");
            return;
        } 
        removeErrorCss("statusSelect"); 
        
        const userSelect = document.getElementById("userSelect");
        const userId = Number(userSelect.value);

        if (!userSelect.value) {
            errorPopUp("Please select an user.");
            addErrorCss("userSelect");
            return;
        }
        removeErrorCss("userSelect");

        const assetLocationId =
                Number(document.getElementById("locationSelect").value);
        
        if(!assetLocationId){
            errorPopUp("Please select a location");
            addErrorCss("locationSelect");
            return;
        }
        removeErrorCss("locationSelect");   
        
        const notes = document.getElementById("notes").value;
        const warrantyDetails = document.getElementById("warrantyDetails").value;

        const warrantyDocs = document.getElementById("warrantyDocs").value;
        const acquisitionDate = document.getElementById("acquisitionDate").value || null;

        /*Para refatorar*/
        if(!acquisitionDate ||acquisitionDate===null ||acquisitionDate===undefined ){
            errorPopUp("Please enter a valid acquisition date.");
            addErrorCss("acquisitionDate");
            return;
        } 
        removeErrorCss("acquisitionDate");

        const acquisitionYear = parseInt(new Date(acquisitionDate).getFullYear());

        /* refatorar e definir constraint no banco*/
        const warrantyExpiryDate = setWarrantyExpiryDate(acquisitionDate);
        if(!warrantyExpiryDate){
            errorPopUp("Warranty expire date cannot be before acquisition date.");
            addErrorCss("warrantyExpiryDate");
            return;
        }     
        removeErrorCss("warrantyExpiryDate");

        const acquisitionValue = parseFloat(setAcquisitionValue()) || 0;

        if(!acquisitionValue){
            errorPopUp("Invalid Acquisition Value");
            addErrorCss("acquisitionValue");
            return;
        }    
        removeErrorCss("acquisitionValue");
        
        const settings = await getSettings();
        const usefulLife = settings.defaultUsefulLife || 0;

        const purchaseInvoice = document.getElementById("purchaseInvoice").value;
        
        const settingsId = settings.settingsId || 1;

        const asset = {
        assetName,
        serviceTag,
        specsId,
        assetTypeId,
        assetStatusId,
        userId,
        assetLocationId,
        notes,
        warrantyDetails,
        warrantyExpiryDate,
        warrantyDocs,
        acquisitionDate,
        acquisitionYear,
        acquisitionValue,
        usefulLife,
        purchaseInvoice,
        settingsId
        };
        
        console.log("ASSET ",asset);
        
        await createAsset(asset);

        successPopUp("New asset saved.");

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
            <td>${asset.assetType.name}</td>
            <td>${asset.assetLocation.name}</td>
            <td>${asset.assetStatus.name}</td>
            <td>${asset.users.firstName} ${asset.users.lastName}</td>
            <td>
                <button class="btTdItemView" onclick="viewAsset('${asset.assetId}','view')">
<i class="fa-solid fa-eye"></i></button>
                <button class="btTdItemEdit" onclick="viewAsset('${asset.assetId}','edit')">
<i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btTdItemDelete" onclick="deleteAsset('${asset.assetId}')">
<i class="fa-solid fa-trash"></i></button>
            </td>
                    
        </tr>
        `;
    });
        
    document.querySelector(".tableBody").innerHTML = output;
};

/*renderViewAsset - Exibe apenas no View*/

async function renderViewAsset(){
         
    const selectedAssetId = parseInt(sessionStorage.getItem("viewAssetId"));
    const selectedMode = sessionStorage.getItem("mode");

    const assets = await getAssets();
    
    const viewedAsset = assets.find(asset =>
       asset.assetId ===selectedAssetId
    );
 
    document.getElementById("assetId").value =
            viewedAsset.assetId;
    document.getElementById("assetName").value =
            viewedAsset.assetName;
    document.getElementById("serviceTag").value =
            viewedAsset.serviceTag;
    
    /*Elementos com tabelas especializadas - FKs*/
    
    const specsSelect = 
            document.getElementById("specsSelect"); 
    specsSelect.value = 
            String(viewedAsset.specs.specsId);
    
    const typeSelect = 
            document.getElementById("typeSelect"); 
    typeSelect.value = 
            String(viewedAsset.assetType.assetTypeId);
    
    const statusSelect = 
            document.getElementById("statusSelect"); 
    statusSelect.value = 
            String(viewedAsset.assetStatus.assetStatusId);
             
    const userSelect = 
            document.getElementById("userSelect");
    userSelect.value = 
            String(viewedAsset.users.userId);
    
    const locationSelect = 
            document.getElementById("locationSelect");
    locationSelect.value = 
            String(viewedAsset.assetLocation.assetLocationId);
    
     
    document.getElementById("userEmail").value =
            `${viewedAsset.users.userEmail}`;
    document.getElementById("notes").value =
            viewedAsset.notes;
    
     /*Garantia e financeiro*/
    document.getElementById("warrantyDetails").value =
            viewedAsset.warrantyDetails;
    document.getElementById("warrantyExpiryDate").value =
            viewedAsset.warrantyExpiryDate;
    document.getElementById("warrantyDocs").value =
            viewedAsset.warrantyDocs;
    document.getElementById("acquisitionDate").value =
            viewedAsset.acquisitionDate;
    document.getElementById("acquisitionValue").value =
            viewedAsset.acquisitionValue;
    document.getElementById("usefulLife").value =
            viewedAsset.usefulLife;
        
    document.getElementById("depreciation").value =
            Math.round(viewedAsset.depreciation);
        
    document.getElementById("netValue").value =
            Math.round(viewedAsset.netValue);
    
    document.getElementById("purchaseInvoice").value =
            viewedAsset.purchaseInvoice;


    /*avalia modo - se for editavel, campos sao ativados. Senao, apenas leitura.*/
    if(selectedMode === "edit"){                                       
        document.querySelectorAll("input, textarea, select")
                .forEach(field => {field.disabled = false;});
    }else {
        document.querySelectorAll("input, textarea, select")
                .forEach(field => {field.disabled = true;});
        document.querySelector(".resave")
                .style.display="none";
    }
    
    const maintenance = await getMaintenance();

    /*maintenance inner table*/
    const maintenanceHistory =
      maintenance.filter(item =>
          item.assetId === viewedAsset.assetId
      );

    if(maintenanceHistory.length > 0){

      renderMaintenanceInnerTable(
          maintenanceHistory
      );

    }else{

      const para = document.createElement("p");
      para.innerText =
          "No maintenance orders found for this asset";

      document
          .querySelector(".tableBodyMaintenance")
          .appendChild(para);

  }
  
    const users = await getUsers();
  
    /*user inner table*/
    const userHistory =
      users.filter(item =>
          item.userId === viewedAsset.users.userId
      );

    if(userHistory.length > 0){

      renderUserInnerTable(
          userHistory,viewedAsset
      );

    }else{

      const para = document.createElement("p");
      para.innerText =
          "No maintenance orders found for this asset";

      document
          .querySelector(".tableBodyAssetHistory")
          .appendChild(para);

  }
        
}

/*
 -------------
 DELETE
 -------------
    */
   
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
  
async function updateAsset(){
    const selectedAssetId = parseInt(sessionStorage.getItem("viewAssetId")); 

    const assets = await getAssets();
    
    const updatedAsset = assets.find(updatedAsset=>
        updatedAsset.assetId===selectedAssetId
    );
    
    updatedAsset.assetName = 
            document.getElementById("assetName").value.trim();
    if(!updatedAsset.assetName){
        errorPopUp("Please enter a valid asset name.");
        addErrorCss("assetName");
        return;
    }
    removeErrorCss("assetName");

    updatedAsset.serviceTag = await setServiceTag();

    if(!updatedAsset.serviceTag){
        errorPopUp("Service Tag not unique.");
        addErrorCss("serviceTag");
        return;
    }
    removeErrorCss("serviceTag");

    /*tabelas especializadas - FKs*/
    
    updatedAsset.specsId = 
            document.getElementById("specsSelect").value;
    
    if(!updatedAsset.specsId){
        errorPopUp("Please select a model/family group.");
        addErrorCss("specsSelect");
        return;
    }
    removeErrorCss("specsSelect");
        
    updatedAsset.assetTypeId = 
            document.getElementById("typeSelect").value;
    updatedAsset.assetStatusId = 
            document.getElementById("statusSelect").value;
    updatedAsset.assetLocationId = 
            document.getElementById("locationSelect").value;
    updatedAsset.userId = 
            document.getElementById("userSelect").value;
    
    if(!updatedAsset.userId){
        errorPopUp("Please select an user.");
        addErrorCss("userSelect");
        return;
    }
    removeErrorCss("userSelect");
    
    updatedAsset.notes = 
            document.getElementById("notes").value;

    /*Garantia & financeiro*/
    
    updatedAsset.warrantyDetails = 
            document.getElementById("warrantyDetails").value;
    updatedAsset.warrantyDocs = 
            document.getElementById("warrantyDocs").value;
    updatedAsset.acquisitionDate = 
            document.getElementById("acquisitionDate").value;

    /*Para refatorar*/
    if(!updatedAsset.acquisitionDate ||updatedAsset.acquisitionDate===null
    ||updatedAsset.acquisitionDate===undefined ){
        errorPopUp("Invalid Acquisition Date");
        addErrorCss("acquisitionDate");
        return;
    }     
    removeErrorCss("acquisitionDate");

    updatedAsset.acquisitionYear = 
            parseInt(new Date(updatedAsset.acquisitionDate).getFullYear());

   /* refatorar e definir constraint no banco*/
    updatedAsset.warrantyExpiryDate = 
            setWarrantyExpiryDate(updatedAsset.acquisitionDate);

    if(!updatedAsset.warrantyExpiryDate){
        errorPopUp("Warranty expire date cannot be before Acquisition Date");
        addErrorCss("warrantyExpiryDate");
        return;
    }     
    removeErrorCss("warrantyExpiryDate");

    /* refatorar e definir constraint no banco*/
    if(!updatedAsset.acquisitionDate){
        errorPopUp("Please enter the acquisition date");
        addErrorCss("acquisitionDate");  
        return;
    }     
    removeErrorCss("acquisitionDate");            

    updatedAsset.purchaseInvoice = 
            document.getElementById("purchaseInvoice").value;

    const {error} = await supabaseClient.from('assets')
        .update({
            assetName : updatedAsset.assetName,
            serviceTag :updatedAsset.serviceTag,
            specsId :updatedAsset.specsId,
            assetTypeId : updatedAsset.assetTypeId,
            assetStatusId : updatedAsset.assetStatusId,
            userId:updatedAsset.userId,
            assetLocationId : updatedAsset.assetLocationId,
            notes :updatedAsset.notes,
            warrantyDetails : updatedAsset.warrantyDetails,
            warrantyExpiryDate :updatedAsset.warrantyExpiryDate,
            warrantyDocs : updatedAsset.warrantyDocs,
            acquisitionDate : updatedAsset.acquisitionDate,
            acquisitionYear :updatedAsset.acquisitionYear,
            purchaseInvoice : updatedAsset.purchaseInvoice

        })
        .eq('assetId',updatedAsset.assetId);

    if(error){
        console.log(error);
        return;
    }
  
    successPopUp("Asset updated.");
      
    closeViewAsset();
}

/* ASSET VALIDATION */
   
/* validacao service tag, se nao for unico, recusa.*/
async function setServiceTag() {

    const newServiceTag = document.getElementById("serviceTag").value.trim();
    const currentId = parseInt(sessionStorage.getItem("viewAssetId")) || 0;
    
    const assets = await getAssets();

    const checkedAsset = assets.find(
        asset => asset.serviceTag === newServiceTag
    );

    if (checkedAsset && checkedAsset.assetId !== currentId) {
        return false;
    }

    return newServiceTag;
}


/*----------------------------*/
/*validacao atributos financeiros*/
/*----------------------------*/

/*Valor de aquisicao*/
function setAcquisitionValue(){
   const acquisitionValue = document.getElementById("acquisitionValue").value;
   
    if(acquisitionValue <0){
        return false;
    }
    return acquisitionValue;
}


/*data de garantia nao pode ser menor do que data de aquisicao*/
function setWarrantyExpiryDate(acquisitionDate) {

    const warrantyExpiryDate =
        document.getElementById("warrantyExpiryDate").value;

    if (warrantyExpiryDate >= acquisitionDate) {
        return warrantyExpiryDate;
    }

    return false;
}
