/* mini controlador de eventos dos campos select na Settings*/

function initAssetTypeSettings() {

    const addElement =
        document.querySelector(".addSetting");

    const editElement =
        document.querySelector(".editSetting");

    const removeElement =
        document.querySelector(".removeSetting");

    const container =
        document.getElementById("newAssetTypeContainer");

    addElement.addEventListener("click", () => {

        container.innerHTML = `
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

                container.innerHTML = "";

                showActionButtons();

                await renderTypeField();

        });

        document
            .getElementById("cancelAssetType")
            .addEventListener("click", () => {

                container.innerHTML = "";
        
                showActionButtons();

            });

    });
    
    /* BOTAO EDITAR*/
    
    editElement.addEventListener("click", async () => {
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
        
        container.innerHTML = `
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

                container.innerHTML = "";

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

                container.innerHTML = "";

                showActionButtons();

                await renderTypeField();

            });

    });
    
    /* BOTAO REMOVER*/    
    
    removeElement.addEventListener("click", async () => {
        const targetItem = 
                Number(document.getElementById("typeSelect").value);
        
        if(!targetItem){
            return;
        }

        await deleteAssetType(targetItem);

    });
 
    /* FUNCOES FILHAS*/
    function hideActionButtons() {
        addElement.style.display = "none";
        editElement.style.display = "none";
        removeElement.style.display = "none";
    }

    function showActionButtons() {
        addElement.style.display = "";
        editElement.style.display = "";
        removeElement.style.display = "";
    }    

}


