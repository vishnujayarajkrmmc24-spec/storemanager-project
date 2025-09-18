document.addEventListener("DOMContentLoaded", () => {
    const category = localStorage.getItem("selectedCategory");
    document.getElementById("category-title").textContent = category;

    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const filtered = allProducts.filter(p => p.category === category);
    const cart = [];

    const container = document.getElementById("product-list");
    filtered.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.price}</p>
      <div>
        <button onclick="changeQty('${p.name}', -1)">-</button>
        <span id="qty-${p.name}">0</span>
        <button onclick="changeQty('${p.name}', 1)">+</button>
      </div>
      <button onclick="addToCart('${p.name}')">Add</button>
    `;
        container.appendChild(card);
    });

    window.changeQty = (name, delta) => {
        const qtySpan = document.getElementById(`qty-${name}`);
        let qty = parseInt(qtySpan.textContent);
        qty = Math.max(0, qty + delta);
        qtySpan.textContent = qty;
    };

    window.addToCart = (name) => {
        const qty = parseInt(document.getElementById(`qty-${name}`).textContent);
        if (qty > 0) {
            const item = filtered.find(p => p.name === name);
            cart.push({ ...item, quantity: qty });
            localStorage.setItem("cart", JSON.stringify(cart));
            document.getElementById("checkout-btn").style.display = "block";
        }
    };

    document.getElementById("checkout-btn").onclick = () => {
        window.location.href = "YourCart.html";
    };
});
