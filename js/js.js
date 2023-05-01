

var accountAPI = 'http://localhost:3000/account';
var productAPI = 'http://localhost:3000/products'
// Function getAccount
function getAccount(callback){
  fetch(accountAPI)
    .then(function(response){
      return response.json();
    })
    .then(callback)
}


function checkLogin(form,accuonts){
  let btn_submit =  form.querySelector('button[type="submit"]')
  let inputEmail = form.querySelector('input[type="email"]')
  let inputPass = form.querySelector('input[type="password"]')
  inputEmail.onfocus = function(){
    let error = this.parentElement.querySelector('.error-messages')
    error.innerHTML = ""
  }
  
  btn_submit.addEventListener('click',function(){
    event.preventDefault();
    email = inputEmail.value
    pass = inputPass.value
    accuonts.forEach(accuont=>{
      if(accuont.email == email && accuont.password == pass){
        window.location = './index.html'
      }
      else{
        let error = inputEmail.parentElement.querySelector('.error-messages')
        error.innerHTML = 'Tài khoản hoặc mật khẩu không chính xác. Vui lòng đăng nhập lại!'
        inputPass.value = ""
      }
    })
    
  })
}


function nextPage(forms){
  for (let index = 0; index < forms.length; index++) {

    let btnNext_form = forms[index].querySelector('.next_form')
    btnNext_form.onclick = function(){
      parentElement = btnNext_form.parentElement
      parentElement.style.display = 'none'
      if(index == 0){
        forms[index+1].style.display = 'block'
      }
      else
        forms[0].style.display = 'block'
    }
    
  }

}

function checkRegister(form,accuonts){
  let btn_submit =  form.querySelector('button[type="submit"]')
  let inputEmail = form.querySelector('input[type="email"]')
  let inputPass = form.querySelector('input[type="password"]')
  let inputPassConfi = form.querySelector('input[id="confirmPassword"]')
  let inputs = form.querySelectorAll('input')
  let errors = form.querySelectorAll('.error-messages')
  inputs.forEach(input=>{
    input.onfocus = function(){
      let error = this.parentElement.querySelector('.error-messages')
      error.innerHTML = ""
    }
  })
  inputPass.onblur = function(){
    if(this.value.length < 8){
      let error = this.parentElement.querySelector('.error-messages')
      error.innerHTML = "Password phải nhiều hơn 8 kí tự!"
    }
  }
  inputPassConfi.onblur = function(){
    if(this.value != inputPass.value){
      let error = this.parentElement.querySelector('.error-messages')
      error.innerHTML = "Password không khới!"
    }
  }
  
  
  btn_submit.addEventListener('click',function(){
    event.preventDefault();
    let dk = 0;
    accuonts.forEach(accuont=> {
      if(accuont.email == inputEmail.value){
        let error = inputEmail.parentElement.querySelector('.error-messages')
        error.innerHTML = "Email này đã đăng ký tài khoản!"
      }
      else{
        if(checkEmail(inputEmail.value)==false){
          let error = inputEmail.parentElement.querySelector('.error-messages')
          error.innerHTML = "Email không hợp lệ!"
        }
        
      }
    })
    
    inputs.forEach(input=>{
      if(input.value == ''){
        let error = input.parentElement.querySelector('.error-messages')
        error.innerHTML = "Trường này không được bỏ trống"
      }
    })
    errors.forEach(error=>{
    if(!error.textContent)
      dk++;
    })
    if(dk == errors.length){
      var data = {
        email: inputEmail.value,
        password: inputPass.value
      }
      createAccount(data);
    }
    
  })
  

}

function createAccount(data){
  var option = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  fetch(accountAPI,option)
    .then(function(data){
      location.reload();
    })

}

function checkEmail(value){
  let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  return regex.test(value)
}


function LoginPage(){
  var forms = document.querySelectorAll('#content_login form')
  getAccount(function(accuonts){
// Chức năng singup
// --------------------------------------------------------------------
    checkLogin(forms[0],accuonts)
// Chức năng login
// ------------------------------------------------------------------------
    checkRegister(forms[1],accuonts)

  })
  
// Login -> singup
// ---------------------------------------------------------------------------
  nextPage(forms);
}

