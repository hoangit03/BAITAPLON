var accountAPI = "http://localhost:3000/account";
var productAPI = "http://localhost:3000/products";
var cartAPI = "http://localhost:3000/cart ";

// Function getAccount
function getAccount(callback) {
  fetch(accountAPI)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function checkLogin(form, accuonts) {
  let btn_submit = form.querySelector('button[type="submit"]');
  let inputEmail = form.querySelector('input[type="email"]');
  let inputPass = form.querySelector('input[type="password"]');
  inputEmail.onfocus = function () {
    let error = this.parentElement.querySelector(".error-messages");
    error.innerHTML = "";
  };

  btn_submit.addEventListener("click", function () {
    event.preventDefault();
    email = inputEmail.value;
    pass = inputPass.value;
    accuonts.forEach((accuont) => {
      if (accuont.email == email && accuont.password == pass) {
        window.location = "./index.html";
      } else {
        let error = inputEmail.parentElement.querySelector(".error-messages");
        error.innerHTML =
          "Tài khoản hoặc mật khẩu không chính xác. Vui lòng đăng nhập lại!";
        inputPass.value = "";
      }
    });
  });
}

function nextPage(forms) {
  for (let index = 0; index < forms.length; index++) {
    let btnNext_form = forms[index].querySelector(".next_form");
    btnNext_form.onclick = function () {
      parentElement = btnNext_form.parentElement;
      parentElement.style.display = "none";
      if (index == 0) {
        forms[index + 1].style.display = "block";
      } else forms[0].style.display = "block";
    };
  }
}

function checkRegister(form, accuonts) {
  let btn_submit = form.querySelector('button[type="submit"]');
  let inputEmail = form.querySelector('input[type="email"]');
  let inputPass = form.querySelector('input[type="password"]');
  let inputPassConfi = form.querySelector('input[id="confirmPassword"]');
  let inputs = form.querySelectorAll("input");
  let errors = form.querySelectorAll(".error-messages");
  inputs.forEach((input) => {
    input.onfocus = function () {
      let error = this.parentElement.querySelector(".error-messages");
      error.innerHTML = "";
    };
  });
  inputPass.onblur = function () {
    if (this.value.length < 8) {
      let error = this.parentElement.querySelector(".error-messages");
      error.innerHTML = "Password phải nhiều hơn 8 kí tự!";
    }
  };
  inputPassConfi.onblur = function () {
    if (this.value != inputPass.value) {
      let error = this.parentElement.querySelector(".error-messages");
      error.innerHTML = "Password không khới!";
    }
  };

  btn_submit.addEventListener("click", function () {
    event.preventDefault();
    let dk = 0;
    accuonts.forEach((accuont) => {
      if (accuont.email == inputEmail.value) {
        let error = inputEmail.parentElement.querySelector(".error-messages");
        error.innerHTML = "Email này đã đăng ký tài khoản!";
      } else {
        if (checkEmail(inputEmail.value) == false) {
          let error = inputEmail.parentElement.querySelector(".error-messages");
          error.innerHTML = "Email không hợp lệ!";
        }
      }
    });

    inputs.forEach((input) => {
      if (input.value == "") {
        let error = input.parentElement.querySelector(".error-messages");
        error.innerHTML = "Trường này không được bỏ trống";
      }
    });
    errors.forEach((error) => {
      if (!error.textContent) dk++;
    });
    if (dk == errors.length) {
      var data = {
        email: inputEmail.value,
        password: inputPass.value,
      };
      createAccount(data, accountAPI);
    }
  });
}
function createAccount(data, API) {
  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(API, option).then(function (data) {
    location.reload();
  });
}

function checkEmail(value) {
  let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(value);
}

// ---------

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

// Get Products
function ShowProducts() {
  getProduct(renderProducts);
}
// get thông tin sản phẩm
function renderProducts(products) {
  let productItems = document.querySelectorAll(".product_item");
  productItems.forEach((productItem, index) => {
    if (index == 0) {
      productItem.classList.add("show");
      let pros = typeProduct(products, "new");
      renderProductItem(pros, productItem);
    } else if (index == 1) {
      let pros = typeProduct(products, "Popular");
      renderProductItem(pros, productItem);
    } else {
      let pros = typeProduct(products, "Bestseller");
      renderProductItem(pros, productItem);
    }
  });
}

// Tách thông tin product

function typeProduct(products, info) {
  var pros = products.filter((product) => {
    return product.info == info;
  });
  return pros;
}

function showProduct(products, shop) {
  var pros = products.filter((product) => {
    return product.shop == shop;
  });
  return pros;
}

// render product các thông tin sản phẩm

function renderProductItem(pros, productItem) {
  if (productItem) {
    let htmlproducts = pros.map((pro) => {
      return `
      <div class="content_product_colum_number">
        <div><img src="${pro.url}" alt="" /></div>
        <div class="product_info">
          <div class="name_img">
            <div href=""><h5>${pro.name}</h5></div>
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
            <div class="buy_item">
              <div>
                <a href=""><i class="bi bi-bag-fill"> </i></a>
              </div>
              <div class="buy_item_link"><p>Add to card</p></div>
              <div class="buy_squence"></div>
            </div>
            <div class="buy_item">
              <div>
                <a href=""><i class="bi bi-heart-fill"></i></a>
              </div>
              <div class="buy_item_link"><p>Add to Wishlist</p></div>
              <div class="buy_squence"></div>
            </div>
            <div class="buy_item">
              <div>
                <a href=""><i class="bi bi-eye-fill"></i></a>
              </div>
              <div class="buy_item_link"><p>Quickview</p></div>
              <div class="buy_squence"></div>
            </div>
            <div class="buy_item">
              <div>
                <a href=""><i class="bi bi-shuffle"></i></a>
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

function handleTypeProduct() {
  let btn_groups = document.querySelectorAll(".btn-group button");
  let product_items = document.querySelectorAll(".product_item");
  btn_groups.forEach((btn_group, index) => {
    btn_group.addEventListener("click", function () {
      let btn_active = document.querySelector(".btn-group .active");
      let item_show = document.querySelector(".content_product .show");
      btn_active.classList.remove("active");
      item_show.classList.remove("show");
      this.classList.add("active");
      product_items[index].classList.add("show");
    });
  });
}

// render Order Product
function renderOrderProduct() {
  const product_content = document.querySelector(".product-content");
  if (product_content) {
    let value = localStorage.getItem("product");
    let proJson = localStorage.getItem("productType");
    value = JSON.parse(value);
    let products = JSON.parse(proJson);
    infoProductImg(value.name);
    showRelatedProduct(products);
    let htmlProductInfo = `
  <div class="row mb-3">
    <div class="col-md-6 product-left">
      <div class="product-img">
        <img src="${value.url_big}" style="width: 100%;" alt="">
        <div class="list-item-img">
          <div class="owl-item">
            <img src="${products[0].url_big}" alt="">
          </div>
          <div class="owl-item">
            <img src="${products[1].url_big}" alt="">
          </div>
          <div class="owl-item">
            <img src="${products[2].url_big}" alt="">
          </div>
          <div class="owl-item">
            <img src="${products[3].url_big}" alt="">
          </div>
          <div class="">
            <button class="nav-left">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button class="nav-right">
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
        </div>
      </div>
      <div class="col-md-6 product-right">
        <div class="product-title">${value.name}</div>
        <div class="rating">
          <div class="product-rating">
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
          </div>
          <a href="#" class="product-review">0 Reviews</a>
          <a href="#" class="product-comment">
            <i class="fa-solid fa-pencil"></i>
            Write a review
          </a>
        </div>
        <hr>
        <ul class="list-dics">
          <li>
            <span class="dics">Brand:</span>
            <a class="dics1" href="#">Apple</a>
          </li>
          <li>
            <span class="dics">Product code:</span>
            <span class="dics1">product ${value.id_pro}</span>
          </li>
          <li>
            <span class="dics">Availability:</span>
            <span class="dics1">In Stock</span>
          </li>
        </ul>
        <hr>
        <ul class="product-price">
          <li>
            <h2>$${value.price}.00</h2>
          </li>
          <li>
            Ex Tax: $${value.price}.00
          </li>
        </ul>
        <hr>
        <div class="quantity-addcart">
          <div class="pro-quantity">
            <label for="">Qty</label>
            <div class="btn-quantity">
              <button class="mines"><i class="fa-sharp fa-solid fa-minus"></i></button>
              <input type="text" name="quantity" value="1" id="input-quantity">
              <button class="plus"><i class="fa-sharp fa-solid fa-plus"></i></button>
            </div>
          </div>
          <div class="pro-addcart">
            <button type="submit" id="button-cart" class="btn-add-cart">
              <i class="fa-solid fa-bag-shopping"></i>
              <span>Add To Cart</span>
            </button>
          </div>
        </div>
        <div class="post-cart">
          <button type="submit" class="add-list">
            <i class="fa-solid fa-heart"></i>
            <span>ADD TO WISH LIST</span>
          </button>
          <button type="submit" class="compare">
            <i class="fa-sharp fa-solid fa-shuffle"></i>
            <span>COMPARE THIS PRODUCT</span>
          </button>
        </div>
      </div>
      
    </div>
  </div>
  `;
    product_content.innerHTML = htmlProductInfo;
    // localStorage.clear()
  }
}

// lấy product từ API

function getProduct(callback) {
  fetch(productAPI)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

// Xử lý product khi click
function clickProduct(products) {
  let prosNew = typeProduct(products, "new");
  let prosPopu = typeProduct(products, "Popular");
  let prosBest = typeProduct(products, "Bestseller");
  let productItems = document.querySelectorAll(".product_item");
  productItems.forEach((productItem, index) => {
    if (index == 0) {
      let protypes = productItem.querySelectorAll(
        ".content_product_colum_number"
      );
      protypes.forEach((protype, index) => {
        protype.onclick = function () {
          localStorage.setItem("product", JSON.stringify(prosNew[index]));
          localStorage.setItem("productType", JSON.stringify(prosNew));

          window.location = "./product.html";
        };
      });
    } else if (index == 1) {
      let protypes = productItem.querySelectorAll(
        ".content_product_colum_number"
      );
      protypes.forEach((protype, index) => {
        protype.onclick = function () {
          localStorage.setItem("product", JSON.stringify(prosPopu[index]));
          localStorage.setItem("productType", JSON.stringify(prosPopu));
          window.location = "./product.html";
        };
      });
    } else {
      let protypes = productItem.querySelectorAll(
        ".content_product_colum_number"
      );
      protypes.forEach((protype, index) => {
        protype.onclick = function () {
          localStorage.setItem("product", JSON.stringify(prosBest[index]));
          localStorage.setItem("productType", JSON.stringify(prosBest));
          window.location = "./product.html";
        };
      });
    }
  });
}
function infoProductImg(value) {
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

function showRelatedProduct(products) {
  let relatedContent = document.querySelector(".content_product_colum");
  renderProductItem(products, relatedContent);
}

function handleUpBack() {
  let btnMoveLeft = document.querySelector("#move_left");
  let btnMoveRight = document.querySelector("#move_right");
  if (btnMoveLeft && btnMoveRight) {
    let relatedProduct = document.querySelector(".content_product_colum");
    btnMoveLeft.onclick = function () {
      relatedProduct.style.transform = `translateX(${-313}px)`;
    };
    btnMoveRight.onclick = function () {
      relatedProduct.style.transform = `translateX(${313}px)`;
    };
  }
}

function handleRewDesc() {
  let btn_rew_desc = document.querySelectorAll(".navdes-rev div");
  let pro_cnt = document.querySelectorAll(".pro-cnt > div");
  btn_rew_desc.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      let btn_active = document.querySelector(".navdes-rev div.active");
      let pro_show = document.querySelector(".pro-cnt > div.show");
      btn_active.classList.remove("active");
      pro_show.classList.remove("show");
      this.classList.add("active");
      pro_cnt[index].classList.add("show");
    });
  });
}

function handleMinusPlus() {
  let minus = document.querySelector(".btn-quantity .mines");
  let plus = document.querySelector(".btn-quantity .plus");
  if (minus && plus) {
    let inputQuantity = document.querySelector(".btn-quantity input");
    let quantity = Number(inputQuantity.value);

    minus.addEventListener("click", function () {
      if (quantity > 1) {
        quantity--;
        inputQuantity.value = quantity;
      }
    });

    plus.addEventListener("click", function () {
      quantity++;
      inputQuantity.value = quantity;
    });
  }
}
function productOrder() {
  let productList = document.querySelectorAll(".content_product_colum > div");
  let productType = localStorage.getItem("productType");
  let products = JSON.parse(productType);
  productList.forEach((product, index) => {
    product.addEventListener("click", function () {
      localStorage.setItem("product", JSON.stringify(products[index]));
      window.location = "./product.html";
    });
  });
}

function addCart() {
  let btn_addC = document.getElementById("button-cart");
  if (btn_addC) {
    let product = JSON.parse(localStorage.getItem("product"));
    btn_addC.addEventListener("click", function () {
      let quantity = Number(document.getElementById("input-quantity").value);
      let data = {
        name: product.name,
        url: product.url,
        price: product.price,
        quantity: quantity,
      };
      createAccount(data, cartAPI);
    });
  }
}

function orderProduct() {
  getProduct(clickProduct);
  renderOrderProduct();
  handleRewDesc();
  handleUpBack();
  productOrder();
  handleMinusPlus();
  addCart();
}

function shopContent(products) {
  let itemContent = products.map((product) => {
    return `
    <li><a href="#">${product.name}</a></li>
    `;
  });
  let html = `
    <div>
    <h4><a href="">${products[0].shop}</a></h4>
    <ul>
      ${itemContent.join("")}
    </ul>
    </div>
  `;
  return html;
}

function showShop(products) {
  let show = document.querySelectorAll(".shop_content_link");
  let showBone = showProduct(products, "Bone Condition");
  let showWireless = showProduct(products, "Wireless Earbuds");
  let showOver = showProduct(products, "Over-Ear Headphones");
  let showWired = showProduct(products, "Wired Earbuds");
  let html1 = shopContent(showBone);
  let html2 = shopContent(showWireless);
  let html3 = shopContent(showOver);
  let html4 = shopContent(showWired);
  let html = html1 + html2 + html3 + html4;
  show[0].innerHTML = html;
  show[1].innerHTML = html;
}

function showHeader() {
  getProduct(showShop);
}

function LoginPage() {
  var forms = document.querySelectorAll("#content_login form");
  getAccount(function (accuonts) {
    // Chức năng singup
    // --------------------------------------------------------------------
    checkLogin(forms[0], accuonts);
    // Chức năng login
    // ------------------------------------------------------------------------
    checkRegister(forms[1], accuonts);
  });
  // Login -> singup
  // ---------------------------------------------------------------------------
  nextPage(forms);
}

// Xử lý hiển thị loại product

handleTypeProduct();

// hiển thị dữ liệu product
ShowProducts();

showHeader();

// xử lý login-register
LoginPage();

// xử lý header fixed
ScrollMenu();

// Order product

orderProduct();

// Thương
showHeaderMobile();
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
    btn.onclick = () => g[index].classList.toggle("show");
  });
}
