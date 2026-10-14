
function searchElement(){
    const assets = getAssets();  
    
    /*campo busca*/
    const lookupItem = document.getElementById("searchField");
    
    /*campo status*/
    const statusLookupItem = document.getElementById("assetStatus");
    
    /*campo type*/
    const typeLookupItem = document.getElementById("typeSelect");
    
    /*campo type*/
    const locationLookupItem = document.getElementById("locationSelect");

    /*campo responsible user*/
    const responsibleUserLookupItem = document.getElementById("responsibleUserSelect");

    /*campo acquisition year*/
    const acquisitionYearLookupItem = document.getElementById("acquisitionYearSelect");
    
    /* adiciona evento ao campo search - Asset Register*/
    lookupItem.addEventListener("input",function(){
                
        const searchItem = lookupItem.value.toLowerCase();   
        
        /*filtro por ID, service tag ou nome*/
        const filteredAssets = assets.filter(asset=>
            asset.assetName.toLowerCase()
            .includes(searchItem) ||
            asset.serviceTag.toLowerCase()
            .includes(searchItem)||
            asset.assetId.toLowerCase()
            .includes(searchItem)
            );
        
        renderAssets(filteredAssets);
    }); 
    
   /* adiciona evento ao select status - Asset Register*/

    statusLookupItem.addEventListener("change",function(){
                
        const searchItem = statusLookupItem.value.toLowerCase();   
        
        const filteredAssets = assets.filter(asset=>
            asset.assetStatus.toLowerCase()
            .includes(searchItem));
    
        if(searchItem !=="all status"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
    }); 

    typeLookupItem.addEventListener("change",function(){
                
        const searchItem = typeLookupItem.value.toLowerCase();   
        
        const filteredAssets = assets.filter(asset=>
            asset.type.toLowerCase()
            .includes(searchItem));
    
        if(searchItem !=="all types"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
    }); 
    
    locationLookupItem.addEventListener("change",function(){
                
        const searchItem = locationLookupItem.value.toLowerCase();   
        
        const filteredAssets = assets.filter(asset=>
            asset.location.toLowerCase()
            .includes(searchItem));

        if(searchItem !=="all locations"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
        }); 
    
    
    responsibleUserLookupItem.addEventListener("change",function(){
                
        const searchItem = responsibleUserLookupItem.value.toLowerCase(); 
        
        const filteredAssets = assets.filter(asset=>
            asset.user.toLowerCase()
            .includes(searchItem));
       
        if(searchItem !=="all users"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
    });     

    acquisitionYearLookupItem.addEventListener("change",function(){
                
        const searchItem = acquisitionYearLookupItem.value; ; 
        
        const filteredAssets = assets.filter(asset=>
            asset.acquisitionYear.toString() ===searchItem);
       
        if(searchItem !=="All Years"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
    });     
        

};

/*renderAcquisitionYear*/
function renderAcquisitionYearFilter(assets = getAssets()){

    let output = `<option selected>All Years</option>`;
    const uniqueYear = [];
    
    assets.forEach((asset) => {
        if(!uniqueYear.includes(asset.acquisitionYear)){
            uniqueYear.push(asset.acquisitionYear);
            output += `
                <option>${asset.acquisitionYear}</option>
            `;
        }
    });

    document.querySelector(".acquisitionYearSelect").innerHTML = output;
};

/*RenderUser*/
function renderResponsibleUserFilter(assets = getAssets()){

    let output = `<option selected>All Users</option>`;
    const uniqueUser = []; 
    
    assets.forEach((asset) => {
        
        /*mostra apenas user unico no filtro*/
        if(!uniqueUser.includes(asset.user)){
        uniqueUser.push(asset.user);
            
        output += `
            <option>${asset.user}</option>
        `;
        }
    });

    document.querySelector(".responsibleUserSelect").innerHTML = output;
};


/*---------------------------------------------*/
/* SORTING USANDO ALGORITMO DE ORDENACAO BUBBLE SORT*/
/*---------------------------------------------*/

function btnSort(){
    
    const sortItem = document.querySelectorAll(".sortingButton");
    
    let sortDirection = "asc"; /*define estado inicial*/
    
    sortItem.forEach(button =>{
        button.addEventListener("click",function(){ /*evento em cada botao sort*/
            const assets = getAssets();
            const sortedAssets = [...assets]; /*faz uma copia do array para ordenacao bubble sort*/

            switch(sortDirection){
                case "asc":
                
                    /*implementa bubble sort ascendente*/
                    for(let i=0; i < sortedAssets.length; i++){

                        for(let j=0;j < sortedAssets.length-1-i; j++){

                            if(sortedAssets[j].assetName > sortedAssets[j+1].assetName){

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

                            if(sortedAssets[j].assetName < sortedAssets[j+1].assetName){

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


