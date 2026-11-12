
/* renderiza a tabela com historico de usuarios em posse de
 * asset no view Asset*/
async function renderUserInnerTable(userHistory,viewedAsset){

    let output = "";

    userHistory.forEach(user => {

        output += `
        <tr>

            <td>${user.userId}</td>

            <td>${user.firstName} ${user.lastName}</td>

            <td>${viewedAsset.assetStatus}</td>

            <td>${user.role}</td>

        </tr>
        `;

    });

    document.querySelector(
        ".tableBodyAssetHistory"
    ).innerHTML = output;

}


/*Maintenance*/


async function renderMaintenanceInnerTable(maintenanceHistory){

    let output = "";

    maintenanceHistory.forEach(maintenance => {

        output += `
        <tr>

            <td>${maintenance.maintenanceId}</td>

            <td>${maintenance.issueDescription}</td>

            <td>${maintenance.maintenanceCategory.name}</td>

            <td>${maintenance.maintenanceStatus.name}</td>

            <td>${maintenance.issueDate}</td>

        </tr>
        `;

    });

    document.querySelector(
        ".tableBodyMaintenance"
    ).innerHTML = output;

}