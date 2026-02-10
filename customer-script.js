// ===== SELECT ELEMENTS =====
const orderSelectEl = document.getElementById('orderSelect');
const addToOrderBtn = document.getElementById('addToOrderBtn');
const orderListEl = document.getElementById('orderList').querySelector('tbody');
const orderTotalEl = document.getElementById('orderTotal');
const bookNowBtn = document.getElementById('bookNow');

let products = JSON.parse(localStorage.getItem('products')) || [];
let customerOrder = [];

// ===== FUNCTIONS =====
function renderOrderOptions() {
  orderSelectEl.innerHTML = '';
  products.forEach((p, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${p.name} - R${p.price.toFixed(2)}`;
    orderSelectEl.appendChild(option);
  });
}

function renderOrderList() {
  orderListEl.innerHTML = '';
  let total = 0;
  customerOrder.forEach((p, index) => {
    total += p.price;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.price.toFixed(2)}</td>
      <td><button class="remove-btn" onclick="removeFromOrder(${index})">Remove</button></td>
    `;
    orderListEl.appendChild(tr);
  });
  orderTotalEl.textContent = total.toFixed(2);
}

function addToOrder() {
  const index = parseInt(orderSelectEl.value);
  if (!products[index]) return;
  customerOrder.push(products[index]);
  renderOrderList();
}

function removeFromOrder(index) {
  customerOrder.splice(index, 1);
  renderOrderList();
}

function bookNow() {
  if (customerOrder.length === 0) {
    alert('Add at least one service');
    return;
  }
  let message = "Hello! I want the following services:\n";
  customerOrder.forEach(p => message += `${p.name} - R${p.price.toFixed(2)}\n`);
  message += `Total: R${customerOrder.reduce((acc,p)=>acc+p.price,0).toFixed(2)}`;
  
  const phoneNumber = "YOUR_NUMBER_HERE"; // change to business WhatsApp
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// ===== EVENT LISTENERS =====
addToOrderBtn.addEventListener('click', addToOrder);
bookNowBtn.addEventListener('click', bookNow);
window.removeFromOrder = removeFromOrder;

// ===== AUTO UPDATE PRODUCTS =====
function updateProducts() {
  products = JSON.parse(localStorage.getItem('products')) || [];
  renderOrderOptions();
}

// Poll localStorage every 1 second for updates
setInterval(updateProducts, 1000);

// Initial render
updateProducts();
