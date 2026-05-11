// ============================================================
// STREETFOOD - Restaurante: Gestión Completa (Frontend puro)
// ============================================================

// ===== CONSTANTES =====
const STORAGE = {
  USERS: 'sf_users',
  CATEGORIES: 'sf_categories',
  PRODUCTS: 'sf_products',
  ORDERS: 'sf_orders',
  RESERVAS: 'sf_reservas',
  SESSION: 'sf_session',
  CAJA: 'sf_caja'
};

// ===== DATOS POR DEFECTO =====
const DEFAULT_CATEGORIES = [
  { id: 1, nombre: 'Entradas' },
  { id: 2, nombre: 'Platos Fuertes' },
  { id: 3, nombre: 'Bebidas' },
  { id: 4, nombre: 'Postres' }
];

const DEFAULT_PRODUCTS = [
  { id: 1, nombre: 'Ceviche', descripcion: 'Ceviche fresco con limón y cilantro', precio: 12000, categoria: 1, imagen: 'https://images.unsplash.com/photo-1555138380-58f2b7c36c4b?w=400&h=300&fit=crop' },
  { id: 2, nombre: 'Nachos', descripcion: 'Nachos con queso derretido y guacamole', precio: 10000, categoria: 1, imagen: 'https://images.unsplash.com/photo-1529973565457-a60a2ccf750d?w=400&h=300&fit=crop' },
  { id: 3, nombre: 'Alitas BBQ', descripcion: 'Alitas de pollo bañadas en salsa BBQ', precio: 14000, categoria: 1, imagen: 'https://images.unsplash.com/photo-1608039829572-9b18d7c1d1c6?w=400&h=300&fit=crop' },
  { id: 4, nombre: 'Hamburguesa', descripcion: 'Hamburguesa artesanal con queso y bacon', precio: 15000, categoria: 2, imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' },
  { id: 5, nombre: 'Pasta Alfredo', descripcion: 'Pasta cremosa con pollo y champiñones', precio: 18000, categoria: 2, imagen: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop' },
  { id: 6, nombre: 'Tacos', descripcion: 'Tacos de carne asada con guacamole', precio: 14000, categoria: 2, imagen: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop' },
  { id: 7, nombre: 'Pizza', descripcion: 'Pizza pepperoni con queso mozzarella', precio: 20000, categoria: 2, imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop' },
  { id: 8, nombre: 'Salmón', descripcion: 'Salmón a la plancha con verduras', precio: 22000, categoria: 2, imagen: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop' },
  { id: 9, nombre: 'Juego Natural', descripcion: 'Jugo de frutas frescas del día', precio: 5000, categoria: 3, imagen: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=300&fit=crop' },
  { id: 10, nombre: 'Limonada', descripcion: 'Limonada natural con hierbabuena', precio: 4000, categoria: 3, imagen: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop' },
  { id: 11, nombre: 'Cheesecake', descripcion: 'Cheesecake con fresas y crema', precio: 8000, categoria: 4, imagen: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop' },
  { id: 12, nombre: 'Helado', descripcion: 'Helado artesanal de vainilla y chocolate', precio: 6000, categoria: 4, imagen: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop' }
];

const DEFAULT_USERS = [
  { id: 1, nombre: 'Admin', email: 'admin@streetfood.com', password: 'admin123', rol: 'admin' },
  { id: 2, nombre: 'Mesero', email: 'mesero@streetfood.com', password: 'mesero123', rol: 'mesero' },
  { id: 3, nombre: 'Cliente', email: 'cliente@streetfood.com', password: 'cliente123', rol: 'cliente' }
];

// ===== ESTADO GLOBAL =====
let currentUser = null;
let cart = [];
let ordersFilter = 'all';

// ===== PERSISTENCIA =====
function getData(key, defaults) {
  try {
    var d = localStorage.getItem(key);
    if (d) return JSON.parse(d);
  } catch (e) { /* ignore */ }
  return defaults;
}

function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ===== TOAST =====
function mostrarToast(msg, tipo) {
  tipo = tipo || '';
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + tipo;
  clearTimeout(t._timeout);
  t._timeout = setTimeout(function() { t.classList.remove('show'); }, 2500);
}

// ===== INICIALIZAR DATOS =====
function initData() {
  if (!localStorage.getItem(STORAGE.CATEGORIES))
    setData(STORAGE.CATEGORIES, DEFAULT_CATEGORIES);
  if (!localStorage.getItem(STORAGE.PRODUCTS))
    setData(STORAGE.PRODUCTS, DEFAULT_PRODUCTS);
  if (!localStorage.getItem(STORAGE.USERS))
    setData(STORAGE.USERS, DEFAULT_USERS);
  if (!localStorage.getItem(STORAGE.ORDERS))
    setData(STORAGE.ORDERS, []);
  if (!localStorage.getItem(STORAGE.RESERVAS))
    setData(STORAGE.RESERVAS, []);
  if (!localStorage.getItem(STORAGE.CAJA))
    setData(STORAGE.CAJA, { abierta: true, fecha: new Date().toISOString().split('T')[0], total: 0, pedidos: 0 });
}

// ===== AUTH =====
function initSession() {
  var saved = localStorage.getItem(STORAGE.SESSION);
  if (saved) {
    try {
      var user = JSON.parse(saved);
      var users = getData(STORAGE.USERS, DEFAULT_USERS);
      var found = users.find(function(u) { return u.id === user.id; });
      if (found) { currentUser = found; return true; }
    } catch (e) { /* ignore */ }
  }
  return false;
}

function login() {
  var email = document.getElementById('login-email').value.trim();
  var pass = document.getElementById('login-pass').value.trim();
  if (!email || !pass) { mostrarToast('Completa todos los campos', 'error'); return; }
  var users = getData(STORAGE.USERS, DEFAULT_USERS);
  var user = users.find(function(u) { return u.email === email && u.password === pass; });
  if (!user) { mostrarToast('Credenciales inválidas', 'error'); return; }
  currentUser = user;
  localStorage.setItem(STORAGE.SESSION, JSON.stringify({ id: user.id }));
  mostrarToast('Bienvenido ' + user.nombre, 'success');
  enterApp();
}

function register() {
  var nombre = document.getElementById('reg-nombre').value.trim();
  var rol = document.getElementById('reg-rol').value;
  var email = document.getElementById('reg-email').value.trim();
  var pass = document.getElementById('reg-pass').value.trim();
  var pass2 = document.getElementById('reg-pass2').value.trim();
  if (!nombre || !email || !pass || !pass2) { mostrarToast('Completa todos los campos', 'error'); return; }
  if (pass !== pass2) { mostrarToast('Las contraseñas no coinciden', 'error'); return; }
  if (pass.length < 6) { mostrarToast('La contraseña debe tener al menos 6 caracteres', 'error'); return; }
  var users = getData(STORAGE.USERS, DEFAULT_USERS);
  if (users.find(function(u) { return u.email === email; })) { mostrarToast('El correo ya está registrado', 'error'); return; }
  var newUser = { id: Date.now(), nombre: nombre, email: email, password: pass, rol: rol };
  users.push(newUser);
  setData(STORAGE.USERS, users);
  currentUser = newUser;
  localStorage.setItem(STORAGE.SESSION, JSON.stringify({ id: newUser.id }));
  mostrarToast('Cuenta creada exitosamente', 'success');
  enterApp();
}

function logout() {
  currentUser = null;
  cart = [];
  localStorage.removeItem(STORAGE.SESSION);
  document.getElementById('app').classList.add('hidden');
  document.getElementById('view-login').classList.remove('hidden');
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('register-form').classList.add('hidden');
  document.getElementById('auth-title').textContent = 'Iniciar sesión';
  document.getElementById('login-email').value = '';
  document.getElementById('login-pass').value = '';
  mostrarToast('sesión cerrada', 'info');
}

function showRegister() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('register-form').classList.remove('hidden');
  document.getElementById('auth-title').textContent = 'Crear Cuenta';
}

function showLogin() {
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('register-form').classList.add('hidden');
  document.getElementById('auth-title').textContent = 'Iniciar sesión';
}

// ===== ENTRAR A LA APP =====
function enterApp() {
  document.getElementById('view-login').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  var badge = document.getElementById('user-badge');
  badge.textContent = currentUser.nombre + ' (' + currentUser.rol + ')';
  badge.className = 'user-badge ' + currentUser.rol;
  buildSidebar();
  navigate('menu');
}

// ===== SIDEBAR =====
function buildSidebar() {
  var nav = document.getElementById('sidebar-nav');
  var role = currentUser.rol;
  var items = [];
  items.push({ id: 'menu', icon: 'fa-utensils', label: 'Menú' });
  if (role === 'admin' || role === 'mesero')
    items.push({ id: 'pedido', icon: 'fa-cart-plus', label: 'Nuevo Pedido' });
  items.push({ id: 'ordenes', icon: 'fa-receipt', label: 'Mis Pedidos' });
  items.push({ id: 'reservas', icon: 'fa-calendar', label: 'Reservas' });
  if (role === 'admin') {
    items.push({ id: 'admin', icon: 'fa-gear', label: 'Administrar' });
    items.push({ id: 'reportes', icon: 'fa-chart-line', label: 'Reportes' });
  }
  nav.innerHTML = '';
  items.forEach(function(item) {
    var a = document.createElement('div');
    a.className = 'nav';
    a.setAttribute('data-view', item.id);
    a.innerHTML = '<i class="fa-solid ' + item.icon + '"></i> <span>' + item.label + '</span>';
    a.onclick = function() { navigate(item.id); };
    nav.appendChild(a);
  });
}

function navigate(viewId) {
  // Update sidebar active state via data-view attribute
  document.querySelectorAll('#sidebar-nav .nav').forEach(function(n) { n.classList.remove('active'); });
  var activeNav = document.querySelector('#sidebar-nav .nav[data-view="' + viewId + '"]');
  if (activeNav) activeNav.classList.add('active');

  // Show correct view
  document.querySelectorAll('.main .view').forEach(function(v) { v.classList.add('hidden'); });
  var target = document.getElementById('view-' + viewId);
  if (target) target.classList.remove('hidden');

  // Update title
  var titles = { menu: 'Menú', pedido: 'Nuevo Pedido', ordenes: 'Mis Pedidos', reservas: 'Reservas', admin: 'Administración', reportes: 'Reportes' };
  document.getElementById('view-title').textContent = titles[viewId] || 'StreetFood';

  // Render view content
  if (viewId === 'menu') renderMenu();
  if (viewId === 'pedido') renderOrderMenu();
  if (viewId === 'ordenes') renderOrders();
  if (viewId === 'reservas') renderReservas();
  if (viewId === 'admin') showAdminTab('productos');
  if (viewId === 'reportes') renderReports();

  // Close mobile sidebar
  if (window.innerWidth <= 600) document.getElementById('sidebar').classList.remove('open');
}

// Toggle sidebar
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('toggleSidebar').onclick = function() {
    if (window.innerWidth <= 600) {
      document.getElementById('sidebar').classList.toggle('open');
    } else {
      document.getElementById('sidebar').classList.toggle('collapsed');
    }
  };
});

// ===== MEN� (vista principal) =====
function getCategories() { return getData(STORAGE.CATEGORIES, DEFAULT_CATEGORIES); }
function getProducts() { return getData(STORAGE.PRODUCTS, DEFAULT_PRODUCTS); }

function renderMenu() {
  var grid = document.getElementById('menu-grid');
  var cats = getCategories();
  var products = getProducts();
  var query = (document.getElementById('search-input').value || '').toLowerCase();
  var activeCat = document.querySelector('#filter-tabs .active');
  var catId = activeCat ? parseInt(activeCat.dataset.filter) : 0;

  // Filter tabs
  var ft = document.getElementById('filter-tabs');
  ft.innerHTML = '<button class="filter-btn' + (catId === 0 ? ' active' : '') + '" data-filter="0" onclick="filterMenu(0)">Todos</button>';
  cats.forEach(function(c) {
    ft.innerHTML += '<button class="filter-btn' + (catId === c.id ? ' active' : '') + '" data-filter="' + c.id + '" onclick="filterMenu(' + c.id + ')">' + c.nombre + '</button>';
  });

  var filtered = products.filter(function(p) {
    var matchCat = catId === 0 || p.categoria === catId;
    var matchName = !query || p.nombre.toLowerCase().includes(query);
    return matchCat && matchName;
  });

  grid.innerHTML = '';
  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color:var(--muted);grid-column:1/-1;text-align:center;padding:40px;">No se encontraron platos</p>';
    return;
  }
  filtered.forEach(function(p) {
    var cat = cats.find(function(c) { return c.id === p.categoria; });
    grid.innerHTML +=
      '<div class="menu-card" style="animation-delay:' + (filtered.indexOf(p) * 0.05) + 's">' +
        '<img src="' + p.imagen + '" alt="' + p.nombre + '" loading="lazy">' +
        '<div class="menu-card-body">' +
          '<span class="cat-badge">' + (cat ? cat.nombre : '') + '</span>' +
          '<h4>' + p.nombre + '</h4>' +
          '<p class="desc">' + p.descripcion + '</p>' +
          '<p class="precio">$' + p.precio.toLocaleString('es-CO') + '</p>' +
        '</div>' +
      '</div>';
  });
}

function filterMenu(id) {
  document.querySelectorAll('#filter-tabs .filter-btn').forEach(function(b) { b.classList.remove('active'); });
  var btn = document.querySelector('#filter-tabs .filter-btn[data-filter="' + id + '"]');
  if (btn) btn.classList.add('active');
  renderMenu();
}

// ===== MEN� DE PEDIDOS (con carrito) =====
function renderOrderMenu() {
  var grid = document.getElementById('order-menu-grid');
  var cats = getCategories();
  var products = getProducts();
  var query = (document.getElementById('order-search').value || '').toLowerCase();
  var activeCat = document.querySelector('#order-filter-tabs .active');
  var catId = activeCat ? parseInt(activeCat.dataset.filter) : 0;

  var ft = document.getElementById('order-filter-tabs');
  ft.innerHTML = '<button class="filter-btn' + (catId === 0 ? ' active' : '') + '" data-filter="0" onclick="filterOrderMenu(0)">Todos</button>';
  cats.forEach(function(c) {
    ft.innerHTML += '<button class="filter-btn' + (catId === c.id ? ' active' : '') + '" data-filter="' + c.id + '" onclick="filterOrderMenu(' + c.id + ')">' + c.nombre + '</button>';
  });

  var filtered = products.filter(function(p) {
    var matchCat = catId === 0 || p.categoria === catId;
    var matchName = !query || p.nombre.toLowerCase().includes(query);
    return matchCat && matchName;
  });

  grid.innerHTML = '';
  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color:var(--muted);grid-column:1/-1;text-align:center;padding:40px;">No se encontraron platos</p>';
    return;
  }
  filtered.forEach(function(p) {
    var cat = cats.find(function(c) { return c.id === p.categoria; });
    var inCart = cart.some(function(item) { return item.id === p.id; });
    grid.innerHTML +=
      '<div class="menu-card" style="animation-delay:' + (filtered.indexOf(p) * 0.05) + 's">' +
        '<img src="' + p.imagen + '" alt="' + p.nombre + '" loading="lazy">' +
        '<div class="menu-card-body">' +
          '<span class="cat-badge">' + (cat ? cat.nombre : '') + '</span>' +
          '<h4>' + p.nombre + '</h4>' +
          '<p class="desc">' + p.descripcion + '</p>' +
          '<p class="precio">$' + p.precio.toLocaleString('es-CO') + '</p>' +
          '<button class="' + (inCart ? 'added' : '') + '" onclick="addToCart(' + p.id + ', this)">' + (inCart ? '✔ En carrito' : 'Agregar') + '</button>' +
        '</div>' +
      '</div>';
  });
}

function filterOrderMenu(id) {
  document.querySelectorAll('#order-filter-tabs .filter-btn').forEach(function(b) { b.classList.remove('active'); });
  var btn = document.querySelector('#order-filter-tabs .filter-btn[data-filter="' + id + '"]');
  if (btn) btn.classList.add('active');
  renderOrderMenu();
}

// ===== CARRITO =====
function addToCart(productId, btn) {
  var products = getProducts();
  var product = products.find(function(p) { return p.id === productId; });
  if (!product) return;
  var existing = cart.find(function(item) { return item.id === productId; });
  if (existing) {
    existing.cantidad += 1;
  } else {
    cart.push({ id: product.id, nombre: product.nombre, precio: product.precio, cantidad: 1 });
  }
  renderCart();
  renderOrderMenu();
  if (btn) {
    btn.textContent = '✔ Agregado';
    btn.classList.add('added');
    setTimeout(function() { renderOrderMenu(); }, 1200);
  }
  mostrarToast(product.nombre + ' agregado', 'success');
}

function removeFromCart(productId) {
  cart = cart.filter(function(item) { return item.id !== productId; });
  renderCart();
  renderOrderMenu();
}

function updateQty(productId, delta) {
  var item = cart.find(function(i) { return i.id === productId; });
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0)
    cart = cart.filter(function(i) { return i.id !== productId; });
  renderCart();
  renderOrderMenu();
}

function renderCart() {
  var container = document.getElementById('cart-items');
  var totalEl = document.getElementById('cart-total');
  var countEl = document.getElementById('cart-count');
  var total = 0;
  var count = 0;
  container.innerHTML = '';
  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty"><i class="fa-solid fa-cart-shopping" style="font-size:32px;opacity:0.3;margin-bottom:8px;display:block"></i>Carrito vacío</div>';
    totalEl.textContent = '$0';
    countEl.textContent = '0';
    return;
  }
  cart.forEach(function(item) {
    var subtotal = item.precio * item.cantidad;
    total += subtotal;
    count += item.cantidad;
    container.innerHTML +=
      '<div class="cart-item">' +
        '<div class="cart-item-info">' +
          '<div class="name">' + item.nombre + '</div>' +
          '<div class="price">$' + item.precio.toLocaleString('es-CO') + '</div>' +
        '</div>' +
        '<div class="cart-item-qty">' +
          '<button onclick="updateQty(' + item.id + ', -1)">-</button>' +
          '<span>' + item.cantidad + '</span>' +
          '<button onclick="updateQty(' + item.id + ', 1)">+</button>' +
        '</div>' +
        '<button class="cart-item-remove" onclick="removeFromCart(' + item.id + ')"><i class="fa-solid fa-trash-can"></i></button>' +
      '</div>';
  });
  totalEl.textContent = '$' + total.toLocaleString('es-CO');
  countEl.textContent = count;
}

function confirmarPedido() {
  var caja = getData(STORAGE.CAJA, { abierta: true });
  if (!caja.abierta) { mostrarToast('La caja está cerrada. Ábrela para tomar pedidos.', 'error'); return; }
  var cliente = document.getElementById('order-cliente').value.trim();
  var mesa = document.getElementById('order-mesa').value.trim();
  if (!cliente) { mostrarToast('Ingresa el nombre del cliente', 'error'); return; }
  if (!mesa) { mostrarToast('Ingresa el Número de mesa', 'error'); return; }
  if (cart.length === 0) { mostrarToast('El carrito está vacío', 'error'); return; }
  var total = cart.reduce(function(sum, item) { return sum + item.precio * item.cantidad; }, 0);
  var orders = getData(STORAGE.ORDERS, []);
  orders.push({
    id: Date.now(),
    cliente: cliente,
    mesa: parseInt(mesa),
    items: JSON.parse(JSON.stringify(cart)),
    total: total,
    estado: 'pendiente',
    fecha: new Date().toISOString(),
    usuario: currentUser.nombre
  });
  setData(STORAGE.ORDERS, orders);
  cart = [];
  renderCart();
  renderOrderMenu();
  document.getElementById('order-cliente').value = '';
  document.getElementById('order-mesa').value = '';
  mostrarToast('Pedido #' + orders[orders.length - 1].id + ' confirmado', 'success');
}

// ===== ORDENES =====
function renderOrders() {
  var grid = document.getElementById('orders-grid');
  var orders = getData(STORAGE.ORDERS, []);
  var role = currentUser.rol;

  // Filter by role
  if (role === 'cliente')
    orders = orders.filter(function(o) { return o.cliente.toLowerCase() === currentUser.nombre.toLowerCase(); });
  else if (role === 'mesero')
    orders = orders.filter(function(o) { return o.usuario === currentUser.nombre; });

  // Filter by status
  if (ordersFilter !== 'all')
    orders = orders.filter(function(o) { return o.estado === ordersFilter; });

  orders.sort(function(a, b) { return b.id - a.id; });

  grid.innerHTML = '';
  if (orders.length === 0) {
    grid.innerHTML = '<p style="color:var(--muted);grid-column:1/-1;text-align:center;padding:40px;">No hay pedidos</p>';
    return;
  }
  orders.forEach(function(o) {
    var itemsHtml = '<ul>';
    o.items.forEach(function(item) {
      itemsHtml += '<li>' + item.cantidad + 'x ' + item.nombre + ' - $' + (item.precio * item.cantidad).toLocaleString('es-CO') + '</li>';
    });
    itemsHtml += '</ul>';
    var d = new Date(o.fecha);
    var dateStr = d.toLocaleDateString('es-CO') + ' ' + d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
    var statusLabel = o.estado.charAt(0).toUpperCase() + o.estado.slice(1);
    grid.innerHTML +=
      '<div class="order-card">' +
        '<div class="order-header">' +
          '<div>' +
            '<h4>#' + o.id + '</h4>' +
            '<p class="order-cliente">' + o.cliente + ' - Mesa ' + o.mesa + '</p>' +
          '</div>' +
          '<span class="status-badge ' + o.estado + '">' + statusLabel + '</span>' +
        '</div>' +
        '<div class="order-items">' + itemsHtml + '</div>' +
        '<p class="order-total">$' + o.total.toLocaleString('es-CO') + '</p>' +
        '<div class="order-footer">' +
          '<span class="order-date">' + dateStr + '</span>' +
          '<span>' + o.usuario + '</span>' +
        '</div>' +
        renderOrderActions(o) +
      '</div>';
  });
}

function renderOrderActions(order) {
  var statuses = ['pendiente', 'preparando', 'listo', 'entregado'];
  var idx = statuses.indexOf(order.estado);
  if (idx >= statuses.length - 1) return '';
  var next = statuses[idx + 1];
  var btnClass = { preparando: 'btn-prep', listo: 'btn-ready', entregado: 'btn-done' };
  var labels = { preparando: 'Preparar', listo: 'Listo', entregado: 'Entregar' };
  var icons = { preparando: 'fa-fire', listo: 'fa-check', entregado: 'fa-hand' };
  var role = currentUser.rol;
  if (role === 'cliente') return '';
  return '<div class="order-footer" style="border-top:1px solid var(--border);padding-top:12px;margin-top:12px;">' +
    '<div class="status-actions">' +
      '<button class="' + (btnClass[next] || '') + '" onclick="updateOrderStatus(' + order.id + ', \'' + next + '\')">' +
        '<i class="fa-solid ' + (icons[next] || 'fa-arrow-right') + '"></i> ' + labels[next] +
      '</button>' +
    '</div></div>';
}

function updateOrderStatus(orderId, newStatus) {
  var orders = getData(STORAGE.ORDERS, []);
  var order = orders.find(function(o) { return o.id === orderId; });
  if (!order) return;
  order.estado = newStatus;
  setData(STORAGE.ORDERS, orders);
  renderOrders();
  mostrarToast('Pedido #' + orderId + ' → ' + newStatus, 'info');
}

function filtrarPedidos(filter) {
  ordersFilter = filter;
  document.querySelectorAll('#order-status-tabs .filter-btn').forEach(function(b) { b.classList.remove('active'); });
  var btn = document.querySelector('#order-status-tabs .filter-btn[data-filter="' + filter + '"]');
  if (btn) btn.classList.add('active');
  renderOrders();
}

// ===== RESERVAS =====
function crearReserva() {
  var cliente = document.getElementById('res-cliente').value.trim();
  var fecha = document.getElementById('res-fecha').value;
  var hora = document.getElementById('res-hora').value;
  var personas = document.getElementById('res-personas').value;
  if (!cliente || !fecha || !hora || !personas) { mostrarToast('Completa todos los campos', 'error'); return; }
  if (parseInt(personas) < 1) { mostrarToast('número de personas inv�lido', 'error'); return; }
  var reservas = getData(STORAGE.RESERVAS, []);
  reservas.push({ id: Date.now(), cliente: cliente, fecha: fecha, hora: hora, personas: parseInt(personas), estado: 'confirmada', usuario: currentUser.nombre });
  setData(STORAGE.RESERVAS, reservas);
  document.getElementById('res-cliente').value = '';
  document.getElementById('res-fecha').value = '';
  document.getElementById('res-hora').value = '';
  document.getElementById('res-personas').value = '';
  renderReservas();
  mostrarToast('Reserva confirmada para ' + cliente, 'success');
}

function cancelarReserva(id) {
  if (!confirm('¿Cancelar esta reserva?')) return;
  var reservas = getData(STORAGE.RESERVAS, []);
  reservas = reservas.filter(function(r) { return r.id !== id; });
  setData(STORAGE.RESERVAS, reservas);
  renderReservas();
  mostrarToast('Reserva cancelada', 'info');
}

function renderReservas() {
  var grid = document.getElementById('reservas-grid');
  var reservas = getData(STORAGE.RESERVAS, []);
  // Pre-fill client name for cliente role
  if (currentUser.rol === 'cliente') {
    document.getElementById('res-cliente').value = currentUser.nombre;
    reservas = reservas.filter(function(r) { return r.usuario === currentUser.nombre; });
  }
  reservas.sort(function(a, b) { return b.id - a.id; });
  grid.innerHTML = '';
  if (reservas.length === 0) {
    grid.innerHTML = '<p style="color:var(--muted);text-align:center;padding:20px;">No hay reservas</p>';
    return;
  }
  reservas.forEach(function(r) {
    var d = new Date(r.fecha + 'T' + r.hora);
    var fechaStr = d.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    grid.innerHTML +=
      '<div class="reserva-card">' +
        '<div class="reserva-info">' +
          '<div class="name">' + r.cliente + '</div>' +
          '<div class="detail">' + fechaStr + ' - ' + r.hora + ' | ' + r.personas + ' persona(s)</div>' +
        '</div>' +
        '<button class="btn-danger-small" onclick="cancelarReserva(' + r.id + ')">Cancelar</button>' +
      '</div>';
  });
}

// ===== ADMIN =====
function showAdminTab(tab) {
  document.querySelectorAll('.admin-tab').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.admin-panel').forEach(function(p) { p.classList.add('hidden'); });
  if (tab === 'productos') {
    document.querySelectorAll('.admin-tab')[0].classList.add('active');
    document.getElementById('admin-productos').classList.remove('hidden');
    renderAdminProducts();
  } else {
    document.querySelectorAll('.admin-tab')[1].classList.add('active');
    document.getElementById('admin-categorias').classList.remove('hidden');
    renderAdminCategories();
  }
}

function renderAdminProducts() {
  var table = document.getElementById('admin-products-table');
  var products = getProducts();
  var cats = getCategories();
  var html = '<table><thead><tr><th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Acciones</th></tr></thead><tbody>';
  if (products.length === 0) {
    html += '<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:20px;">No hay platos registrados</td></tr>';
  } else {
    products.forEach(function(p) {
      var cat = cats.find(function(c) { return c.id === p.categoria; });
      html += '<tr>' +
        '<td><img class="table-img" src="' + p.imagen + '" alt="' + p.nombre + '" loading="lazy"></td>' +
        '<td><strong>' + p.nombre + '</strong><br><span style="color:var(--muted);font-size:11px;">' + p.descripcion + '</span></td>' +
        '<td>' + (cat ? cat.nombre : 'Sin categor�a') + '</td>' +
        '<td>$' + p.precio.toLocaleString('es-CO') + '</td>' +
        '<td class="actions">' +
          '<button class="btn-edit" onclick="editProduct(' + p.id + ')"><i class="fa-solid fa-pen"></i></button>' +
          '<button class="btn-del" onclick="deleteProduct(' + p.id + ')"><i class="fa-solid fa-trash"></i></button>' +
        '</td></tr>';
    });
  }
  html += '</tbody></table>';
  table.innerHTML = html;
}

function renderAdminCategories() {
  var table = document.getElementById('admin-categories-table');
  var cats = getCategories();
  var products = getProducts();
  var html = '<table><thead><tr><th>Nombre</th><th>Platos</th><th>Acciones</th></tr></thead><tbody>';
  if (cats.length === 0) {
    html += '<tr><td colspan="3" style="text-align:center;color:var(--muted);padding:20px;">No hay Categorías</td></tr>';
  } else {
    cats.forEach(function(c) {
      var count = products.filter(function(p) { return p.categoria === c.id; }).length;
      html += '<tr><td><strong>' + c.nombre + '</strong></td><td>' + count + ' plato(s)</td>' +
        '<td class="actions"><button class="btn-del" onclick="deleteCategory(' + c.id + ')"><i class="fa-solid fa-trash"></i></button></td></tr>';
    });
  }
  html += '</tbody></table>';
  table.innerHTML = html;
}

// ---- CRUD Productos ----
function showProductForm() {
  openModal('Nuevo Plato', getProductFormHtml(null));
}

function getProductFormHtml(product) {
  var cats = getCategories();
  var catOpts = '';
  cats.forEach(function(c) {
    var sel = product && product.categoria === c.id ? 'selected' : '';
    catOpts += '<option value="' + c.id + '" ' + sel + '>' + c.nombre + '</option>';
  });
  var p = product || { nombre: '', descripcion: '', precio: '', imagen: '' };
  return '<input type="text" id="pf-nombre" placeholder="Nombre del plato" value="' + escHtml(p.nombre) + '">' +
    '<textarea id="pf-desc" placeholder="Descripción">' + escHtml(p.descripcion) + '</textarea>' +
    '<input type="number" id="pf-precio" placeholder="Precio" value="' + (p.precio || '') + '">' +
    '<select id="pf-categoria">' + catOpts + '</select>' +
    '<input type="url" id="pf-imagen" placeholder="URL de la imagen" value="' + escHtml(p.imagen) + '">' +
    '<button class="btn-primary" onclick="saveProduct(' + (product ? product.id : 'null') + ')">' + (product ? 'Actualizar Plato' : 'Crear Plato') + '</button>';
}

function escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function saveProduct(editId) {
  var nombre = document.getElementById('pf-nombre').value.trim();
  var desc = document.getElementById('pf-desc').value.trim();
  var precio = parseInt(document.getElementById('pf-precio').value);
  var categoria = parseInt(document.getElementById('pf-categoria').value);
  var imagen = document.getElementById('pf-imagen').value.trim();
  if (!nombre || !precio || !imagen) { mostrarToast('Completa nombre, precio e imagen', 'error'); return; }
  var products = getProducts();
  if (editId) {
    var prod = products.find(function(p) { return p.id === editId; });
    if (prod) { prod.nombre = nombre; prod.descripcion = desc; prod.precio = precio; prod.categoria = categoria; prod.imagen = imagen; }
    mostrarToast('Plato actualizado', 'success');
  } else {
    products.push({ id: Date.now(), nombre: nombre, descripcion: desc, precio: precio, categoria: categoria, imagen: imagen });
    mostrarToast('Plato creado', 'success');
  }
  setData(STORAGE.PRODUCTS, products);
  closeModal();
  renderAdminProducts();
  renderMenu();
}

function editProduct(id) {
  var p = getProducts().find(function(pr) { return pr.id === id; });
  if (!p) return;
  openModal('Editar Plato', getProductFormHtml(p));
}

function deleteProduct(id) {
  if (!confirm('¿Eliminar este plato?')) return;
  var products = getProducts();
  setData(STORAGE.PRODUCTS, products.filter(function(p) { return p.id !== id; }));
  renderAdminProducts();
  renderMenu();
  mostrarToast('Plato eliminado', 'info');
}

// ---- CRUD Categorías ----
function showCategoryForm() {
  openModal('Nueva Categoría',
    '<input type="text" id="cf-nombre" placeholder="Nombre de la categor�a">' +
    '<button class="btn-primary" onclick="saveCategory()">Crear Categoría</button>');
}

function saveCategory() {
  var nombre = document.getElementById('cf-nombre').value.trim();
  if (!nombre) { mostrarToast('Ingresa un nombre', 'error'); return; }
  var cats = getCategories();
  cats.push({ id: Date.now(), nombre: nombre });
  setData(STORAGE.CATEGORIES, cats);
  closeModal();
  renderAdminCategories();
  renderMenu();
  mostrarToast('Categoría creada', 'success');
}

function deleteCategory(id) {
  var count = getProducts().filter(function(p) { return p.categoria === id; }).length;
  if (!confirm('¿Eliminar categor�a' + (count > 0 ? ' (' + count + ' plato(s) afectados)' : '') + '?')) return;
  var cats = getCategories();
  setData(STORAGE.CATEGORIES, cats.filter(function(c) { return c.id !== id; }));
  // Move products to uncategorized
  var products = getProducts();
  products.forEach(function(p) { if (p.categoria === id) p.categoria = 0; });
  setData(STORAGE.PRODUCTS, products);
  renderAdminCategories();
  renderMenu();
  mostrarToast('Categoría eliminada', 'info');
}

// ===== MODAL =====
function openModal(title, bodyHtml) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHtml;
  document.getElementById('modal-overlay').classList.remove('hidden');
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.getElementById('modal').classList.add('hidden');
}

// ===== REPORTES =====
function renderReports() {
  var orders = getData(STORAGE.ORDERS, []);
  var caja = getData(STORAGE.CAJA, { abierta: true, fecha: '', total: 0, pedidos: 0 });
  var today = new Date().toISOString().split('T')[0];
  var todayOrders = orders.filter(function(o) { return o.fecha && o.fecha.startsWith(today); });
  var totalVentas = todayOrders.reduce(function(sum, o) { return sum + o.total; }, 0);
  var totalPedidos = todayOrders.length;
  var totalItems = todayOrders.reduce(function(sum, o) {
    return sum + o.items.reduce(function(s, i) { return s + i.cantidad; }, 0);
  }, 0);
  var ticketPromedio = totalPedidos > 0 ? Math.round(totalVentas / totalPedidos) : 0;
  var cajaColor = caja.abierta ? 'success' : 'danger';
  var cajaIcon = caja.abierta ? 'door-open' : 'door-closed';
  var cajaText = caja.abierta ? 'Abierta' : 'Cerrada';

  document.getElementById('stats-grid').innerHTML =
    '<div class="stat-card"><div class="stat-icon"><i class="fa-solid fa-dollar-sign"></i></div><div class="stat-value">$' + totalVentas.toLocaleString('es-CO') + '</div><div class="stat-label">Ventas del Día</div></div>' +
    '<div class="stat-card"><div class="stat-icon"><i class="fa-solid fa-receipt"></i></div><div class="stat-value">' + totalPedidos + '</div><div class="stat-label">Pedidos del Día</div></div>' +
    '<div class="stat-card"><div class="stat-icon"><i class="fa-solid fa-utensils"></i></div><div class="stat-value">' + totalItems + '</div><div class="stat-label">Platos Vendidos</div></div>' +
    '<div class="stat-card"><div class="stat-icon"><i class="fa-solid fa-chart-simple"></i></div><div class="stat-value">$' + ticketPromedio.toLocaleString('es-CO') + '</div><div class="stat-label">Ticket Promedio</div></div>' +
    '<div class="stat-card" style="border-left-color:var(--' + cajaColor + ')"><div class="stat-icon"><i class="fa-solid fa-' + cajaIcon + '"></i></div><div class="stat-value" style="color:var(--' + cajaColor + ')">' + cajaText + '</div><div class="stat-label">Estado de Caja</div></div>';

  // Update the header button based on caja state
  var headerBtn = document.querySelector('#view-reportes .reports-header button');
  if (caja.abierta) {
    headerBtn.innerHTML = '<i class="fa-solid fa-cash-register"></i> Cerrar Caja';
    headerBtn.className = 'btn-danger';
    headerBtn.setAttribute('onclick', 'cerrarCaja()');
  } else {
    headerBtn.innerHTML = '<i class="fa-solid fa-cash-register"></i> Abrir Caja';
    headerBtn.className = 'btn-primary';
    headerBtn.setAttribute('onclick', 'abrirCaja()');
  }

  var html = '<table><thead><tr><th>#</th><th>Cliente</th><th>Mesa</th><th>Items</th><th>Total</th><th>Estado</th><th>Hora</th></tr></thead><tbody>';
  if (todayOrders.length === 0) {
    html += '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:20px;">No hay pedidos hoy</td></tr>';
  } else {
    todayOrders.sort(function(a, b) { return b.id - a.id; });
    todayOrders.forEach(function(o) {
      var d = new Date(o.fecha);
      var time = d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
      var itemsCount = o.items.reduce(function(s, i) { return s + i.cantidad; }, 0);
      html += '<tr><td><strong>#' + o.id + '</strong></td><td>' + o.cliente + '</td><td>' + o.mesa + '</td><td>' + itemsCount + '</td><td>$' + o.total.toLocaleString('es-CO') + '</td><td><span class="status-badge ' + o.estado + '">' + o.estado + '</span></td><td>' + time + '</td></tr>';
    });
  }
  html += '</tbody></table>';
  document.getElementById('reports-orders-table').innerHTML = html;
}

function cerrarCaja() {
  if (!confirm('¿Estás seguro de cerrar la caja? Se generará un resumen del día.')) return;
  var orders = getData(STORAGE.ORDERS, []);
  var today = new Date().toISOString().split('T')[0];
  var todayOrders = orders.filter(function(o) { return o.fecha && o.fecha.startsWith(today); });
  var totalVentas = todayOrders.reduce(function(sum, o) { return sum + o.total; }, 0);
  var totalPedidos = todayOrders.length;
  setData(STORAGE.CAJA, { abierta: false, fecha: today, total: totalVentas, pedidos: totalPedidos, cerrado: new Date().toISOString() });
  renderReports();
  var resumen = '=== CIERRE DE CAJA ===\nFecha: ' + today + '\nTotal Ventas: $' + totalVentas.toLocaleString('es-CO') + '\nTotal Pedidos: ' + totalPedidos + '\n========================';
  mostrarToast('Caja cerrada - Total: $' + totalVentas.toLocaleString('es-CO'), 'info');
  setTimeout(function() { alert(resumen); }, 600);
}

function abrirCaja() {
  setData(STORAGE.CAJA, { abierta: true, fecha: new Date().toISOString().split('T')[0], total: 0, pedidos: 0 });
  renderReports();
  mostrarToast('Caja abierta - listo para operar', 'success');
}

// ===== INIT =====
function init() {
  initData();
  if (initSession()) enterApp();
}

document.addEventListener('DOMContentLoaded', init);
