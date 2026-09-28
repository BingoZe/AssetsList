/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


/*pageloader on index*/
async function loadPage(page){
    const response = await fetch(page);
    const html = await response.text();
     
    document.getElementById("main-content").innerHTML = html;
     
    const generalTab = document.getElementById("generalTab");
     
    if(generalTab){
    generalTab.style.display = "block";
    }
    
    initAssetForm();
    
    if(page.includes("assetRegister")){
        renderAssets();
    }
    
    if(page.includes("viewAsset")){
        renderViewAsset();
    }
    


}

/*Funcao viewAsset tem a funcao de guardar qual asset foi clicado o view*/
function viewAsset(assetId){
     
    /*salva o assetId a ser visualizado no sessionStorage*/
    
    sessionStorage.setItem("viewAssetId", assetId);
    
    loadPage('pages/viewAsset.html');
      
}

function closeViewAsset(){
    sessionStorage.removeItem("viewAssetId");
    loadPage('pages/assetRegister.html');

}
