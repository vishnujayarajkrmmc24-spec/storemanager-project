function getProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
}
function setProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
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

function renderInventory(filter = "") {
    const container = document.getElementById('inventoryContainer');
    container.innerHTML = '';
    let products = getProducts();
    if (filter)
        products = products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
    products.forEach((prod, idx) => {
        const card = document.createElement('div');
        card.className = 'inventory-card';
        card.innerHTML = `
            <button class="delete-btn" title="Delete" onclick="deleteProduct(${idx})">✖</button>
            <img src="${prod.image}" alt="Image">
            <div class="product-name">${prod.name}</div>
            <div class="product-info">Stock: <b>${prod.stock}</b></div>
            <div class="product-info">Price: ₹ <b>${prod.price}</b></div>
            <div class="update-section">
                <label>Update Stock:</label>
                <input type="number" min="0" placeholder="stock" id="stockInp${idx}">
                <button class="update-btn" onclick="updateStock(${idx})">Update</button>
            </div>
            <div class="update-section">
                <label>Update Price:</label>
                <input type="number" min="1" placeholder="price" id="priceInp${idx}">
                <button class="update-btn" onclick="updatePrice(${idx})">Update</button>
            </div>
        `;
        container.appendChild(card);
    });
}
window.deleteProduct = function (idx) {
    if (confirm("Delete this product?")) {
        let products = getProducts();
        products.splice(idx, 1);
        setProducts(products);
        renderInventory(document.getElementById('searchInput').value);
    }
}
window.updateStock = function (idx) {
    let val = document.getElementById('stockInp' + idx).value;
    if (val === "") return alert("Enter stock value!");
    let products = getProducts();
    products[idx].stock = parseInt(val);
    setProducts(products);
    renderInventory(document.getElementById('searchInput').value);
}
window.updatePrice = function (idx) {
    let val = document.getElementById('priceInp' + idx).value;
    if (val === "") return alert("Enter price value!");
    let products = getProducts();
    products[idx].price = parseInt(val);
    setProducts(products);
    renderInventory(document.getElementById('searchInput').value);
}
document.getElementById('searchInput').addEventListener('input', function () {
    renderInventory(this.value);
});
showLogin();
renderInventory();