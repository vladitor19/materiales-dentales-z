// Cambia las rutas de imagen para tus propios archivos en la carpeta 'images/' si lo necesitas
const products = [
  {
    id: 1,
    name: "Cemento resinoso dual Allcem Core",
    description: "Es un material versátil diseñado para diversas aplicaciones en odontología restauradora.",
    price: 280,
    stock: 10,
    category: "Cementos",
    image: "images/AllcemCore.png"
  },
  {
    id: 2,
    name: "Agujas cortas Misawa de 25 mm",
    description: "Son herramientas esenciales en el ámbito odontológico, diseñadas para facilitar la administración de anestésicos locales.",
    price: 80,
    stock: 5,
    category: "Agujas",
    image: "images/AgujasCortasMisawa.jpg"
  },
  {
    id: 3,
    name: "Resina Opallis D2A",
    description: "Es un material de restauración dental de alta calidad, diseñado para ofrecer resultados estéticos y duraderos.",
    price: 90,
    stock: 10,
    category: "Resinas",
    image: "images/ResinaOpallis.png"
  },
  {
    id: 4,
    name: "Alginato para impresión Asade",
    description: "Es un material de toma de impresiones dentales de alta precisión, diseñado para obtener modelos detallados de la cavidad oral.",
    price: 55,
    stock: 3,
    category: "Alginatos",
    image: "images/AlginatoAsade.jpg"
  },
  {
    id: 5,
    name: "Alginato para impresión Hydrogum",
    description: "Es un material de toma de impresiones dentales de alta precisión, diseñado para obtener modelos detallados de la cavidad oral.",
    price: 115,
    stock: 5,
    category: "Alginatos",
    image: "images/AlginatoHydrogum.jpg"
  },
  {
    id: 6,
    name: "Anestesia Lidocaina new stetic",
    description: "Es una solución anestésica local de tipo amida, utilizada comúnmente en procedimientos odontológicos para proporcionar alivio del dolor.",
    price: 335,
    stock: 10,
    category: "Anestesias",
    image: "images/AnestesiaLidocaina.jpg"
  },
  {
    id: 7,
    name: "Matrices seccionales Tor Kit",
    description: "Es un conjunto de herramientas dentales diseñadas para la reconstrucción de dientes posteriores.",
    price: 75,
    stock: 3,
    category: "Matrices Seccionales",
    image: "images/MatricesSeccionalesTorKit.jpg"
  },
   {
    id: 8,
    name: "Postes de fibra de vidrio",
    description: "Son elementos intrarradiculares utilizados en odontología para proporcionar soporte y retención a las restauraciones dentales, especialmente en dientes que han sufrido una gran pérdida de estructura.",
    price: 170,
    stock: 3,
    category: "Postes de fibra de vidrio",
    image: "images/PostesFibraDeVidrio.jpg"
  },
  {
    id: 9,
    name: "Acido fosfórico Condac 37",
    description: "Es un gel de grabado dental de alta calidad, diseñado para preparar la superficie del esmalte y la dentina antes de la aplicación de materiales adhesivos y restauradores.",
    price: 35,
    stock: 15,
    category: "Acido fosfórico",
    image: "images/AcidoFosforicoCondac.png"
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
      <div class="product-price">Precio: ${product.price.toFixed(2)} Bs.</div>
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
  const phone = "+59172060267";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

searchBox.addEventListener('input', renderProducts);
categorySelect.addEventListener('change', renderProducts);

renderProducts();