// Cambia las rutas de imagen para tus propios archivos en la carpeta 'images/' si lo necesitas
const products = [
  {
    id: 1,
    name: "Anestesia Articaína 4%",
    description: "Anestésico dental de acción rápida para procedimientos locales.",
    price: 15.5,
    stock: 27,
    category: "Anestesias",
    image: "images/anestesico1.jpg" // Usa tu propia imagen aquí
  },
  {
    id: 2,
    name: "Resina Compuesta A2",
    description: "Resina universal para restauraciones anteriores y posteriores.",
    price: 28.9,
    stock: 13,
    category: "Resinas",
    image: "images/resina1.png"
  },
  {
    id: 3,
    name: "Espejo Dental",
    description: "Espejo dental de acero inoxidable de alta calidad.",
    price: 6.5,
    stock: 40,
    category: "Instrumentos",
    image: "images/anestesico2.jpg"
  },
  {
    id: 4,
    name: "Resina Fluida B1",
    description: "Resina de baja viscosidad para recubrimiento cavitario y pequeñas restauraciones.",
    price: 22.0,
    stock: 7,
    category: "Resinas",
    image: "images/resina2.png"
  },
  {
    id: 5,
    name: "Anestesia Lidocaína 2%",
    description: "Anestésico dental estándar para procedimientos habituales.",
    price: 10.0,
    stock: 31,
    category: "Anestesias",
    image: "images/anestesico3.jpg"
  }
];

const productsList = document.getElementById('productsList');
const searchBox = document.getElementById('searchBox');
const categorySelect = document.getElementById('categorySelect');

function renderProducts() {
  const searchTerm = searchBox.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                          product.description.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  productsList.innerHTML = "";
  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-name">${product.name}</div>
      <div class="product-desc">${product.description}</div>
      <div class="product-price">Precio: $${product.price.toFixed(2)}</div>
      <div class="product-stock">Existencia: ${product.stock}</div>
      <input type="number" class="amount-input" min="1" max="${product.stock}" value="1" id="amount-${product.id}">
      <button class="buy-btn" onclick="buyProduct(${product.id})">Comprar por WhatsApp</button>
    `;
    productsList.appendChild(card);
  });
}

window.buyProduct = function(productId) {
  const product = products.find(p => p.id === productId);
  const amountInput = document.getElementById('amount-' + productId);
  let amount = parseInt(amountInput.value, 10);
  if (!amount || amount < 1) amount = 1;
  if (amount > product.stock) amount = product.stock;

  const message = `¡Hola! Quisiera comprar:\n- Producto: ${product.name}\n- Cantidad: ${amount}`;
  // Cambia el número por tu propio número de WhatsApp con código de país
  const phone = "+59173033348";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

searchBox.addEventListener('input', renderProducts);
categorySelect.addEventListener('change', renderProducts);

renderProducts();