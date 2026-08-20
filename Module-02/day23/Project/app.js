const state = {
    dishes: [],
    cart: JSON.parse(localStorage.getItem('addis_eats_cart')) || [],
    search: "",
    category: "All"
}

const menuContainer = document.getElementById('menu');
const searchInput = document.getElementById('search');
const categoryNav = document.getElementById('category-filters');

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
    return;
  }

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
        <button
          class="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 rounded-lg font-medium transition cursor-pointer">
          Add to Cart
        </button>
      </div>
    </article>
  `).join('');
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

document.addEventListener("DOMContentLoaded", fetchMenu)