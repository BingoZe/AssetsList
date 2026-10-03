
function searchElement(){
    const assets = getAssets();  
    
    /*campo busca*/
    let lookupItem = document.getElementById("searchField");
    
    /*campo status*/
    let statusLookupItem = document.getElementById("assetStatus");
    
    /* adiciona evento ao campo search - Asset Register*/
    lookupItem.addEventListener("input",function(){
                
        const searchItem = lookupItem.value.toLowerCase();   
        
        
        const filteredAssets = assets.filter(asset=>asset.assetName.toLowerCase().includes(searchItem));
        
        renderAssets(filteredAssets);
    }); 
    
    statusLookupItem.addEventListener("change",function(){
                
        const searchItem = statusLookupItem.value.toLowerCase();   
        
        
        const filteredAssets = assets.filter(asset=>asset.assetStatus.toLowerCase().includes(searchItem));
        
        if(filteredAssets){
            renderAssets(filteredAssets);
        }else
            renderAssets();
        
        
    }); 
    
    
    
    
   
    
}




