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

function viewUser(userId,mode){
     
    /*salva o userId e o modo a ser visualizado no sessionStorage*/
    
    sessionStorage.setItem("viewUserId", userId);
    sessionStorage.setItem("mode",mode);
    
    loadPage('pages/viewUser.html');
      
}


function closeViewUser(){
    sessionStorage.removeItem("viewUserId");
    sessionStorage.removeItem("mode");
    
    loadPage('pages/users.html');

}