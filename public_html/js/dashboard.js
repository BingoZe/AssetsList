function renderAssetChart(){
  const assets = getAssets();

  const ctxType = document.getElementById('typeChart');  
  const ctxStatus = document.getElementById('statusChart');  
  const ctxLocation = document.getElementById('locationChart');  
  const ctxYear = document.getElementById('yearChart');  
  
  if(!ctxType || !ctxStatus || !ctxLocation ||!ctxYear ){
    return;
  }
    
  const typeCount = {};

  for (const asset of assets) {
    if (typeCount[asset.type]) {
        typeCount[asset.type]++;
    } else {
        typeCount[asset.type] = 1;
        }
    }

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
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      
  const statusCount = {};

  for (const asset of assets) {
    if (statusCount[asset.assetStatus]) {
        statusCount[asset.assetStatus]++;
    } else {
        statusCount[asset.assetStatus] = 1;
        }
    }

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
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
   
    const locationCount = {};
    
    for(const asset of assets){
        if(locationCount[asset.location]){
            locationCount[asset.location]++;
        }else{
            locationCount[asset.location]= 1;
        }
    }
        
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
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      
    const yearCount = {};
    
    for(const asset of assets){
        if(yearCount[asset.acquisitionYear]){
            yearCount[asset.acquisitionYear]++;
        }else{
            yearCount[asset.acquisitionYear] = 1;
        }
    }
    
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
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }        
    });  
      
    
}

/*TESTE*/
