
function searchElement(){
    const assets = getAssets();  
    
    /*campo busca*/
    let lookupItem = document.getElementById("searchField");
    
    /*campo status*/
    let statusLookupItem = document.getElementById("assetStatus");
    
    /*campo type*/
    let typeLookupItem = document.getElementById("typeSelect");
    
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
    
    
    
    
   
    
}




