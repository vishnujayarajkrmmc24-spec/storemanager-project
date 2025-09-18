function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}
function setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
document.getElementById('forgotForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const uname = document.getElementById('username').value.trim();
    const pwd = document.getElementById('newPassword').value;
    const cpwd = document.getElementById('confirmPassword').value;
    if (!uname || !pwd || !cpwd) return alert("Fill all fields!");
    if (pwd.length < 6 || !/[!@#$%^&*]/.test(pwd)) return alert("Password must be at least 6 characters and have a special character.");
    if (pwd !== cpwd) return alert("Passwords do not match!");
    let users = getUsers();
    let idx = users.findIndex(u => u.username === uname);
    if (idx === -1) return alert("Username not found!");
    users[idx].password = pwd;
    setUsers(users);
    alert("Password changed successfully! Please login.");
    window.location.href = 'Login.html';
});