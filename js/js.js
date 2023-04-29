


var taiKhoan = [
  {
    id : 1,
    email: 'thuong@gmail.com',
    password: '12345'
  },
  {
    id: 2,
    email: 'hoang@gmail.com',
    password: '12345'
  }
]


function LoginPage(){
  // Chức năng singup
// --------------------------------------------------------------------



// Chức năng login
// ------------------------------------------------------------------------


// Login -> singup
// ---------------------------------------------------------------------------
forms = document.querySelectorAll('#content_login form')
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

// login
// ------------------------------------------
// forms.forEach(form=>{
//   console.log(form);
// })

}
LoginPage();
// --------------------------------------------------------------------