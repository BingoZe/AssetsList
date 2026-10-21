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
    
}


document.addEventListener("DOMContentLoaded", () => {
    loadPage("pages/dashboard.html");
});