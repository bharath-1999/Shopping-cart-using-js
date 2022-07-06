
let label=document.getElementById("label");
let shoppingCart=document.getElementById("shopping-Cart");





let basket=JSON.parse(localStorage.getItem('data')) || [];
let calculation=()=>{
  let cartIcon=document.getElementById("cartAmount");
  let amount=basket.map((x)=>{
    return x.item;
  });
  amount=amount.reduce((x,y)=>x+y,0);
  cartIcon.innerHTML=amount;
}
let clearCart=()=>{
  basket=[];
  localStorage.setItem("data",JSON.stringify(basket))
  generateCartItems();
  calculation();
}
let totalAmount=()=>{
  if(basket.length!==0)
  {
    let amount=basket.map((x)=>{
      let {item,id}=x;
      let search=shopItemsData.find((y)=>y.id===id) || [];
      return(item*search.price);
    }).reduce((x,y)=>x+y,0);
    label.innerHTML=`<h2> Total Bill:$ ${amount}</h2>
                <button class="checkout">checkout </button>
                <button onclick="clearCart()"class="removeAll">Clear Cart </button>
    `
  }

};
calculation();
totalAmount();
let generateCartItems=()=>{
  if(basket.length!==0){
  return shoppingCart.innerHTML=basket.map((x)=>{
    let {id,item}=x;
    let search=shopItemsData.find((y)=>y.id===id) || [];
    return `
       <div class="cart-item">
        <img width=100 src=${search.img} alt=""/>
        <div class="details">
            <div class="title-price-x">
             <h4 class="title-price">
                       <p> ${search.name}<p>
                       <p class=cart-item-price> $ ${search.price}</p>
            </h4>
        <i onclick="removeItem(${id})"class="bi bi-x-lg"></i>
        </div>
        </div>
      <div class="buttons">
        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
        <div id=${id} class="quantity">${item}</div>
        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
      </div>

      <h3>$ ${item* search.price}</h3>

     </div>

    `
  }).join("");
  }
  else{
shoppingCart.innerHTML=``;
label.innerHTML=`
   <h2> Cart is Empty</h2>
   <a href="./index.html">
   <button class="HomeButton">Back to home</button>
   </a>
`
  }
}
generateCartItems();

let increment=(id)=>{
  let search=basket.find((x)=>x.id==id);
  if(search){
    search.item+=1;

  }
  else {
    basket.push({
    id:id,
    item:1,
  });
}
totalAmount();
localStorage.setItem("data",JSON.stringify(basket));
update(id);
  generateCartItems();
};
let decrement=(id)=>{
  let search=basket.find((x)=>x.id==id);
  if(search === undefined)return;
  if(search.item===0)return;

  else {
  search.item-=1;
  };
  totalAmount();
  update(id);

  basket=basket.filter((x)=>x.item>0);
  generateCartItems();
localStorage.setItem("data",JSON.stringify(basket));

  console.log(basket);
};
let update=(id)=>{

  let search=basket.find((x)=>x.id==id);
  if(search!==undefined)
  document.getElementById(id).innerHTML=search.item;
  calculation();
};
let removeItem=(id)=>{
basket=basket.filter((x)=>x.id!=id);
console.log(basket);
localStorage.setItem("data",JSON.stringify(basket));
generateCartItems();
totalAmount();
calculation();
update(id);

}

console.log("hi");
