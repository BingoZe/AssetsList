async function getAssetStatus(){

    try{
        const { data, error } = await supabaseClient
            .from('assetStatus')
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

async function createAssetStatus(assetStatusName){

    const { data, error } =
        await supabaseClient
            .from('assetStatus')
            .insert({
                name: assetStatusName
            });

    if(error){
        console.log("ERROR:");
        console.log(error);
        return null;
    }

    return data;
}

async function updateAssetStatus(assetStatusId, name){

    const { data, error } =
        await supabaseClient
            .from('assetStatus')
            .update({
                name: name
            })
            .eq('assetStatusId', assetStatusId);

    if(error){
        console.log(error);
        return null;
    }

    return data;
}

async function deleteAssetStatus(assetStatusId){

    if(!confirm("Are you sure you want to delete it?")){
        return;
    }

    const { error } = await supabaseClient
        .from('assetStatus')
        .delete()
        .eq(
            'assetStatusId',
            assetStatusId
        );

    if(error){
        console.log(error);
        return;
    }

    await renderStatusField();

}