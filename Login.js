function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const uname = document.getElementById('username').value.trim();
    const pwd = document.getElementById('password').value;
    if (!uname || !pwd) return alert("Enter username and password!");
    const user = getUsers().find(u => u.username === uname && u.password === pwd);
    if (!user) return alert("Invalid username or password!");
    localStorage.setItem('currentUser', user.name || uname);
    window.location.href = 'Home.html';
});