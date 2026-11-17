/* MAINTENANCE SERVICE */

/* HELPERS */

async function getSettings(){

    try{

        const { data, error } = await supabaseClient
            .from('settings')
            .select(`
                *
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

async function createSettings(settings){

    const { data, error } =
        await supabaseClient
            .from('settings')
            .insert([settings]);

    if(error){
        console.log("ERROR:");
        console.log(error);
        return null;
    }

    return data;

}

async function initSettingsForm(){

    const settingsForm =document.querySelector(".settings-form");

    if(!settingsForm){
        return;
    }

    settingsForm.addEventListener( "submit",async(event)=>{

        event.preventDefault();


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

        settingsForm.reset();

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
/*
async function deleteSettings(settingsId){

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
*/
