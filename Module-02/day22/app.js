const state = {
  base: "ETB",
  rates: {},
  watchlist: [],
  amount: 100,
  currency: "USD",
};

const API = "https://open.er-api.com/v6/latest/ETB";
const statusEl = document.querySelector("#status");
const statusBox = document.querySelector("#status-box");
const select = document.querySelector("#currency");
const form = document.querySelector("#convert-form");
const amount = document.querySelector("#amount");
const result = document.querySelector("#result");
const watchUl = document.querySelector("#watchlist");

async function loadRates() {
  statusEl.textContent = "Loading rates…";
  if (statusBox) statusBox.classList.remove("hidden");

  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("HTTP " + res.status);

    const data = await res.json();
    state.rates = data.rates || {};

    statusEl.textContent = "";
    if (statusBox) statusBox.classList.add("hidden");

    render();
  } catch (err) {
    statusEl.textContent = "Check your connection.";
    if (statusBox) statusBox.classList.remove("hidden");
    console.error("Fetch error:", err);
  }
}

function render() {
  const codes = Object.keys(state.rates);

  if (codes.length > 0) {
    select.innerHTML = codes
      .map((c) => `<option value="${c}">${c}</option>`)
      .join("");
    select.value = state.currency;
  }

  renderWatchlist();
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const rawVal = amount.value.trim();
  const amt = Number(rawVal);

  const amountRegex = /^\d+(\.\d{1,2})?$/;
  if (isNaN(amt) || amt <= 0 || !amountRegex.test(rawVal)) {
    result.textContent = "Enter a valid positive amount.";
    return;
  }

  state.currency = select.value;
  const rate = state.rates[state.currency];

  if (!rate) {
    result.textContent = "Currency rate is unavailable.";
    return;
  }

  const out = (amt * rate).toFixed(2);
  result.innerHTML = `
    <span class="result-sub">${amt} ETB equals</span>
    <span class="result-main">${out} <span class="result-code">${state.currency}</span></span>
  `;

  const c = select.value;
  if (state.watchlist.includes(c)) return;
  state.watchlist.push(c);
  save();
  renderWatchlist();
});

function renderWatchlist() {
  if (state.watchlist.length === 0) {
    watchUl.innerHTML = '<li class="empty-msg">No currencies in watchlist</li>';
    return;
  }

  watchUl.innerHTML = state.watchlist
    .map((c) => {
      const r = state.rates[c] !== undefined ? state.rates[c] : "N/A";
      return `<li data-c="${c}" class="watchlist-item">
        <div class="watchlist-left">
          <span class="currency-circle">${c.slice(0, 3)}</span>
          <span class="watchlist-rate">1 ETB = ${r} ${c}</span>
        </div>
        <button class="rm btn-icon" aria-label="Delete">
          <svg class="rm" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path class="rm" d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </li>`;
    })
    .join("");
}

watchUl.addEventListener("click", (e) => {
  if (!e.target.closest(".rm")) return;
  const item = e.target.closest("li");
  if (!item) return;

  const c = item.dataset.c;
  state.watchlist = state.watchlist.filter((x) => x !== c);
  save();
  renderWatchlist();
});

const KEY = "birrwatch";
function save() {
  localStorage.setItem(
    KEY,
    JSON.stringify({
      watchlist: state.watchlist,
      currency: state.currency,
    }),
  );
}

function load() {
  const saved = localStorage.getItem(KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(state, parsed);
    } catch (err) {
      console.warn("Corrupted local storage data reset:", err);
      localStorage.removeItem(KEY);
    }
  }
}

async function init() {
  load();
  await loadRates();
  render();
}
init();
