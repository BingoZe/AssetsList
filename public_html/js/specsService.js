async function getSpecs(){
     
    try{
        const { data, error } = await supabaseClient
            .from('specs')
            .select(`
                *,
                manufacturer (
                    manufacturerId,
                    name
                ),
                model(
                    modelId,
                    name
                ),
                disk(
                    diskId,
                    storageCapacity
                ),
                ram(
                    ramId,
                    memory
                ),
                operatingSystem(
                    operatingSystemId,
                    name,
                    version
                )
            `);

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

async function createSpecs(specs){

    const { data, error } =
        await supabaseClient
            .from('specs')
            .insert([specs]);

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