
/*INIT*/
const params = new URLSearchParams(window.location.search);
const storeId = params.get("storeId");
console.log(storeId);

loadCart();
cartPrice();

/*init*/

window.addtoCart = function(product, store, phone){

    const exist=cart.find(x=>x.id==product.id);
    
    if(exist){
        exist.qty++;
    }
    else{
        cart.push({...product, qty:1, nameStore: store, numberPhone: phone});

    }

    cartSave();
    cartRender(cart);
   


}


/*SAVE CART*/
function cartSave(){

localStorage.setItem("cart", JSON.stringify(cart));


}

/*LOAD CART*/
function loadCart(){

const data = localStorage.getItem("cart");

if(data){
    window.cart=JSON.parse(data);
}
else{
   window.cart=[]; 
}

}


/*CART RENDER*/
function cartRender(product){

const container=document.querySelector(".cards-cart");

if(!container){
return;
}
container.innerHTML=product.map(pro=>htmlRender(pro)).join("");


}
function htmlRender(product){

return `<div class="card">

  <div class="card-content-firts">
  
  <div class="img-content">
    <img src="${product.imgcatalog}" class="img-cart">
  </div>

  <div class="text-content">
      <span class="name-product">
      ${product.description}
      </span>
    <span class="store-name">
      ${product.nameStore}
    </span>
    <span class="price-text">
      ${product.price}
    </span>
  </div>

  </div>

  <div class="ux">
  
  <button class="delete" data-id="${product.id}">
    <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none" id="tech">
        <path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>        
  </button>
  
  <div class="sum-dec">
    <button class="decrement" data-id="${product.id}">
     <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none" id="tech">
       <path d="M5 12h14"/>
     </svg>
    </button>
    <span class="view-number">${product.qty}</span>
    <button class="increment" data-id="${product.id}">
    <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none" id="tech">
        <path d="M5 12h14"/><path d="M12 5v14"/>
     </svg> 
    </button>
  </div>
  
  </div>  

</div>`;



}
/*cart render*/

/*DELETE, DECRE, INCRE*/
const container=document.querySelector(".cards-cart");
if(container){
container.addEventListener("click", (e)=>{


const btn=e.target.closest("button");

if(!btn){
return;
}

const id=btn.dataset.id;

console.log("id", id);

if(btn.classList.contains("delete")){
deleteProduct(id);
}
if(btn.classList.contains("increment")){
incrementeProduct(id);
}
if(btn.classList.contains("decrement")){
decrementProduct(id);
}
console.log(e.target.classList);

});
}

function deleteProduct(id){

    cart=cart.filter(x=>x.id!=id);
    console.log("cart", cart);
    cartPrice();
    cartSave();
    cartRender(cart);
    

}

function incrementeProduct(id){

const exist=cart.find(c=>c.id==id);

if(exist.qty<100){
exist.qty++;
cartSave();
cartRender(cart);
cartPrice();

}
else{
    return;
}

}
function decrementProduct(id){

const exist=cart.find(c=>c.id==id);

if(exist.qty==1){
deleteProduct(id);
}
else{
exist.qty--;
cartSave();
cartRender(cart);
cartPrice();
}

}

function cartPrice(){

const resume=document.querySelector(".resume p");

if(!resume){
return;
}
const costo=getTotalcart();

resume.textContent=`$${costo}`;

return costo;

}
/*DELETE, DECRE, INCRE, PRICE*/



/*CALCULAR TOTAL*/

function getTotalcart(){

return cart.reduce((acc, pro) =>{
    return acc + (pro.price*pro.qty);
},0);
}



/*FINALIZED*/
const btnFin=document.querySelector(".finalized");

if(btnFin){
btnFin.addEventListener("click", ()=>{
    console.log(btnFin);
    if(cart.length===0){
        console.log("entro");
        return;
    }
    console.log("fuera");
    sendtomessage();
});
}

function sendtomessage(){

    if(!cart.length){
        return;
    }
const number=`540${cart[0]?.numberPhone}`;

const message=buildtomessage();

const url=`https://wa.me/${number}?text=${encodeURIComponent(message)}`;

window.open(url, "_blank");


}

function buildtomessage(){

    let message=" *Nuevo pedido: *\n\* ";

    cart.forEach(element => {
        
    message +=`* ${element.description} x${element.qty} - $${element.price}\n`;
    });

    const total=`$${getTotalcart()}`;
    
    
    message +=`\n*Total:* ${total}`;
    return message;
}

const arrow=document.querySelector(".arrow-left");
if(arrow){
arrow.addEventListener("click", ()=>{
   window.location.href=`catalog.html?id=${storeId}`;
    
});
}


document.addEventListener("DOMContentLoaded", () =>{

const container=document.querySelector(".cards-cart");

if(container){
cartRender(window.cart);

}


});