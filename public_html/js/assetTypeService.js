async function getAssetType(){
     
    try{
        const { data, error } = await supabaseClient
            .from('assetType')
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


async function createAssetType(assetTypeName){

    const { data, error } =
        await supabaseClient
            .from('assetType')
            .insert({
                name: assetTypeName
            });


    if(error){
        console.log("ERROR:");
        console.log(error);
        return null;
    }


    return data;
}

async function updateAssetType(assetTypeId, name){

    const { data, error } =
        await supabaseClient
            .from('assetType')
            .update({
                name: name
            })
            .eq('assetTypeId', assetTypeId);

    if(error){
        console.log(error);
        return null;
    }

    return data;
}


async function deleteAssetType(assetTypeId){

    if(!confirm("Are you sure you want to delete it?")){
        return;
    }

    const { error } =await supabaseClient
            .from('assetType')
            .delete()
            .eq(
                'assetTypeId',
                assetTypeId
            );

    if(error){
        console.log(error);
        return;
    }

    await renderTypeField();

}
