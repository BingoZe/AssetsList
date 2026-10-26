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
        searchElement();
        renderAcquisitionYearFilter();
        renderResponsibleUserFilter();
        btnExport();
        btnSort();
    }
    
    if(page.includes("viewAsset")){
        renderViewAsset();
    }
    
    if(page.includes("dashboard")){
        renderAssetChart();
        renderKpi();
    }
    
    
    initUserForm();
    
    if(page.includes("users")){
        await renderUsers();
        await renderUsersKpi();
        await searchUserElement();
        await renderRolesFilter();
        await renderTypesFilter();
    }
    
    if(page.includes("viewUser")){
        await renderViewUser();
    }    
    
    
}


document.addEventListener("DOMContentLoaded", () => {
    loadPage("pages/dashboard.html");
});

        