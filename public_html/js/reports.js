async function assetsByType() {
    
    const assets = await getAssets();

    const triggerExport = document.getElementById("assetsByType");

    triggerExport.addEventListener("click", () => {

        const typeCount = countBy(assets, "type");

        let csvContent =
            "Asset ID,Service Tag,Type\r\n";

        assets.forEach(asset => {

            csvContent +=
                `${asset.assetId},` +
                `${asset.serviceTag},` +
                `${asset.type}\r\n`;

        });

        csvContent +=
            `\r\n` +
            `==========\r\n` +
            `SUMMARY\r\n` +
            `==========\r\n` +
            `\r\n` +
            `Type,Count\r\n`;

        Object.entries(typeCount).forEach(([type, count]) => {

            csvContent +=
                `${type},${count}\r\n`;

        });

        const encodedUri =
            encodeURI("data:text/csv;charset=utf-8," + csvContent);

        const link = document.createElement("a");

        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "assetsByType.csv");

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    });

}


async function assetsByLocation() {
    
    const assets = await getAssets();

    const triggerExport = document.getElementById("assetsByLocation");

    triggerExport.addEventListener("click", () => {

        const typeCount = countBy(assets, "location");

        let csvContent =
            "Asset ID,Service Tag,Location\r\n";

        assets.forEach(asset => {

            csvContent +=
                `${asset.assetId},` +
                `${asset.serviceTag},` +
                `${asset.location}\r\n`;
        });

        csvContent +=
            `\r\n` +
            `==========\r\n` +
            `SUMMARY\r\n` +
            `==========\r\n` +
            `\r\n` +
            `Type,Count\r\n`;

        Object.entries(typeCount).forEach(([type, count]) => {

            csvContent +=
                `${type},${count}\r\n`;

        });

        const encodedUri =
            encodeURI("data:text/csv;charset=utf-8," + csvContent);

        const link = document.createElement("a");

        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "assetsByLocation.csv");

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    });

}

async function assetsByUser() {
    
    const assets = await getAssets();

    const triggerExport = document.getElementById("assetsByUser");

    triggerExport.addEventListener("click", () => {

        const typeCount = countBy(assets, "user");

        let csvContent =
            "Asset ID,Service Tag,UserId,User\r\n";

        assets.forEach(asset => {

            csvContent +=
                `AST-${asset.assetId},` +
                `${asset.serviceTag},` +
                `USR-${asset.users.userId},` +
                `${asset.users.firstName} ${asset.users.lastName} \r\n`;
        });

        const encodedUri =
            encodeURI("data:text/csv;charset=utf-8," + csvContent);

        const link = document.createElement("a");

        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "assetsByUser.csv");

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    });

}