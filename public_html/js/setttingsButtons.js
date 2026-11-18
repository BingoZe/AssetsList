/* mini controlador de eventos dos campos select na Settings*/

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
        container: document.querySelector(".manageContainer")
    };

}


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

}
