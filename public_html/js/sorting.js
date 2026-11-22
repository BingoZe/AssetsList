/*---------------------------------------------*/
/* SORTING DAS TABELAS */
/*---------------------------------------------*/

async function btnSort() {

    const sortButtons = document.querySelectorAll(".sortingButton");

    let sortDirection = "asc";
    let currentSortField = "";

    const sortMap = {
        assetId: 
                asset => asset.assetId,
        assetName: 
                asset => asset.assetName,
        serviceTag: 
                asset => asset.serviceTag,
        assetType: 
                asset => asset.assetType?.name ?? "",
        assetLocation: 
                asset => asset.assetLocation?.name ?? "",
        assetStatus: 
                asset => asset.assetStatus?.name ?? "",
        user: 
                asset => asset.users?.firstName ?? "",
        
        //maintenance
        maintenanceId: 
                maintenance => maintenance.maintenanceId,
        issueDescription: 
                maintenance => maintenance.issueDescription,
        maintenanceCategory: 
                maintenance => maintenance.maintenanceCategory?.name ?? "",
        maintenanceStatus:
                maintenance => maintenance.maintenanceStatus?.name ?? "",
        issueDate:
                maintenance => maintenance.issueDate,
        maintenancePriority:
                maintenance => maintenance.maintenancePriority?.name ?? "",
        
        //user
        userId: 
                user => user.userId,
        username:
                user => user.firstName,
        userEmail: 
                user => user.userEmail,
        userStatus:
                user => user.userStatus?.name ?? "",
        userRole:
                user => user.userRole?.name ?? "",
        userType:
                user => user.userType?.name ?? ""        
    };
    

    sortButtons.forEach(button => {

        button.addEventListener("click", async function () {

            const assets = await getAssets();
            const maintenance = await getMaintenance();
            const user = await getUsers();
            

            const sortTable = button.dataset.table;
            const sortField = button.dataset.sort;


            if (!sortMap[sortField]) {
                console.error(`Campo '${sortField}' não encontrado no sortMap`);
                return;
            }

            /*
             * Se clicar numa nova coluna,
             * começa sempre em ASC
             */
            if (currentSortField !== sortField) {
                currentSortField = sortField;
                sortDirection = "asc";
            }
            
            if(sortTable === "assets"){
                assets.sort((a, b) => {

                const valueA = sortMap[sortField](a);
                const valueB = sortMap[sortField](b);

                let result;

                if (
                    typeof valueA === "string" &&
                    typeof valueB === "string"
                ) {

                    result = valueA.localeCompare(
                        valueB,
                        "pt-BR",
                        { sensitivity: "base" }
                    );

                } else {

                    result = valueA - valueB;

                }

                return sortDirection === "asc"
                    ? result
                    : -result;

            });
            
                sortDirection =
                    sortDirection === "asc"
                        ? "desc"
                        : "asc";

                renderAssets(assets);
            }
            
            if(sortTable === "maintenance"){
                maintenance.sort((a, b) => {

                const valueA = sortMap[sortField](a);
                const valueB = sortMap[sortField](b);

                let result;

                if (
                    typeof valueA === "string" &&
                    typeof valueB === "string"
                ) {

                    result = valueA.localeCompare(
                        valueB,
                        "pt-BR",
                        { sensitivity: "base" }
                    );

                } else {

                    result = valueA - valueB;

                }

                return sortDirection === "asc"
                    ? result
                    : -result;

            });
            
                sortDirection =
                    sortDirection === "asc"
                        ? "desc"
                        : "asc";

                renderMaintenance(maintenance);
            }
            
            if(sortTable === "user"){
                user.sort((a, b) => {

                const valueA = sortMap[sortField](a);
                const valueB = sortMap[sortField](b);

                let result;

                if (
                    typeof valueA === "string" &&
                    typeof valueB === "string"
                ) {

                    result = valueA.localeCompare(
                        valueB,
                        "pt-BR",
                        { sensitivity: "base" }
                    );

                } else {

                    result = valueA - valueB;

                }

                return sortDirection === "asc"
                    ? result
                    : -result;

            });
            
                sortDirection =
                    sortDirection === "asc"
                        ? "desc"
                        : "asc";

                renderUsers(user);
            }

        });

    });

}
