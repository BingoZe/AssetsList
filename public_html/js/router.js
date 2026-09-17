/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

async function loadPage(page){
    const response = await fetch(page);
    const html = await response.text();
    document.getElementById("main-content").innerHTML = html;
    };
    
    
function openTab(evt,tabName){
    var i, tabcontent, tablinks;
    
    tabcontent = document.getElementsByClassName("tabcontent");
    
    for(i = 0; i<tabcontent.length;i++){
        tabcontent[i].style.display="none";
    }
        
}
    