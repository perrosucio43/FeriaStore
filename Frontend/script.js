const nav=document.querySelector(".encabezado");

let current=0;

window.addEventListener("scroll", ()=>{

let actual=window.scrollY;
if(actual>current){
nav.classList.add("active")
}
else{
    nav.classList.remove("active");
}
current=actual;

});