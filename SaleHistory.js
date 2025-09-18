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

function renderSales() {
    const sales = JSON.parse(localStorage.getItem('sales') || '[]');
    const container = document.getElementById('salesContainer');
    if (sales.length === 0) {
        container.innerHTML = `<div style="color:#008055;font-size:1.1em;text-align:center;margin:30px 0;">No sale history yet!</div>`;
        return;
    }
    let html = '';
    sales.slice().reverse().forEach(sale => {
        html += `<div class="sale-card" style="background:#fff9c4;border-radius:20px;padding:18px;margin:18px 0;box-shadow:0 2px 12px #ffd70033;">
            <div style="font-weight:bold;color:#e59400;">Sale NO. #${sale.no} <span style="float:right;">${new Date(sale.date).toLocaleString()}</span></div>
            <table style="width:100%;text-align:center;margin-top:12px;">
                <tr style="background:#ffe600;font-weight:bold;">
                    <td>Product</td><td>Qty</td><td>Price</td>
                </tr>
                ${
                    sale.items.map(item =>
                        `<tr>
                            <td>${item.name}</td>
                            <td>${item.qty}</td>
                            <td>₹${item.total}</td>
                        </tr>`
                    ).join('')
                }
                <tr style="font-weight:bold;">
                    <td colspan="2" style="text-align:right;">Total (18% GST incl.)</td>
                    <td>₹${sale.grandTotal}</td>
                </tr>
            </table>
        </div>`;
    });
    container.innerHTML = html;
}
renderSales();