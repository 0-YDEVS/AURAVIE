document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();

    const cartIcon = document.querySelector(".cart-icon");
    const cartModal = document.getElementById("cartModal");
    const closeBtn = document.querySelector(".close-btn");

    cartIcon.addEventListener("click", function() {
        displayCartItems();
        cartModal.style.display = "block";
    });

    closeBtn.addEventListener("click", function() {
        cartModal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        }
    });

    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const productId = button.getAttribute("data-product-id");
            const productName = button.getAttribute("data-product-name");
            const productPrice = parseFloat(button.getAttribute("data-product-price"));
            const productImage = button.getAttribute("data-product-image");

            addToCart(productId, productName, productPrice, productImage);
        });
    });
});

function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productIndex = cart.findIndex(product => product.id === id);
    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    document.getElementById("cart-count").textContent = cartCount;
}

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    cartItemsContainer.innerHTML = "";

    let total = 0;
    let whatsappMessage = "Bonjour, voici ma commande :%0A";
    
    cart.forEach((product, index) => {
        const itemTotal = product.price * product.quantity;
        total += itemTotal;

        whatsappMessage += `- ${product.name} (x${product.quantity}): $${itemTotal.toFixed(2)}%0A`;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-item-details">
                <span class="cart-item-name">${product.name} (x${product.quantity})</span>
                <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
            </div>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    document.getElementById("cartTotal").textContent = `Total: $${total.toFixed(2)}`;
    whatsappMessage += `Total: $${total.toFixed(2)}`;

    const whatsappLink = `https://wa.me/212629422435?text=${whatsappMessage}`;
    document.getElementById("whatsappOrderBtn").href = whatsappLink;

    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach(button => {
        button.addEventListener("click", function() {
            const index = button.getAttribute("data-index");
            removeCartItem(index);
        });
    });
}


function removeCartItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}
