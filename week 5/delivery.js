let cart = [];
let cartCount = 0;
let cartTotal = 0;

// Add item to cart
function addToCart(product, price) {
    cart.push({ product, price });
    cartCount++;
    cartTotal += price;

    // Update cart count and total
    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('cart-total').textContent = cartTotal.toFixed(2);

    // Update the cart display
    updateCartDisplay();
}

// Remove item from cart
function removeFromCart(index) {
    cartTotal -= cart[index].price;
    cartCount--;
    cart.splice(index, 1);

    // Update cart count and total
    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('cart-total').textContent = cartTotal.toFixed(2);

    // Update the cart display
    updateCartDisplay();
}

// Update cart display in the modal
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Clear previous cart items

    // Add current items to the cart modal
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.product} - $${item.price.toFixed(2)} 
        <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(li);
    });
}

// View cart
function viewCart() {
    const cartModal = document.getElementById('cart-modal');
    updateCartDisplay();
    cartModal.style.display = 'flex';
}

// Close cart
function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'none';
}

// Checkout
function checkout() {
    alert(`Your total is $${cartTotal.toFixed(2)}. Proceeding to checkout...`);
    cart = [];
    cartCount = 0;
    cartTotal = 0;

    // Reset cart count and total
    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('cart-total').textContent = cartTotal.toFixed(2);
    closeCart();
}
