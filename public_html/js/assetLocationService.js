async function getAssetLocation(){
     
    try{
        const { data, error } = await supabaseClient
            .from('assetLocation')
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

async function createAssetLocation(assetLocationName){

    const { data, error } =
        await supabaseClient
            .from('assetLocation')
            .insert({
                name: assetLocationName
            });

    if(error){
        console.log("ERROR:");
        console.log(error);
        return null;
    }

    return data;
}

async function updateAssetLocation(assetLocationId, name){

    const { data, error } =
        await supabaseClient
            .from('assetLocation')
            .update({
                name:name
            })
            .eq("assetLocationId",assetLocationId);

    if(error){
        console.log("ERROR:");
        console.log(error);
        return null;
    }

    return data;
}

async function deleteAssetLocation(assetLocationId){

    if(!confirm("Are you sure you want to delete it?")){
        return;
    }

    const { error } =await supabaseClient
            .from('assetLocation')
            .delete()
            .eq(
                'assetLocationId',
                assetLocationId
            );

    if(error){
        console.log(error);
        return;
    }

    await renderLocationField();

}