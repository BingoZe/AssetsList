
function errorPopUp(message) {

    return Swal.fire({
        icon: "error",
        text: message
    });
}


function successPopUp(message){
    return Swal.fire({
        icon: "success",
        title: "Success",
        text: message
    });
}


function confirmPopUp(message) {
    return Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: message,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No"
    });
}


/*funcoes temporarias para validacoes*/

function addErrorCss(prop) {
    const field = document.getElementById(prop);

    field.classList.add("inputError");

    const tab = field.closest(".tabcontent");

    if (tab) {
        document.querySelectorAll(".tabcontent").forEach(t => {
            t.style.display = "none";
        });

        tab.style.display = "block";
    }

    setTimeout(() => {
        field.focus();
        field.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 100);

    return false;
}

function removeErrorCss(prop) {
    document.getElementById(prop).classList.remove("inputError");
}