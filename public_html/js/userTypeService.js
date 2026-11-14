async function getUserType(){
     
    try{
        const { data, error } = await supabaseClient
            .from('userType')
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

async function createUserType(userType){

    const { data, error } =
        await supabaseClient
            .from('userType')
            .insert([userType]);

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