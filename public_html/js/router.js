/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

async function loadPage(page){
    const response = await fetch(page);
    const html = await response.text();
     
    document.getElementById("main-content").innerHTML = html;
     
    const generalTab = document.getElementById("generalTab");
     
    if(generalTab){
    generalTab.style.display = "block";
}
}
    
    
function openTab(evt, tabName) {
 
    let tabcontent = document.getElementsByClassName("tabcontent");
     
    for(let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    }
     
    document.getElementById(tabName).style.display = "block";
     
    evt.preventDefault();
}
    