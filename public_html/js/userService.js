   
/*User Service*/


/* HELPERS    */


async function getUsers(){
     
    try{
        const {data, error} = 
            await supabaseClient.from('users').select(`
                *,
                userRole(
                    userRoleId,
                    name
                ),
                userType(
                    userTypeId,
                    name
                ),
                userStatus(
                    userStatusId,
                    name
                ),
                department(
                    departmentId,
                    name
                )        
            `);
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

async function createUser(user){

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


/* CREATE   */

/*initAssetForm retorna os assets em tela - AssetRegister*/

async function initUserForm(){
    const userForm = document.querySelector(".user-form");
    
    if(!userForm){
        return;
    }
              
    userForm.addEventListener("submit",async (event)=>{
        event.preventDefault();

        const mode = getMode();
     
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

        const userEmail = 
                document.getElementById("userEmail").value;
        const userStatusId = 
                Number(document.getElementById("userStatusSelect").value);
        const userTypeId = 
                Number(document.getElementById("userTypeSelect").value);
        const departmentId = 
                Number(document.getElementById("departmentSelect").value);
        const userRoleId = 
                Number(document.getElementById("userRoleSelect").value);


        const user = {
        firstName,
        lastName,
        userEmail,
        userStatusId,
        userTypeId,
        departmentId,
        userRoleId
    };

        await createUser(user);
        
        alert("Record saved");

        userForm.reset();
        
        closeViewUser();

        renderUsers();

        }
    );
}



/* READ    */
   
/* renderUser representa READ em view e add user*/

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
            <td>${user.userStatus.name}</td>
            <td>${user.userRole.name}</td>
            <td>${user.userType.name}</td>
            <td>
                <button class="btTdItemView" onclick="viewUser('${user.userId}','view')">
<i class="fa-solid fa-eye"></i></button>
                <button class="btTdItemEdit" onclick="viewUser('${user.userId}','edit')">
<i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btTdItemDelete" onclick="deleteUser('${user.userId}')">
<i class="fa-solid fa-trash"></i></button>
            </td>
                    
        </tr>
        `;
    });
       
    document.querySelector(".tableBody").innerHTML = output;
};

/*renderViewUser - Exibe apenas no View*/


async function renderViewUser(){
    
    const selectedUserId = parseInt(sessionStorage.getItem("viewUserId"));
    const selectedMode = sessionStorage.getItem("mode");
    
    const users = await getUsers();
    
    const viewedUser = users.find(item =>
        item.userId === selectedUserId
    );       
      
    document.getElementById("firstName").value =
            viewedUser.firstName;
    document.getElementById("lastName").value =
            viewedUser.lastName;
    document.getElementById("userEmail").value =
            viewedUser.userEmail;

/*Elementos com tabelas especializadas - FKs*/

    const userStatusSelect = 
            document.getElementById("userStatusSelect"); 
    userStatusSelect.value = 
            String(viewedUser.userStatus.userStatusId);

    console.log(
        viewedUser.userStatus.userStatusId,
        userStatusSelect.value
    );

    const userTypeSelect = 
            document.getElementById("userTypeSelect"); 
    userTypeSelect.value = 
            String(viewedUser.userType.userTypeId);
    
    const departmentSelect =
            document.getElementById("departmentSelect");
    departmentSelect.value =
            String(viewedUser.department.departmentId);
    
    const userRoleSelect=
            document.getElementById("userRoleSelect");
    userRoleSelect.value =
            String(viewedUser.userRole.userRoleId);
   
    /*avalia modo - se for editavel, campos sao ativados. Senao, apenas leitura.*/
    if(selectedMode === "edit"){                                       
        document.querySelectorAll("input, textarea, select")
                .forEach(field => {field.disabled = false;});
    }else {
        document.querySelectorAll("input, textarea, select")
                .forEach(field => {field.disabled = true;});
        document.querySelector(".resave")
                .style.display="none";
    }
        
    
    /* renderiza os assets em posse do corrente usuario => selectedUser*/
    const assets = await getAssets();
     
    const assetAssigned = assets.filter(item => {
        return item.users.userId === selectedUserId;
    });
    
    if(assetAssigned.length > 0){
        renderAssetInnerTable(assetAssigned);  
    }else{

      const para = document.createElement("p");
      para.innerText =
          "No assets assigned for this user";

      document
          .querySelector(".tableBodyAssetHistory")
          .appendChild(para);

  }
    
}

/* DELETE    */
   
/*deleteAsset() representa o DELETE*/

async function deleteUser(userId){
    
    /*confirmando com usuario antes de deletar*/
    if(!confirm("Are you sure you want to delete it?")){
        return;
    }   
    
    const { error } = await supabaseClient
        .from('users')
        .delete()
        .eq('userId', userId);

    if(error){
        console.error(error);
        return;
    }

    await renderUsers();
    await renderUsersKpi();
}


/* UPDATE    */
  
async function saveUpdatedUser(){
    const selectedUserId = parseInt(sessionStorage.getItem("viewUserId")); 

    const users = await getUsers();
    
    const updatedUser = users.find(
        updatedUser => updatedUser.userId === selectedUserId
    );

    if(!updatedUser){
       alert("User not found");
        return;
    }
    
    
    const updatedFirstName= setFirstName();
    if(!updatedFirstName){
        alert("Invalid last name!");
        return;
    }
    
    const updatedLastName= setLastName();
    if(!updatedLastName){
        alert("Invalid last name!");
        return;
    }


    updatedUser.userEmail = 
            document.getElementById("userEmail").value;
    updatedUser.userStatusId = 
            document.getElementById("userTypeSelect").value;
    updatedUser.userTypeId = 
            document.getElementById("userTypeSelect").value;
    updatedUser.departmentId = 
            document.getElementById("departmentSelect").value;
    updatedUser.userRoleId = 
            document.getElementById("userRoleSelect").value;

    const { error } = await supabaseClient
         .from('users')
         .update({
            firstName:updatedUser.updatedFirstName,
            lastName: updatedUser.updatedLastName,
            userEmail:updatedUser.userEmail,
            userStatusId: updatedUser.userStatusId,
            userTypeId: updatedUser.userTypeId,
            departmentId:updatedUser.departmentId,
            userRoleId: updatedUser.userRoleId
         })
         .eq('userId', updatedUser.userId);

    if(error){
        console.error(error);
        return;
    }    
    
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
    const lastName = 
            document.getElementById("lastName").value.trim();
    
    if(lastName ===""){
        document.getElementById("lastName").classList.add("inputError");
        
        return false;
    }
    document.getElementById("lastName").classList.remove("inputError");
    return lastName;
}
    




