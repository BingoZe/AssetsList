async function getUserStatus(){
     
    try{
        const { data, error } = await supabaseClient
            .from('userStatus')
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

async function createUserStatus(userStatus){

    const { data, error } =
        await supabaseClient
            .from('userStatus')
            .insert([userStatus]);

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