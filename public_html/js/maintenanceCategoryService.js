async function getMaintenanceCategory(){
     
    try{
        const { data, error } = await supabaseClient
            .from('maintenanceCategory')
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

async function createMaintenanceCategory(maintenanceCategory){

    const { data, error } =
        await supabaseClient
            .from('maintenanceCategory')
            .insert([maintenanceCategory]);

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