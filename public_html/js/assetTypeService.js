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

async function createAssetType(assetType){

    const { data, error } =
        await supabaseClient
            .from('assetType')
            .insert([assetType]);

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