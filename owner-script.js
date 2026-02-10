// ===== SELECT ELEMENTS =====
const adminNameEl = document.getElementById('adminName');
const adminPriceEl = document.getElementById('adminPrice');
const adminAddBtn = document.getElementById('adminAddBtn');
const adminListEl = document.getElementById('adminList').querySelector('tbody');

if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}


// ===== DATA STORAGE =====
let products = JSON.parse(localStorage.getItem('products')) || [];

// ===== FUNCTIONS =====
function renderAdminList() {
  adminListEl.innerHTML = '';
  products.forEach((p, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.price.toFixed(2)}</td>
      <td><button class="remove-btn" onclick="removeProduct(${index})">Remove</button></td>
    `;
    adminListEl.appendChild(tr);
  });
  // Save to localStorage so customer app can use
  localStorage.setItem('products', JSON.stringify(products));
}

function addProduct() {
  const name = adminNameEl.value.trim();
  const price = parseFloat(adminPriceEl.value);
  if (!name || isNaN(price) || price < 0) {
    alert('Enter valid name and price');
    return;
  }
  products.push({ name, price });
  adminNameEl.value = '';
  adminPriceEl.value = '';
  renderAdminList();
}

function removeProduct(index) {
  products.splice(index, 1);
  renderAdminList();
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
});



// ===== EVENT LISTENERS =====
adminAddBtn.addEventListener('click', addProduct);
window.removeProduct = removeProduct; // make global

// Initial render
renderAdminList();
