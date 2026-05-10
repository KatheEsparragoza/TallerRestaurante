// ===== DATA =====
const productos = [
  { id: 1, nombre: "Hamburguesa", precio: 15000, img: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
  { id: 2, nombre: "Pasta", precio: 18000, img: "https://images.unsplash.com/photo-1525755662778-989d0524087e" },
  { id: 3, nombre: "Hot Dog", precio: 12000, img: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
  { id: 4, nombre: "Tacos", precio: 14000, img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" }
];

let carrito = [];
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

// ===== SIDEBAR =====
document.getElementById("toggleMenu").onclick = () => {
  document.getElementById("sidebar").classList.toggle("collapsed");
};

// ===== NAVEGACIÓN =====
document.querySelectorAll(".nav").forEach(nav => {
  nav.addEventListener("click", () => {
    document.querySelectorAll(".nav").forEach(n => n.classList.remove("active"));
    nav.classList.add("active");

    document.querySelectorAll(".view").forEach(v => v.classList.add("hidden"));
    document.getElementById("view-" + nav.dataset.view).classList.remove("hidden");

    document.getElementById("title").textContent = nav.textContent.trim();
  });
});

// ===== RENDER MENU =====
function renderMenu(id) {
  const container = document.getElementById(id);
  container.innerHTML = "";

  productos.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <div class="card-content">
          <h4>${p.nombre}</h4>
          <p>$${p.precio}</p>
          <button onclick="agregarAlCarrito(${p.id}, this)">Agregar</button>
        </div>
      </div>
    `;
  });
}

renderMenu("menuGrid");
renderMenu("menuGridPedidos");

// ===== BUSCADOR =====
document.getElementById("search").addEventListener("input", e => {
  const val = e.target.value.toLowerCase();
  const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(val));
  const container = document.getElementById("menuGrid");

  container.innerHTML = "";
  filtrados.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <div class="card-content">
          <h4>${p.nombre}</h4>
          <p>$${p.precio}</p>
          <button onclick="agregarAlCarrito(${p.id}, this)">Agregar</button>
        </div>
      </div>
    `;
  });
});

// ===== TOAST =====
function mostrarToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => toast.classList.remove("show"), 2000);
}

// ===== CONTADOR =====
function actualizarContador() {
  document.getElementById("cartCount").textContent = carrito.length;
}

// ===== CARRITO =====
function agregarAlCarrito(id, btn) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);

  renderCarrito();
  actualizarContador();

  // 🔥 FEEDBACK BOTÓN
  btn.textContent = "✔ Agregado";
  setTimeout(() => btn.textContent = "Agregar", 1000);

  // 🔥 TOAST
  mostrarToast(producto.nombre + " agregado 🛒");
}

function renderCarrito() {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";

  let total = 0;
  carrito.forEach(p => {
    total += p.precio;
    container.innerHTML += `<p>${p.nombre} - $${p.precio}</p>`;
  });

  document.getElementById("total").textContent = total;
}

// ===== CONFIRMAR =====
function confirmarPedido() {
  const cliente = document.getElementById("cliente").value;

  if (!cliente || carrito.length === 0) {
    mostrarToast("Completa los datos ⚠️");
    return;
  }

  const total = carrito.reduce((s, p) => s + p.precio, 0);
  pedidos.push({ cliente, total });

  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  carrito = [];
  renderCarrito();
  actualizarContador();
  actualizarReportes();

  mostrarToast("Pedido confirmado 🚀");
}

// ===== RESERVAS =====
function crearReserva() {
  const cliente = document.getElementById("rCliente").value;
  const fecha = document.getElementById("rFecha").value;
  const personas = document.getElementById("rPersonas").value;

  reservas.push({ cliente, fecha, personas });
  localStorage.setItem("reservas", JSON.stringify(reservas));

  renderReservas();
  mostrarToast("Reserva guardada 📅");
}

function renderReservas() {
  const container = document.getElementById("listaReservas");
  container.innerHTML = "";

  reservas.forEach(r => {
    container.innerHTML += `
      <div class="card-box">
        <p><b>${r.cliente}</b></p>
        <p>${r.fecha}</p>
        <p>${r.personas} personas</p>
      </div>
    `;
  });
}

renderReservas();

// ===== REPORTES =====
function actualizarReportes() {
  const total = pedidos.reduce((s, p) => s + p.total, 0);
  document.getElementById("ventas").textContent = "$" + total;
  document.getElementById("cantidadPedidos").textContent = pedidos.length;
}

actualizarReportes();