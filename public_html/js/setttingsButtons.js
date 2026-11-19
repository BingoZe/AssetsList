/* mini controlador de eventos dos campos select na Settings*/


/* ASSET TYPE UI SETTINGS*/
function initAssetTypeSettings() {

    const elements = getElements();

    elements.addElement.addEventListener("click", () => {

        elements.container.innerHTML = `
            <input
                id="newAssetType"
                type="text"
                placeholder="New Asset Type">

            <button
                type="button"
                class="settingsButton"
                id="confirmAssetType">

                <i class="fa-solid fa-check"></i>

            </button>

            <button
                type="button"
                class="settingsButton"
                id="cancelAssetType">

                <i class="fa-solid fa-xmark"></i>

            </button>
        `;
        
        hideActionButtons();
        
        document
            .getElementById("confirmAssetType")
            .addEventListener("click", async () => {

                const newAssetTypeName = 
                    document.getElementById("newAssetType").value;

                if (!newAssetTypeName) {
                    alert("Please enter a name.");
                    return;
                }

                await createAssetType(newAssetTypeName);

                elements.container.innerHTML = "";

                showActionButtons();

                await renderTypeField();

        });

        document
            .getElementById("cancelAssetType")
            .addEventListener("click", () => {

                elements.container.innerHTML = "";
        
                showActionButtons();

            });

    });
    
    /* BOTAO EDITAR*/
    
    elements.editElement.addEventListener("click", async () => {
        const assetType = await getAssetType();
        
        const targetItem = 
                Number(document.getElementById("typeSelect").value);
        
        if (!targetItem) {
           alert("Please select an Asset Type.");
           return;
       }       
        const selectedAssetType = assetType.find(item =>
            item.assetTypeId === targetItem
        );
        
        elements.container.innerHTML = `
            <input
                id="newAssetType"
                type="text"
                value="${selectedAssetType.name}">

            <button
                type="button"
                class="settingsButton"
                id="confirmAssetType">

                <i class="fa-solid fa-check"></i>

            </button>

            <button
                type="button"
                class="settingsButton"
                id="cancelAssetType">

                <i class="fa-solid fa-xmark"></i>

            </button>
        `;
        const input =
            document.getElementById("newAssetType");
        
        input.focus();
        input.select();
        
        
        hideActionButtons();
        
        /*ativa listener ao botao cancelar e retorna select*/
        document
            .getElementById("cancelAssetType")
            .addEventListener("click", () => {

                elements.container.innerHTML = "";

                showActionButtons();

            });
            
        /*adiciona listener ao botao confirmar. Invoca update.*/    
        document
            .getElementById("confirmAssetType")
            .addEventListener("click", async () => {

            const newName =
                document.getElementById("newAssetType").value;

            await updateAssetType(
                selectedAssetType.assetTypeId,
                newName
             );

                elements.container.innerHTML = "";

                showActionButtons();

                await renderTypeField();

            });

    });
    
    /* BOTAO REMOVER*/    
    
    elements.removeElement.addEventListener("click", async () => {
        const targetItem = 
                Number(document.getElementById("typeSelect").value);
        
        if(!targetItem){
            return;
        }

        await deleteAssetType(targetItem);

    });
 
    /* FUNCOES FILHAS*/
    function hideActionButtons() {
        elements.addElement.style.display = "none";
        elements.editElement.style.display = "none";
        elements.removeElement.style.display = "none";
    }

    function showActionButtons() {
        elements.addElement.style.display = "";
        elements.editElement.style.display = "";
        elements.removeElement.style.display = "";
    }    

}

function getElements(){

    return {
        addElement: document.querySelector(".addSetting"),
        editElement: document.querySelector(".editSetting"),
        removeElement: document.querySelector(".removeSetting"),
        container: document.querySelector(".typeContainer")
    };

}

