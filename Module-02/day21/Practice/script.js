// Exercise - 1
const theme = document.querySelector("#theme");
const saved = localStorage.getItem("theme");

if (saved) {
  theme.value = saved;
  console.log("Theme from localStorage: ", saved);
}

theme.addEventListener("change", () => {
  localStorage.setItem("theme", theme.value);
  console.log("Theme saved to localStorage: ", theme.value);
});



// Exercise - 2
function save(items) {
  localStorage.setItem("items", JSON.stringify(items));
}

function load() {
  const saved = localStorage.getItem("items");

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    return [];
  }
}

// Test
// const items = ["Shiro", "Doro Wat", "Injera"];
// save(items);
// console.log(load());



// Exercise 3 - 6
const form = document.querySelector("#signup");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const error = document.querySelector("#error");
const count = document.querySelector("#count");
const ethiopianPhone = /^(?:\+251|0)9\d{8}$/;

function loadSignups() {
  const saved = localStorage.getItem("signups");

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    return [];
  }
}

function saveSignups(signups) {
  localStorage.setItem("signups", JSON.stringify(signups));
}

function showCount() {
  const signups = loadSignups();

  count.textContent = `${signups.length} people have signed up.`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name) {
    error.textContent = "Please enter your name.";
    return;
  }

  if (name.length < 2) {
    error.textContent = "Name is too short.";
    return;
  }

  if (!phone) {
    error.textContent = "Phone is required.";
    return;
  }

  if (!ethiopianPhone.test(phone)) {
    error.textContent = "Enter a valid Ethiopian phone number.";
    return;
  }

  const signups = loadSignups();
  signups.push({
    name: name,
    phone: phone,
  });

  saveSignups(signups);
  form.reset();
  error.textContent = "";
  showCount();
});

showCount();