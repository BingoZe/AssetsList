
function searchElement(){
    const assets = getAssets();  
    
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
    lookupItem.addEventListener("input",function(){
                
        const searchItem = lookupItem.value.toLowerCase();   
        
        /*filtro por ID, service tag ou nome*/
        const filteredAssets = assets.filter(asset=>
            asset.assetName.toLowerCase()
            .includes(searchItem) ||
            asset.serviceTag.toLowerCase()
            .includes(searchItem)||
            asset.assetId.toLowerCase()
            .includes(searchItem)
            );
        
        renderAssets(filteredAssets);
    }); 
    
   /* adiciona evento ao select status - Asset Register*/

    statusLookupItem.addEventListener("change",function(){
                
        const searchItem = statusLookupItem.value.toLowerCase();   
        
        const filteredAssets = assets.filter(asset=>
            asset.assetStatus.toLowerCase()
            .includes(searchItem));
    
        if(searchItem !=="all status"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
    }); 

    typeLookupItem.addEventListener("change",function(){
                
        const searchItem = typeLookupItem.value.toLowerCase();   
        
        const filteredAssets = assets.filter(asset=>
            asset.type.toLowerCase()
            .includes(searchItem));
    
        if(searchItem !=="all types"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
    }); 
    
    locationLookupItem.addEventListener("change",function(){
                
        const searchItem = locationLookupItem.value.toLowerCase();   
        
        const filteredAssets = assets.filter(asset=>
            asset.location.toLowerCase()
            .includes(searchItem));

        if(searchItem !=="all locations"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
        }); 
    
    
    responsibleUserLookupItem.addEventListener("change",function(){
                
        const searchItem = responsibleUserLookupItem.value.toLowerCase(); 
        
        const filteredAssets = assets.filter(asset=>
            asset.user.toLowerCase()
            .includes(searchItem));
       
        if(searchItem !=="all users"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
    });     

    acquisitionYearLookupItem.addEventListener("change",function(){
                
        const searchItem = acquisitionYearLookupItem.value; 

        const filteredAssets = assets.filter(asset=>
            asset.acquisitionYear.toString()===searchItem);
            
        if(searchItem !=="All Years"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
    });     
        

};

/*renderAcquisitionYear*/
function renderAcquisitionYearFilter(assets = getAssets()){

    let output = `<option selected>All Years</option>`;
    assets.forEach((asset) => {
        output += `
            <option>${asset.acquisitionYear}</option>
        `;
    });

    document.querySelector(".acquisitionYearSelect").innerHTML = output;
};

/*RenderUser*/
function renderResponsibleUserFilter(assets = getAssets()){

    let output = `<option selected>All Users</option>`;
    assets.forEach((asset) => {
        output += `
            <option>${asset.user}</option>
        `;
    });

    document.querySelector(".responsibleUserSelect").innerHTML = output;
};