/* ASSET STATUS UI SETTINGS */
function initAssetStatusSettings() {

    const elements = getAssetStatusElements();

    elements.addElement.addEventListener("click", () => {

        elements.container.innerHTML = `
            <input
                id="newAssetStatus"
                type="text"
                placeholder="New Asset Status">

            <button
                type="button"
                class="settingsButton"
                id="confirmAssetStatus">

                <i class="fa-solid fa-check"></i>

            </button>

            <button
                type="button"
                class="settingsButton"
                id="cancelAssetStatus">

                <i class="fa-solid fa-xmark"></i>

            </button>
        `;

        hideActionButtons();

        document
            .getElementById("confirmAssetStatus")
            .addEventListener("click", async () => {

                const newAssetStatusName =
                    document.getElementById("newAssetStatus").value;

                if (!newAssetStatusName) {
                    alert("Please enter a name.");
                    return;
                }

                await createAssetStatus(newAssetStatusName);

                elements.container.innerHTML = "";

                showActionButtons();

                await renderStatusField();

            });

        document
            .getElementById("cancelAssetStatus")
            .addEventListener("click", () => {

                elements.container.innerHTML = "";

                showActionButtons();

            });

    });

    /* BOTAO EDITAR */

    elements.editElement.addEventListener("click", async () => {

        const assetStatus =
            await getAssetStatus();

        const targetItem =
            Number(document.getElementById("statusSelect").value);

        if (!targetItem) {
            alert("Please select an Asset Status.");
            return;
        }

        const selectedAssetStatus =
            assetStatus.find(item =>
                item.assetStatusId === targetItem
            );

        elements.container.innerHTML = `
            <input
                id="newAssetStatus"
                type="text"
                value="${selectedAssetStatus.name}">

            <button
                type="button"
                class="settingsButton"
                id="confirmAssetStatus">

                <i class="fa-solid fa-check"></i>

            </button>

            <button
                type="button"
                class="settingsButton"
                id="cancelAssetStatus">

                <i class="fa-solid fa-xmark"></i>

            </button>
        `;

        const input =
            document.getElementById("newAssetStatus");
        
        input.focus();
        input.select();

        hideActionButtons();

        document
            .getElementById("cancelAssetStatus")
            .addEventListener("click", () => {

                elements.container.innerHTML = "";

                showActionButtons();

            });

        document
            .getElementById("confirmAssetStatus")
            .addEventListener("click", async () => {

                const newName =
                    document.getElementById("newAssetStatus").value;

                await updateAssetStatus(
                    selectedAssetStatus.assetStatusId,
                    newName
                );

                elements.container.innerHTML = "";

                showActionButtons();

                await renderStatusField();

            });

    });

    /* BOTAO REMOVER */

    elements.removeElement.addEventListener("click", async () => {

        const targetItem =
            Number(document.getElementById("statusSelect").value);

        if (!targetItem) {
            return;
        }

        await deleteAssetStatus(targetItem);

    });

    function hideActionButtons() {

        elements.addElement.style.display = "none";
        elements.editElement.style.display = "none";
        elements.removeElement.style.display = "none";

    }

    function showActionButtons() {

        elements.addElement.style.display = "";
        elements.editElement.style.display = "";
        elements.removeElement.style.display = "";

    }

}

function getAssetStatusElements() {

    return {
        addElement: document.querySelector(".addAssetStatus"),
        editElement: document.querySelector(".editAssetStatus"),
        removeElement: document.querySelector(".removeAssetStatus"),
        container: document.querySelector(".assetStatusContainer")
    };

}/* LOCATION */

/* ASSET LOCATION UI SETTINGS */

