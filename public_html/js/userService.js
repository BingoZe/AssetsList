   
/*User Service*/


/*
 -------------
 HELPERS
 -------------
    */


function getUsers(){
     
    try{
        return JSON.parse(localStorage.getItem("user")) || [];
    }
    catch(error){
        return [];
    }
}

function saveUsers(user){
    return localStorage.setItem("user", JSON.stringify(user));
}

function getMode(){
    try{
     return sessionStorage.getItem("mode");
    }
    catch(error){
        return [];
    }
}


/* -------------implemantacao do CRUD-------------*/


/*
 -------------
 CREATE
 -------------
    */

/*initAssetForm retorna os assets em tela - AssetRegister*/

function initUserForm(){
    const userForm = document.querySelector(".user-form");
    
    if(!userForm){
        return;
    }
              
    userForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    
    const mode = getMode();
    console.log(mode);
 
    if(mode === "edit"){
        saveUpdatedUser();
        return;
    }else if (mode === "view"){
        
        return closeViewUser();
    }

    /*criacao e validacao de assetID*/
    const generatedUserId = setUserId();
    const userId = `USR-${generatedUserId.toString().padStart(3,"0")}`;
   
    
    /*name validation*/
    const firstName = setFirstName();
    if(!firstName){
        alert("Invalid name!");
        return;
    }
         
    const lastName = setLastName();
    if(!lastName){
        alert("Invalid name!");
        return;
    }
    
    const userEmail = document.getElementById("userEmail").value;
    const userStatus = document.getElementById("userStatus").value;
    const department = document.getElementById("department").value;
    const role = document.getElementById("role").value;
  
    
    const user = {
    userId,
    firstName,
    lastName,
    userEmail,
    userStatus,
    department,
    role
};

    const users = getUsers();

    users.push(user);

    saveUsers(users);
    
    userForm.reset();

    alert("Record saved");
    closeViewUser();
        
    renderUsers();
      
    });
}



/*
 -------------
 READ
 -------------
    */
   
/* renderAssets representa READ apenas para table no Add asset*/

function renderUsers(users = getUsers()){

    let output = "";
    users.forEach((user) => {
        output += `
        <tr>
            <td>${user.userId}</td>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.userEmail}</td>
            <td>${user.userStatus}</td>
            <td>${user.department}</td>
            <td>${user.role}</td>
            <td>
                <button class="btTdItemView" onclick="viewUser('${user.userId}','view')">View</button>
                <button class="btTdItemEdit" onclick="viewUser('${user.userId}','edit')">Edit</button>
                <button class="btTdItemDelete" onclick="deleteUser('${user.userId}')">Delete</button>
            </td>
                    
        </tr>
        `;
    });
    
    console.log(document.getElementById("tableBody"));
    
    document.querySelector(".tableBody").innerHTML = output;
};

/*renderViewUser - Exibe apenas no View*/


function renderViewUser(){
    
    const selectedUserId = sessionStorage.getItem("viewUserId");
    const selectedMode = sessionStorage.getItem("mode");
    
    const users = getUsers();
    
    for(let i = 0; i<users.length;i++){
        if(users[i].userId ===selectedUserId){
           
            document.getElementById("userId").value =users[i].userId;
            document.getElementById("firstName").value =users[i].firstName;
            document.getElementById("lastName").value =users[i].lastName;
            document.getElementById("userEmail").value =users[i].userEmail;
            document.getElementById("userStatus").value =users[i].userStatus;
            document.getElementById("department").value =users[i].department;
            document.getElementById("role").value =users[i].role;
   
   
            /*avalia modo - se for editavel, campos sao ativados. Senao, apenas leitura.*/
            if(selectedMode === "edit"){                                       
                document.querySelectorAll("input, textarea, select").forEach(field => {field.disabled = false;});
            }else {
                document.querySelectorAll("input, textarea, select").forEach(field => {field.disabled = true;});
                document.querySelector(".resave").style.display="none";
            }
        }
    }
    
}

/*
 -------------
 DELETE
 -------------
    */
   
/*deleteAsset() representa o DELETE*/

function deleteUser(userId){
    const users = getUsers();
    
    /*confirmando com usuario antes de deletar*/
    if(!confirm("Are you sure you want to delete it?")){
        return;
    }   
    
    /*buscando o assetID dentro do array de assets*/
     for(let i = 0; i < users.length;i++){
         if(users[i].userId === userId){
             users.splice(i,1);
             break;
            }
        
        }
    
        saveUsers(users);
        renderUsers();    
}


/*
 -------------
 UPDATE
 -------------
    */
  
function saveUpdatedUser(){
    const selectedAssetId = sessionStorage.getItem("viewUserId"); 

    const users = getUsers();
    
    /*iterando sobre todos os registros*/
    for(let i= 0; i <users.length;i++){
        
        /*procurando ID selecionada e puxando atributos*/
        if(users[i].userId===selectedAssetId){
   
            users[i].firstName = setFirstName();
            if(!users[i].firstName){
                alert("Invalid name!");
                return;
            }
            
            users[i].lastName = setLastName();
            if(!users[i].lastName){
                alert("Invalid last name!");
                return;
            }
            
            users[i].userEmail = document.getElementById("userEmail").value;
            users[i].userStatus = document.getElementById("userStatus").value;
            users[i].department = document.getElementById("department").value;
            users[i].role = document.getElementById("role").value;
            
            break;   
        }
    }
    
    saveUsers(users);  

    alert("Record saved");
      
    closeViewUser();
    
}

/*
 -------------
 ASSET VALIDATION
 -------------
    */

function setUserId(){
    const user = getUsers();
    /*Busca o maior assetId*/
      let max= 0;  

        for(let j = 0; j < user.length;j++){
            let userItem = parseInt(user[j].userId.slice(3));

            if(userItem > max){
                max = userItem;
            }
        }

    return max+1;

}


/*validacao do nome. Se for vazio, recusa.*/
function setFirstName(){
    const userName = document.getElementById("firstName").value.trim();
    
    if(userName ===""){
        document.getElementById("firstName").classList.add("inputError");
        
        return false;
    }
    document.getElementById("firstName").classList.remove("inputError");
    return userName;
}

function setLastName(){
    const lastName = document.getElementById("lastName").value.trim();
    
    if(lastName ===""){
        document.getElementById("lastName").classList.add("inputError");
        
        return false;
    }
    document.getElementById("lastName").classList.remove("inputError");
    return lastName;
}
    




