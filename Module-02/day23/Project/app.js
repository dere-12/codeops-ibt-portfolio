const state = {
    dishes: [],
    cart: [],
    search: "",
    category: "All"
}

const menuContainer = document.getElementById('menu');
const searchInput = document.getElementById('search');
const categoryNav = document.getElementById('category-filters');
const cartItemsContainer = document.getElementById('cart-items'); 
const cartTotalElement = document.getElementById('cart-total'); 
const cartBadgeElement = document.getElementById('cart-badge');
const checkoutForm = document.getElementById('checkout-form'); 
const formErrorElement = document.getElementById('form-error');
const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;

async function fetchMenu() {
  try {
    const response = await fetch('data/menu.json');
    if (!response.ok) throw new Error('HTTP ' + response.status);
    state.dishes = await response.json();
    render();
  } catch (error) {
    console.error('Error fetching menu:', error);
    menuContainer.innerHTML = `<p class="text-red-500 col-span-full font-medium text-center py-4">Could not load menu items.</p>`;
  }
}

function render() {
  const filteredDishes = state.dishes.filter(dish => {
    const matchesCategory = state.category === 'All' || dish.category === state.category;
    const matchesSearch = dish.name.toLowerCase().includes(state.search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredDishes.length === 0) {
    menuContainer.innerHTML = `<p class="text-gray-500 col-span-full text-center py-8">No dishes found matching your criteria.</p>`;
  } else {

  menuContainer.innerHTML = filteredDishes.map(dish => `
    <article class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
      <div>
        <img src="${dish.image}" alt="${dish.name}" class="w-full h-48 object-cover bg-gray-200" />
        <div class="p-4 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs bg-amber-100 text-amber-800 font-semibold px-2.5 py-0.5 rounded-full">${dish.category}</span>
            ${dish.spicy 
              ? `<span class="text-xs bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-full">🌶️ Spicy</span>` 
              : `<span class="text-xs bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-full">Mild</span>`}
          </div>
          <h3 class="text-lg font-bold text-gray-900">${dish.name}</h3>
          <p class="text-emerald-700 font-bold text-base">${dish.price} ETB</p>
        </div>
      </div>

      <div class="p-4 pt-0">
        <button onclick="addToCart(${dish.id})"
          class="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 rounded-lg font-medium transition cursor-pointer">
          Add to Cart
        </button>
      </div>
    </article>
  `).join('');
  }

  renderCart()
}

function addToCart(dishId) {
  const existingItem = state.cart.find(item => item.id === dishId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const dish = state.dishes.find(d => d.id === dishId);
    if (dish) {
      state.cart.push({ ...dish, quantity: 1 });
    }
  }

  saveCart();
  render();
}

function removeFromCart(dishId) {
  state.cart = state.cart.filter(item => item.id !== dishId);
  saveCart();
  render();
}

function updateQuantity(dishId, change) { 
  const item = state.cart.find(item => item.id === dishId); 
  if (!item) return; 
  
  item.quantity += change; 
  if (item.quantity <= 0) { 
    removeFromCart(dishId); 
    return; 
  } 
  
  saveCart(); 
  render(); 
} 

function saveCart() {
  localStorage.setItem('addis_eats_cart', JSON.stringify(state.cart));
}

function loadCart() {
    const loadedCart = localStorage.getItem('addis_eats_cart')

    if (loadedCart) {
        state.cart = JSON.parse(loadedCart)
    }
}

function renderCart() { 
  if (state.cart.length === 0) { 
    cartItemsContainer.innerHTML = `<p class="text-gray-400 text-sm text-center py-4">Your cart is empty.</p>`; 
    cartTotalElement.textContent = '0 ETB'; 
    cartBadgeElement.textContent = '0'; 
    return; 
  }

  cartItemsContainer.innerHTML = state.cart.map(item => ` 
    <div class="flex items-center justify-between border-b border-gray-100 pb-2"> 
      <div> 
        <p class="font-semibold text-sm text-gray-800">${item.name}</p> 
        <p class="text-xs text-gray-500">${item.price} ETB</p> 
      </div> 
      <div class="flex items-center gap-2"> 
        <button onclick="updateQuantity(${item.id}, -1)" class="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded font-bold text-sm cursor-pointer">-</button> 
        <span class="text-sm font-semibold">${item.quantity}</span> 
        <button onclick="updateQuantity(${item.id}, 1)" class="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded font-bold text-sm cursor-pointer">+</button> 
        <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 text-sm ml-1 cursor-pointer" aria-label="Remove item">🗑️</button> 
      </div> 
    </div> 
  `).join(''); 

  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0); 
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0); 

  cartTotalElement.textContent = `${total} ETB`; 
  cartBadgeElement.textContent = totalItems; 
} 

function validateOrderData({ name, phone }) { 
  if (!name.trim()) return "Please enter your name."; 

  if (!PHONE_REGEX.test(phone.trim())) return "Enter a valid Ethiopian phone number (09xxxxxxxx or +2519xxxxxxxx)."; 

  if (state.cart.length === 0) return "Your cart is empty. Add dishes before ordering."; 

  return "";
} 

function placeOrder(orderData) {
   const totalETB = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  state.cart = []; 
  saveCart(); 
  render(); 

  alert(`Order Placed Successfully!\n\nThank you, ${orderData.name}.\nTotal: ${totalETB} ETB \nDelivering to: ${orderData.area} \nWe will contact you via TeleBirr at ${orderData.phone}.`); 
}

searchInput.addEventListener('input', (e) => {
  state.search = e.target.value.trim();
  render();
});

categoryNav.addEventListener('click', (e) => {
  const button = e.target.closest('.filter-btn');
  if (!button) return;

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.className = 'filter-btn bg-gray-200 text-gray-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-300';
  });
  button.className = 'filter-btn bg-emerald-700 text-white px-4 py-1.5 rounded-full text-sm font-medium';

  state.category = button.dataset.category;
  render();
});


checkoutForm.addEventListener('submit', (e) => { 
  e.preventDefault(); 

  const data = { 
    name: document.getElementById('name').value, 
    phone: document.getElementById('phone').value, 
    area: document.getElementById('area').value 
  }; 

  const errorMessage = validateOrderData(data); 
  formErrorElement.textContent = errorMessage;  

  if (errorMessage) return; 

  placeOrder(data); 
  checkoutForm.reset();
});

async function init() {
    loadCart()
    await fetchMenu()
}

// init() 