function initAssetLocationSettings() {

    const elements = getAssetLocationElements();

    elements.addElement.addEventListener("click", () => {

        elements.container.innerHTML = `
            <input
                id="newAssetLocation"
                type="text"
                placeholder="New Asset Location">

            <button
                type="button"
                class="settingsButton"
                id="confirmAssetLocation">

                <i class="fa-solid fa-check"></i>

            </button>

            <button
                type="button"
                class="settingsButton"
                id="cancelAssetLocation">

                <i class="fa-solid fa-xmark"></i>

            </button>
        `;

        hideActionButtons();

        document
            .getElementById("confirmAssetLocation")
            .addEventListener("click", async () => {

                const newAssetLocationName =
                    document.getElementById("newAssetLocation").value;

                if (!newAssetLocationName) {
                    alert("Please enter a name.");
                    return;
                }

                await createAssetLocation(newAssetLocationName);

                elements.container.innerHTML = "";

                showActionButtons();

                await renderLocationField();

            });

        document
            .getElementById("cancelAssetLocation")
            .addEventListener("click", () => {

                elements.container.innerHTML = "";

                showActionButtons();

            });

    });

    /* BOTAO EDITAR */

    elements.editElement.addEventListener("click", async () => {

        const assetLocation =
            await getAssetLocation();

        const targetItem =
            Number(document.getElementById("locationSelect").value);
            
        if (!targetItem) {
            alert("Please select a Location.");
            return;
        }

        const selectedAssetLocation =
            assetLocation.find(item =>
                item.assetLocationId === targetItem
            );

        elements.container.innerHTML = `
            <input
                id="newAssetLocation"
                type="text"
                value="${selectedAssetLocation.name}">

            <button
                type="button"
                class="settingsButton"
                id="confirmAssetLocation">

                <i class="fa-solid fa-check"></i>

            </button>

            <button
                type="button"
                class="settingsButton"
                id="cancelAssetLocation">

                <i class="fa-solid fa-xmark"></i>

            </button>
        `;

        const input =
            document.getElementById("newAssetLocation");
       
        input.focus();
        input.select();

        hideActionButtons();

        document
            .getElementById("cancelAssetLocation")
            .addEventListener("click", () => {

                elements.container.innerHTML = "";

                showActionButtons();

            });

        document
            .getElementById("confirmAssetLocation")
            .addEventListener("click", async () => {

                const newName =
                    document.getElementById("newAssetLocation").value;
                    
                await updateAssetLocation(
                    selectedAssetLocation.assetLocationId,
                    newName
                );

                elements.container.innerHTML = "";

                showActionButtons();

                await renderLocationField();

            });

    });

    /* BOTAO REMOVER */

    elements.removeElement.addEventListener("click", async () => {

        const targetItem =
            Number(document.getElementById("locationSelect").value);

        if (!targetItem) {
            return;
        }

        await deleteAssetLocation(targetItem);

    });

    function hideActionButtons() {

        elements.addElement.style.display = "none";
        elements.editElement.style.display = "none";
        elements.removeElement.style.display = "none";

    }

    function showActionButtons() {

        elements.addElement.style.display = "";
        elements.editElement.style.display = "";
        elements.removeElement.style.display = "";

    }

}

function getAssetLocationElements() {

    return {
        addElement: document.querySelector(".addLocation"),
        editElement: document.querySelector(".editLocation"),
        removeElement: document.querySelector(".removeLocation"),
        container: document.querySelector(".locationContainer")
    };

}

/* MAITENANCE STATUS UI SETTINGS */
function initMtnStatusSettings() {

    const elements = getMntStatusElements();

    elements.addElement.addEventListener("click", () => {

        elements.container.innerHTML = `
            <input
                id="newMaintenanceStatus"
                type="text"
                placeholder="New Maintenance Status">

            <button
                type="button"
                class="settingsButton"
                id="confirmMtnStatus">

                <i class="fa-solid fa-check"></i>

            </button>

            <button
                type="button"
                class="settingsButton"
                id="cancelMtnStatus">

                <i class="fa-solid fa-xmark"></i>

            </button>
        `;

        hideActionButtons();

        document
            .getElementById("confirmMtnStatus")
            .addEventListener("click", async () => {

                const newMntStatusName =
                    document.getElementById(
                    "newMaintenanceStatus").value;

                if (!newMntStatusName) {
                    alert("Please enter a name.");
                    return;
                }

                await createMaintenanceStatus(
                        newMntStatusName);

                elements.container.innerHTML = "";

                showActionButtons();

                await renderMaintenanceStatusField();

            });

        document
            .getElementById("cancelMtnStatus")
            .addEventListener("click", () => {

                elements.container.innerHTML = "";

                showActionButtons();

            });

    });

    /* BOTAO EDITAR */

    elements.editElement.addEventListener("click", async () => {

        const maintenanceStatus =
            await getMaintenanceStatus();

        const targetItem =
            Number(document.getElementById("maintenanceStatus").value);
            
        if (!targetItem) {
            alert("Please select a Status.");
            return;
        }

        const selectedMtnStatus =
            maintenanceStatus.find(item =>
                item.maintenanceStatusId === targetItem
            );

        elements.container.innerHTML = `
            <input
                id="newMaintenanceStatus"
                type="text"
                value="${selectedMtnStatus.name}">

            <button
                type="button"
                class="settingsButton"
                id="confirmMtnStatus">

                <i class="fa-solid fa-check"></i>

            </button>

            <button
                type="button"
                class="settingsButton"
                id="cancelMtnStatus">

                <i class="fa-solid fa-xmark"></i>

            </button>
        `;

        const input =
            document.getElementById("newMaintenanceStatus");
       
        input.focus();
        input.select();

        hideActionButtons();

        document
            .getElementById("cancelMtnStatus")
            .addEventListener("click", () => {

                elements.container.innerHTML = "";

                showActionButtons();

            });

        document
            .getElementById("confirmMtnStatus")
            .addEventListener("click", async () => {

                const newName =
                    document.getElementById(
                    "newMaintenanceStatus").value;
                    
                await updateMaintenanceStatus(
                    selectedMtnStatus.maintenanceStatusId,
                    newName
                );

                elements.container.innerHTML = "";

                showActionButtons();

                await renderMaintenanceStatusField();

            });

    });

    /* BOTAO REMOVER */

    elements.removeElement.addEventListener("click", async () => {

        const targetItem =
            Number(document.getElementById(
            "maintenanceStatus").value);

        if (!targetItem) {
            return;
        }

        await deleteMaintenanceStatus(targetItem);

    });

    function hideActionButtons() {

        elements.addElement.style.display = "none";
        elements.editElement.style.display = "none";
        elements.removeElement.style.display = "none";

    }

    function showActionButtons() {

        elements.addElement.style.display = "";
        elements.editElement.style.display = "";
        elements.removeElement.style.display = "";

    }

}

