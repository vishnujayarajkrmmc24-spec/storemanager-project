const categories = [
    "Fruits and Vegetables", "Atta, Rice and Dal", "Oil, Ghee and Masala", "Dairy, Bread and Egg",
    "Bakery and Biscuits", "Dry Fruits and Cereals", "Chicken, Fish and Meat", "Kitchenware and Appliances",
    "Chips and Namkeen", "Sweets", "Chocolates", "Drinks and Juices", "Tea, Coffee and Milk Shakes",
    "Instant Food", "Sauces and Spreads", "Ice creams", "Bath and Body", "Hair Shampoo", "Skin and Face",
    "Beauty and Cosmetics", "Baby Care", "Health and Pharma", "Home and Lifestyle", "Cleaners and Repellants",
    "Electronics", "Stationery", "Games", "Toy Stores", "Sports Store", "Spiritual Store", "Fashion Basics Store",
    "Hobby Store", "Sneakerheads and Shoe lovers corner"
];
function getProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
}
function getCurrentUser() {
    return localStorage.getItem('currentUser') || "Guest";
}
function showLogin() {
    document.getElementById('loginInfo').innerHTML =
        'Hello, ' + getCurrentUser() + ' <button onclick="logout()" style="margin-left:10px;background:#ff2d2d;color:white;border:none;padding:3px 12px;border-radius:10px;cursor:pointer;">Logout</button>';
}
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'Login.html';
}
// Populate category dropdown
const catSelect = document.getElementById('categoryFilter');
categories.forEach(cat => {
    let opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    catSelect.appendChild(opt);
});

function renderProducts(filter = "", category = "") {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    let products = getProducts();
    if (category) products = products.filter(p => p.category === category);
    if (filter) products = products.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase()) ||
        p.category.toLowerCase().includes(filter.toLowerCase())
    );
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');
    products.forEach((prod, idx) => {
        const card = document.createElement('div');
        card.className = 'category-product-card';
        let qty = cart[prod.name] || 0;
        let disabled = prod.stock <= 0 ? "disabled" : "";
        card.innerHTML = `
            <img src="${prod.image}" alt="Image">
            <div class="product-name">${prod.name}</div>
            <div class="product-info">Category: <b>${prod.category}</b></div>
            <div class="product-info">Stock: <b>${prod.stock}</b></div>
            <div class="product-info">Price: ₹ <b>${prod.price}</b></div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQty('${prod.name}', -1)" ${disabled}>-</button>
                <span id="qty_${prod.name}">${qty}</span>
                <button class="quantity-btn" onclick="updateQty('${prod.name}', 1)" ${disabled}>+</button>
            </div>
            ${prod.stock <= 0 ? '<div style="color:red;font-weight:bold;">Out of Stock</div>' : ''}
        `;
        container.appendChild(card);
    });
    document.getElementById('orderBtn').style.display = Object.values(cart).some(q => q > 0) ? 'block' : 'none';
}
window.updateQty = function (name, delta) {
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');
    let products = getProducts();
    let prod = products.find(p => p.name === name);
    if (!prod || prod.stock <= 0) return;
    let qty = (cart[name] || 0) + delta;
    if (qty < 0) qty = 0;
    if (qty > prod.stock) qty = prod.stock;
    cart[name] = qty;
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('qty_' + name).textContent = qty;
    document.getElementById('orderBtn').style.display = Object.values(cart).some(q => q > 0) ? 'block' : 'none';
}
document.getElementById('searchInput').addEventListener('input', function () {
    renderProducts(this.value, catSelect.value);
});
catSelect.addEventListener('change', function () {
    renderProducts(document.getElementById('searchInput').value, this.value);
});
document.getElementById('orderBtn').onclick = function () {
    window.location.href = 'YourCart.html';
}
showLogin();
renderProducts();