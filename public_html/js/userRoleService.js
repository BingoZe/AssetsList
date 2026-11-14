async function getUserRole(){
     
    try{
        const { data, error } = await supabaseClient
            .from('userRole')
            .select(`*`);

        if (error) {
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

async function createUserRole(userRole){

    const { data, error } =
        await supabaseClient
            .from('userRole')
            .insert([userRole]);

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

/*TO BE DEVELOPED*/