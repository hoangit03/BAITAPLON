




function renderOrderProduct() {
    const product_content = document.querySelector(".product-content");
    if (product_content) {
      let value = localStorage.getItem("product");
      let proJson = localStorage.getItem("productType");
      value = JSON.parse(value);
      let products = JSON.parse(proJson);
      infoImg(value.name);
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

// Chuyển giữa Reviews và description

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

// Xử lý tăng giảm số lượng quantity

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

// Tạo mới dữ liệu

function createData(data, API) {
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

// Thêm sản phẩm vào cart

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
        createData(data, cartAPI);
      });
    }
}

function orderProduct() {
    renderOrderProduct();
    handleRewDesc();
    handleUpBack();
    productOrder('productType');
    handleMinusPlus();
    addCart();
  }