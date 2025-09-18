function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}
function setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const uname = document.getElementById('username').value.trim();
    const pwd = document.getElementById('password').value;
    const cpwd = document.getElementById('confirmPassword').value;
    if (!name || !uname || !pwd || !cpwd) return alert("Fill all fields!");
    if (pwd.length < 6 || !/[!@#$%^&*]/.test(pwd)) return alert("Password must be at least 6 characters and have a special character.");
    if (pwd !== cpwd) return alert("Passwords do not match!");
    let users = getUsers();
    if (users.some(u => u.username === uname)) return alert("Username already exists!");
    users.push({ name: name, username: uname, password: pwd });
    setUsers(users);
    alert("Sign up successful! Please login.");
    window.location.href = 'Login.html';
});