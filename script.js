let cart = [];
let quantity = 1;
let selectedSize = "8";
let discount = 0;

const product = {
    name: "Nike Air Jordan 1 Low Aura White",
    price: 8750,
    image: "https://culture-circle.gumlet.io/productsimages/image-hygiene/p181961/m6ce38055b1ca385c7923df1e41025acc2d122ac59eccced1dc1ebab3a1c93d87.webp?format=webp&quality=100"
};

function showPage(page) {
    document.querySelector(".hero").style.display = "none";
    document.querySelector(".stats").style.display = "none";
    document.querySelector(".featured").style.display = "none";

    document.getElementById("cart-page").classList.add("hidden");
    document.getElementById("checkout-page").classList.add("hidden");

    if (page === "home") {
        document.querySelector(".hero").style.display = "grid";
        document.querySelector(".stats").style.display = "flex";
        document.querySelector(".featured").style.display = "block";
        window.scrollTo(0, 0);
    }

    if (page === "product") {
        document.querySelector(".featured").style.display = "block";
        document.getElementById("product").scrollIntoView();
    }

    if (page === "cart") {
        document.getElementById("cart-page").classList.remove("hidden");
        renderCart();
        window.scrollTo(0, 0);
    }

    if (page === "checkout") {
        document.getElementById("checkout-page").classList.remove("hidden");
        renderCheckout();
        window.scrollTo(0, 0);
    }
}

function changeQty(amount) {
    quantity += amount;

    if (quantity < 1) {
        quantity = 1;
    }

    document.getElementById("qty").textContent = quantity;
}

document.querySelectorAll("#sizes button").forEach(button => {
    button.addEventListener("click", function () {
        document.querySelectorAll("#sizes button").forEach(size => {
            size.classList.remove("selected");
        });

        this.classList.add("selected");
        selectedSize = this.textContent;
    });
});

function addToCart() {
    let existingItem = cart.find(item => item.size === selectedSize);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            size: selectedSize,
            quantity: quantity
        });
    }

    updateCartCount();
    alert("Sneaker added to cart!");
}

function updateCartCount() {
    let count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").textContent = count;
}

function renderCart() {
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        cartItems.innerHTML += `
            <tr>
                <td>
                    <img src="${item.image}" width="60">
                    ${item.name}<br>
                    Size: ${item.size}
                </td>
                <td>${item.quantity}</td>
                <td>Rs ${item.price * item.quantity}</td>
                <td>
                    <button onclick="removeItem(${index})">Remove</button>
                </td>
            </tr>
        `;
    });

    updateTotals();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
}

function updateTotals() {
    let subtotal = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    let tax = subtotal * 0.05;
    let total = subtotal + tax - discount;

    document.getElementById("subtotal").textContent = "Rs " + subtotal;
    document.getElementById("tax").textContent = "Rs " + tax.toFixed(2);
    document.getElementById("discount").textContent = "Rs " + discount;
    document.getElementById("total").textContent = "Rs " + total.toFixed(2);
}

function applyCoupon() {
    let coupon = document.getElementById("coupon").value.toUpperCase();
    let message = document.getElementById("coupon-message");

    if (coupon === "SNEAKY10") {
        let subtotal = cart.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);

        discount = subtotal * 0.10;
        message.textContent = "10% discount applied!";
    } else {
        discount = 0;
        message.textContent = "Invalid coupon code.";
    }

    updateTotals();
}

function renderCheckout() {
    let checkoutProducts = document.getElementById("checkout-products");
    checkoutProducts.innerHTML = "";

    cart.forEach(item => {
        checkoutProducts.innerHTML += `
            <p>${item.name} × ${item.quantity} — Rs ${item.price * item.quantity}</p>
        `;
    });

    let subtotal = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    let tax = subtotal * 0.05;
    let total = subtotal + tax - discount;

    document.getElementById("checkout-subtotal").textContent = "Rs " + subtotal;
    document.getElementById("checkout-tax").textContent = "Rs " + tax.toFixed(2);
    document.getElementById("checkout-discount").textContent = "Rs " + discount;
    document.getElementById("checkout-total").textContent = "Rs " + total.toFixed(2);
    document.getElementById("pay-total").textContent = "Rs " + total.toFixed(2);
}

function placeOrder() {
    let email = document.getElementById("email").value;

    if (cart.length === 0) {
        alert("Your cart is empty!");
        showPage("product");
        return;
    }

    if (email === "") {
        alert("Please enter your email address.");
        return;
    }

    alert("Order placed successfully! Thank you for shopping with SneakySneek.");

    cart = [];
    quantity = 1;
    discount = 0;

    document.getElementById("qty").textContent = quantity;
    updateCartCount();
    showPage("home");
}

function setImage(index) {
    let images = document.querySelectorAll(".thumb img");
    let mainImage = document.querySelector(".product-img-wrap img");

    if (images[index]) {
        mainImage.src = images[index].src;
    }

    document.querySelectorAll(".thumb").forEach(thumb => {
        thumb.classList.remove("active");
    });

    document.querySelectorAll(".thumb")[index].classList.add("active");
}