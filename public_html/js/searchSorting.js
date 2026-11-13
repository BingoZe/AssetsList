
/*---------------------------------------------*/
/* FILTROS E ORDENACAO - ASSETS
/*---------------------------------------------*/


async function searchElement(){
    const assets = await getAssets();  
    
    /*campo busca*/
    const lookupItem = document.getElementById("searchField");
    
    /*campo status*/
    const statusLookupItem = document.getElementById("assetStatus");
    
    /*campo type*/
    const typeLookupItem = document.getElementById("typeSelect");
    
    /*campo type*/
    const locationLookupItem = document.getElementById("locationSelect");

    /*campo responsible user*/
    const responsibleUserLookupItem = document.getElementById("responsibleUserSelect");

    /*campo acquisition year*/
    const acquisitionYearLookupItem = document.getElementById("acquisitionYearSelect");
    
    /* adiciona evento ao campo search - Asset Register*/
    lookupItem.addEventListener("input",async function(){
                
        const searchItem = lookupItem.value.toLowerCase();   
        
        /*filtro por ID, service tag ou nome*/
        const filteredAssets = assets.filter(item=>{
            const assetId = item.assetId;

            return(
                item.assetId.toString().includes(searchItem) ||
                //pesquisa por id do asset ou qualquer ID + display name
                [`ast-${assetId}`, `ast${assetId}`]
                    .some(name => name.toLowerCase().includes(searchItem)) ||
                    
                item.assetName.toLowerCase()
                .includes(searchItem) ||
                item.serviceTag.toLowerCase()
                .includes(searchItem)||
                item.assetId.toString()===searchItem
        );
    });
        
        renderAssets(filteredAssets);
    }); 
    
    
   /* adiciona evento ao select status - Asset Register*/

    statusLookupItem.addEventListener("change",async function(){
                
        const searchItem = statusLookupItem.value.toLowerCase();   
        
        const filteredAssets = assets.filter(asset=>
            asset.assetStatus.name.toLowerCase()===searchItem);
        
        if(searchItem !=="all status"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
    }); 

    typeLookupItem.addEventListener("change",async function(){
                
        const searchItem = typeLookupItem.value.toLowerCase();   
        
        const filteredAssets = assets.filter(asset=>
            asset.assetType.name.toLowerCase()
            .includes(searchItem));
    
        if(searchItem !=="all types"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
    }); 
    
    locationLookupItem.addEventListener("change",async function(){
                
        const searchItem = locationLookupItem.value.toLowerCase();   
        
        const filteredAssets = assets.filter(asset=>
            asset.assetLocation.name.toLowerCase()
            .includes(searchItem));

        if(searchItem !=="all locations"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
        }); 
    
    
    responsibleUserLookupItem.addEventListener("change",async function(){
                
        const searchItem = responsibleUserLookupItem.value.trim().toLowerCase(); 

        const filteredAssets = assets.filter(asset=>{
            const fullName = `${asset.users?.firstName ?? ""} ${asset.users?.lastName ?? ""}`
                .trim()
                .toLowerCase();

        return fullName === searchItem;
    });
            
         if(searchItem !=="all users"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
    });     

    acquisitionYearLookupItem.addEventListener("change",async function(){
                
        const searchItem = acquisitionYearLookupItem.value; ; 
        
        const filteredAssets = assets.filter(asset=>
            asset.acquisitionYear.toString() ===searchItem);
       
        if(searchItem !=="All Years"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
    });     
        

};

/*renderAcquisitionYear*/
async function renderAcquisitionYearFilter(assets = null){
    
    if(!assets){
        assets = await getAssets();
    }
    
    let output = `<option selected>All Years</option>`;
    const uniqueYear = [];
    
    assets.forEach((asset) => {
        if(!uniqueYear.includes(asset.acquisitionYear)){
            uniqueYear.push(asset.acquisitionYear);
            
            output += `
                <option>${asset.acquisitionYear}</option>
            `;
        }
    });

    document.querySelector(".acquisitionYearSelect").innerHTML = output;
};

/*RenderUser*/
async function renderResponsibleUserFilter(assets = null){
    
    if(!assets){
        assets = await getAssets();
    }
    
    let output = `<option selected>All Users</option>`;
    const uniqueUser = []; 
    
    assets.forEach((asset) => {
        
        /*mostra apenas user unico no filtro*/
        if(!uniqueUser.includes(asset.userId)){
        uniqueUser.push(asset.userId);
            
        output += `
            <option>${asset.users.firstName} ${asset.users.lastName}</option>
        `;
        }
    });

    document.querySelector(".responsibleUserSelect").innerHTML = output;
};

/*RenderLocation*/
async function renderLocationFilter(assets = null){
    
    if(!assets){
        assets = await getAssets();
    }
    
    let output = `<option selected>All Locations</option>`;
    const uniqueLocation = []; 
    
    assets.forEach((asset) => {
        
        if(!uniqueLocation.includes(asset.assetLocationId)){
        uniqueLocation.push(asset.assetLocationId);

        output += `
            <option>${asset.assetLocation.name}</option>
        `;
        }
    });

    document.querySelector(".locationSelect").innerHTML = output;
};

/*RenderStatus*/
async function renderStatusFilter(assets = null){
    
    if(!assets){
        assets = await getAssets();
    }
    
    let output = `<option selected>All Status</option>`;
    const uniqueStatus = []; 
    
    assets.forEach((asset) => {
        
        if(!uniqueStatus.includes(asset.assetStatusId)){
        uniqueStatus.push(asset.assetStatusId);

        output += `
            <option>${asset.assetStatus.name}</option>
        `;
        }
    });

    document.querySelector(".statusSelect").innerHTML = output;
};

/*RenderType*/
async function renderTypeFilter(assets = null){
    
    if(!assets){
        assets = await getAssets();
    }
    
    let output = `<option selected>All Types</option>`;
    const uniqueType = []; 
    
    assets.forEach((asset) => {
        
        if(!uniqueType.includes(asset.assetTypeId)){
        uniqueType.push(asset.assetTypeId);

        output += `
            <option>${asset.assetType.name}</option>
        `;
        }
    });

    document.querySelector(".typeSelect").innerHTML = output;
};


/*---------------------------------------------*/
/* SORTING USANDO ALGORITMO DE ORDENACAO BUBBLE SORT*/
/*---------------------------------------------*/

async function btnSort(){
    
    const sortItem = document.querySelectorAll(".sortingButton");
    
    let sortDirection = "asc"; /*define estado inicial*/

    sortItem.forEach(button =>{
        button.addEventListener("click",async function(){ /*evento em cada botao sort*/
            const assets = await getAssets();
            const sortedAssets = [...assets]; /*faz uma copia do array para ordenacao bubble sort*/
    
            const sortField = button.dataset.sort;/*captura o botao adequado do HTML usando campo dinamico*/


            switch(sortDirection){
                case "asc":
                
                    /*implementa bubble sort ascendente*/
                    for(let i=0; i < sortedAssets.length; i++){

                        for(let j=0;j < sortedAssets.length-1-i; j++){

                            if(sortedAssets[j][sortField] > sortedAssets[j+1][sortField]){

                                let temp = sortedAssets[j];
                                sortedAssets[j] = sortedAssets[j+1];
                                sortedAssets[j+1] = temp;                        
                            }                    
                        }
                    } 
                    
                sortDirection = "desc";
                break;
                
                case "desc":
                    /*implementa bubble sort descendente*/
                    for(let i=0; i < sortedAssets.length; i++){

                        for(let j=0;j < sortedAssets.length-1-i; j++){

                            if(sortedAssets[j][sortField] < sortedAssets[j+1][sortField]){

                                let temp = sortedAssets[j];
                                sortedAssets[j] = sortedAssets[j+1];
                                sortedAssets[j+1] = temp;                        
                            }                    
                        }
                    }                     
                sortDirection = "asc";
                break;
                 
            };

                renderAssets(sortedAssets);
            
        });
          
    });

};

/*---------------------------------------------*/
/* FILTROS E ORDENACAO - USERS
/*---------------------------------------------*/


/*Search users*/

async function searchUserElement(){
    const users = await getUsers(); 
    
    /*campo busca*/
    const lookupItem = document.getElementById("searchField");
  
    /*campo status*/
    const statusLookupItem = document.getElementById("userStatus");
    
    /*campo role*/
    const rolelookupItem = document.getElementById("roleSelect");
    
    /*campo userType*/
    const userTypelookupItem = document.getElementById("userType");
  
    /* adiciona evento ao campo search - Users*/
    lookupItem.addEventListener("input",async function(){

        const searchItem = lookupItem.value.toLowerCase();   
 
        /*filtro por ID,nome ou sobrenome*/
        const filteredUsers = users.filter(user=>
                user.firstName.toLowerCase().includes(searchItem) ||
                user.lastName.toLowerCase().includes(searchItem) ||
                user.role.toLowerCase().includes(searchItem) ||
                user.userId.toString().includes(searchItem)
            );
 
        renderUsers(filteredUsers);
    }); 
    
   /* adiciona evento ao select status - Users*/

    statusLookupItem.addEventListener("change",async function(){
                
        const searchItem = statusLookupItem.value.toLowerCase();   
        
        const filteredUser = users.filter(user=>
            user.userStatus.toLowerCase()===searchItem);
    
        if(searchItem !=="all status"){
            renderUsers(filteredUser);

        }else /*mostra todos os users*/
            renderUsers();
    }); 

    rolelookupItem.addEventListener("change",async function(){
                
        const searchItem = rolelookupItem.value.toLowerCase();   
        
        const filteredUser = users.filter(user=>
            user.role.toLowerCase()
            .includes(searchItem));
    
        if(searchItem !=="all roles"){
            renderUsers(filteredUser);

        }else 
            renderUsers();
    }); 
    userTypelookupItem.addEventListener("change",async function(){
                
        const searchItem = userTypelookupItem.value.toLowerCase();   
        
        const filteredUser = users.filter(user=>
            user.userType.toLowerCase()
            .includes(searchItem));
    
        if(searchItem !=="all types"){
            renderUsers(filteredUser);

        }else 
            renderUsers();
    }); 

};


/*RenderUser*/
async function renderRolesFilter(){
    const users = await getUsers();
    
    let output = `<option selected>All Roles</option>`;
    const uniqueRole = []; 
   
    users.forEach((user) => {
        
        /*mostra apenas role unico no filtro*/
        if(!uniqueRole.includes(user.role)){
            uniqueRole.push(user.role);
            
        output += `
            <option>${user.role}</option>
        `;
        }
    });

    document.getElementById("roleSelect").innerHTML = output;
};

/*RenderType*/
async function renderTypesFilter(){
    const users = await getUsers();
    
    let output = `<option selected>All Types</option>`;
    const uniqueType = []; 
   
    users.forEach((user) => {
        
        /*mostra apenas role unico no filtro*/
        if(!uniqueType.includes(user.userType)){
            uniqueType.push(user.userType);
            
        output += `
            <option>${user.userType}</option>
        `;
        }
    });

    document.getElementById("userType").innerHTML = output;
};

/* BUBBLE SORT - users*/

function btnSort(){
    
    const sortItem = document.querySelectorAll(".sortingButton");
    
    let sortDirection = "asc"; /*define estado inicial*/
    
    
    
    sortItem.forEach(button =>{
        button.addEventListener("click",function(){ /*evento em cada botao sort*/
            const assets = getAssets();
            const sortedAssets = [...assets]; /*faz uma copia do array para ordenacao bubble sort*/
            const sortField = button.dataset.sort;/*captura o botao adequado do HTML usando campo dinamico*/


            switch(sortDirection){
                case "asc":
                
                    /*implementa bubble sort ascendente*/
                    for(let i=0; i < sortedAssets.length; i++){

                        for(let j=0;j < sortedAssets.length-1-i; j++){

                            if(sortedAssets[j][sortField] > sortedAssets[j+1][sortField]){

                                let temp = sortedAssets[j];
                                sortedAssets[j] = sortedAssets[j+1];
                                sortedAssets[j+1] = temp;                        
                            }                    
                        }
                    } 
                    
                sortDirection = "desc";
                break;
                
                case "desc":
                    /*implementa bubble sort descendente*/
                    for(let i=0; i < sortedAssets.length; i++){

                        for(let j=0;j < sortedAssets.length-1-i; j++){

                            if(sortedAssets[j][sortField] < sortedAssets[j+1][sortField]){

                                let temp = sortedAssets[j];
                                sortedAssets[j] = sortedAssets[j+1];
                                sortedAssets[j+1] = temp;                        
                            }                    
                        }
                    }                     
                sortDirection = "asc";
                break;
                 
            };

                renderAssets(sortedAssets);
            
        });
          
    });

};


/*---------------------------------------------*/
/* FILTROS E ORDENACAO - MAINTENANCE
/*---------------------------------------------*/
async function searchMaintenanceElement(){

    const maintenance = await getMaintenance();

    const lookupItem =
        document.getElementById("searchField");

    const assetLookupItem =
        document.getElementById("assetSelect");

    const categoryLookupItem =
        document.getElementById("categorySelect");

    const statusLookupItem =
        document.getElementById("statusSelect");


    /* SEARCH */

    lookupItem.addEventListener("input", function () {

     const searchItem = lookupItem.value.toLowerCase();

     const filteredMaintenance = maintenance.filter(item => {
            const maintenanceId = item.maintenanceId;
            
            //pesquisa por nome de asset incluindo ID e service tag
            const itemDisplayName =
                `${item.assets?.assetId ?? ""} ${item.assets?.assetName ?? ""} - ${item.assets?.serviceTag ?? ""}`
                    .trim()
                    .toLowerCase();

            return (
                item.maintenanceId.toString().includes(searchItem) ||
                //pesquisa por id da manutencao ou qualquer parte do display name do asset
                [`mnt-${maintenanceId}`, `mnt${maintenanceId}`]
                    .some(name => name.toLowerCase().includes(searchItem)) ||
                
                itemDisplayName.includes(searchItem) ||

                item.assets?.assetId?.toString().includes(searchItem) ||

                item.issueDescription
                    ?.toLowerCase()
                    .includes(searchItem) ||

                item.supportTicket
                    ?.toLowerCase()
                    .includes(searchItem) 
            );
        });

     renderMaintenance(filteredMaintenance);

    });

    /* ASSET */

    assetLookupItem.addEventListener("change", function () {

        const searchItem = assetLookupItem.value
            .trim()
            .toLowerCase();

        const filteredMaintenance = maintenance.filter(item => {

            const itemDisplayName =
                `${item.assets?.assetId ?? ""} ${item.assets?.assetName ?? ""} - ${item.assets?.serviceTag ?? ""}`
                    .trim()
                    .toLowerCase();

            return itemDisplayName === searchItem;
        });

        if (searchItem !== "all assets".toLowerCase()) {
            renderMaintenance(filteredMaintenance);
        } else {
            renderMaintenance();
        }

    });

    /* CATEGORY */

    categoryLookupItem.addEventListener("change",function(){

        const searchItem =
            categoryLookupItem.value.toLowerCase();

        const filteredMaintenance =
            maintenance.filter(item =>
                item.maintenanceCategory.name
                    .toLowerCase()
                    .includes(searchItem)
            );

        if(searchItem !== "all categories"){
            renderMaintenance(filteredMaintenance);
        }else{
            renderMaintenance();
        }

    });

    /* STATUS */

    statusLookupItem.addEventListener("change",function(){
            
        const searchItem =
            statusLookupItem.value.toLowerCase();

        const filteredMaintenance =
            maintenance.filter(item =>
                item.maintenanceStatus.name
                    .toLowerCase()===searchItem
            );
    
        if(searchItem !== "all status"){
            renderMaintenance(filteredMaintenance);
        }else{
            renderMaintenance();
        }

    });

}

async function renderMaintenanceAssetFilter(){

    const maintenance =
        await getMaintenance();

    let output =
        `<option selected>All Assets</option>`;

    const uniqueAssets = [];

    maintenance.forEach(item => {

        if(
            !uniqueAssets.includes(item.assetId)
        ){

            uniqueAssets.push(item.assetId);

            output += `
                <option>
                    ${item.assetId}
                    ${item.assets.assetName} - 
                    ${item.assets.serviceTag}
                </option>
            `;
        }

    });

    document.querySelector(".assetSelect")
        .innerHTML = output;

}

async function renderMaintenanceCategoryFilter(){

    const maintenance =
        await getMaintenance();

    let output =
        `<option selected>All Categories</option>`;

    const uniqueCategories = [];
    
    maintenance.forEach(item => {

        if(
            !uniqueCategories.includes(
                item.maintenanceCategoryId
            )
        ){

            uniqueCategories.push(
                item.maintenanceCategoryId
            );

            output += `
                <option>
                    ${item.maintenanceCategory.name}
                </option>
            `;
        }

    });

    document.querySelector(".categorySelect")
        .innerHTML = output;

}

async function renderMaintenanceStatusFilter(){

    const maintenance =
        await getMaintenance();

    let output =
        `<option selected>All Status</option>`;

    const uniqueStatus = [];
    
    maintenance.forEach(item => {

        if(
            !uniqueStatus.includes(
                item.maintenanceStatusId
            )
        ){
            uniqueStatus.push(
                item.maintenanceStatusId
            );
            
            output += `
                <option>
                    ${item.maintenanceStatus.name}
                </option>
            `;
        }

    });

    document.querySelector(".statusSelect")
        .innerHTML = output;

}
