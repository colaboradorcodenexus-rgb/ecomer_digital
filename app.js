let currentUser = null;
let currentRole = null;
let cartCount = 0;

let products = [
  { id: 1, name: "Limón Criollo (Cien)", price: 120.00, stock: 50, origen: "Carazo" },
  { id: 2, name: "Naranja Dulce (Cien)", price: 150.00, stock: 30, origen: "Masia" }
];

let logs = [];

function logEvent(eventText) {
  const timestamp = new Date().toLocaleTimeString();
  logs.unshift(`[${timestamp}] - ${eventText}`);
  const logList = document.getElementById("auditLogs");
  if(logList) logList.innerHTML = logs.map(l => `<li class="list-group-item">${l}</li>`).join('');
}

function handleLogin(e) {
  e.preventDefault();
  currentUser = document.getElementById("username").value;
  currentRole = document.getElementById("roleSelect").value;

  document.getElementById("loginSection").classList.add("d-none");
  document.getElementById("mainDashboard").classList.remove("d-none");
  document.getElementById("logoutBtn").classList.remove("d-none");

  const status = document.getElementById("userStatus");
  status.textContent = `${currentUser} (${currentRole})`;
  status.className = `me-3 badge ${currentRole === 'Admin' ? 'bg-danger' : currentRole === 'Auditor' ? 'bg-warning text-dark' : 'bg-primary'}`;

  logEvent(`Sesión iniciada por ${currentUser} con el rol [${currentRole}]`);
  setupPermissions();
}

function setupPermissions() {
  const productorPanel = document.getElementById("productorPanel");
  const catalogPanel = document.getElementById("catalogPanel");
  const auditorPanel = document.getElementById("auditorPanel");

  productorPanel.classList.add("d-none");
  catalogPanel.classList.add("d-none");
  auditorPanel.classList.add("d-none");

  if (currentRole === "Admin" || currentRole === "Productor") {
    productorPanel.classList.remove("d-none");
    catalogPanel.classList.remove("d-none");
    renderProducts(true);
  } else if (currentRole === "Comprador") {
    catalogPanel.classList.remove("d-none");
    renderProducts(false);
  } else if (currentRole === "Auditor") {
    auditorPanel.classList.remove("d-none");
  }
}

function renderProducts(canEdit) {
  const container = document.getElementById("productList");
  container.innerHTML = "";

  products.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text text-success fw-bold">C$ ${p.price.toFixed(2)}</p>
          <p class="card-text"><small class="text-muted">Disponible: ${p.stock} | Origen: ${p.origen}</small></p>
          ${!canEdit ? `<button class="btn btn-outline-success btn-sm w-100" onclick="buyProduct(${p.id})">Realizar Pedido</button>` : ''}
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

function handleAddProduct(e) {
  e.preventDefault();
  const name = document.getElementById("prodName").value;
  const price = parseFloat(document.getElementById("prodPrice").value);
  const stock = parseInt(document.getElementById("prodStock").value);

  products.push({ id: products.length + 1, name, price, stock, origen: "Nicaragua" });
  logEvent(`El usuario '${currentUser}' registró una cosecha de: ${name}`);
  renderProducts(true);
  e.target.reset();
}

function buyProduct(id) {
  const prod = products.find(p => p.id === id);
  if (prod && prod.stock > 0) {
    prod.stock--;
    cartCount++;
    document.getElementById("cartCount").textContent = `Pedidos: ${cartCount}`;
    logEvent(`Comprador '${currentUser}' reservó: ${prod.name}`);
    renderProducts(false);
  }
}

function logout() {
  logEvent(`Cierre de sesión de ${currentUser}`);
  location.reload();
}