
function searchElement(){
    const assets = getAssets();
    
    console.log("Executou");
    
    
    let lookupItem = document.getElementById("searchField");
    
    lookupItem.addEventListener("input",function(){
                
        const searchItem = lookupItem.value.toLowerCase();   
        
        const filteredAssets = assets.filter(asset=>asset.assetName.toLowerCase().includes(searchItem));
        
        renderAssets(filteredAssets);
    }); 
   
    
}




