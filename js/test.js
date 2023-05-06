// xử lý header fixed

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

// Gọi hàm xử lý

ScrollMenu();
showHeaderMobile();
