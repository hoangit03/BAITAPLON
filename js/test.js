// xử lý header fixed

var productAPI = "http://localhost:3000/products";

function ScrollMenu() {
  window.addEventListener("scroll", function () {
    var header = document.getElementById("header");
    var slider = document.getElementById("slider");
    var img_blog = document.getElementById("img__blog");
    header.classList.toggle("header-fixed", window.scrollY > 600);
    if (slider) slider.classList.toggle("slider-scroll", window.scrollY > 600);
    if (img_blog)
      img_blog.classList.toggle("slider-scroll", window.scrollY > 600);
  });
}

// Thương
function showHeaderMobile() {
  const menuMobile = document.querySelector(".header-menu-mobile");
  const menuBtnClose = document.querySelector(".header-menu-close");
  const menuIcon = document.querySelector(".header_right-mobile");
  const btnPlus = document.querySelectorAll(".header-menu-list_icon");
  const menuItems = document.querySelectorAll(".header-menu-list_link");

  menuIcon.onclick = () => menuMobile.classList.add("show");
  menuBtnClose.onclick = () => menuMobile.classList.remove("show");

  btnPlus.forEach((btn, index) => {
    btn.onclick = () => menuItems[index + 1].classList.toggle("show");
  });

  $(document).ready(function () {
    $(".content_lastest_blogs").slick({
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 560,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  });
  const u = document.querySelectorAll(".aea");
  const g = document.querySelectorAll(".footer_quali");
  u.forEach((btn, index) => {
    btn.onclick = () => {
      // document.querySelector(".footer_quali.show").classList.remove("show");
      g[index].classList.toggle("show");
    };
  });
}

// Hàm render Shop




// Hàm lấy type product Shop

function shopProduct(products, shop) {
  var pros = products.filter((product) => {
    return product.shop == shop;
  });
  return pros;
}

// Hàm tạo vào render của header shop

function shopContent(products) {
  let itemContent = products.map((product) => {
    return `
    <li><a href="#">${product.name}</a></li>
    `;
  });
  let html = `
    <div>
    <h4><a href="#">${products[0].shop}</a></h4>
    <ul>
      ${itemContent.join("")}
    </ul>
    </div>
  `;
  return html;
}

// Hàm lấy dữ liệu product từ API

function getProduct(callback) {
  fetch(productAPI)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

// Hàm tác product theo Type

function typeProduct(products, info) {
  var pros = products.filter((product) => {
    return product.info == info;
  });
  return pros;
}

// Hàm tạo html và render Dữ liệu

function createProduct(products){
  let htmls = []
  for (let index = 0; index < 3; index++) {
    let html = `
      <div class="childent_big">
        <div>
          <img
            src="${products[index].url}"
            alt=""
            class="big_img"
          />
        </div>
        <div class="ben">
          <div class="product-header">
            <a href="#">${products[index].name}</a>
          </div>
          <div>
            <i class="bi bi-star"></i><i class="bi bi-star"></i
            ><i class="bi bi-star"></i><i class="bi bi-star"></i
            ><i class="bi bi-star"></i>
          </div>
          <div><i class="bi bi-currency-dollar"></i><b>${products[index].price}</b></div>
        </div>
      </div>
    `;
    htmls.push(html)
    
  }
  return htmls.join('');
}

// Hàm show product header

function showHShop(products) {
  let show = document.querySelectorAll(".shop_content_link");
  let showBone = shopProduct(products, "Bone Condition");
  let showWireless = shopProduct(products, "Wireless Earbuds");
  let showOver = shopProduct(products, "Over-Ear Headphones");
  let showWired = shopProduct(products, "Wired Earbuds");
  let html1 = shopContent(showBone);
  let html2 = shopContent(showWireless);
  let html3 = shopContent(showOver);
  let html4 = shopContent(showWired);
  let html = html1 + html2 + html3 + html4;
  show[0].innerHTML = html;
  show[1].innerHTML = html;
}

// Hàm show header Product

function ShowHProduct(products){
  let prosLatest = typeProduct(products, "Latest");
  let prosPopu = typeProduct(products, "Popular");
  let prosBest = typeProduct(products, "Bestseller");
  let header_products = document.querySelectorAll('.product_childents')
  let pros = [prosPopu,prosBest,prosLatest]
  let resual = []
  pros.forEach(pro=>{
    let htmltitle = `
    <div class="product-title">
      <h3>${pro[0].info} Product</h3>
    </div>
    `
    let content = createProduct(pro)
    htmltitle += content;
    let divhtml = `
      <div class="product-type">
        ${htmltitle}
      </div>
    `
    resual.push(divhtml)
  })
  header_products.forEach(header=>{
    header.innerHTML = resual.join('')
  })
  
}

function createContencate(products){
 let htmls = []
 products.forEach(product=>{
  let html = `
  <div>
    <a href="#">${product.name}</a>
  </div>
  `
  htmls.push(html)
 })
 let html = `
 <div class="mid_content">
  ${htmls.join('')}
  </div>
  <div style="line-height:0">
    <img src="../images/phone_19.png" alt="" />
  </div>
  `
  return html;
}

// Hàm show Product Categories

function ShowHCate(products){
  let showWireless = shopProduct(products, "Wireless Earbuds");
  let showOver = shopProduct(products, "Over-Ear Headphones");
  let prosBest = typeProduct(products, "Bestseller");
  let productsCateL = document.querySelectorAll('.categories_content_left')
  let Categorys = document.querySelectorAll('.categories_content_mid,.categories_content_right')
  productsCateL.forEach(productsCate=>{
    let html = createProduct(prosBest);
    let htmltitle = productsCate.innerHTML
    htmltitle += html
    productsCate.innerHTML = htmltitle
  })
  Categorys.forEach((shopType,index)=>{
    if(index % 2 == 0){
      let html = createContencate(showWireless);
      let htmltitle = shopType.innerHTML
      htmltitle += html
      shopType.innerHTML = htmltitle
    }
    else{
      let html = createContencate(showOver);
      let htmltitle = shopType.innerHTML
      htmltitle += html
      shopType.innerHTML = htmltitle
    }
  })

}


// Hàm click sản phẩm ở header shop

function nextShopPageType(products){
  let titleShows = document.querySelectorAll('.header_menu_shop .shop_content_link > div h4')
  let showBone = shopProduct(products, "Bone Condition");
  let showWireless = shopProduct(products, "Wireless Earbuds");
  let showOver = shopProduct(products, "Over-Ear Headphones");
  let showWired = shopProduct(products, "Wired Earbuds");
  let arr = [showBone,showWireless,showOver,showWired]
  titleShows.forEach((title,index)=>{
    title.addEventListener('click',function(){
      localStorage.setItem('productTypeShop',JSON.stringify(arr[index]))
      window.location = "./shop.html";
    })
  })
}

// Hàm click vào tên product ở header
function nextShopPageProduct(products){
  let productsTypeShop = document.querySelectorAll('.header_menu_shop .shop_content_link > div')
  let showBone = shopProduct(products, "Bone Condition");
  let showWireless = shopProduct(products, "Wireless Earbuds");
  let showOver = shopProduct(products, "Over-Ear Headphones");
  let showWired = shopProduct(products, "Wired Earbuds");
  let arr = [showBone,showWireless,showOver,showWired]
  productsTypeShop.forEach((productsType,indexarr)=>{
    let productsName = productsType.querySelectorAll('li')
    productsName.forEach((product,index)=>{
      product.addEventListener('click',function(){
        localStorage.setItem('productShop',JSON.stringify(arr[indexarr][index]))
        localStorage.setItem('productTypeShop',JSON.stringify([arr[indexarr][index]]))
        window.location = './shop.html'
      })
    })
  })
}

// Hàm click product header

function nextPageProduct(products){
  let prosLatest = typeProduct(products, "Latest");
  let prosPopu = typeProduct(products, "Popular");
  let prosBest = typeProduct(products, "Bestseller");
  let pros = [prosPopu,prosBest,prosLatest]
  let header_products = document.querySelectorAll('.product_childents')
  header_products.forEach(productsh=>{
    let products_title = productsh.querySelectorAll('.product-type');
    products_title.forEach((product_title,indexpro)=>{
      let productsm = product_title.querySelectorAll('.product-header')
      productsm.forEach((product,index)=>{
        product.addEventListener('click',function(){
          localStorage.setItem("product", JSON.stringify(pros[indexpro][index]));
          localStorage.setItem("productType", JSON.stringify(pros[indexpro]));
          window.location = './product.html'
        })
      })
    })
  })
}

function nextPageinCate(products){
  let showWireless = shopProduct(products, "Wireless Earbuds");
  let showOver = shopProduct(products, "Over-Ear Headphones");
  let prosBest = typeProduct(products, "Bestseller");
  let productsCateClass = document.querySelectorAll('.categories_content_left');
  let Categorys = document.querySelectorAll('.categories_content_mid,.categories_content_right');
  productsCateClass.forEach(productCateClass=>{
    let productsCate =  productCateClass.querySelectorAll('.product-header')
    productsCate.forEach((product,index)=>{
      product.addEventListener('click',function(){
        localStorage.setItem("product", JSON.stringify(prosBest[index]));
        localStorage.setItem("productType", JSON.stringify(prosBest));
        window.location = './product.html'
      })
    })
  })
  Categorys.forEach((shopType,index)=>{
    if(index % 2 == 0){
      let ProsShop = shopType.querySelectorAll('.mid_content div')

    }
    else{
      let ProsShop = shopType.querySelectorAll('.mid_content div')
    }
  })
}



// Hàm show Header

function showHeader() {
  // Show header shop
  getProduct(showHShop);
  // Show header Product
  getProduct(ShowHProduct);
  // Show header Categories
  getProduct(ShowHCate)
}

function clickHeader(){
  // click header shop
  getProduct(nextShopPageType);
  getProduct(nextShopPageProduct);
  // click header product
  getProduct(nextPageProduct);

  // click header Cate
  getProduct(nextPageinCate)

}

// Gọi hàm xử lý

// Hàm xử lý header là fixed
ScrollMenu();

// Hàm Show header mobile

showHeaderMobile();

// Hàm show header
showHeader();

// Hàm những hoạt động của header
clickHeader();

