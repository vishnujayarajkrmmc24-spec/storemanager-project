function getProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
}
function getCurrentUser() {
    return localStorage.getItem('currentUser') || "Admin";
}
function showLogin() {
    document.getElementById('loginInfo').innerHTML =
        'Hello, ' + getCurrentUser() + ' <button onclick="logout()" style="margin-left:10px;background:#ff2d2d;color:white;border:none;padding:3px 12px;border-radius:10px;cursor:pointer;">Logout</button>';
}
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'Login.html';
}
showLogin();

const selectedCategory = localStorage.getItem('selectedCategory');
document.getElementById('categoryTitle').textContent = selectedCategory + " Products";
const cart = JSON.parse(localStorage.getItem('cart') || '{}');
const products = getProducts().filter(p => p.category === selectedCategory);

const container = document.getElementById('categoryProductsContainer');
products.forEach((prod, idx) => {
    const card = document.createElement('div');
    card.className = 'category-product-card';
    let qty = cart[prod.name] || 0;
    let disabled = prod.stock <= 0 ? "disabled" : "";
    card.innerHTML = `
        <img src="${prod.image}" alt="Image">
        <div class="product-name">${prod.name}</div>
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
function updateQty(name, delta) {
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
    document.getElementById('checkoutBtn').style.display = Object.values(cart).some(q => q > 0) ? 'block' : 'none';
}
document.getElementById('checkoutBtn').onclick = function () {
    window.location.href = 'YourCart.html';
}
const cartObj = JSON.parse(localStorage.getItem('cart') || '{}');
if (Object.values(cartObj).some(q => q > 0)) document.getElementById('checkoutBtn').style.display = 'block';