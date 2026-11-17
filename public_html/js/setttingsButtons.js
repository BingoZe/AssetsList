function addField(){
    const fieldElement = document.querySelectorAll("settingsButtons");
    console.log("Clicado ",fieldElement);
    let inputField = null;
    
    fieldElement.addEventListener(event,()=>{
         inputField =
            document.createElement("input");
    
        return inputField;
    });
    
    document.querySelectorAll("settingsInputField").innerHTML = inputField;
}