
async function searchElement(){
    const assets = await getAssets();  
    
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
    lookupItem.addEventListener("input",async function(){
                
        const searchItem = lookupItem.value.toLowerCase();   
        
        /*filtro por ID, service tag ou nome*/
        const filteredAssets = assets.filter(asset=>
            asset.assetName.toLowerCase()
            .includes(searchItem) ||
            asset.serviceTag.toLowerCase()
            .includes(searchItem)||
            asset.assetId.toString()===searchItem
            );
        
        renderAssets(filteredAssets);
    }); 
    
   /* adiciona evento ao select status - Asset Register*/

    statusLookupItem.addEventListener("change",async function(){
                
        const searchItem = statusLookupItem.value.toLowerCase();   
        
        const filteredAssets = assets.filter(asset=>
            asset.assetStatus.toLowerCase()===searchItem);
    
        if(searchItem !=="all status"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
    }); 

    typeLookupItem.addEventListener("change",async function(){
                
        const searchItem = typeLookupItem.value.toLowerCase();   
        
        const filteredAssets = assets.filter(asset=>
            asset.type.toLowerCase()
            .includes(searchItem));
    
        if(searchItem !=="all types"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
    }); 
    
    locationLookupItem.addEventListener("change",async function(){
                
        const searchItem = locationLookupItem.value.toLowerCase();   
        
        const filteredAssets = assets.filter(asset=>
            asset.location.toLowerCase()
            .includes(searchItem));

        if(searchItem !=="all locations"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
        }); 
    
    
    responsibleUserLookupItem.addEventListener("change",async function(){
                
        const searchItem = responsibleUserLookupItem.value.trim().toLowerCase(); 

        const filteredAssets = assets.filter(asset=>{
            const fullName = `${asset.users?.firstName ?? ""} ${asset.users?.lastName ?? ""}`
                .trim()
                .toLowerCase();

        return fullName === searchItem;
    });
            
            console.log(filteredAssets);
       
        if(searchItem !=="all users"){
            renderAssets(filteredAssets);

        }else /*mostra todos os assets*/
            renderAssets();
    });     

    acquisitionYearLookupItem.addEventListener("change",async function(){
                
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
async function renderAcquisitionYearFilter(assets = null){
    
    if(!assets){
        assets = await getAssets();
    }
    
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
async function renderResponsibleUserFilter(assets = null){
    
    if(!assets){
        assets = await getAssets();
    }
    
    let output = `<option selected>All Users</option>`;
    const uniqueUser = []; 
    
    assets.forEach((asset) => {
        
        /*mostra apenas user unico no filtro*/
        if(!uniqueUser.includes(asset.userId)){
        uniqueUser.push(asset.userId);
            
        output += `
            <option>${asset.users.firstName} ${asset.users.lastName}</option>
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

/*Search users*/

async function searchUserElement(){
    const users = await getUsers(); 
    
    /*campo busca*/
    const lookupItem = document.getElementById("searchField");
  
    /*campo status*/
    const statusLookupItem = document.getElementById("userStatus");
    
    /*campo role*/
    const rolelookupItem = document.getElementById("roleSelect");
    
    /*campo userType*/
    const userTypelookupItem = document.getElementById("userType");
  
    /* adiciona evento ao campo search - Users*/
    lookupItem.addEventListener("input",async function(){

        const searchItem = lookupItem.value.toLowerCase();   
 
        /*filtro por ID,nome ou sobrenome*/
        const filteredUsers = users.filter(user=>
                user.firstName.toLowerCase().includes(searchItem) ||
                user.lastName.toLowerCase().includes(searchItem) ||
                user.role.toLowerCase().includes(searchItem) ||
                user.userId.toString().includes(searchItem)
            );
 
        renderUsers(filteredUsers);
    }); 
    
   /* adiciona evento ao select status - Users*/

    statusLookupItem.addEventListener("change",async function(){
                
        const searchItem = statusLookupItem.value.toLowerCase();   
        
        const filteredUser = users.filter(user=>
            user.userStatus.toLowerCase()===searchItem);
    
        if(searchItem !=="all status"){
            renderUsers(filteredUser);

        }else /*mostra todos os users*/
            renderUsers();
    }); 

    rolelookupItem.addEventListener("change",async function(){
                
        const searchItem = rolelookupItem.value.toLowerCase();   
        
        const filteredUser = users.filter(user=>
            user.role.toLowerCase()
            .includes(searchItem));
    
        if(searchItem !=="all roles"){
            renderUsers(filteredUser);

        }else 
            renderUsers();
    }); 
    userTypelookupItem.addEventListener("change",async function(){
                
        const searchItem = userTypelookupItem.value.toLowerCase();   
        
        const filteredUser = users.filter(user=>
            user.userType.toLowerCase()
            .includes(searchItem));
    
        if(searchItem !=="all types"){
            renderUsers(filteredUser);

        }else 
            renderUsers();
    }); 

};


/*RenderUser*/
async function renderRolesFilter(){
    const users = await getUsers();
    
    let output = `<option selected>All Roles</option>`;
    const uniqueRole = []; 
   
    users.forEach((user) => {
        
        /*mostra apenas role unico no filtro*/
        if(!uniqueRole.includes(user.role)){
            uniqueRole.push(user.role);
            
        output += `
            <option>${user.role}</option>
        `;
        }
    });

    document.getElementById("roleSelect").innerHTML = output;
};

/*RenderType*/
async function renderTypesFilter(){
    const users = await getUsers();
    
    let output = `<option selected>All Types</option>`;
    const uniqueType = []; 
   
    users.forEach((user) => {
        
        /*mostra apenas role unico no filtro*/
        if(!uniqueType.includes(user.userType)){
            uniqueType.push(user.userType);
            
        output += `
            <option>${user.userType}</option>
        `;
        }
    });

    document.getElementById("userType").innerHTML = output;
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



