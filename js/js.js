


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
function signup(e) {
 
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var user = {
    name: name,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };
  var json = JSON.stringify(user);
  if (email == "") {
    alert("rong");
    localStorage.removeItem(name);
  } else {
    alert("thanh cong");
    localStorage.setItem('key', json);
    window.location.href = "./login.html";
  }
  // var modal = document.querySelector('.modal')
  // modal.classList.add('show')
   e.preventDefault();
}
// var buttonclose = document.querySelector('.modal button')
// buttonclose.addEventListener('click', function () {
//         var modal = document.querySelector(".modal");
//         modal.classList.remove("show");
// })

// Chức năng login
// ------------------------------------------------------------------------
function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var get = localStorage.getItem("key");
  var data = JSON.parse(get);
  if (email === data.email && password === data.password) {
    alert("dang nhap thanh cong");
    window.location.href = './home.html';
  } else {
    alert("sai ");
  }
}

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


}
LoginPage();
// --------------------------------------------------------------------