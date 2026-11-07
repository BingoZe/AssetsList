/* app bootstrap*/

async function initApplication() {

    const session = await getSession();

    if (session) {

        document.body.classList.remove("login-mode");

        await loadPage("pages/dashboard.html");

    } else {

        console.log("Usuario nao autenticado");

        document.body.classList.add("login-mode");

        await loadPage("pages/login.html");

    }

}

document.addEventListener(
    "DOMContentLoaded",
    initApplication
);