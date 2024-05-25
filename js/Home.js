let container = document.querySelector(".container");
let cards = document.querySelectorAll(".card");



// container.style.display="none";

//   setInterval(function(){
//      container.style.display="block";
    
//         loader.style.display="none"
//      },2000)

let products=[
  {
    "id":1,
    "name":"Buche de Noel",
    "price":1200,
    "image":"../img/Buche de Noel (Yule Log).jpg"
},
{
    "id":2,
    "name":"Tarte Tatin",
    "price":1650,
    "image":"../img/Tarte Tatin.jpg"
},
{
    "id":3,
    "name":"Eclairs",
    "price":800,
    "image":"../img/eclairs.jpg"
},
{
    "id":4,
    "name":"Mille-Fuilles",
    "price":750,
    "image":"../img/millefuilles.jpg"
},
{
    "id":5,
    "name":"Choco Lava Cake",
    "price":400,
    "image":"../img/closeup-shot-chocolate-cake-wooden-table.jpg"
},
{
    "id":6,
    "name":"Cappuccino",
    "price":600,
    "image":"../img/cup-three-layered-coffee-dark.jpg"
}
,
{
    "id":7,
    "name":"Macrons",
    "price":400,
    "image":"../img/macrons.jpg"
},

{
    "id":8,
    "name":"Cupcake",
    "price":350,
    "image":"../img/cupcacke.jpg"
},

{
    "id":9,
    "name":"Bluberry Cheesecake",
    "price":4000,
    "image":"../img/blueberry - Copy.jpg"
},

{
    "id":10,
    "name":"Choco Brownie Ice cream",
    "price":800,
    "image":"../img/scooops.jpg"
},
{
    "id":11,
    "name":"Choco Swiss Roll",
    "price":400,
    "image":"../img/cinamonroll.jpg"
},
{
    "id":12,
    "name":"Fruit Swiss Roll",
    "price":380,
    "image":"../img/roll.jpg"
},
{
  "id":13,
  "name":"Tarte aux Pommes",
  "price":950,
  "image":"../img/Tarte aux Pommes (Apple Tart).jpg"
},
{
  "id":14,
  "name":"Donut",
  "price":500,
  "image":"../img/donut.jpg"
},
{
  "id":15,
  "name":"Choux Pastry",
  "price":400,
  "image":"../img/choux pastry.jpg"
},
{
  "id":16,
  "name":"Opera Cake",
  "price":850,
  "image":"../img/operacake.jpg"
},
{
  "id":17,
  "name":"Gateau St. Honoré",
  "price":900,
  "image":"../img/Gateau St. Honoré.jpg"
},
{
  "id":18,
  "name":"Walnut Brownie",
  "price":1150,
  "image":"../img/cake.jpg"
},
{
  "id":19,
  "name":"Ice Cream Sundae",
  "price":800,
  "image":"../img/icecream.jpg"
},
{
  "id":20,
  "name":"Fruit Sorbets",
  "price":1000,
  "image":"../img/Fruit Sorbets.jpg"
},
{
  "id":21,
  "name":"Croissants",
  "price":900,
  "image":"../img/Croissants.jpg"
},
{
  "id":22,
  "name":"Pain aux Raisins",
  "price":800,
  "image":"../img/Pain aux Raisins.jpg"
},
{
  "id":23,
  "name":"Floating Island",
  "price":1200,
  "image":"../img/Floating Island (le Flottante).jpg"
},
{
  "id":24,
  "name":"Koiugh-Amann",
  "price":740,
  "image":"../img/Kouign-Amann.jpg"
}
]
let listProducts=[];
let carts=[];
let listCartHTML=document.querySelector('.ListCart');
let iconCart=document.querySelector('.fa-bag-shopping');
let closeCart=document.querySelector('.close');
let body=document.querySelector('body')
let listProductHTML=document.querySelector('.foodCard')
let iconCartSpan=document.querySelector('.fa-bag-shopping span')
listProducts = products;

iconCart.addEventListener('click',()=>{
  body.classList.toggle('showCart')
})

