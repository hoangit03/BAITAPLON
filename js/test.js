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
  const z = document.querySelectorAll(".border_bottom");
  u.forEach((btn, index) => {
    btn.onclick = () => {
      document.querySelector(".footer_quali.show").classList.remove("show");
      g[index].classList.toggle("show");
    };
  });
}

// Hàm render Shop

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
          <div>
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

// Hàm show Header

function showHeader() {
  // Show header shop
  getProduct(showHShop);

  // Show header Product
  getProduct(ShowHProduct);
}

// Gọi hàm xử lý

// Hàm xử lý header là fixed
ScrollMenu();

// Hàm Show header mobile

showHeaderMobile();

// Hàm show header
showHeader();

