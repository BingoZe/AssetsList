   
/*Assets Service*/


/* HELPERS    */


async function getAssets(){
     
    try{
        const { data, error } = await supabaseClient
            .from('assets')
            .select(`
                *,
                users (
                    firstName,
                    lastName,
                    userEmail
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
    const assetName = setAssetName();
    if(!assetName){
        alert("Invalid name!");
        return;
    }
         
    /*serviceTag validation*/
    const serviceTag = await setServiceTag();
        if(!serviceTag){
            alert("Service Tag not unique!");
            return;
        }
        
    const model = document.getElementById("model").value;
    const type = document.getElementById("type").value;
    const assetStatus = document.getElementById("assetStatus").value;
    
   
    
    const userSelect = document.getElementById("userSelect");
    const userId = Number(userSelect.value);

    if (!userSelect.value) {
        console.log("Select a user.");
        return;
    }
    
    const location = document.getElementById("location").value;
    const notes = document.getElementById("notes").value;
    const warrantyDetails = document.getElementById("warrantyDetails").value;
    
    const warrantyDocs = document.getElementById("warrantyDocs").value;
    const acquisitionDate = document.getElementById("acquisitionDate").value || null;
    
    /*Para refatorar*/
    if(!acquisitionDate ||acquisitionDate===null ||acquisitionDate===undefined ){
        alert("Invalid Acquisition Date");
        document.getElementById("acquisitionDate").classList.add("inputError");
        return;
    } 
    document.getElementById("acquisitionDate").classList.remove("inputError");
    
    const acquisitionYear = parseInt(new Date(acquisitionDate).getFullYear());
    
    /* refatorar e definir constraint no banco*/
    const warrantyExpiryDate = setWarrantyExpiryDate(acquisitionDate);
    if(!warrantyExpiryDate){
        alert("Warranty expire date cannot be before Acquisition Date");
        return;
    }     
    document.getElementById("warrantyExpiryDate").classList.remove("inputError");
        
    const acquisitionValue = parseFloat(setAcquisitionValue()) || 0;
    
    if(!acquisitionValue){
        alert("Invalid Acquisition Value");
        return;
    }    
    
    const usefulLife = document.getElementById("usefulLife").value;
            /*setUsefulLife();
    if(!usefulLife){
        alert("Invalid Useful Life");
        return;
    }*/
    
    const depreciation = document.getElementById("depreciation").value;
            /*setDepreciation(acquisitionValue,usefulLife);
     if(!depreciation){
        alert("Invalid Depreciation");
        return;
    }   */
    
    const netValue =document.getElementById("netValue").value; /*setNetValue(acquisitionValue,depreciation);
     if(!netValue){
        alert("Invalid Net Value");
        return;
    }       */
    
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
    userId,
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
    assets.forEach(async (asset) => {
 
        output += `
        <tr>
            <td>AST-${asset.assetId}</td>
            <td>${asset.assetName}</td>
            <td>${asset.serviceTag}</td>
            <td>${asset.type}</td>
            <td>${asset.location}</td>
            <td>${asset.assetStatus}</td>
            <td>${asset.users.firstName} ${asset.users.lastName}</td>
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
         
    const selectedAssetId = parseInt(sessionStorage.getItem("viewAssetId"));
    const selectedMode = sessionStorage.getItem("mode");

    const assets = await getAssets();
    
    const viewedAsset = assets.find(asset =>
       asset.assetId ===selectedAssetId
    );
 
    document.getElementById("assetId").value =viewedAsset.assetId;
    document.getElementById("assetName").value =viewedAsset.assetName;
    document.getElementById("serviceTag").value =viewedAsset.serviceTag;
    document.getElementById("model").value =viewedAsset.model;
    document.getElementById("type").value =viewedAsset.type;
    document.getElementById("assetStatus").value =viewedAsset.assetStatus;
    
 
    
   document.getElementById("userSelect").value =String(`${viewedAsset.users.userId} `);
    
    
    document.getElementById("userEmail").value =`${viewedAsset.users.userEmail}`;
    document.getElementById("location").value =viewedAsset.location;
    document.getElementById("notes").value =viewedAsset.notes;
    document.getElementById("warrantyDetails").value =viewedAsset.warrantyDetails;
    document.getElementById("warrantyExpiryDate").value =viewedAsset.warrantyExpiryDate;
    document.getElementById("warrantyDocs").value =viewedAsset.warrantyDocs;
    document.getElementById("acquisitionDate").value =viewedAsset.acquisitionDate;
    document.getElementById("acquisitionValue").value =viewedAsset.acquisitionValue;
    document.getElementById("usefulLife").value =viewedAsset.usefulLife;
    document.getElementById("depreciation").value =viewedAsset.depreciation;
    document.getElementById("netValue").value =viewedAsset.netValue;
    document.getElementById("purchaseInvoice").value =viewedAsset.purchaseInvoice;
    document.getElementById("issueDescription").value =viewedAsset.issueDescription;
    document.getElementById("issueDate").value =viewedAsset.issueDate;
    document.getElementById("supportTicketNumber").value =viewedAsset.supportTicketNumber;
    document.getElementById("repairCost").value =viewedAsset.repairCost;
    document.getElementById("repairInvoice").value =viewedAsset.repairInvoice;
    document.getElementById("technicianNotes").value =viewedAsset.technicianNotes;

    /*avalia modo - se for editavel, campos sao ativados. Senao, apenas leitura.*/
    if(selectedMode === "edit"){                                       
        document.querySelectorAll("input, textarea, select").forEach(field => {field.disabled = false;});
    }else {
        document.querySelectorAll("input, textarea, select").forEach(field => {field.disabled = true;});
        document.querySelector(".resave").style.display="none";
    }
}


/*Render User field*/
async function renderUserField() {
    const users = await getUsers();
    const userSelect = document.getElementById("userSelect");

    if (!userSelect) {
        return;
    }

    let output = `
        <option value="" selected disabled>
            Select a user
        </option>
    `;

    const uniqueUsers = [];

    users.forEach(user => {
        if (!uniqueUsers.includes(user.userId)) {
            uniqueUsers.push(user.userId);

            output += `
                <option value="${user.userId}">
                    ${user.firstName} ${user.lastName}
                </option>
            `;
        }
    });
    
    userSelect.innerHTML = output;
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
  
async function updateAsset(){
    const selectedAssetId = parseInt(sessionStorage.getItem("viewAssetId")); 

    const assets = await getAssets();
    
    const updatedAsset = assets.find(updatedAsset=>
        updatedAsset.assetId===selectedAssetId
    );
        updatedAsset.assetName = setAssetName();
        if(!updatedAsset.assetName){
            alert("Invalid name!");
            return;
        }

        updatedAsset.serviceTag = await setServiceTag();

        if(!updatedAsset.serviceTag){
            alert("Service Tag not unique!");
            return;
        }

        updatedAsset.model = document.getElementById("model").value;
        updatedAsset.type = document.getElementById("type").value;
        updatedAsset.assetStatus = document.getElementById("assetStatus").value;

        updatedAsset.userSelect = document.getElementById("userSelect");
        updatedAsset.userId = Number(updatedAsset.userSelect.value);

        if (!updatedAsset.userSelect) {
            console.log("Select a user.");
            return;
        }    
        
        updatedAsset.userEmail = document.getElementById("userEmail").value;
        
        updatedAsset.location = document.getElementById("location").value;
        updatedAsset.warrantyDetails = document.getElementById("warrantyDetails").value;
        updatedAsset.warrantyDocs = document.getElementById("warrantyDocs").value;
        updatedAsset.acquisitionDate = document.getElementById("acquisitionDate").value;

        /*Para refatorar*/
        if(!updatedAsset.acquisitionDate ||updatedAsset.acquisitionDate===null
        ||updatedAsset.acquisitionDate===undefined ){
            alert("Invalid Acquisition Date");
            document.getElementById("acquisitionDate").classList.add("inputError");
            return;
        }     
        document.getElementById("acquisitionDate").classList.remove("inputError");

        updatedAsset.acquisitionYear = parseInt(new Date(updatedAsset.acquisitionDate).getFullYear());

       /* refatorar e definir constraint no banco*/
        updatedAsset.warrantyExpiryDate = setWarrantyExpiryDate(updatedAsset.acquisitionDate);

        if(!updatedAsset.warrantyExpiryDate){
            alert("Warranty expire date cannot be before Acquisition Date");
            return;
        }     
        document.getElementById("warrantyExpiryDate").classList.remove("inputError");

        /* refatorar e definir constraint no banco*/
         if(!updatedAsset.acquisitionDate){
            alert("Warranty expire date cannot be before Acquisition Date");
            return;
        }     
        document.getElementById("warrantyExpiryDate").classList.remove("inputError");            

        updatedAsset.acquisitionValue = parseFloat(setAcquisitionValue())||0;
        if(!updatedAsset.acquisitionValue){
            alert("Invalid Acquisition Value");
            return;
        }

        updatedAsset.usefulLife = document.getElementById("usefulLife").value;
                /*setUsefulLife();
        if(!updatedAsset.usefulLife){
            alert("Invalid Useful Life");
            return;
        }*/

        updatedAsset.depreciation = document.getElementById("depreciation").value;
                /*setDepreciation(updatedAsset.acquisitionValue,updatedAsset.usefulLife);
        if(!updatedAsset.depreciation){
            alert("Invalid Depreciation");
            return;
        }         */   

        updatedAsset.netValue = document.getElementById("netValue").value;
                /*setNetValue(updatedAsset.acquisitionValue,updatedAsset.depreciation);
        if(!updatedAsset.netValue){
            alert("Invalid Net Value");
            return;
        }            */

        updatedAsset.purchaseInvoice = document.getElementById("purchaseInvoice").value;
        updatedAsset.issueDescription = document.getElementById("issueDescription").value;
        updatedAsset.issueDate = document.getElementById("issueDate").value;
        updatedAsset.supportTicketNumber = document.getElementById("supportTicketNumber").value;
        updatedAsset.repairCost = document.getElementById("repairCost").value;
        updatedAsset.repairInvoice = document.getElementById("repairInvoice").value;
        updatedAsset.technicianNotes = document.getElementById("technicianNotes").value;
                
        const {error} = await supabaseClient.from('assets')
            .update({
                assetName : updatedAsset.assetName,
                serviceTag :updatedAsset.serviceTag,
                model :updatedAsset.model,
                type : updatedAsset.type,
                assetStatus : updatedAsset.assetStatus,
                
                location : updatedAsset.location,
                notes :updatedAsset.notes,
                warrantyDetails : updatedAsset.warrantyDetails,
                warrantyExpiryDate :updatedAsset.warrantyExpiryDate,
                warrantyDocs : updatedAsset.warrantyDocs,
                acquisitionDate : updatedAsset.acquisitionDate,
                acquisitionYear :updatedAsset.acquisitionYear,
                acquisitionValue : updatedAsset.acquisitionValue,
                usefulLife : updatedAsset.usefulLife,
                depreciation : updatedAsset.depreciation,
                netValue : updatedAsset.netValue,
                purchaseInvoice : updatedAsset.purchaseInvoice,
                issueDescription :updatedAsset.issueDescription,
                issueDate : updatedAsset.issueDate,
                supportTicketNumber : updatedAsset.supportTicketNumber,
                repairCost :updatedAsset.repairCost,
                repairInvoice : updatedAsset.repairInvoice,
                technicianNotes : updatedAsset.technicianNotes
            })
            .eq('assetId',updatedAsset.assetId);
    
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
async function setServiceTag() {

    const newServiceTag = document.getElementById("serviceTag").value.trim();

    const currentId =
        parseInt(sessionStorage.getItem("viewAssetId")) || 0;

    const assets = await getAssets();

    const checkedAsset = assets.find(
        asset => asset.serviceTag === newServiceTag
    );

    if (checkedAsset && checkedAsset.assetId !== currentId) {
        document.getElementById("serviceTag")
            .classList.add("inputError");

        return false;
    }

    document.getElementById("serviceTag")
        .classList.remove("inputError");

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

/*vida util - Para refatorar!*/
function setUsefulLife(){
   const usefulLife = document.getElementById("usefulLife").value;
   
    if(usefulLife <=0){
        document.getElementById("usefulLife").classList.add("inputError");
        
        return false;
    }
    document.getElementById("usefulLife").classList.remove("inputError");
    return usefulLife;
}

/*depreciacao - Para refatorar!*/

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
function setWarrantyExpiryDate(acquisitionDate) {

    const warrantyExpiryDate =
        document.getElementById("warrantyExpiryDate").value;

    if (warrantyExpiryDate >= acquisitionDate) {

        document.getElementById("warrantyExpiryDate")
            .classList.remove("inputError");

        return warrantyExpiryDate;
    }

    document.getElementById("warrantyExpiryDate")
        .classList.add("inputError");

    return false;
}