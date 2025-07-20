const products = [
    { id: 1, name: "Urea", price: 200, category: "fertilizer", image: "https://i.imgur.com/QTPZ9Tk.jpg" },
    { id: 2, name: "DAP", price: 250, category: "fertilizer", image: "https://i.imgur.com/lSn9oM3.jpg" },
    { id: 3, name: "Wheat Seeds", price: 100, category: "seed", image: "https://i.imgur.com/H4I2yLd.jpg" }
];

let cart = [];
let npkRecords = [];

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("mainNavbar").style.display = "flex";
    switchTab('shop');
});

function showSignup() {
    document.getElementById("signupModal").style.display = "flex";
}

function hideSignup() {
    document.getElementById("signupModal").style.display = "none";
}

function signup() {
    alert("Signup successful!");
    hideSignup();
}

function switchTab(tabId) {
    document.querySelectorAll('.content').forEach(c => c.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
    if (tabId === 'cart') displayCart();
    if (tabId === 'service') showNPKRecords();
}

function displayProducts(list) {
    const container = document.getElementById("productList");
    container.innerHTML = "";
    list.forEach(p => {
    container.innerHTML += `
        <div class="product-card">
        <img src="${p.image}" />
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`;
    });
}

function filterProducts() {
    const cat = document.getElementById("filterCategory").value;
    const filtered = cat === "all" ? products : products.filter(p => p.category === cat);
    displayProducts(filtered);
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    alert("Added to cart");
}

function displayCart() {
    const container = document.getElementById("cartItems");
    container.innerHTML = "";
    if (cart.length === 0) {
        container.innerHTML = "<p>Cart is empty.</p>";
        return;
    }
    cart.forEach((p, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
            <span>${p.name} - ₹${p.price}</span>
            <button class="remove-btn" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>
        `;
        container.appendChild(itemDiv);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);  // remove 1 item at position `index`
    displayCart();
}

function checkout() {
    alert("Payment Successful via Razorpay (mock)");
    cart = [];
    switchTab('shop');
}

function fetchSensorData() {
    document.getElementById("tempCard").textContent = "🌡 Temperature: 27 °C";
    document.getElementById("moistureCard").textContent = "💧 Moisture: 40%";
    document.getElementById("npkCard").textContent = "🧪 NPK: N 16, P 8, K 14";
}

function submitNPK() {
    const val = document.getElementById("npkInput").value;
    if (val) {
    npkRecords.push(val);
    showNPKRecords();
    document.getElementById("npkInput").value = "";
    }
}

function showNPKRecords() {
    const container = document.getElementById("npkDataList");
    container.innerHTML = npkRecords.map(d => `<p>${d}</p>`).join("");
}

window.onload = () => displayProducts(products);
