
/*INIT*/
async function init(){

const params= new URLSearchParams(window.location.search);
const renderId=params.get("id");

console.log(renderId);

const catalog = await getCatalog();
const store=catalog.find(s=>s.id==renderId);

console.log(catalog);
console.log(store);
console.log("numero de cel",store.phone);
if(!store){
console.error("error al cargar catalogo");
return;
}
console.log(store.productos);

renderCatalog(store.productos);

createHeader(store);

cartClick(store);

}
/*INIT*/

/*FETCH*/
async function getCatalog(){

const response = await fetch("./data/catalogo.json");
const data = await response.json();


return data;

}
/*FETCH*/

/*RENDER CATALOGO*/
function renderCatalog(products){
    const container=document.querySelector(".catalog-container");

    container.innerHTML=products.map(pro => createCat(pro)).join("");

}

function createCat(product){
    return `
    <div class="card">

  <div class="img-card">
    <img src="${product.imgcatalog}" class="img-logo-card">
    <button class="btn-cart" data-id="${product.id}">Añadir +</button>
  </div>

  <p class="description-card">${product.description}</p>
  <p class="price-card">$${product.price}</p>

</div>`;
}
/*RENDER CATALOGO*/

/*RENDER HEADER*/
function createHeader(Element){
    const name = document.querySelector(".info-text h1");
    const category=document.querySelector(".info-text span");
    const description=document.querySelector(".info-text p");
    const imgsrc=document.querySelector(".info-perfil img");

    name.textContent=Element.name;
    category.textContent=Element.categoria;
    description.textContent=Element.textdescription;
    imgsrc.src=Element.perfil;
}
/*RENDER HEADER*/

/*CLICK BTN AÑADIR*/
function cartClick(currentstore){

document.addEventListener("click", (e) =>{

  const btncart=e.target.closest(".btn-cart");
if(btncart){
    const ID=btncart.dataset.id;
    const product=currentstore.productos.find(x=>x.id==ID);
    console.log("producto enviado a cart", product, currentstore.name, currentstore.phone);
    addtoCart(product, currentstore.name, currentstore.phone);
    alert("producto agregado al carrito");
}

const btnmovil=e.target.closest(".botton-cart");
if(btnmovil){
window.location.href=`cart.html?storeId=${currentstore.id}`;
return;

}

});
}

/*CLICK AÑADIR*/


init();