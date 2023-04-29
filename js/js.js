

var accountAPI = 'http://localhost:3000/account';

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
// --------------------------------------------------------------------