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