function getMntStatusElements() {

    return {
        addElement: document.querySelector(
                ".addMaintenanceStatus"),
        editElement: document.querySelector(
                ".editMaintenanceStatus"),
        removeElement: document.querySelector(
                ".removeMaintenanceStatus"),
        container: document.querySelector(
                ".maintenanceStatusContainer")
    };

}

/* MAITENANCE CATEGORY UI SETTINGS */
function initMtnCategorySettings() {

    const elements = getMntCategoryElements();

    elements.addElement.addEventListener("click", () => {
        
        elements.container.innerHTML = `
            <input
                id="newMaintenanceCategory"
                type="text"
                placeholder="New Maintenance Category">

            <button
                type="button"
                class="settingsButton"
                id="confirmMtnCategory">

                <i class="fa-solid fa-check"></i>

            </button>

            <button
                type="button"
                class="settingsButton"
                id="cancelMtnCategory">

                <i class="fa-solid fa-xmark"></i>

            </button>
        `;

        hideActionButtons();
        
        document
            .getElementById("confirmMtnCategory")
            .addEventListener("click", async () => {

                const newMntCategoryName =
                    document.getElementById(
                    "newMaintenanceCategory").value;
                
                if (!newMntCategoryName) {
                    alert("Please enter a name.");
                    return;
                }

                await createMaintenanceCategory(
                        newMntCategoryName);

                elements.container.innerHTML = "";

                showActionButtons();

                await renderMaintenanceCategoryField();

            });

        document
            .getElementById("cancelMtnCategory")
            .addEventListener("click", () => {

                elements.container.innerHTML = "";

                showActionButtons();

            });

    });

    /* BOTAO EDITAR */

    elements.editElement.addEventListener("click", async () => {

        const maintenanceCategory =
            await getMaintenanceCategory();

        const targetItem =
            Number(document.getElementById("maintenanceCategory").value);
            
        if (!targetItem) {
            alert("Please select a Category.");
            return;
        }

        const selectedMtnCategory =
            maintenanceCategory.find(item =>
                item.maintenanceCategoryId === targetItem
            );

        elements.container.innerHTML = `
            <input
                id="newMaintenanceCategory"
                type="text"
                value="${selectedMtnCategory.name}">

            <button
                type="button"
                class="settingsButton"
                id="confirmMtnCategory">

                <i class="fa-solid fa-check"></i>

            </button>

            <button
                type="button"
                class="settingsButton"
                id="cancelMtnCategory">

                <i class="fa-solid fa-xmark"></i>

            </button>
        `;

        const input =
            document.getElementById("newMaintenanceCategory");
       
        input.focus();
        input.select();

        hideActionButtons();

        document
            .getElementById("cancelMtnCategory")
            .addEventListener("click", () => {

                elements.container.innerHTML = "";

                showActionButtons();

            });

        document
            .getElementById("confirmMtnCategory")
            .addEventListener("click", async () => {

                const newName =
                    document.getElementById(
                    "newMaintenanceCategory").value;
                    
                await updateMaintenanceCategory(
                    selectedMtnCategory.maintenanceCategoryId,
                    newName
                );

                elements.container.innerHTML = "";

                showActionButtons();

                await renderMaintenanceCategoryField();

            });

    });

    /* BOTAO REMOVER */

    elements.removeElement.addEventListener("click", async () => {

        const targetItem =
            Number(document.getElementById(
            "maintenanceCategory").value);

        if (!targetItem) {
            return;
        }

        await deleteMaintenanceCategory(targetItem);

    });

    function hideActionButtons() {

        elements.addElement.style.display = "none";
        elements.editElement.style.display = "none";
        elements.removeElement.style.display = "none";

    }

    function showActionButtons() {

        elements.addElement.style.display = "";
        elements.editElement.style.display = "";
        elements.removeElement.style.display = "";

    }

}

