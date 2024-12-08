//!show cart card
(function () {
  const cartInfo = document.getElementById("cart-info");
  const cart = document.getElementById("cart");
  cartInfo.addEventListener("click", function () {
    cart.classList.toggle("show-cart");
  });
})();

//!add items to cart
(function () {
  const cartBtn = document.querySelectorAll(".store-item-icon");

  cartBtn.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      if (event.target.parentElement.classList.contains("store-item-icon")) {
        let fullPath = event.target.parentElement.previousElementSibling.src;
        let pos = fullPath.indexOf("img") + 3;
        let partPath = fullPath.slice(pos);
        const item = {};
        item.img = `img-cart${partPath}`;
        let name =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[0].textContent;
        item.name = name;
        let price =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[1].textContent;
        console.log(price);
        let finalPrice = price.slice(1).trim();
        item.price = finalPrice;
        console.log(item);
        const cartItem = document.createElement("div");
        cartItem.classList.add(
          "cart-item",
          "d-flex",
          "justify-content-between",
          "text-capitalize",
          "my-3"
        );
        cartItem.innerHTML = `<img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
              <div class="item-text">
                <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                <span>$</span>
                <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
              </div>
              <a href="#" id='cart-item-remove' class="cart-item-remove">
                <i class="fas fa-trash"></i>
              </a>`;

        //select cart
        const cart = document.getElementById("cart");
        const total = document.querySelector(".cart-total-container");
        cart.insertBefore(cartItem, total);
        alert("item added");
        showTotals();
      }
    });
  });

  function showTotals() {
    const total = [];
    const items = document.querySelectorAll(".cart-item-price");

    items.forEach(function (item) {
      total.push(parseFloat(item.textContent));
    });
    // console. log(total);

    const totalMoney = total.reduce(function (total, item) {
      total += item;
      return total;
    }, 0);
    const finalMoney = totalMoney.toFixed(2);

    document.getElementById("cart-total").textContent = finalMoney;
    document.querySelector(".item-total").textContent = finalMoney;
    document.getElementById("item-count").textContent = total.length;
  }
})();

//!remove item from cart
document.addEventListener("DOMContentLoaded", () => {
  const cart = document.getElementById("cart");
  const cartTotalElement = document.getElementById("cart-total");
  const itemCountElement = document.getElementById("item-count");
  const itemTotalElement = document.querySelector(".item-total");

  const recalculateCartInfo = () => {
    let total = 0;
    const prices = cart.querySelectorAll(".cart-item-price");
    prices.forEach((priceElement) => {
      total += parseFloat(priceElement.textContent);
    });

    const itemCount = prices.length;
    cartTotalElement.textContent = total.toFixed(2);
    itemCountElement.textContent = itemCount;
    itemTotalElement.textContent = total.toFixed(2);
  };
  cart.addEventListener("click", (event) => {
    if (event.target.closest(".cart-item-remove")) {
      const cartItem = event.target.closest(".cart-item");
      if (cartItem) {
        cartItem.remove();
        recalculateCartInfo();
      }
    }
  });

  recalculateCartInfo();
});

var findItem = document.getElementById("search-item");
var searchIcon = document.getElementById("search-icon");
const storeItems = document.querySelectorAll(".store-item");

searchIcon.addEventListener("click", findThings);

function findThings() {
  var text = findItem.value.toLowerCase();
  storeItems.forEach(function (item) {
    var itemName = item
      .querySelector("#store-item-name")
      .textContent.toLowerCase();
    if (itemName.includes(text)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
