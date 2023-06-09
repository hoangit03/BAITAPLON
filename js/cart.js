

function createProductCart(product){
    return `
    <div class="cart-product">
        <img src="${product.url}" alt="" />
        <div class="info-cart">
            <div>
            <h3>${product.name}</h3>
            <b>Price: $${product.price}</b>
            <div class="rating">
                <i class="bi bi-star"></i><i class="bi bi-star"></i
                ><i class="bi bi-star"></i><i class="bi bi-star"></i
                ><i class="bi bi-star"></i>
            </div>
            <p>quantaty: ${product.quantity}</p>
            <h4>Total: $${product.quantity * product.price}</h4>
            </div>
            <div class="btn-cart">
            <button class="cart-pay">Pay</button>
            <button class="cart-fix">Cancel</button>
            </div>
        </div>
    </div>
     `
}

function renderCart(){
    let listCart = document.querySelector('.list-cart')
    let arrCart = JSON.parse(localStorage.getItem('arrdataCart'))
    arrhtml = []
    arrCart.forEach(product => {
        let html = createProductCart(product);
        arrhtml.push(html)
    });
    listCart.innerHTML = arrhtml.join('')
}

function removeArr(index){
    let arrCart = JSON.parse(localStorage.getItem('arrdataCart'))
    let arrNew = arrCart.filter(product=>{
        return product != arrCart[index]
    })
    localStorage.setItem('arrdataCart',JSON.stringify(arrNew))
}

function removeCart(){
    let arrCart = JSON.parse(localStorage.getItem('arrdataCart'))
    let listCart = document.querySelectorAll('.list-cart > div')
    listCart.forEach((product,index)=>{
        let btnrm = product.querySelector('.cart-fix')
        btnrm.onclick = function(){
            product.style.display = "none"
            removeArr(index)
        }
    })
}



function startCart(){
    renderCart();
    removeCart();
}




startCart()



