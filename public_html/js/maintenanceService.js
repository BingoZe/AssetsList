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
                    type,
                    assetStatus
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
        console.log(error);
        return null;
    }

    return data;

}

function getMaintenanceMode(){

    try{
        return sessionStorage.getItem("mode");
    }
    catch(error){
        return "";
    }

}

async function initMaintenanceForm(){

    const maintenanceForm =document.querySelector(".maintenance-form");

    if(!maintenanceForm){
        return;
    }

    maintenanceForm.addEventListener( "submit",async(event)=>{

        event.preventDefault();

        const mode = getMaintenanceMode();

        if(mode === "edit"){
            updateMaintenance();
            return;
        }

        const assetId = Number(document.getElementById("assetSelect").value);

        const issueDescription = document.getElementById("issueDescription").value;

        const issueDate = document.getElementById("issueDate").value;

        const supportTicketNumber = document.getElementById("supportTicketNumber").value;

        const repairCost = document.getElementById("repairCost").value || 0;

        const repairInvoice = document.getElementById("repairInvoice").value;

        const technicianNotes =document.getElementById("technicianNotes").value;

        const priority = document.getElementById("priority").value;

        const maintenanceStatus = document.getElementById("maintenanceStatus").value;

        const maintenance = {
            assetId,
            issueDescription,
            issueDate,
            supportTicketNumber,
            repairCost,
            repairInvoice,
            technicianNotes,
            priority,
            maintenanceStatus
        };

        await createMaintenance(
            maintenance
        );

        alert("Maintenance order created");

        maintenanceForm.reset();

        loadPage("pages/maintenance.html");

    });

}


async function renderMaintenance(maintenance = null){

    if(!maintenance){
        maintenance = await getMaintenance();
    }

    let output = "";

    maintenance.forEach(item => {

        output += `
        <tr>

            <td>${item.maintenanceId}</td>

            <td>${item.assets.assetName}</td>

            <td>${item.issueDescription}</td>

            <td>${item.assets.type}</td>

            <td>${item.maintenanceStatus}</td>

            <td>${item.issueDate}</td>

            <td>${item.priority}</td>

            <td>

                <button
                    class="btTdItemView"
                    onclick="viewMaintenance(
                        '${item.maintenanceId}',
                        'view'
                    )">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button
                    class="btTdItemEdit"
                    onclick="viewMaintenance(
                        '${item.maintenanceId}',
                        'edit'
                    )">

                    <i class="fa-solid fa-pen-to-square"></i>

                </button>

                <button
                    class="btTdItemDelete"
                    onclick="deleteMaintenance(
                        '${item.maintenanceId}'
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

function viewMaintenance(
    maintenanceId,
    mode
){

    sessionStorage.setItem(
        "viewMaintenanceId",
        maintenanceId
    );

    sessionStorage.setItem(
        "mode",
        mode
    );

    loadPage(
        "pages/viewMaintenance.html"
    );

}

async function renderViewMaintenance(){

    const selectedMaintenanceId =
        parseInt(
            sessionStorage.getItem(
                "viewMaintenanceId"
            )
        );

    const selectedMode =
        sessionStorage.getItem("mode");

    const maintenance =
        await getMaintenance();

    const viewedMaintenance =
        maintenance.find(
            item =>
            item.maintenanceId ===
            selectedMaintenanceId
        );

    document.getElementById(
        "maintenanceId"
    ).value =
        viewedMaintenance.maintenanceId;

    document.getElementById(
        "issueDescription"
    ).value =
        viewedMaintenance.issueDescription;

    document.getElementById(
        "issueDate"
    ).value =
        viewedMaintenance.issueDate;

    document.getElementById(
        "supportTicketNumber"
    ).value =
        viewedMaintenance.supportTicketNumber;

    document.getElementById(
        "repairCost"
    ).value =
        viewedMaintenance.repairCost;

    document.getElementById(
        "repairInvoice"
    ).value =
        viewedMaintenance.repairInvoice;

    document.getElementById(
        "technicianNotes"
    ).value =
        viewedMaintenance.technicianNotes;

    document.getElementById(
        "priority"
    ).value =
        viewedMaintenance.priority;

    document.getElementById(
        "maintenanceStatus"
    ).value =
        viewedMaintenance.maintenanceStatus;

    if(selectedMode === "edit"){

        document
            .querySelectorAll(
                "input, textarea, select"
            )
            .forEach(
                field => {
                    field.disabled = false;
                }
            );

    }else{

        document
            .querySelectorAll(
                "input, textarea, select"
            )
            .forEach(
                field => {
                    field.disabled = true;
                }
            );

        document
            .querySelector(".resave")
            .style.display = "none";

    }

}


async function updateMaintenance(){

    const maintenanceId =
        parseInt(
            sessionStorage.getItem(
                "viewMaintenanceId"
            )
        );

    const { error } =
        await supabaseClient
            .from("maintenance")
            .update({

                issueDescription:
                    document.getElementById(
                        "issueDescription"
                    ).value,

                issueDate:
                    document.getElementById(
                        "issueDate"
                    ).value,

                supportTicketNumber:
                    document.getElementById(
                        "supportTicketNumber"
                    ).value,

                repairCost:
                    document.getElementById(
                        "repairCost"
                    ).value,

                repairInvoice:
                    document.getElementById(
                        "repairInvoice"
                    ).value,

                technicianNotes:
                    document.getElementById(
                        "technicianNotes"
                    ).value,

                priority:
                    document.getElementById(
                        "priority"
                    ).value,

                maintenanceStatus:
                    document.getElementById(
                        "maintenanceStatus"
                    ).value

            })
            .eq(
                "maintenanceId",
                maintenanceId
            );

    if(error){
        console.log(error);
        return;
    }

    alert("Record saved");

    loadPage(
        "pages/maintenance.html"
    );

}

async function deleteMaintenance(
    maintenanceId
){

    if(
        !confirm(
            "Are you sure you want to delete it?"
        )
    ){
        return;
    }

    const { error } =
        await supabaseClient
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

