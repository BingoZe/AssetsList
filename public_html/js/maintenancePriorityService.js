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

async function createMaintenancePriority(
        maintenancePriorityName){

    const { data, error } =
        await supabaseClient
            .from('maintenancePriority')
            .insert({
                name:maintenancePriorityName
            });

    if(error){
        console.log("ERROR:");
        console.log(error);
        return null;
    }

    return data;
}

async function updateMaintenancePriority(
        maintenancePriorityId, name){

    const { data, error } =
        await supabaseClient
            .from('maintenancePriority')
            .update({
                name:name
            })
            .eq(
            "maintenancePriorityId",maintenancePriorityId);

    if(error){
        console.log("ERROR:");
        console.log(error);
        return null;
    }

    return data;
}

async function deleteMaintenancePriority(
        maintenancePriorityId){

    if(!confirm("Are you sure you want to delete it?")){
        return;
    }

    const { error } =await supabaseClient
            .from('maintenancePriority')
            .delete()
            .eq(
                'maintenancePriorityId',
                maintenancePriorityId
            );

    if(error){
        console.log(error);
        return;
    }

    await renderMaintenancePriorityField();

}