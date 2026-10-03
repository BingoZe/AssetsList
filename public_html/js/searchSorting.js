
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
    
    
    
    
   
    
}




