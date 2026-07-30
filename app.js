// Estado global de la aplicación
let currentUser = null;
let currentRole = null;
let orderCount = 0;

// Inicialización de datos con persistencia en sessionStorage
const initialProducts = [
    { id: 1, name: "Limón Criollo (Cien)", price: 120, stock: 50, origin: "Carazo" },
    { id: 2, name: "Naranja Dulce (Cien)", price: 150, stock: 30, origin: "Masia" }
];

let products = JSON.parse(sessionStorage.getItem('app_products')) || [...initialProducts];
let logs = JSON.parse(sessionStorage.getItem('app_logs')) || [];

// Función para registrar eventos en la auditoría
function addLog(message) {
    const time = new Date().toLocaleTimeString();
    logs.push(`[${time}] - ${message}`);
    sessionStorage.setItem('app_logs', JSON.stringify(logs));
}

// Iniciar Sesión (se ejecuta con el formulario del HTML)
function handleLogin(event) {
    event.preventDefault(); // Evita que la página se recargue

    const usernameInput = document.getElementById("username").value.trim();
    const roleSelect = document.getElementById("roleSelect").value;

    if (!usernameInput || !roleSelect) {
        alert("Por favor ingrese su usuario y seleccione un rol.");
        return;
    }

    currentUser = usernameInput;
    currentRole = roleSelect;

    // Registrar en auditoría
    addLog(`Sesión iniciada por ${currentUser} con el rol [${currentRole}]`);

    // Mostrar barra superior de usuario
    document.getElementById("userStatus").innerText = `${currentUser} (${currentRole})`;
    document.getElementById("userStatus").className = "me-3 badge bg-info text-dark";
    document.getElementById("logoutBtn").classList.remove("d-none");

    // Ocultar login y mostrar dashboard
    document.getElementById("loginSection").classList.add("d-none");
    document.getElementById("mainDashboard").classList.remove("d-none");

    renderViews();
}

// Cerrar Sesión
function logout() {
    if (currentUser) {
        addLog(`Sesión cerrada por ${currentUser}`);
    }
    
    currentUser = null;
    currentRole = null;

    document.getElementById("userStatus").innerText = "Sin sesión";
    document.getElementById("userStatus").className = "me-3 badge bg-secondary";
    document.getElementById("logoutBtn").classList.add("d-none");

    document.getElementById("mainDashboard").classList.add("d-none");
    document.getElementById("loginSection").classList.remove("d-none");

    document.getElementById("username").value = "";
    document.getElementById("roleSelect").selectedIndex = 0;
}

// Renderizar paneles según el rol activo
function renderViews() {
    const productorPanel = document.getElementById("productorPanel");
    const catalogPanel = document.getElementById("catalogPanel");
    const auditorPanel = document.getElementById("auditorPanel");

    // Ocultar todos por defecto
    productorPanel.classList.add("d-none");
    catalogPanel.classList.add("d-none");
    auditorPanel.classList.add("d-none");

    if (currentRole === "Productor" || currentRole === "Admin") {
        productorPanel.classList.remove("d-none");
        catalogPanel.classList.remove("d-none");
        renderCatalog(false);
    } else if (currentRole === "Comprador") {
        catalogPanel.classList.remove("d-none");
        renderCatalog(true);
    } else if (currentRole === "Auditor") {
        auditorPanel.classList.remove("d-none");
        renderAuditorLogs();
    }
}

// Renderizar productos en el catálogo
function renderCatalog(showOrderButton) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(p => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-3";
        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title text-success">${p.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">C$ ${parseFloat(p.price).toFixed(2)}</h6>
                    <p class="card-text">Disponible: ${p.stock} | Origen: ${p.origin}</p>
                    ${showOrderButton ? `<button class="btn btn-outline-success w-100" onclick="makeOrder(${p.id})">Realizar Pedido</button>` : ''}
                </div>
            </div>
        `;
        productList.appendChild(card);
    });
}

// Agregar producto
function handleAddProduct(event) {
    event.preventDefault();

    const name = document.getElementById("prodName").value.trim();
    const price = parseFloat(document.getElementById("prodPrice").value);
    const stock = parseInt(document.getElementById("prodStock").value);

    if (!name || isNaN(price) || isNaN(stock)) {
        alert("Por favor complete todos los campos del producto.");
        return;
    }

    const newProd = {
        id: Date.now(),
        name: name,
        price: price,
        stock: stock,
        origin: "Nicaragua"
    };

    products.push(newProd);
    sessionStorage.setItem('app_products', JSON.stringify(products));
    addLog(`Nuevo producto publicado por ${currentUser}: ${name} (${stock} unidades a C$${price})`);

    document.getElementById("prodName").value = "";
    document.getElementById("prodPrice").value = "";
    document.getElementById("prodStock").value = "";

    renderCatalog(false);
}

// Realizar pedido
function makeOrder(productId) {
    const prod = products.find(p => p.id === productId);
    if (prod && prod.stock > 0) {
        prod.stock--;
        orderCount++;
        sessionStorage.setItem('app_products', JSON.stringify(products));
        
        document.getElementById("cartCount").innerText = `Pedidos: ${orderCount}`;
        addLog(`Pedido realizado por ${currentUser} sobre producto: ${prod.name}`);
        
        renderCatalog(true);
    } else {
        alert("Producto agotado.");
    }
}

// Renderizar registros de auditoría
function renderAuditorLogs() {
    const auditLogs = document.getElementById("auditLogs");
    auditLogs.innerHTML = "";

    const currentLogs = JSON.parse(sessionStorage.getItem('app_logs')) || logs;

    if (currentLogs.length === 0) {
        auditLogs.innerHTML = `<li class="list-group-item text-muted">No hay registros aún.</li>`;
        return;
    }

    currentLogs.forEach(log => {
        const item = document.createElement("li");
        item.className = "list-group-item text-secondary font-monospace small";
        item.innerText = log;
        auditLogs.appendChild(item);
    });
}