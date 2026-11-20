/* SETTINGS SERVICE */

async function getSettings() {
    try {
        const { data, error } = await supabaseClient
            .from("settings")
            .select("*")
            .single();

        if (error) {
            console.log(error);
            return null;
        }

        return data;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

async function renderSettings() {

    const settings = await getSettings();

    if (!settings) return;

    document.getElementById("monthEnd").value = settings.monthEnd || "";
    document.getElementById("currency").value = settings.currency || "";
    document.getElementById("defaultDepreciationRate").value = settings.defaultDepreciationRate || "";
    document.getElementById("defaultUsefulLife").value = settings.defaultUsefulLife || "";
    document.getElementById("companyName").value = settings.companyName || "";
    document.getElementById("companyEmail").value = settings.companyEmail || "";
    document.getElementById("contactNumber").value = settings.contactNumber || "";
    document.getElementById("companyAddress").value = settings.companyAddress || "";
    document.getElementById("settingsNotes").value = settings.settingsNotes || "";
}

async function initSettings() {

    await renderSettings();

    document
        .getElementById("saveSettings")
        .addEventListener("click", updateSettings);
}


async function updateSettings() {

    if (!confirm("Are you sure you want to save the settings?")) {
        return;
    }
    
    const { error } = await supabaseClient
        .from("settings")
        .update({
            monthEnd: document.getElementById("monthEnd").value,
            currency: document.getElementById("currency").value,
            defaultDepreciationRate: document.getElementById("defaultDepreciationRate").value,
            defaultUsefulLife: document.getElementById("defaultUsefulLife").value,
            companyName: document.getElementById("companyName").value,
            companyEmail: document.getElementById("companyEmail").value,
            contactNumber: document.getElementById("contactNumber").value,
            companyAddress: document.getElementById("companyAddress").value,
            settingsNotes: document.getElementById("settingsNotes").value
        })
        .eq("settingsId", 1);

    if (error) {
        console.log(error);
        alert("Failed to save settings.");
        return;
    }
 
    alert("Settings saved.");
    await renderSettings();
}