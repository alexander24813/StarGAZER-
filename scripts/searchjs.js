
let searchbtn = document.getElementById("searchBtn");


searchbtn.onclick = function(){
    const NORAD = document.getElementById("NORADentry").value;
  
    if ((NORAD === "" || isNaN(NORAD)) ) {
    console.log("rejected:not a number");
       
    } else {
       if(NORAD.length==5){
        alert("accepted:");
        window.location.href = "satedata.html?norad=" + NORAD ;
       }else{
        alert("rejected:not a valid NORAD");
       }
    
   
}}