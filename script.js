const menu = [
  { id: 1, nombre: "Hamburguesa", precio: 15000, categoria: "Platos", img: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
  { id: 2, nombre: "Pizza", precio: 20000, categoria: "Platos", img: "https://images.unsplash.com/photo-1548365328-9f547fb0953d" },
  { id: 3, nombre: "Ensalada", precio: 12000, categoria: "Entradas", img: "https://images.unsplash.com/photo-1551248429-40975aa4de74" },
  { id: 4, nombre: "Pasta", precio: 18000, categoria: "Platos", img: "https://images.unsplash.com/photo-1525755662778-989d0524087e" },
  { id: 5, nombre: "Jugo", precio: 5000, categoria: "Bebidas", img: "https://images.unsplash.com/photo-1553530666-ba11a90c9d5a" },
  { id: 6, nombre: "Café", precio: 4000, categoria: "Bebidas", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
  { id: 7, nombre: "Helado", precio: 7000, categoria: "Postres", img: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f" },
  { id: 8, nombre: "Tacos", precio: 16000, categoria: "Platos", img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" }
];

let carrito = [];

function renderMenu(lista) {
  const container = document.getElementById("menu");
  container.innerHTML = "";

  lista.forEach(item => {
    container.innerHTML += `
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
  const producto = menu.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardar();
  renderCarrito();
}

function renderCarrito() {
  const lista = document.getElementById("cart-items");
  lista.innerHTML = "";

  let total = 0;

  carrito.forEach(item => {
    total += item.precio * item.cantidad;

    lista.innerHTML += `
      <li>
        ${item.nombre} x${item.cantidad}
        <button onclick="eliminar(${item.id})">❌</button>
      </li>
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

  alert(`Pedido confirmado\nCliente: ${nombre}\nMesa: ${mesa}`);
  carrito = [];
  guardar();
  renderCarrito();
}

function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargar() {
  const data = localStorage.getItem("carrito");
  if (data) carrito = JSON.parse(data);
}

document.getElementById("search").addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  const filtrados = menu.filter(p => p.nombre.toLowerCase().includes(texto));
  renderMenu(filtrados);
});

cargar();
renderMenu(menu);
renderCarrito();