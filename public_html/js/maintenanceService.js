/* MAINTENANCE SERVICE */

/* HELPERS */

async function getMaintenance(){

    try{

        const { data, error } = await supabaseClient
            .from('maintenance')
            .select(`
                *,
                assets(
                    assetId,
                    assetName,
                    serviceTag,
                    assetTypeId,
                    assetStatusId
                ),
                maintenanceCategory(
                    maintenanceCategoryId,
                    name
                ),
                maintenanceStatus(
                    maintenanceStatusId,
                    name
                ),
                maintenancePriority(
                    maintenancePriorityId,
                    name
                )        
            `);
       
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

async function createMaintenance(maintenance){

    const { data, error } =
        await supabaseClient
            .from('maintenance')
            .insert([maintenance]);

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

async function initMaintenanceForm(){

    const maintenanceForm =document.querySelector(".maintenance-form");

    if(!maintenanceForm){
        return;
    }

    maintenanceForm.addEventListener( "submit",async(event)=>{

        event.preventDefault();

        const mode = getMode();

        if(mode === "edit"){
            updateMaintenance();
            return;
        }

        const assetId = Number(document.getElementById("assetId").value);
        
        const maintenanceCategoryId = Number(document.getElementById("maintenanceCategory").value);
        
        const issueDescription = document.getElementById("issueDescription").value;

        const issueDate = document.getElementById("issueDate").value;

        const supportTicket = document.getElementById("supportTicket").value;

        const repairCost = document.getElementById("repairCost").value || 0;

        const repairInvoice = document.getElementById("repairInvoice").value;

        const technicianNotes =document.getElementById("technicianNotes").value;

        const maintenancePriorityId = Number(document.getElementById("maintenancePriority").value);

        const maintenanceStatusId = Number(document.getElementById("maintenanceStatus").value);
 
        const maintenance = {
            assetId,
            maintenanceCategoryId,
            issueDescription,
            issueDate,
            supportTicket,
            repairCost,
            repairInvoice,
            technicianNotes,
            maintenancePriorityId,
            maintenanceStatusId
        };
        
        await createMaintenance(maintenance);
        
        alert("Maintenance order created");

        maintenanceForm.reset();

        closeViewMaintenance();
        
        renderMaintenance();

    });

}


async function renderMaintenance(maintenance = null){

    if(!maintenance){
        maintenance = await getMaintenance()
    ;}

    let output = "";

    maintenance.forEach(maintenance => {

        output += `
        <tr>

            <td>MNT-${maintenance.maintenanceId}</td>

            <td>${maintenance.assets.assetId} 
                ${maintenance.assets.assetName}</td>

            <td>${maintenance.issueDescription}</td>

            <td>${maintenance.maintenanceCategory.name}</td>

            <td>${maintenance.maintenanceStatus.name}</td>

            <td>${maintenance.issueDate}</td>

            <td>${maintenance.maintenancePriority.name}</td>

            <td>

                <button
                    class="btTdItemView"
                    onclick="viewMaintenance('${maintenance.maintenanceId}',
                        'view'
                    )">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button
                    class="btTdItemEdit"
                    onclick="viewMaintenance(
                        '${maintenance.maintenanceId}',
                        'edit'
                    )">

                    <i class="fa-solid fa-pen-to-square"></i>

                </button>

                <button
                    class="btTdItemDelete"
                    onclick="deleteMaintenance(
                        '${maintenance.maintenanceId}'
                    )">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>
        `;

    });

    document.querySelector(".tableBody").innerHTML =
        output;

}


async function renderViewMaintenance(){

    const selectedMaintenanceId =
        parseInt(sessionStorage.getItem("viewMaintenanceId"));

    const selectedMode =sessionStorage.getItem("mode");

    const maintenance = await getMaintenance();

    const viewedMaintenance =maintenance.find(item =>
            item.maintenanceId ===selectedMaintenanceId
        );

    document.getElementById("assetId").value =
            viewedMaintenance.assetId;
    
    /*document.getElementById("maintenanceId").value =
            viewedMaintenance.maintenanceId;*/
    
    document.getElementById("issueDescription").value =
        viewedMaintenance.issueDescription;

    document.getElementById("issueDate").value =
        viewedMaintenance.issueDate;

    document.getElementById("supportTicket").value =
        viewedMaintenance.supportTicket;

    document.getElementById("repairCost").value =
        viewedMaintenance.repairCost;

    document.getElementById("technicianNotes").value =
        viewedMaintenance.technicianNotes;

    document.getElementById("repairInvoice").value =
        viewedMaintenance.repairInvoice;

    
    /*Tabelas especializadas - FKs*/
    let maintenanceStatusSelect = document.getElementById("maintenanceStatus");
    maintenanceStatusSelect.value = viewedMaintenance.maintenanceStatus.maintenanceStatusId;

    let maintenancePrioritySelect = document.getElementById("maintenancePriority");
    maintenancePrioritySelect.value = viewedMaintenance.maintenancePriority.maintenancePriorityId;

    let maintenanceCategorySelect = document.getElementById("maintenanceCategory");
    maintenanceCategorySelect.value=viewedMaintenance.maintenanceCategory.maintenanceCategoryId;


    if(selectedMode === "edit"){

        document
            .querySelectorAll("input, textarea, select")
            .forEach(field => {field.disabled = false;});

    }else{
        document.querySelectorAll("input, textarea, select")
            .forEach(field => {field.disabled = true;});

        document.querySelector(".resave")
            .style.display = "none";
    }
    
    /*maintenance inner table*/
    const maintenanceHistory =
        maintenance.filter(item =>
            item.assetId === viewedMaintenance.assetId
        );

    renderMaintenanceInnerTable(
        maintenanceHistory
    );   
    
}


/*UPDATE*/
async function updateMaintenance(){

    const maintenanceId =parseInt(sessionStorage.getItem("viewMaintenanceId"));

    const { error } =
        await supabaseClient
            .from("maintenance")
            .update({
                assetId:document.getElementById("assetId").value,
                issueDescription:document.getElementById("issueDescription").value,
                maintenanceCategoryId:document.getElementById("maintenanceCategory").value,
                issueDate:document.getElementById("issueDate").value,
                supportTicket:document.getElementById("supportTicket").value,
                repairCost:document.getElementById("repairCost").value,
                repairInvoice:document.getElementById("repairInvoice").value,
                technicianNotes:document.getElementById("technicianNotes").value,
                maintenancePriorityId:document.getElementById("maintenancePriority").value,
                maintenanceStatusId:document.getElementById("maintenanceStatus").value
            })
            .eq("maintenanceId",maintenanceId);

    if(error){
        console.log(error);
        return;
    }

    alert("Record saved");

    closeViewMaintenance();

}

async function deleteMaintenance(maintenanceId){

    if(!confirm("Are you sure you want to delete it?")){
        return;
    }

    const { error } =await supabaseClient
            .from('maintenance')
            .delete()
            .eq(
                'maintenanceId',
                maintenanceId
            );

    if(error){
        console.log(error);
        return;
    }

    await renderMaintenance();

}

