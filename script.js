console.log("JS cargado");
/*NAV*/
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


/**/
document.addEventListener("click", (e) =>{

    /*menu desplegable*/
const btn = e.target.closest(".boton-menu");

if(btn){
const menu=document.querySelector(".menu-desplegable");
const menuMin=document.querySelector(".min-menu");
menuMin.classList.remove("active");
menu.classList.toggle("active");
}



/* links menu*/
const link=e.target.closest("[data-id]");
console.log("link", link);

if(!link){
return;
}

const id = link.dataset.id;

console.log("id",id);

const menuMin=document.querySelector(".min-menu");
const menu=document.querySelector(".menu-desplegable");
console.log(id);

if(id==="contacto"){
menuMin.classList.toggle("active");
}
else
{
menu.classList.remove("active");
menuMin.classList.remove("active");
}


const social=e.target.closest("[data-id]");
console.log("id social", social);

if(!social){
return;
}

const idS=social.dataset.id;

if(idS==="whats"){
const url=`https://wa.me/${543755650247}?text=${encodeURIComponent("hola, necesito informacion.")}`;
window.open(url, "_blank");
}
if(idS==="insta"){

}


});
/*NAV*/

/*Fetch.Stores*/

async function init(){

const stores= await getStores();
renderStores(stores);
console.log(stores);

}


async function getStores(){

    const response = await fetch("./data/stores.json");
    const data = await response.json();
    return data;

}


function createStores(stores){

    return `
    <div class="store-card ${stores.category}" >

       <div class="card-images">
    <img src="${stores.img1}" class="img-main" alt="producto" />
    <img src="${stores.img2}" class="img-top" alt="producto" />
    <img src="${stores.img3}" class="img-bottom" alt="producto" />
       </div>

  <div class="card-content">
    
      <div class="content">
          <div class="content-icon">
          <svg xmlns="http://www.w3.org/2000/svg" 
         width="25" height="25" 
         fill="none" 
         stroke="currentColor" 
         stroke-width="2" 
         viewBox="0 0 24 24">
      <path d="M3 9l1-4h16l1 4"></path>
      <path d="M5 9v10h14V9"></path>
      <path d="M9 19v-6h6v6"></path>
          </svg>
         </div>

        <div class="content-text">
            <h3 class="store-name">${stores.name}</h3>
             <p class="store-category">${stores.textspan}</p>
        </div>
             
     </div>

    <div class="btn-content">
        
      <div class="category">

        <div class="category-svg">
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z"/>
         </svg>
         </div>
        <span class="category-badge"> 
        ${stores.category}</span>

      </div>  
    
      <a href="catalog.html?id=${stores.id}" class="btn">Ver mas</a>

    </div>
    
  </div>
</div>`;
        


}

function renderStores(stores){

    const container=document.querySelector(".store-grid");

    container.innerHTML=stores.map(store => createStores(store)).join("");

}

init();







/*Fetch.Stores*/


