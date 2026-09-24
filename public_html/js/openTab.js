/* open tab settings*/

function openTab(evt, tabName) {
 
    let tabcontent = document.getElementsByClassName("tabcontent");
     
    for(let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    }
     
    document.getElementById(tabName).style.display = "block";
     
    evt.preventDefault();
}
    