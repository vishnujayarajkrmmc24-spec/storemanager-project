function displayStore() {
    let data = {};
    Object.keys(localStorage).forEach(k => {
        try {
            data[k] = JSON.parse(localStorage.getItem(k));
        } catch {
            data[k] = localStorage.getItem(k);
        }
    });
    document.getElementById('storageData').textContent = JSON.stringify(data, null, 2);
}
function clearStore() {
    if (confirm("Clear ALL local storage data? This cannot be undone.")) {
        localStorage.clear();
        displayStore();
    }
}
function exportStore() {
    let data = {};
    Object.keys(localStorage).forEach(k => {
        try {
            data[k] = JSON.parse(localStorage.getItem(k));
        } catch {
            data[k] = localStorage.getItem(k);
        }
    });
    let blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'store-manager-data.json';
    a.click();
}
displayStore();