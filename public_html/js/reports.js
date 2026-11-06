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

    exportCsv(csvContent,"assetsByType.csv");

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

        exportCsv(csvContent,"assetsByLocation.csv");
        
    });

}

async function assetsByUser() {
    
    const assets = await getAssets();

    const triggerExport = document.getElementById("assetsByUser");

    triggerExport.addEventListener("click", () => {

        let csvContent =
            "Asset ID,Service Tag,UserId,User\r\n";

        assets.forEach(asset => {

            csvContent +=
                `AST-${asset.assetId},` +
                `${asset.serviceTag},` +
                `USR-${asset.users.userId},` +
                `${asset.users.firstName} ${asset.users.lastName} \r\n`;
        });

        exportCsv(csvContent,"assetsByUser.csv");
    });

}


async function assetsInRepair() {
    
    const maintenances = await getMaintenance();

    const triggerExport = document.getElementById("assetsInRepair");

    triggerExport.addEventListener("click", () => {

        let csvContent =
            "Maintenance Id,Asset,Issue/Service,Category,Status, Issue Date\r\n";

        maintenances.forEach(maintenance => {

            if (maintenance.maintenanceStatus !== "Closed"){
                
                csvContent +=
                    `MNT-${maintenance.maintenanceId},` +
                    `${maintenance.assets.assetId} ${maintenance.assets.assetName},` +
                    `${maintenance.issueDescription},` +
                    `${maintenance.issueCategory},` +
                    `${maintenance.maintenanceStatus},` +
                    `${maintenance.issueDate}  \r\n`;
            }
        });

        exportCsv(csvContent,"assetsInRepair.csv");
    });

}

async function maintenanceHistory() {
    
    const maintenances = await getMaintenance();

    const triggerExport = document.getElementById("maintenanceHistory");

    triggerExport.addEventListener("click", () => {

        let csvContent =
            "Maintenance Id,Asset,Issue/Service,Category,Status, Issue Date\r\n";

        maintenances.forEach(maintenance => {

            csvContent +=
                `MNT-${maintenance.maintenanceId},` +
                `${maintenance.assets.assetId} ${maintenance.assets.assetName},` +
                `${maintenance.issueDescription},` +
                `${maintenance.issueCategory},` +
                `${maintenance.maintenanceStatus},` +
                `${maintenance.issueDate}  \r\n`;
        });

        exportCsv(csvContent,"maintenanceHistory.csv");
    });
    
}

async function warrantyExpiry() {
    
    const assets = await getAssets();

    const triggerExport = document.getElementById("warrantyExpiry");

    triggerExport.addEventListener("click", () => {

        let csvContent =
            "Asset ID,Service Tag,Warranty Expiry\r\n";

        assets.forEach(asset => {

            csvContent +=
                `AST-${asset.assetId},` +
                `${asset.serviceTag},` +
                `${asset.warrantyExpiryDate} \r\n`;
        });

    exportCsv(csvContent,"warrantyExpiry.csv");

    });

}
