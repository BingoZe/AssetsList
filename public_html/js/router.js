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
        await renderSpecsField();
        await renderTypeField();
        await renderStatusField();
        await renderLocationField();
    }
            
    if(page.includes("assetRegister")){
        await renderAssets();
        await searchElement();
        await renderAcquisitionYearFilter();
        await renderResponsibleUserFilter();
        await renderLocationFilter();
        await renderStatusFilter();
        await renderTypeFilter();
        
        btnExport();
        await btnSort();
    }
    
    if(page.includes("viewAsset")){
        await renderUserField();
        await renderSpecsField();
        await renderTypeField();
        await renderStatusField();
        await renderLocationField();
        await renderViewAsset();
  }
    
    if(page.includes("dashboard")){
        await renderAssetChart();
        await renderKpi();
    }
    
    if(page.includes("users")){
        
        await renderUsers();
        await renderUsersKpi();
        await renderUserStatusFilter();
        await renderRolesFilter();
        await renderTypesFilter();            

        await searchUserElement();  

    }
    
    if(page.includes("addUser")){
        await renderUserStatusField();
        await renderUserTypeField();
        await renderDepartmentField();
        await renderUserRoleField();
    }
    
    if(page.includes("viewUser")){
        await renderUserStatusField();
        await renderUserTypeField();
        await renderDepartmentField();
        await renderUserRoleField();
        await renderViewUser();
    }    
    
    if(page.includes("maintenance")){
        await renderMaintenance();
        await searchMaintenanceElement();
        await renderMaintenanceAssetFilter();
        await renderMaintenanceCategoryFilter();
        await renderMaintenanceStatusFilter();          
    }
    
    if(page.includes("viewMaintenance")){
        await renderAssetField();
        await renderMaintenanceStatusField();
        await renderMaintenanceCategoryField();
        await renderMaintenancePriorityField();
        await renderViewMaintenance();
    }
    
    if(page.includes("addMaintenance")){
        await renderAssetField();
        await renderMaintenanceStatusField();
        await renderMaintenanceCategoryField();
        await renderMaintenancePriorityField();
    }
    
    
    if(page.includes("reports")){
        btnExport(); /* inventory in total*/
        await assetsByType();
        await assetsByLocation();
        await assetsByUser();
        await maintenanceHistory();
        await assetsInRepair();
        await warrantyExpiry();
    }
    

}

