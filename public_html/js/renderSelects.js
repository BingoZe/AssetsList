
/* renderiza os usuarios do BD dentro do select do view Asset*/
/*Render User field - */
async function renderUserField() {
    const users = await getUsers();
    const userSelect = document.getElementById("userSelect");

    if (!userSelect) {
        return;
    }

    let output = `
        <option value="" selected disabled>
            Select a user
        </option>
    `;

    const uniqueUsers = [];

    users.forEach(user => {
        if (!uniqueUsers.includes(user.userId)) {
            uniqueUsers.push(user.userId);

            output += `
                <option value="${user.userId}">
                    ${user.firstName} ${user.lastName}
                </option>
            `;
        }
    });
    
    userSelect.innerHTML = output;
}

async function renderSpecsField() {
    const specs = await getSpecs();
    const specsSelect = document.getElementById("specsSelect");

    if (!specsSelect) {
        return;
    }

    let output = `
        <option value="" selected disabled>
            Select a model
        </option>
    `;
    console.log("Specs ",specs);
    const uniqueSpecs = [];
    
    specs.forEach(item => {
        if (!uniqueSpecs.includes(item.specsId)) {
            uniqueSpecs.push(item.specsId);

            output += `
                <option value="${item.specsId}">
                    ${item.specsGroup}
                </option>
            `;
        }
    });
    
    specsSelect.innerHTML = output;
}

async function renderTypeField() {
    const assetType = await getAssetType();
    const typeSelect = document.getElementById("typeSelect");

    if (!typeSelect) {
        return;
    }

    let output = `
        <option value="" selected disabled>
            Select a type
        </option>
    `;
    console.log("assetType ",assetType);
    const uniqueAssetType = [];
    
    assetType.forEach(item => {
        if (!uniqueAssetType.includes(item.assetTypeId)) {
            uniqueAssetType.push(item.assetTypeId);

            output += `
                <option value="${item.assetTypeId}">
                    ${item.name}
                </option>
            `;
        }
    });
    
    typeSelect.innerHTML = output;
}

async function renderStatusField() {
    const assetStatus = await getAssetStatus();
    const statusSelect = document.getElementById("statusSelect");

    if (!statusSelect) {
        return;
    }

    let output = `
        <option value="" selected disabled>
            Select a status
        </option>
    `;
 
    const uniqueStatusSelect = [];
    
    assetStatus.forEach(item => {
        if (!uniqueStatusSelect.includes(item.assetStatusId)) {
            uniqueStatusSelect.push(item.assetStatusId);

            output += `
                <option value="${item.assetStatusId}">
                    ${item.name}
                </option>
            `;
        }
    });
    
    statusSelect.innerHTML = output;
}

async function renderLocationField() {
    const assetLocation = await getAssetLocation();
    const locationSelect = document.getElementById("locationSelect");

    console.log("Location select ",locationSelect);
    if (!locationSelect) {
        return;
    }

    let output = `
        <option value="" selected disabled>
            Select a status
        </option>
    `;
 
    const uniqueLocationSelect = [];
    
    assetLocation.forEach(item => {
        if (!uniqueLocationSelect.includes(item.assetLocationId)) {
            uniqueLocationSelect.push(item.assetLocationId);

            output += `
                <option value="${item.assetLocationId}">
                    ${item.name}
                </option>
            `;
        }
    });
    
    locationSelect.innerHTML = output;
}
 