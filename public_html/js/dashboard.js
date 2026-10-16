function renderAssetChart(){

  const ctx = document.getElementById('assetsCharts');  
  
  if(!ctx){
    return;
  }
    
    
  new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Laptops', 'Monitors'],
    datasets: [{
      label: 'Assets',
      data: [12, 19],
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
    
}
