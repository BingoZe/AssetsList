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

async function createMaintenanceStatus(maintenanceStatusName){

    const { data, error } =
        await supabaseClient
            .from('maintenanceStatus')
            .insert({
                name:maintenanceStatusName
            });

    if(error){
        console.log("ERROR:");
        console.log(error);
        return null;
    }

    return data;
}

async function updateMaintenanceStatus(
        maintenanceStatusId, name){

    const { data, error } =
        await supabaseClient
            .from('maintenanceStatus')
            .update({
                name:name
            })
            .eq("maintenanceStatusId",maintenanceStatusId);

    if(error){
        console.log("ERROR:");
        console.log(error);
        return null;
    }

    return data;
}

async function deleteMaintenanceStatus(maintenanceStatusId){

    if(!confirm("Are you sure you want to delete it?")){
        return;
    }

    const { error } =await supabaseClient
            .from('maintenanceStatus')
            .delete()
            .eq(
                'maintenanceStatusId',
                maintenanceStatusId
            );

    if(error){
        console.log(error);
        return;
    }

    await renderMaintenanceStatusField();

}