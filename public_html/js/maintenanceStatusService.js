async function getMaintenanceStatus(){
     
    try{
        const { data, error } = await supabaseClient
            .from('maintenanceStatus')
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

async function createMaintenanceStatus(maintenanceStatus){

    const { data, error } =
        await supabaseClient
            .from('maintenanceStatus')
            .insert([maintenanceStatus]);

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