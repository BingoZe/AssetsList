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

/*Funcao viewAsset tem a funcao de guardar qual asset foi clicado e qual modo (ver ou editar)*/
function viewAsset(assetId,mode){
     
    /*salva o assetId e o modo a ser visualizado no sessionStorage*/
    
    sessionStorage.setItem("viewAssetId", assetId);
    sessionStorage.setItem("mode",mode);
    
    loadPage('pages/viewAsset.html');
      
}





function closeViewAsset(){
    sessionStorage.removeItem("viewAssetId");
    sessionStorage.removeItem("mode");
    
    loadPage('pages/assetRegister.html');

}
/*
Nem usaria sessionStorage para o modo.

Passaria o modo na função.

View
JavaScript
onclick="viewAsset('${asset.assetId}','view')"

Edit
JavaScript
onclick="viewAsset('${asset.assetId}','edit')"


Função:

JavaScript
function viewAsset(assetId,mode){
 
sessionStorage.setItem("viewAssetId", assetId);
sessionStorage.setItem("mode", mode);
 
loadPage("pages/viewAsset.html");
}


E pronto.

Próximo passo do Update

Depois de abrir em modo edit, você vai precisar trocar o submit.

Hoje você faz:

JavaScript
assets.push(asset);


Isso é CREATE.

No Update você vai fazer:

JavaScript
assets[i] = assetAtualizado;


Então a estrutura pode ficar:

JavaScript
CREATE
↓
push()
 
UPDATE
↓
substitui o asset do mesmo ID
 
DELETE
↓
splice()


Sinceramente, eu seguiria exatamente por esse caminho:

View e Edit usam a mesma página.
Salva "view" ou "edit" no sessionStorage.
renderViewAsset() habilita/desabilita campos.
Depois implementa o save do Update.*/