const categories = [
    "Fruits and Vegetables",
    "Atta, Rice and Dal",
    "Oil, Ghee and Masala",
    "Dairy, Bread and Egg",
    "Bakery and Biscuits",
    "Dry Fruits and Cereals",
    "Non-Veg",
    "Kitchenware and Home Appliances",
    "Chips and Namkeen",
    "Sweets",
    "Chocolates",
    "Drinks and Juices",
    "Tea, Coffee and Milkshakes",
    "Instant food",
    "Sauces and Spreads",
    "Ice creams",
    "Bath and Body",
    "Hair Shampoo",
    "Skin and Face",
    "Beauty and Cosmetics",
    "Baby Care",
    "Health and Pharma",
    "Home and Lifestyle",
    "Cleaners and Repellents",
    "Electronics",
    "Stationery",
    "Games",
    "Toys Store",
    "Sports Store",
    "Spiritual Store",
    "Fashion Basics Store",
    "Hobby Store",
    "Sneakerheads and Shoe lovers corner"
];

// Combo images using Unsplash query URLs
const categoryImages = {
    "Fruits and Vegetables": "https://media.istockphoto.com/id/1284690585/photo/colorful-vegetables-and-fruits-vegan-food-in-rainbow-colors.jpg?s=612x612&w=0&k=20&c=fXqp_CPaHMyfzMhjZGQG1zloNBNkVRjdYKScw3K98XQ=",
    "Atta, Rice and Dal": "https://wd-image.webdunia.com/image-conversion/process-aws.php?url=https://nonprod-media.webdunia.com/public_html/_media/hi/img/article/2018-08/22/full/1534913466-5454.jpg&w=&h=&outtype=webp",
    "Oil, Ghee and Masala": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj_YwWf4t6p0fKtbW20QGQ5PESOPKtkYFhFA&s",
    "Dairy, Bread and Egg": "https://media.istockphoto.com/id/177360383/photo/cheese-bread-milk-and-eggs.jpg?s=612x612&w=0&k=20&c=8LN01R9z5tnalaOCj9rHhN_ut7bN3KBOBS-cVEDGVi8=",
    "Bakery and Biscuits": "https://media.istockphoto.com/id/869077006/photo/mixed-christmas-cookies.jpg?s=612x612&w=0&k=20&c=HukBYTe6ttwZx3wvM52qpK89xhySwbyBKBE9893Oct4=",
    "Dry Fruits and Cereals": "https://media.istockphoto.com/id/1154896831/photo/assorted-nuts-and-dried-fruit-background-organic-food-in-wooden-bowls-top-view.jpg?s=612x612&w=0&k=20&c=g0Xn7NsDzP2b4w3MzG7tNp7D11irOr3BZc3GExgtQXI=",
    "Non-Veg": "https://media.istockphoto.com/id/1357284270/photo/assortment-of-raw-fresh-meat-on-dark-grunge-background-beef-pork-fish-chicken-and-duck-top.jpg?s=612x612&w=0&k=20&c=uzvJ_zmZhO92kEMrtLN-UjnChb3_I8pfnwwU3Qn7h7o=",
    "Kitchenware and Home Appliances": "https://media.istockphoto.com/id/1211554164/photo/3d-render-of-home-appliances-collection-set.jpg?s=612x612&w=0&k=20&c=blm3IyPyZo5ElWLOjI-hFMG-NrKQ0G76JpWGyNttF8s=",
    "Chips and Namkeen": "https://www.shutterstock.com/image-photo/colorful-mix-salty-snacks-beer-260nw-2593468019.jpg",
    "Sweets": "https://t3.ftcdn.net/jpg/04/66/41/98/360_F_466419884_l0WxlXu6z1ImHiFvWXhpc75KgPNEHtVS.jpg",
    "Chocolates": "https://media.istockphoto.com/id/522735736/photo/chocolate-background.jpg?s=612x612&w=0&k=20&c=fmBbjHi5zXpcbzAQWGy3xtPgcIJkc7eHXjZiYsi396A=",
    "Drinks and Juices": "https://fruitprocessingline.com/wp-content/uploads/2017/11/soft-drink.jpg",
    "Tea, Coffee and Milkshakes": "https://www.tasteofhome.com/wp-content/uploads/2024/05/10-Best-Fast-Food-Iced-Coffees-Ranked_Iced-Coffee-Group-Shot_SSedit-a.jpg?fit=700,1024",
    "Instant food": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBGWnnjzKuZdaQ8wlRwboGb6tX9ulWDVWZRsWuWa5Qs8Ye8cpGfvKicbmyeDVxniFdfr4&usqp=CAU",
    "Sauces and Spreads": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJCxrNoHm3rpgzwaHygrbywbaFIn-uYTAirg&s",
    "Ice creams": "https://hips.hearstapps.com/del.h-cdn.co/assets/15/29/2560x2003/gallery-1436809322-ice-cream-toppings-delish.JPG?resize=640:*",
    "Bath and Body": "https://s.yimg.com/ny/api/res/1.2/eAE3AvTmU2A4R2cIZhJjhg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzU7Y2Y9d2VicA--/https://media.zenfs.com/en/the_hollywood_reporter_ecomm_237/53721431e78fcbedbcfdd1e01e6e93df",
    "Hair Shampoo": "https://drhanandermatologyclinic.com/wp-content/uploads/2024/11/top-dermatologist-recommended_shampoos_for_dry_and_frizzy_hair-1.webp",
    "Skin and Face": "https://images-cdn.ubuy.co.in/66abb7ff19bcc348ce53e841-turmeric-soap-skincare-set-with-honey.jpg",
    "Beauty and Cosmetics": "https://cdn.britannica.com/35/222035-050-C68AD682/makeup-cosmetics.jpg",
    "Baby Care": "https://www.menmoms.in/cdn/shop/files/1230A1.jpg?v=1715161989",
    "Health and Pharma": "https://cpimg.tistatic.com/04411238/b/4/Pharmaceutical-Products.jpg",
    "Home and Lifestyle": "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZSUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
    "Cleaners and Repellents": "https://3.imimg.com/data3/EH/MO/MY-1651149/household-cleaning-products.jpg",
    "Electronics": "https://dropinblog.net/34241141/files/Electronics.png",
    "Stationery": "https://images.stockcake.com/public/9/5/a/95a22301-818d-42fd-b526-a1173f1ac5a1_large/colorful-stationery-store-stockcake.jpg",
    "Games": "https://images.squarespace-cdn.com/content/5ccb12039b8fe875b08fae37/1600287917943-9LGCV7ZMPH2UVZN4UIC1/hitherto-board-games.jpg?content-type=image%2Fjpeg",
    "Toys Store": "https://antdisplay.com/pub/media/furniture/toyes.jpg",
    "Sports Store": "https://res.cloudinary.com/purnesh/image/upload/f_auto/v1528445188/kljaat0.jpg",
    "Spiritual Store": "https://thumbs.dreamstime.com/b/spiritual-shop-display-incense-candles-valletta-malta-august-colorful-shelves-incense-essential-oils-candles-400151542.jpg",
    "Fashion Basics Store": "https://content3.jdmagicbox.com/comp/thiruvananthapuram/b4/0471px471.x471.180816204155.y3b4/catalogue/basics-life-pulimoodu-thiruvananthapuram-readymade-garment-retailers-tm43h5kkof.jpg",
    "Hobby Store": "https://i.ytimg.com/vi/Rr5g667EBjM/maxresdefault.jpg",
    "Sneakerheads and Shoe lovers corner": "https://coveteur.com/media-library/image.jpg?id=25307065&width=1200&height=600&coordinates=0%2C40%2C0%2C41"
};
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

// Optional: Redirect to login if not logged in
if (!localStorage.getItem('currentUser')) {
    window.location.href = 'Login.html';
}
showLogin();

const catGrid = document.getElementById('categoryGrid');
categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.onclick = () => {
        localStorage.setItem('selectedCategory', cat);
        window.location.href = 'CategoryProducts.html';
    };
    const imgSrc = categoryImages[cat] || "https://source.unsplash.com/84x84/?store";
    card.innerHTML = `
        <img src="${imgSrc}" alt="${cat}">
        <div class="category-name">${cat}</div>
    `;
    catGrid.appendChild(card);
});