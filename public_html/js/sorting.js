
/*---------------------------------------------*/
/* SORTING USANDO ALGORITMO DE ORDENACAO BUBBLE SORT*/
/*---------------------------------------------*/

async function btnSort(){
    
    const sortItem = document.querySelectorAll(".sortingButton");
    
    let sortDirection = "asc"; /*define estado inicial*/

    sortItem.forEach(button =>{
        button.addEventListener("click",async function(){ /*evento em cada botao sort*/
            const assets = await getAssets();
            const sortedAssets = [...assets]; /*faz uma copia do array para ordenacao bubble sort*/
    
            const sortField = button.dataset.sort;/*captura o botao adequado do HTML usando campo dinamico*/


            switch(sortDirection){
                case "asc":
                
                    /*implementa bubble sort ascendente*/
                    for(let i=0; i < sortedAssets.length; i++){

                        for(let j=0;j < sortedAssets.length-1-i; j++){

                            if(sortedAssets[j][sortField] > sortedAssets[j+1][sortField]){

                                let temp = sortedAssets[j];
                                sortedAssets[j] = sortedAssets[j+1];
                                sortedAssets[j+1] = temp;                        
                            }                    
                        }
                    } 
                    
                sortDirection = "desc";
                break;
                
                case "desc":
                    /*implementa bubble sort descendente*/
                    for(let i=0; i < sortedAssets.length; i++){

                        for(let j=0;j < sortedAssets.length-1-i; j++){

                            if(sortedAssets[j][sortField] < sortedAssets[j+1][sortField]){

                                let temp = sortedAssets[j];
                                sortedAssets[j] = sortedAssets[j+1];
                                sortedAssets[j+1] = temp;                        
                            }                    
                        }
                    }                     
                sortDirection = "asc";
                break;
                 
            };

                renderAssets(sortedAssets);
            
        });
          
    });

};