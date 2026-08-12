// TODO: Hold items in an array (this is your single source of truth)

let items = [];

// TODO: Select necessary DOM elements (form, input, list, count)

const form = document.querySelector("#add-form");
const input = document.querySelector("#name");
const list = document.querySelector("#list");
const count = document.querySelector("#count");

// TODO: Write a render() function to rebuild the list from the array

function render() {
  list.innerHTML = "";

  items.forEach((item) => {
    const row = document.createElement("li");
    row.dataset.id = item.id;

    const name = document.createElement("span");
    name.textContent = item.name;

    if (item.done) {
      name.classList.add("done");
    }

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "del";
    removeButton.textContent = "Remove";

    row.appendChild(name);
    row.appendChild(removeButton);
    list.appendChild(row);
  });

  count.textContent = `${items.length} ${
    items.length === 1 ? "item" : "items"
  }`;
}

// TODO: Handle form submission

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = input.value.trim();

  if (!name) {
    input.focus();
    return;
  }

  items.push({
    id: Date.now(),
    name,
    done: false,
  });

  input.value = "";
  input.focus();
  render();
});

// TODO: Set up event delegation on the #list

list.addEventListener("click", (e) => {
  const row = e.target.closest("li");

  if (!row) {
    return;
  }

  const id = Number(row.dataset.id);

  if (e.target.closest(".del")) {
    items = items.filter((item) => item.id !== id);
  } else {
    const item = items.find((item) => item.id === id);

    if (item) {
      item.done = !item.done;
    }
  }

  render();
});

render();
