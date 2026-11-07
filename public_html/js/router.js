/*pageloader on index*/
async function loadPage(page){
    const response = await fetch(page);
    const html = await response.text();
         
    document.getElementById("main-content").innerHTML = html;
     
    const generalTab = document.getElementById("generalTab");
     
    if(generalTab){
    generalTab.style.display = "block";
    }
    
    // Inicializadores dos formulários initAssetForm(); initUserForm();
    initAssetForm();
    initUserForm();
    initMaintenanceForm();
    
    if (page.includes("addAsset")) {
        await renderUserField();
    }
            
    if(page.includes("assetRegister")){
        await renderAssets();
        await searchElement();
        await renderAcquisitionYearFilter();
        await renderResponsibleUserFilter();
        
        btnExport();
        await btnSort();
    }
    
    if(page.includes("viewAsset")){
        await renderUserField();
        await renderViewAsset();
  }
    
    if(page.includes("dashboard")){
        await renderAssetChart();
        await renderKpi();
    }
    
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
    
    
    if(page.includes("maintenance")){
        await renderMaintenance();
    }
    
    if(page.includes("viewMaintenance")){
        await renderAssetField();
        await renderViewMaintenance();
    }
    
    if(page.includes("addMaintenance")){
        await renderAssetField();
    }
    
    
    if(page.includes("reports")){
        btnExport();
        await assetsByType();
        await assetsByLocation();
        await assetsByUser();
        await maintenanceHistory();
        await assetsInRepair();
        await warrantyExpiry();
    }
    

}

