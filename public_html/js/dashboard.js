
/* ==========================================
   CHARTS
   ========================================== */

async function renderAssetChart(){
  const assets = await getAssets();

  const ctxType = document.getElementById('typeChart');  
  const ctxStatus = document.getElementById('statusChart');  
  const ctxLocation = document.getElementById('locationChart');  
  const ctxYear = document.getElementById('yearChart');  
  
  if(!ctxType || !ctxStatus || !ctxLocation ||!ctxYear ){
    return;
  }
    
  const typeCount = {};
  
  assets.forEach(asset =>{
      const typeName = asset.assetType?.name || 'unknown';
      typeCount[typeName] = (typeCount[typeName] || 0)+1;      
  });
          
  const labels = Object.keys(typeCount);
   
const data = Object.values(typeCount);

new Chart(ctxType, {
  type: 'bar',
  data: {
    labels,
    datasets: [{
      label: 'Assets type',
      data,
      borderWidth: 1,
      borderColor: [
              '#2563EB',
              '#10B981',
              '#F59E0B',
              '#EF4444',
              '#8B5CF6'
      ],
      backgroundColor: [
          '#93C5FD',
          '#6EE7B7',
          '#FCD34D',
          '#FCA5A5',
          '#C4B5FD'
      ]
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0}
      }
    }
  }
});

const statusCount = {};

assets.forEach(asset =>{
    const statusName = asset.assetStatus?.name || 'unknown';
    statusCount[statusName] = (statusCount[statusName] || 0)+1;      
});


const statusLabels = Object.keys(statusCount);
const statusData = Object.values(statusCount);  

new Chart(ctxStatus, {
  type: 'doughnut', // ou 'pie'
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
      plugins: {
          legend: {
              position: 'top'
          }
      }
  }
});

const locationCount ={};

assets.forEach(asset => {
    const locationName = asset.assetLocation?.name || 'unknown';
    locationCount[locationName] = (locationCount[locationName] || 0) + 1;
});

const locationLabels = Object.keys(locationCount);
const locationData = Object.values(locationCount);

new Chart(ctxLocation,{
      type: 'bar',
      data: {
          labels: locationLabels,
          datasets: [{
            label:'Locations',
            data: locationData,
            borderWidth: 1,
            borderColor: [
                    '#2563EB',
                    '#10B981',
                    '#F59E0B',
                    '#EF4444',
                    '#8B5CF6'
            ],
            backgroundColor: [
                '#93C5FD',
                '#6EE7B7',
                '#FCD34D',
                '#FCA5A5',
                '#C4B5FD'
            ]              
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,  
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0}
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
            borderWidth:1,
             borderColor: [
                  '#2563EB',
                  '#10B981',
                  '#F59E0B',
                  '#EF4444',
                  '#8B5CF6'
          ],
          backgroundColor: [
              '#93C5FD',
              '#6EE7B7',
              '#FCD34D',
              '#FCA5A5',
              '#C4B5FD'
          ]   
        }]
    },
     options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0}
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
async function renderKpi(){
    const assets = await getAssets();
    
    /*Indicadores total assets*/
    document.getElementById('totalAssetsFigures').textContent = assets.length || 0;
    
    /*Indicadores reparando*/
     let countRepair = assets.filter(
            asset => asset.assetLocation.name === "Repairing").length;
    document.getElementById('repairingFigures').textContent = countRepair|| 0;
    
    /*Indicadores disponivel*/
    let countDeployed = assets.filter(
            asset => asset.assetLocation.name === "User deployed").length;
        
    document.getElementById('availableFigures').textContent = countDeployed|| 0;
    
    /*Indicadores net value*/
    let netValueCount = 0;
    
    assets.forEach((asset) => {
        netValueCount+= Math.round(Number(asset.netValue));
    });
    
    document.getElementById('netValueFigures').textContent = `€ ${netValueCount.toLocaleString()}`;
    
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

