const menu = [
  { id: 1, nombre: "Burger", precio: 15000, img: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
  { id: 2, nombre: "Pan artesanal", precio: 20000, img: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop" },
  { id: 3, nombre: "Tacos", precio: 12000, img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" },
  { id: 4, nombre: "Hot Dog", precio: 10000, img: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
  { id: 5, nombre: "Pasta", precio: 18000, img: "https://images.unsplash.com/photo-1525755662778-989d0524087e" },
  { id: 6, nombre: "Café", precio: 5000, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function renderMenu(lista = menu) {
  const cont = document.getElementById("menu");
  cont.innerHTML = "";

  lista.forEach(item => {
    cont.innerHTML += `
      <div class="card">
        <img src="${item.img}">
        <h3>${item.nombre}</h3>
        <p>$${item.precio}</p>
        <button onclick="agregar(${item.id})">Agregar</button>
      </div>
    `;
  });
}

function agregar(id) {
  const prod = menu.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);

  if (existe) existe.cantidad++;
  else carrito.push({ ...prod, cantidad: 1 });

  guardar();
  renderCarrito();
}

function renderCarrito() {
  const cont = document.getElementById("cart-items");
  cont.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {
    total += item.precio * item.cantidad;

    cont.innerHTML += `
      <div>
        ${item.nombre} x${item.cantidad}
        <button onclick="eliminar(${item.id})">❌</button>
      </div>
    `;
  });

  document.getElementById("total").textContent = total;
}

function eliminar(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardar();
  renderCarrito();
}

function confirmarPedido() {
  const nombre = document.getElementById("cliente").value;
  const mesa = document.getElementById("mesa").value;

  if (!nombre || !mesa) {
    alert("Completa los datos");
    return;
  }

  alert("🔥 Pedido confirmado");
  carrito = [];
  guardar();
  renderCarrito();
}

function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

document.getElementById("search").addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  const filtrados = menu.filter(p =>
    p.nombre.toLowerCase().includes(texto)
  );
  renderMenu(filtrados);
});

renderMenu();
renderCarrito();