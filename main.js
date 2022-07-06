let shop=document.getElementById('shop');

let basket=JSON.parse(localStorage.getItem('data')) || [];


let generateShop=()=>{

  return shop.innerHTML=shopItemsData.map((x)=>{
    let {id,name,desc,price,img}=x;
  //  console.log(id)
    let search=basket.find((x)=>x.id===id) || [];
    console.log("hi");
  return  `<div id=product-id-${id} class="item">
      <img width=230 src=${img} alt="">
      <div class="details">
        <h3>${name}</h3>
        <p> ${desc}</p>
        <div class="price-quantity">
          <h2> $ ${price}</h2>
          <div class="buttons">
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            <div id=${id} class="quantity">${search.item===undefined?0:search.item}</div>
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
          </div>
        </div>
      </div>
    </div>
    `
  }).join("");
};

generateShop();

let increment=(id)=>{
  id=id.id;
  console.log(id);
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
localStorage.setItem("data",JSON.stringify(basket));
update(id);
  console.log(basket);
};
let decrement=(id)=>{
  id=id.id;
  let search=basket.find((x)=>x.id==id);
  if(search === undefined)return;
  if(search.item===0)return;

  else {
  search.item-=1;
  };
  update(id);

  basket=basket.filter((x)=>x.item>0);

localStorage.setItem("data",JSON.stringify(basket));

  console.log(basket);
};
let update=(id)=>{
  let search=basket.find((x)=>x.id===id);
  console.log(basket[0].id);
  if(search!==undefined)
  document.getElementById(id).innerHTML=search.item;
  calculation();
};

let calculation=()=>{
  let cartIcon=document.getElementById("cartAmount");
  let amount=basket.map((x)=>{
    return x.item;
  });
  amount=amount.reduce((x,y)=>x+y,0);
  cartIcon.innerHTML=amount;
}
calculation();
