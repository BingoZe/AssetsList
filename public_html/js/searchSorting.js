
function searchElement(){
    const assets = getAssets();  
    let lookupItem = document.getElementById("searchField");
    
    /* adiciona evento ao campo search - Asset Register*/
    lookupItem.addEventListener("input",function(){
                
        const searchItem = lookupItem.value.toLowerCase();   
        
        
        const filteredAssets = assets.filter(asset=>asset.assetName.toLowerCase().includes(searchItem));
        
        renderAssets(filteredAssets);
    }); 
   
    
}




