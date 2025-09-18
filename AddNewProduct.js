const categories = [
    "Fruits and Vegetables", "Atta, Rice and Dal", "Oil, Ghee and Masala", "Dairy, Bread and Egg",
    "Bakery and Biscuits", "Dry Fruits and Cereals", "Non-Veg", "Kitchenware and Appliances",
    "Chips and Namkeen", "Sweets", "Chocolates", "Drinks and Juices", "Tea, Coffee and Milk Drinks",
    "Instant Food", "Sauces and Spreads", "Ice creams", "Bath and Body", "Hair Shampoo", "Skin and Face",
    "Beauty and Cosmetics", "Baby Care", "Health and Pharma", "Home and Lifestyle", "Cleaners and Repellants",
    "Electronics", "Stationery and Games", "Toy Stores", "Sports Store", "Spiritual Store", "Fashion Basics Store",
    "Hobby Store", "Sneakerheads and Shoe lovers corner"
];
const catSelect = document.getElementById('productCategory');
categories.forEach(cat => {
    let opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    catSelect.appendChild(opt);
});
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
showLogin();

// Image preview
document.getElementById('productImage').addEventListener('input', function () {
    let url = this.value.trim();
    let img = document.getElementById('previewImg');
    img.style.display = url ? 'block' : 'none';
    img.src = url;
});

document.getElementById('addProductForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const prod = {
        name: document.getElementById('productName').value.trim(),
        image: document.getElementById('productImage').value.trim(),
        stock: parseInt(document.getElementById('productStock').value),
        price: parseInt(document.getElementById('productPrice').value),
        category: document.getElementById('productCategory').value
    };
    if (!prod.name || !prod.image || isNaN(prod.stock) || isNaN(prod.price) || !prod.category)
        return alert("Fill all fields!");
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(prod.image))
        return alert("Please enter a valid image URL (jpg, png, gif, webp).");
    let products = getProducts();
    if (products.some(p => p.name.toLowerCase() === prod.name.toLowerCase()))
        return alert("Product name must be unique!");
    setProducts([...products, prod]);
    alert("Product added!");
    window.location.href = 'AddInventory.html';
});