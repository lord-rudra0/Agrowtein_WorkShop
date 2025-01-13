const url = 'https://fakestoreapi.com/products';
const productList = document.querySelector('.product-list');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total span');
const cart = document.querySelector('.cart');
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const mainContent = document.querySelector('.products')
const footer=document.querySelector('.footer')


let cartList = [];

// Fetch API
fetch(url)
  .then(response => {
    if (!response.ok) throw new Error('Failed to fetch products.');
    return response.json();
  })
  .then(data => {
    products = data;
    displayProducts(data);
    setupProductClick(data);
    setupCartButtons(data);
  })
  .catch(error => {
    productList.innerHTML = `<p class="error">Error: Unable to fetch products. Please try again later.</p>`;
    console.error(error);
  });

// Display Products

function displayProducts(products) {
  const productHTML = products
    .map(
      (product) => `
      <div class="product" data-id="${product.id}">
        <div class="img-container">
          <img src="${product.image}" alt="${product.title}" class="product-img">
        </div>
        <h3>${product.title}</h3>
        <h4>$${product.price}</h4>
        <button class="bag-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    `
    )
    .join('');
  productList.innerHTML = productHTML;
}

// Set up product box click
function setupProductClick(products) {
  const productElements = document.querySelectorAll('.product');
  productElements.forEach((productElement) => {
    productElement.addEventListener('click', (event) => {
      const id = productElement.dataset.id;
      const product = products.find((item) => item.id === parseInt(id));
      if (product && !event.target.classList.contains('bag-btn')) {
        displayDescription(product);
      }
    });
  });
}

//Product Description
function displayDescription(product) {
  mainContent.innerHTML = `
    <div class="product-description" id="product-description">
      <img src="${product.image}" alt="${product.title}" class="product-img">
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <h3>Price: $${product.price}</h3>
      <button class="back-btn" id="back-btn">← Back to Products</button>
    </div>
  `;
  
  const backToListButton = document.querySelector('#back-btn');
  // const productDetailSection = document.querySelector('#product-description');

    backToListButton.addEventListener('click', () => {
      // productDetailSection.style.display = 'none'; 
      // productList.style.display = 'block'; 
      // mainContent.innerHTML = '';
      // displayProducts();
      window.location.reload();
    });
}


// Cart Buttons
function setupCartButtons(products) {
  const buttons = [...document.querySelectorAll('.bag-btn')];
  buttons.forEach((button) => {
    const id = button.dataset.id;
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const product = products.find((item) => item.id === parseInt(id));
      addToCart(product);
      button.textContent = 'In Cart';
      button.disabled = true;
    });
  });
}


// Add Product
function addToCart(product) {
  const existingItem = cartList.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.amount += 1;
  } else {
    cartList.push({ ...product, amount: 1 });
  }
  updateCartUI();
}

//cart update
function updateCartUI() {
  const cartHTML = cartList.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}">
      <div>
        <h4>${item.title}</h4>
        <h5>$${item.price}</h5>
        <span class="remove-item" data-id="${item.id}">Remove</span>
      </div>
      <div>
        <i class="fas fa-chevron-up" data-id="${item.id}"></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas fa-chevron-down" data-id="${item.id}"></i>
      </div>
    </div>
  `).join('');
  cartItemsContainer.innerHTML = cartHTML;

  const total = cartList.reduce((sum, item) => sum + item.price * item.amount, 0);
  cartTotal.textContent = total.toFixed(2);

  //cart number 
  cartBtn.textContent = `Cart (${cartList.length})`;
}

// Cart close and remove
cartItemsContainer.addEventListener('click', event => {
  const id = parseInt(event.target.dataset.id);
  const item = cartList.find(item => item.id === id);
  if (event.target.classList.contains('remove-item')) {
    cartList = cartList.filter(item => item.id !== id);
  } else if (event.target.classList.contains('fa-chevron-up')) {
    item.amount += 1;
  } else if (event.target.classList.contains('fa-chevron-down')) {
    item.amount -= 1;
    if (item.amount === 0) cartList = cartList.filter(item => item.id !== id);
  }
  updateCartUI();
});

// Clear Cart
clearCartBtn.addEventListener('click', () => {
  cartList = [];
  updateCartUI();
});

// Show Cart

cartBtn.addEventListener('click', () => {
    cart.style.display = 'block'; 
    mainContent.style.display = 'none';
    footer.style.display='none';
  });
  
  // Close Cart
  closeCartBtn.addEventListener('click', () => {
    cart.style.display = 'none'; 
    mainContent.style.display = 'block';
  });

  //local storage

  window.addEventListener('DOMContentLoaded', () => {
    const storageCart = JSON.parse(localStorage.getItem('cart'));
    if (storageCart) {
      cartList = storageCart;
      updateCartUI();
    }
  }
  );

  window.addEventListener('beforeunload', () => {
    localStorage.setItem('cart', JSON.stringify(cartList));
  }
  );

  //search 
  const search = document.querySelector('.search');
  search.addEventListener('keyup', () => {
    const searchValue = search.value.toLowerCase();
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchValue));
    displayProducts(filteredProducts);
    setupProductClick(filteredProducts);
    setupCartButtons(filteredProducts);
  });


