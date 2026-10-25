
/* ==========================================
   CHARTS
   ========================================== */

function renderAssetChart(){
  const assets = getAssets();

  const ctxType = document.getElementById('typeChart');  
  const ctxStatus = document.getElementById('statusChart');  
  const ctxLocation = document.getElementById('locationChart');  
  const ctxYear = document.getElementById('yearChart');  
  
  if(!ctxType || !ctxStatus || !ctxLocation ||!ctxYear ){
    return;
  }
    
  const typeCount = countBy(assets,'type');

    const labels = Object.keys(typeCount);
    const data = Object.values(typeCount);  
    
  new Chart(ctxType, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Assets type',
            data,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      
  const statusCount = countBy(assets,'assetStatus');


    const statusLabels = Object.keys(statusCount);
    const statusData = Object.values(statusCount);  
    
  new Chart(ctxStatus, {
        type: 'pie',
        data: {
         labels: statusLabels,
          datasets: [{
            label: 'Assets Status',
            data: statusData,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,  
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
   
    const locationCount = countBy(assets,'location');
        
    const locationLabels = Object.keys(locationCount);
    const locationData = Object.values(locationCount);
    
    new Chart(ctxLocation,{
        type: 'bar',
        data: {
            labels: locationLabels,
            datasets: [{
              label:'Locations',
              data: locationData,
              borderWidth: 1                    
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,  
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      
    const yearCount = countBy(assets,'acquisitionYear');
    
    const yearLabels = Object.keys(yearCount);
    const yearData = Object.values(yearCount);
    
    
    new Chart(ctxYear, {
        type:'line',
        data:{
            labels: yearLabels,
            datasets: [{
                label: 'Acquisition Year',
                data:yearData,
                borderWidth:1
            }]
        },
       options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }        
    });  
      
    
}

/*gera contador generico*/
function countBy(items, field){
    const count = {};
    
    for(const item of items){
        if(count[item[field]]){
            count[item[field]]++;
        }else{
            count[item[field]]=1;
        }
    }
    
    return count;  
    
}

/* ==========================================
   Indicators
   ========================================== */
function renderKpi(){
    const assets = getAssets();
    
    /*Indicadores total assets*/
    document.getElementById('totalAssetsFigures').textContent = assets.length || 0;
    
    /*Indicadores reparando*/
    const statusCount = countBy(assets, "assetStatus");
    document.getElementById('repairingFigures').textContent = statusCount["Repairing"] || 0;
    
    /*Indicadores disponivel*/
    const activeCount = countBy(assets, "assetStatus");
    document.getElementById('availableFigures').textContent = statusCount["Active"] || 0;
    
    /*Indicadores net value*/
    let netValueCount = 0;
    
    assets.forEach((asset) => {
        netValueCount+= Number(asset.netValue);
    });
    
    document.getElementById('netValueFigures').textContent = netValueCount.toLocaleString();
    
}

async function renderUsersKpi(){
    const users = await getUsers();
    
    /*Indicadores total users*/
    document.getElementById('totalUsersFigures').textContent = users.length || 0;
    
    /*Indicadores technicians*/
    const technicianCount = countBy(users, "userType");
    document.getElementById('techniciansFigures').textContent = technicianCount["Technician"] || 0;
    
    /*Indicadores auditors*/
    const auditorCount = countBy(users, "userType");
    document.getElementById('auditorsFigures').textContent = auditorCount["Auditor"] || 0;
    
    /*Indicadores endusers*/
    const enduserCount = countBy(users, "userType");
    document.getElementById('endUsersFigures').textContent = enduserCount["End User"] || 0;
    
}