// ---------





function ScrollMenu(){
  window.addEventListener('scroll',function(){
    var header = document.getElementById('header');
    var slider = document.getElementById('slider');
    var img_blog = document.getElementById('img__blog');
    header.classList.toggle('header-fixed',window.scrollY > 600)
    if(slider)
      slider.classList.toggle('slider-scroll',window.scrollY > 600)
    if(img_blog)
      img_blog.classList.toggle('slider-scroll',window.scrollY > 600)
  })
}

// Get Products
function ShowProducts(){
  getProduct(renderProducts);
}
// get thông tin sản phẩm
function renderProducts(products){
  
  let productItems = document.querySelectorAll('.product_item')
  productItems.forEach((productItem,index)=>{
    if(index == 0){
      productItem.classList.add('show')
      let pros = typeProduct(products,"new")
      renderProductItem(pros,productItem)
    }
    else if(index == 1){
      let pros = typeProduct(products,"Popular")
      renderProductItem(pros,productItem)
    }
    else{
      let pros = typeProduct(products,"Bestseller")
      renderProductItem(pros,productItem)
    }
  })
}


// Tách thông tin product

function typeProduct(products,info){
  var pros = products.filter(product=>{
    return product.info == info
  })
  return pros;
}


// render product các thông tin sản phẩm

function renderProductItem(pros,productItem){
  
  let htmlproducts = pros.map(pro=>{
    return `
    <div class="content_product_colum_number">
      <div><img src="${pro.url}" alt="" /></div>
      <div class="product_info">
        <div class="name_img">
          <a href=""><h5>${pro.name}</h5></a>
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
  })
  productItem.innerHTML = htmlproducts.join('')
}


function handleTypeProduct(){
  let btn_groups = document.querySelectorAll('.btn-group button')
  let product_items = document.querySelectorAll('.product_item')
  btn_groups.forEach((btn_group,index)=>{
    btn_group.addEventListener('click',function(){
      let btn_active = document.querySelector('.btn-group .active')
      let item_show = document.querySelector('.content_product .show')
      btn_active.classList.remove('active')
      item_show.classList.remove('show')
      this.classList.add('active')
      product_items[index].classList.add('show')
      
    })
  })

}

// render Order Product
function renderOrderProduct(){
  let value = localStorage.getItem('product')
  const product_content = document.querySelector('.product-content')
}


// lấy product từ API

function getProduct(callback){
  fetch(productAPI)
    .then(function(response){
      return response.json();
    })
    .then(callback)
}

// Xử lý product khi click
function clickProduct(products){
  let prosNew = typeProduct(products,"new")
  let prosPopu = typeProduct(products,"Popular")
  let prosBest = typeProduct(products,"Bestseller")
  let productItems = document.querySelectorAll('.product_item')
  productItems.forEach((productItem,index)=>{
    if(index == 0){
      let protypes = productItem.querySelectorAll('.content_product_colum_number')
      protypes.forEach((protype,index)=>{
        protype.onclick = function(){
          localStorage.setItem('product',JSON.stringify(prosNew[index]))
          console.log(localStorage.getItem('product'));
          window.location = './product.html'
        }
      })
    }
    else if(index == 1){
      let protypes = productItem.querySelectorAll('.content_product_colum_number')
      protypes.forEach((protype,index)=>{
        protype.onclick = function(){
          localStorage.setItem('product',JSON.stringify(prosPopu[index]))
          window.location = './product.html'
        }
      })
      
    }
    else{
      let protypes = productItem.querySelectorAll('.content_product_colum_number')
      protypes.forEach((protype,index)=>{
        protype.onclick = function(){
          localStorage.setItem('product',JSON.stringify(prosBest[index]))
          console.log(localStorage.getItem('product'));
          window.location = './product.html'
        }
      })
      
    }
  })
}

function orderProduct() {
  getProduct(clickProduct);
  renderOrderProduct()
}

// Xử lý hiển thị loại product

handleTypeProduct();

// hiển thị dữ liệu product
ShowProducts();


// xử lý login-register
LoginPage();

// xử lý header fixed
ScrollMenu();


// Order product

orderProduct();
