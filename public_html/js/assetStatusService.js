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

async function createAssetStatus(assetStatus){

    const { data, error } =
        await supabaseClient
            .from('assetStatus')
            .insert([assetStatus]);

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