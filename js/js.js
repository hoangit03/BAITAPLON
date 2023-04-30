

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
LoginPage();
// ---------


// Home fixed

ScrollMenu();

function ScrollMenu(){
  window.addEventListener('scroll',function(){
    var header = document.getElementById('header');
    var slider = document.getElementById('slider')
    header.classList.toggle('header-fixed',window.scrollY > 600)
    slider.classList.toggle('slider-scroll',window.scrollY > 600)
  })
}

// Get Products
function ShowProducts(){
  getProduct(renderProducts);
}

function renderProducts(products){
  let listProduct = document.querySelector('#content .content_product')
  var htmlproduct = products.map(product=>{
    return `
    <div class="content_product_colum_number show">
      <div><img src="${product.url}" alt="" /></div>
      <div class="product_info">
        <div class="name_img">
          <a href=""><h5>${product.name}</h5></a>
        </div>
        <div class="product_money">
          <i class="bi bi-currency-dollar"></i><b>${product.price}</b>
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
  listProduct.innerHTML = htmlproduct.join('')
}

function getProduct(callback){
  fetch(productAPI)
    .then(function(response){
      return response.json();
    })
    .then(callback)
}
ShowProducts();