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

async function createAssetLocation(assetLocation){

    const { data, error } =
        await supabaseClient
            .from('assetLocation')
            .insert([assetLocation]);

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