const listProducts = [
    { "id": 1, "name": "Burger", "price": 100, "image": "fd1.jpg" },
    { "id": 2, "name": "Tacos", "price": 75, "image": "fd2.jpg" },
    { "id": 3, "name": "Pizza(Tomato and Corn)", "price": 200, "image": "fd3.jpg" },
    { "id": 4, "name": "Sandwich", "price": 150, "image": "fd4.jpg" },
    { "id": 5, "name": "Choco Lava Cake", "price": 200, "image": "fd5.jpg" },
    { "id": 6, "name": "Cappuccino", "price": 100, "image": "fd6.jpg" },
    { "id": 7, "name": "Brownie", "price": 150, "image": "fd5.jpg" },
    { "id": 8, "name": "Veggie Roll", "price": 150, "image": "fd5.jpg" },
    { "id": 9, "name": "Idli", "price": 150, "image": "fd5.jpg" },
    { "id": 10, "name": "Golgappa(6 pieces)", "price": 30, "image": "fd5.jpg" },
    { "id": 11, "name": "Gulab Jamun", "price": 50, "image": "fd5.jpg" },
    { "id": 12, "name": "Chowmein", "price": 70, "image": "fd5.jpg" }
];

function addToCart(productId, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.product_id === productId);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ product_id: productId, quantity: quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Cart updated:", cart);
}

document.getElementById('confirm-btn').addEventListener('click', function() {
    const carts = JSON.parse(localStorage.getItem('cart')) || [];
    console.log("Cart Data:", carts);
    let totalAmount = 0;

    carts.forEach(cartItem => {
        const product = listProducts.find(p => p.id === cartItem.product_id);
        if (product) {
            totalAmount += product.price * cartItem.quantity;
        }
    });

    const selectedOption = document.getElementById('delivery-option').value;
    const deliveryCost = selectedOption === 'standard' ? 5 : 10;
    const totalPrice = totalAmount + deliveryCost;

    const resultElement = document.getElementById('result');
    if (isNaN(totalPrice)) {
        resultElement.innerHTML = 'Error: Total price calculation failed.';
    } else {
        resultElement.innerHTML = `
            Selected Delivery Option: ${selectedOption} <br>
            Delivery Price: Rs.${totalPrice.toFixed(2)}<br>
        `;

        const paymentOption = document.getElementById('payment').value;
        let goButton = document.getElementById('go-button');

        if (!goButton) {
            resultElement.innerHTML += '<button id="go-button">Go</button>';
            goButton = document.getElementById('go-button');
            goButton.addEventListener('click', function() {
                if (validateForm()) {
                    if (paymentOption === 'hello') {
                        const modal = document.getElementById('myModal');
                        modal.style.display = 'block';
                        setTimeout(function() {
                            modal.style.display = 'none';
                            localStorage.removeItem('cart');
                            window.location.href = 'Home.html';
                        }, 1500);
                    } else {
                        window.location.href = 'payment.html';
                    }
                }
            });
        }
    }
});

function validateForm() {
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const phonePattern = /^[0-9]{10}$/;

    if (!address) {
        alert('Please enter your address.');
        return false;
    }

    if (!phone || !phonePattern.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return false;
    }

    return true;
}
