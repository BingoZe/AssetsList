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

async function createMaintenanceCategory(
        maintenanceCategoryName){

    const { data, error } =
        await supabaseClient
            .from('maintenanceCategory')
            .insert({
                name:maintenanceCategoryName
            });

    if(error){
        console.log("ERROR:");
        console.log(error);
        return null;
    }

    return data;
}

async function updateMaintenanceCategory(
        maintenanceCategoryId, name){

    const { data, error } =
        await supabaseClient
            .from('maintenanceCategory')
            .update({
                name:name
            })
            .eq(
            "maintenanceCategoryId",maintenanceCategoryId);

    if(error){
        console.log("ERROR:");
        console.log(error);
        return null;
    }

    return data;
}

async function deleteMaintenanceCategory(
        maintenanceCategoryId){

    if(!confirm("Are you sure you want to delete it?")){
        return;
    }

    const { error } =await supabaseClient
            .from('maintenanceCategory')
            .delete()
            .eq(
                'maintenanceCategoryId',
                maintenanceCategoryId
            );

    if(error){
        console.log(error);
        return;
    }

    await renderMaintenanceCategoryField();

}