var productAPI = "http://localhost:3000/products";

// Các hàm xử lý
// =====================================>

// lấy product từ API

function getProduct(callback) {
    fetch(productAPI)
      .then(function (response) {
        return response.json();
      })
      .then(callback);
}

// Get Products
function ShowProducts() {
    getProduct(renderProducts);
}


//  get thông tin sản phẩm
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

// Hàm chuyển Product Top ở file index

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

// Tách thông tin product trang index

function typeProduct(products, info) {
    var pros = products.filter((product) => {
      return product.info == info;
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

// Hàm chạy logic

function StartIndex(){
    ShowProducts();
    handleTypeProduct();
    getProduct(clickProduct)
}


// Gọi hàm xử lý

StartIndex();