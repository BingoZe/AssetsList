async function getMaintenancePriority(){
     
    try{
        const { data, error } = await supabaseClient
            .from('maintenancePriority')
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

async function createMaintenancePriority(maintenancePriority){

    const { data, error } =
        await supabaseClient
            .from('maintenancePriority')
            .insert([maintenancePriority]);

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