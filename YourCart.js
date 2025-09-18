function getProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
}
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '{}');
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
showLogin();

function renderBill() {
    const billDiv = document.getElementById('cartBill');
    const cart = getCart();
    const products = getProducts();
    let total = 0;
    let billHtml = `<table style="width:100%;text-align:center;">
        <tr style="background:#ffe600;font-weight:bold;">
            <td>Product</td><td>Qty</td><td>Price</td>
        </tr>`;
    Object.keys(cart).forEach(name => {
        if (cart[name] > 0) {
            const prod = products.find(p => p.name === name);
            if (prod) {
                const rowTotal = cart[name] * prod.price;
                total += rowTotal;
                billHtml += `<tr>
                    <td>${prod.name}</td>
                    <td>${cart[name]}</td>
                    <td>₹${rowTotal}</td>
                </tr>`;
            }
        }
    });
    if (total === 0) {
        billDiv.innerHTML = `<div style="color:#008055;font-size:1.1em;text-align:center;margin:30px 0;">No items in cart!</div>`;
        document.getElementById('proceedBtn').style.display = 'none';
        return;
    }
    let gst = Math.round(total * 0.18);
    let grandTotal = total + gst;
    billHtml += `<tr style="font-weight:bold;"><td colspan="2" style="text-align:right;">Total (18% GST incl.)</td><td>₹${grandTotal}</td></tr>`;
    billHtml += `</table>`;
    billDiv.innerHTML = billHtml;
    document.getElementById('proceedBtn').style.display = 'block';
}
renderBill();

document.getElementById('proceedBtn').onclick = function () {
    let sales = JSON.parse(localStorage.getItem('sales') || '[]');
    let cart = getCart();
    let products = getProducts();
    let sale = {
        no: sales.length + 1,
        items: [],
        date: new Date().toISOString(),
        user: getCurrentUser()
    };
    let total = 0;
    Object.keys(cart).forEach(name => {
        if (cart[name] > 0) {
            const prod = products.find(p => p.name === name);
            if (prod) {
                sale.items.push({
                    name: prod.name,
                    qty: cart[name],
                    price: prod.price,
                    total: cart[name] * prod.price
                });
                prod.stock -= cart[name];
                total += cart[name] * prod.price;
            }
        }
    });
    sale.total = total;
    sale.gst = Math.round(total * 0.18);
    sale.grandTotal = sale.total + sale.gst;
    sales.push(sale);
    localStorage.setItem('sales', JSON.stringify(sales));
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('cart', '{}');
    window.location.href = 'SaleHistory.html';
};