


var accuonts = [
  {
    id : 1,
    email: 'thuong@gmail.com',
    password: '12345678'
  },
  {
    id: 2,
    email: 'hoang@gmail.com',
    password: '12345678'
  }
]

function checkLogin(form){
  let btn_submit =  form.querySelector('button[type="submit"]')
  let inputEmail = form.querySelector('input[type="email"]')
  let inputPass = form.querySelector('input[type="password"]')
  inputEmail.onfocus = function(){
    let error = this.parentElement.querySelector('.error-messages')
    error.innerHTML = ""
  }
  accuonts.forEach(accuont=>{
    btn_submit.onclick = function(){
      event.preventDefault();
      if(accuont.email == inputEmail.value && accuont.password == inputPass.value){

        window.location = './index.html'
      }
      else{
        let error = inputEmail.parentElement.querySelector('.error-messages')
        error.innerHTML = 'Tài khoản không hợp lệ. Vui lòng đăng nhập lại!'
        inputEmail.value = ""
        inputPass.value = ""
      }
    }
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

function checkRegister(form){
  let btn_submit =  form.querySelector('button[type="submit"]')
  let inputEmail = form.querySelector('input[type="email"]')
  let inputPass = form.querySelector('input[type="password"]')
  let inputPassConfi = form.querySelector('input[id="confirmPassword"]')
  let inputs = form.querySelectorAll('input')
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
  
  for (let index = 0; index < accuonts.length; index++) {
    
  
    btn_submit.onclick = function(){
      event.preventDefault();
      inputs.forEach(input=>{
        if(input.value == ''){
          let error = input.parentElement.querySelector('.error-messages')
          error.innerHTML = "Trường này không được bỏ trống"
        }
        else{
          var a = [{
            id: accuonts.length,
            email: inputEmail.value,
            password: inputPass.value
          }]
          accuonts.push(a)
          
          location.reload()
        }
      })
      if(accuonts[index].email == inputEmail.value){
        let error = inputEmail.parentElement.querySelector('.error-messages')
        error.innerHTML = "Email này đã đăng ký tài khoản!"
      }
      
      
    }
  }
}


function LoginPage(){
  var forms = document.querySelectorAll('#content_login form')
  // Chức năng singup
// --------------------------------------------------------------------
  checkRegister(forms[1])

// Chức năng login
// ------------------------------------------------------------------------
  checkLogin(forms[0])

// Login -> singup
// ---------------------------------------------------------------------------
  nextPage(forms);




// login
// ------------------------------------------
// forms.forEach(form=>{
//   console.log(form);
// })

}


LoginPage();
// --------------------------------------------------------------------