closeCart.addEventListener('click',()=>{
  body.classList.toggle('showCart')
})
const addToCart=(product_id)=>{
  console.log("Product ID added to cart:", product_id);
  let positionThisProductInCart=carts.findIndex((value)=>value.product_id==product_id)
  if(carts.length<=0){
    carts.push({
      product_id:product_id,
      price: products[product_id-1].price,
      quantity:1
    })
  }else if(positionThisProductInCart<0){
    carts.push({
      product_id:product_id,
      price: products[product_id-1].price,
      quantity:1
    })
  }else{
    carts[positionThisProductInCart].quantity=carts[positionThisProductInCart].quantity+1;
  }
  addCartToHTML();
  addCartToMemory();
  console.log(carts);
  displayTotalPrice();

}

listProductHTML.addEventListener('click',(event)=>{
  let postionClick=event.target;
  if(postionClick.classList.contains('add')){
    let product_id=postionClick.parentElement.dataset.id;
    addToCart(product_id);
  }
})
const addCartToMemory=()=>{
  localStorage.setItem('cart',JSON.stringify(carts));
}


const addCartToHTML = () => {
  listCartHTML.innerHTML = '';
  let totalPrice=0;
  let totalQuantity = 0;
  if (carts.length > 0) {
    carts.forEach(cart => {
      totalQuantity += cart.quantity;
      let newCart = document.createElement('div');
      newCart.classList.add('item');
      newCart.dataset.id = cart.product_id;

      let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);

        let info = listProducts[positionProduct];
        newCart.innerHTML = `
          <div class="image">
            <img src="${info.image}" alt="">
          </div>
          <div class="name">
            ${info.name}
          </div>
          <div class="totalPrice">
          ₹${info.price*cart.quantity}
          </div>
          <div class="quantity">
            <span class="minus"><i class="fa fa-minus" aria-hidden="true"></i></span>
            <span>${cart.quantity}</span>
            <span class="plus"><i class="fa fa-plus" aria-hidden="true"></i></span>
          </div>
        `;
        listCartHTML.append(newCart);
        totalPrice += info.price * cart.quantity;
    });
  }
  iconCartSpan.innerText = totalQuantity;
  displayTotalPrice();

  const totalPriceDiv = document.createElement('div');
  // totalPriceDiv.classList.add('totalCart');
  // totalPriceDiv.innerHTML = `
  //   // <span class="totalSpan">Total: $${totalPrice}</span>
  // `;
  listCartHTML.appendChild(totalPriceDiv);

};
listCartHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
    let productId = positionClick.parentElement.parentElement.dataset.id
    let type='minus';
    if(positionClick.classList.contains('plus')){
      type='plus';
    }
    changeQuantity(productId,type);
  }
  displayTotalPrice();
});

const changeQuantity = (productId, type) => {
  let positionItemInCart = carts.findIndex((value) => value.product_id == productId);

  if (positionItemInCart >= 0) {
    switch (type) {
      case 'plus':
        carts[positionItemInCart].quantity += 1; // Increase quantity
        break;
      case 'minus':
        if (carts[positionItemInCart].quantity > 1) {
          carts[positionItemInCart].quantity -= 1; // Decrease quantity if greater than 1
        } else {
          carts.splice(positionItemInCart, 1); // Remove item if quantity is 1
        }
        break;
      default:
        break;
    }
  }
  addCartToMemory();
  addCartToHTML();
  displayTotalPrice();
};

const initApp=()=>{

  if(localStorage.getItem('cart')){
    carts = JSON.parse(localStorage.getItem('cart'));
    addCartToHTML();
  }
}

initApp();




function calculateTotalPrice() {
  let totalCart = 0;
  totalCart = carts.reduce((total, cart) => {
    let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
    let price = listProducts[positionProduct].price;
    return total + price * parseInt(cart.quantity);
  }, 0);
  return totalCart;
}

function displayTotalPrice() {
  const totalPrice = calculateTotalPrice();
  const totalPriceDiv = document.getElementsByClassName('totalSpan')[0];
  totalPriceDiv.textContent = `₹ Total price:${totalPrice}`;
}

displayTotalPrice();
