   
/*User Service*/


/*
 -------------
 HELPERS
 -------------
    */


async function getUsers(){
     
    try{
        const {data, error} = 
            await supabaseClient.from('users').select('*');
                if(error){
                console.log(error);
                return [];
            }
        return data;
    }
    catch(error){
        console.log(error);
        return [];
    }
}

async function saveUsers(user){

    const { data, error } =
        await supabaseClient
            .from('users')
            .insert([user]);

    if(error){
        console.log("ERROR:");
        console.log(error);
        return null;
    }

    return data;
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

async function initUserForm(){
    const userForm = document.querySelector(".user-form");
    
    if(!userForm){
        return;
    }
              
    userForm.addEventListener("submit",async (event)=>{
        event.preventDefault();

        const mode = getMode();
        console.log(mode);
     
        if(mode === "edit"){
            saveUpdatedUser();
            return;
        }else if (mode === "view"){

            return closeViewUser();
        }


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
        const userType = document.getElementById("userType").value;
        const department = document.getElementById("department").value;
        const role = document.getElementById("role").value;


        const user = {
        firstName,
        lastName,
        userEmail,
        userStatus,
        userType,
        department,
        role
    };

        const users = await getUsers();
        await saveUsers(users);
        const result = await saveUsers(user);

        console.log(result);
     
        console.log(users);
        
        alert("Record saved");

        userForm.reset();

        
        closeViewUser();

        renderUsers();

        }
    );
}



/*
 -------------
 READ
 -------------
    */
   
/* renderAssets representa READ apenas para table no Add asset*/

async function renderUsers(users = null){

    if(!users){
        users = await getUsers();
    }

    let output = "";
    users.forEach((user) => {
        output += `
        <tr>
            <td>USR-${user.userId}</td>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.userEmail}</td>
            <td>${user.userStatus}</td>
            <td>${user.role}</td>
            <td>${user.userType}</td>
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


async function renderViewUser(){
    
    const selectedUserId = parseInt(sessionStorage.getItem("viewUserId"));
    const selectedMode = sessionStorage.getItem("mode");
    
    const users = await getUsers();
    
    for(let i = 0; i<users.length;i++){        
        if(users[i].userId ===selectedUserId){
            
            document.getElementById("userId").value =users[i].userId;
            document.getElementById("firstName").value =users[i].firstName;
            document.getElementById("lastName").value =users[i].lastName;
            document.getElementById("userEmail").value =users[i].userEmail;
            console.log(users[i].userEmail);
            document.getElementById("userStatus").value =users[i].userStatus;
            console.log(users[i].userStatus);
            document.getElementById("userType").value =users[i].userType;
            console.log(users[i].userType);
            document.getElementById("department").value =users[i].department;
            console.log(users[i].department);
            document.getElementById("role").value =users[i].role;
            console.log(users[i].role);
   
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

async function deleteUser(userId){
    const users = await getUsers();
    
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
  
async function saveUpdatedUser(){
    const selectedAssetId = sessionStorage.getItem("viewUserId"); 

    const users = await getUsers();
    
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
    




