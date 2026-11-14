async function getDepartment(){
     
    try{
        const { data, error } = await supabaseClient
            .from('department')
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

async function createDepartment(department){

    const { data, error } =
        await supabaseClient
            .from('department')
            .insert([department]);

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