function getMntCategoryElements() {

    return {
        addElement: document.querySelector(
                ".addMaintenanceCategory"),
        editElement: document.querySelector(
                ".editMaintenanceCategory"),
        removeElement: document.querySelector(
                ".removeMaintenanceCategory"),
        container: document.querySelector(
                ".maintenanceCategoryContainer")
    };

}

/* MAITENANCE CATEGORY UI SETTINGS */
function initMtnPrioritySettings() {

    const elements = getMntPriorityElements();

    elements.addElement.addEventListener("click", () => {
        
        elements.container.innerHTML = `
            <input
                id="newMaintenancePriority"
                type="text"
                placeholder="New Maintenance Priority">

            <button
                type="button"
                class="settingsButton"
                id="confirmMtnPriority">

                <i class="fa-solid fa-check"></i>

            </button>

            <button
                type="button"
                class="settingsButton"
                id="cancelMtnPriority">

                <i class="fa-solid fa-xmark"></i>

            </button>
        `;

        hideActionButtons();
        
        document
            .getElementById("confirmMtnPriority")
            .addEventListener("click", async () => {

                const newMntPriorityName =
                    document.getElementById(
                    "newMaintenancePriority").value;
                
                if (!newMntPriorityName) {
                    alert("Please enter a name.");
                    return;
                }

                await createMaintenancePriority(
                        newMntPriorityName);

                elements.container.innerHTML = "";

                showActionButtons();

                await renderMaintenancePriorityField();

            });

        document
            .getElementById("cancelMtnPriority")
            .addEventListener("click", () => {

                elements.container.innerHTML = "";

                showActionButtons();

            });

    });

    /* BOTAO EDITAR */

    elements.editElement.addEventListener("click", async () => {

        const maintenancePriority =
            await getMaintenancePriority();

        const targetItem =
            Number(document.getElementById("maintenancePriority").value);
            
        if (!targetItem) {
            alert("Please select a Category.");
            return;
        }

        const selectedMtnPriority =
            maintenancePriority.find(item =>
                item.maintenancePriorityId === targetItem
            );

        elements.container.innerHTML = `
            <input
                id="newMaintenancePriority"
                type="text"
                value="${selectedMtnPriority.name}">

            <button
                type="button"
                class="settingsButton"
                id="confirmMtnPriority">

                <i class="fa-solid fa-check"></i>

            </button>

            <button
                type="button"
                class="settingsButton"
                id="cancelMtnPriority">

                <i class="fa-solid fa-xmark"></i>

            </button>
        `;

        const input =
            document.getElementById("newMaintenancePriority");
       
        input.focus();
        input.select();

        hideActionButtons();

        document
            .getElementById("cancelMtnPriority")
            .addEventListener("click", () => {

                elements.container.innerHTML = "";

                showActionButtons();

            });

        document
            .getElementById("confirmMtnPriority")
            .addEventListener("click", async () => {

                const newName =
                    document.getElementById(
                    "newMaintenancePriority").value;
                    
                await updateMaintenancePriority(
                    selectedMtnPriority.maintenancePriorityId,
                    newName
                );

                elements.container.innerHTML = "";

                showActionButtons();

                await renderMaintenancePriorityField();

            });

    });

    /* BOTAO REMOVER */

    elements.removeElement.addEventListener("click", async () => {

        const targetItem =
            Number(document.getElementById(
            "maintenancePriority").value);

        if (!targetItem) {
            return;
        }

        await deleteMaintenancePriority(targetItem);

    });

    function hideActionButtons() {

        elements.addElement.style.display = "none";
        elements.editElement.style.display = "none";
        elements.removeElement.style.display = "none";

    }

    function showActionButtons() {

        elements.addElement.style.display = "";
        elements.editElement.style.display = "";
        elements.removeElement.style.display = "";

    }

}

function getMntPriorityElements() {

    return {
        addElement: document.querySelector(
                ".addMaintenancePriority"),
        editElement: document.querySelector(
                ".editMaintenancePriority"),
        removeElement: document.querySelector(
                ".removeMaintenancePriority"),
        container: document.querySelector(
                ".maintenancePriorityContainer")
    };

}
