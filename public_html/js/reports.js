async function assetsByType() {
    
    const assets = await getAssets();

    const triggerExport = document.getElementById("assetsByType");

    triggerExport.addEventListener("click", () => {

    const typeCount = {};

    assets.forEach(asset =>{
        const typeName = asset.assetType?.name || 'unknown';
        typeCount[typeName] = (typeCount[typeName] || 0)+1;      
    });

        let csvContent =
            "Asset ID,Service Tag,Type\r\n";

        assets.forEach(asset => {

            csvContent +=
                `${asset.assetId},` +
                `${asset.serviceTag},` +
                `${asset.assetType.name}\r\n`;

        });

        csvContent +=
            `\r\n` +
            `==========\r\n` +
            `SUMMARY\r\n` +
            `==========\r\n` +
            `\r\n` +
            `Type,Count\r\n`;

        Object.entries(typeCount).forEach(([assetType, count]) => {

            csvContent +=
                `${assetType},${count}\r\n`;

        });

    exportCsv(csvContent,"assetsByType.csv");

    });

}


async function assetsByLocation() {
    
    const assets = await getAssets();

    const triggerExport = document.getElementById("assetsByLocation");

    triggerExport.addEventListener("click", () => {

        const locationCount = {};

        assets.forEach(asset =>{
            const LocationName = asset.assetLocation?.name || 'unknown';
            locationCount[LocationName] = (locationCount[LocationName] || 0)+1;      
        });
        
        let csvContent =
            "Asset ID,Service Tag,Location\r\n";

        assets.forEach(asset => {

            csvContent +=
                `${asset.assetId},` +
                `${asset.serviceTag},` +
                `${asset.assetLocation.name}\r\n`;
        });

        csvContent +=
            `\r\n` +
            `==========\r\n` +
            `SUMMARY\r\n` +
            `==========\r\n` +
            `\r\n` +
            `Type,Count\r\n`;

        Object.entries(locationCount).forEach(([location, count]) => {

            csvContent +=
                `${location},${count}\r\n`;

        });

        exportCsv(csvContent,"assetsByLocation.csv");
        
    });

}

async function assetsByUser() {
    
    const assets = await getAssets();

    const triggerExport = document.getElementById("assetsByUser");

    triggerExport.addEventListener("click", () => {

        let csvContent =
            "Asset ID,Service Tag,Asset Name,UserId,UserId,Username\r\n";

        assets.forEach(asset => {

            csvContent +=
                `AST-${asset.assetId},` +
                `${asset.serviceTag},` +
                `${asset.assetName},` +
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
                    `${maintenance.maintenanceCategory.name},` +
                    `${maintenance.maintenanceStatus.name},` +
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
                `${maintenance.maintenanceCategory.name},` +
                `${maintenance.maintenanceStatus.name},` +
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
            "Asset ID,Service Tag,Warranty Expiry,Details\r\n";

        assets.forEach(asset => {

            csvContent +=
                `AST-${asset.assetId},` +
                `${asset.serviceTag},` +
                `${asset.warrantyExpiryDate},` +
                `${asset.warrantyDetails} \r\n`;
        });

    exportCsv(csvContent,"warrantyExpiry.csv");

    });

}
