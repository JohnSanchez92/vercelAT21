document.querySelectorAll('.productos li').forEach(item => {
    item.addEventListener('click', () => {
      const producto = {
        nombre: item.dataset.nombre,
        imagen: item.dataset.img,
        precio: item.dataset.precio,
        caracteristicas: item.dataset.caracteristicas,
        descripcion: item.dataset.descripcion,
      };
  
      if (producto.nombre && producto.imagen && producto.precio && producto.caracteristicas && producto.descripcion) {
        // Guardar el producto en localStorage y redirigir a la página de información del producto
        localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
        window.location.href = '../infoProducto.html';
      } else {
        alert("Faltan datos del producto. No se puede mostrar la vista.");
      }
    });
  });
 
  // Seleccionar elementos
const productosLista = document.querySelector('.productos');
const productosOriginales = Array.from(productosLista.children);

const marcaCheckboxes = document.querySelectorAll('.filtros input[type="checkbox"]');
const precioSelect = document.querySelectorAll('.filtros select')[0];
const ordenSelect = document.querySelectorAll('.filtros select')[1];

function actualizarProductos() {
  let productosFiltrados = [...productosOriginales];

  // Filtrar por marca
  const marcasSeleccionadas = Array.from(marcaCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.parentElement.textContent.trim().toLowerCase());

  if (marcasSeleccionadas.length > 0) {
    productosFiltrados = productosFiltrados.filter(item => {
      const nombreProducto = item.dataset.nombre.toLowerCase();
      return marcasSeleccionadas.some(marca => nombreProducto.includes(marca));
    });
  }

  // Aplicar solo un tipo de ordenamiento
  const opcionPrecio = precioSelect.value;
  const opcionOrden = ordenSelect.value;

  if (opcionPrecio !== '') {
    if (opcionPrecio === 'Menor a mayor') {
      productosFiltrados.sort((a, b) => a.dataset.precio - b.dataset.precio);
    } else if (opcionPrecio === 'Mayor a menor') {
      productosFiltrados.sort((a, b) => b.dataset.precio - a.dataset.precio);
    }
  } else if (opcionOrden !== '') {
    if (opcionOrden === 'A - Z') {
      productosFiltrados.sort((a, b) => a.dataset.nombre.localeCompare(b.dataset.nombre));
    } else if (opcionOrden === 'Z - A') {
      productosFiltrados.sort((a, b) => b.dataset.nombre.localeCompare(a.dataset.nombre));
    }
  }

  // Limpiar y volver a mostrar productos
  productosLista.innerHTML = '';
  productosFiltrados.forEach(item => productosLista.appendChild(item));
}

// Eventos
marcaCheckboxes.forEach(cb => cb.addEventListener('change', actualizarProductos));
precioSelect.addEventListener('change', actualizarProductos);
ordenSelect.addEventListener('change', actualizarProductos);

// Eventos para seleccionar un producto (ya lo tenías)
document.querySelectorAll('.productos li').forEach(item => {
  item.addEventListener('click', () => {
    const producto = {
      nombre: item.dataset.nombre,
      imagen: item.dataset.img,
      precio: item.dataset.precio,
      caracteristicas: item.dataset.caracteristicas,
      descripcion: item.dataset.descripcion,
    };

    if (producto.nombre && producto.imagen && producto.precio && producto.caracteristicas && producto.descripcion) {
      localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
      window.location.href = '../infoProducto.html';
    } else {
      alert("Faltan datos del producto. No se puede mostrar la vista.");
    }
  });
});