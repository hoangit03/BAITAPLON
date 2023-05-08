

function infoImg(value) {
    let imgPro = document.querySelector("#img__blog");
    if (imgPro) {
      let html = `
      <h1>${value}</h1>
      <div>
          <a href="../html/index.html"><i class="fa-solid fa-house"></i></a>
          <a>${value}</a>
      </div>
      `;
      imgPro.innerHTML = html;
    }
}

function showLinkShop(){
  let productShop = JSON.parse(localStorage.getItem('productTypeShop'))
  infoImg(productShop[0].shop)
}

// thêm Product vào giỏ hàng

function addCart() {
  let btn_addC = document.getElementById("button-cart");
  let isExist = false;
  if (btn_addC) {
    let product = JSON.parse(localStorage.getItem("product"));
    btn_addC.addEventListener("click", function (event) {
      let account = JSON.parse(localStorage.getItem('account'))
      if(account == null){
        window.location = './login.html'
      }
      else{
        let arrdataCart = JSON.parse(localStorage.getItem('arrdataCart')) ?? []
        let quantity = Number(document.getElementById("input-quantity").value);
        arrdataCart.forEach(cart=>{
          if(cart.name == product.name){
            cart.quantity += quantity
            isExist = true;
          }
        })
        if(arrdataCart.length == 0 || !isExist){
          let data = {
          name: product.name,
          url: product.url,
          price: product.price,
          quantity: quantity,
          };
          arrdataCart.push(data)
        }
        localStorage.setItem('arrdataCart',JSON.stringify(arrdataCart))
      }
    });
  }
}

function renderProductItem(pros, productItem) {
    if (productItem) {
      let htmlproducts = pros.map((pro) => {
        return `
        <div class="content_product_colum_number" style="margin: 30px 30px 0 30px;">
          <div><img src="${pro.url}" alt="" /></div>
          <div class="product_info">
            <div class="name_img">
              <a href="#"><h5>${pro.name}</h5></a>
            </div>
            <div class="product_money">
              <i class="bi bi-currency-dollar"></i><b>${pro.price}.00</b>
            </div>
            <div class="rating">
              <i class="bi bi-star"></i><i class="bi bi-star"></i
              ><i class="bi bi-star"></i><i class="bi bi-star"></i
              ><i class="bi bi-star"></i>
            </div>
            <div class="product_buy">
              <div class="buy_item add-cart">
                <div>
                  <a href="#"><i class="bi bi-bag-fill"> </i></a>
                </div>
                <div class="buy_item_link"><p>Add to card</p></div>
                <div class="buy_squence"></div>
              </div>
              <div class="buy_item">
                <div>
                  <a href="#"><i class="bi bi-heart-fill"></i></a>
                </div>
                <div class="buy_item_link"><p>Add to Wishlist</p></div>
                <div class="buy_squence"></div>
              </div>
              <div class="buy_item">
                <div>
                  <a href="#"><i class="bi bi-eye-fill"></i></a>
                </div>
                <div class="buy_item_link"><p>Quickview</p></div>
                <div class="buy_squence"></div>
              </div>
              <div class="buy_item">
                <div>
                  <a href="#"><i class="bi bi-shuffle"></i></a>
                </div>
                <div class="buy_item_link"><p>Compare</p></div>
                <div class="buy_squence"></div>
              </div>
            </div>
          </div>
        </div>
        `;
      });
      productItem.innerHTML = htmlproducts.join("");
    }
}

function iconCart(){
  let icon_addC = document.querySelectorAll('.add-cart');
  let productType = JSON.parse(localStorage.getItem('productTypeShop'))
  let isExist = false;
  icon_addC.forEach((icon,index)=>{
    let account = JSON.parse(localStorage.getItem('account'))
    icon.addEventListener('click',function(){
      console.log(this,index);
      if(account == null){
        window.location = './login.html'
      }
      else{
        let arrdataCart = JSON.parse(localStorage.getItem('arrdataCart')) ?? []
        arrdataCart.forEach(cart=>{
          if(cart.name == productType[index].name){
            cart.quantity += 1
            isExist = true;
          }
        })
        if(arrdataCart.length == 0 || !isExist){
          let data = {
          name: productType[index].name,
          url: productType[index].url,
          price: productType[index].price,
          quantity: 1,
          };
          arrdataCart.push(data)
        }
        localStorage.setItem('arrdataCart',JSON.stringify(arrdataCart))
      }
      event.stopPropagation();
    })

  })
}

function showListType(){
    let list = document.querySelector('.content_product_colum')
    let productShop = JSON.parse(localStorage.getItem('productTypeShop'))
    let product = JSON.parse(localStorage.getItem('productShop'))
    renderProductItem(productShop,list)
}

function productOrder(ProductT) {
    let productList = document.querySelectorAll(".content_product_colum .name_img");
    let productType = localStorage.getItem(ProductT);
    let products = JSON.parse(productType);
    productList.forEach((product, index) => {
      product.addEventListener("click", function () {
        localStorage.setItem("product", JSON.stringify(products[index]));
        localStorage.setItem("productType",JSON.stringify(products));
        window.location = "./product.html";
      });
    });
}

function renderListShop(item,products){
    let html = products.map(product=>{
      return `
      <li><a href="#">${product.name}</a></li>
      `
    })
    item.innerHTML = `
      <ul>
        ${html.join('')}
      </ul>
    `
}

function showRefineShop(){
  let productsS = document.querySelector('.cate_list')
  let productShop = JSON.parse(localStorage.getItem('productTypeShop'))
  renderListShop(productsS,productShop)
}


function showPageShop(Products){
  showLinkShop();
  showRefineShop();
  showListType();
  productOrder("productTypeShop")
  iconCart();
}

showPageShop();
