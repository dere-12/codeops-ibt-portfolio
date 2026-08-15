let items = [];
const form = document.querySelector("#form");
const inputItem = document.querySelector("#item");
const inputPrice = document.querySelector("#price");
const itemsContainer = document.querySelector("#items-container");

function count() {
  const countElement = document.querySelector(".item-count");
  if (items.length === 0) {
    countElement.textContent = `Total Price: ETB ${items.length}`;
  } else {
    const totalPrice = items
      .map((item) => {
        return item.price;
      })
      .reduce((acc, current) => {
        return acc + current;
      }, 0);

    countElement.textContent = `Total Price: ETB ${totalPrice}`;
  }
}

count();

function handleSubmit(e) {
  e.preventDefault();

  const inputItemValue = inputItem.value.trim();
  const inputPriceValue = Number(inputPrice.value.trim());

  if (inputItemValue !== "" && inputPriceValue > 0) {
    const itemDeleteBtn = document.createElement("button");
    itemDeleteBtn.textContent = "Delete";
    itemDeleteBtn.classList.add("del-btn");
    itemDeleteBtn.dataset.price = inputPriceValue

    const liRow = document.createElement("li");
    liRow.textContent = inputItemValue;

    liRow.append(itemDeleteBtn);
    itemsContainer.append(liRow);

    const newItem = {
      item: inputItemValue,
      price: inputPriceValue,
    };

    items.push(newItem);
    count();
    form.reset();
  }
}

function handleDelete(e) {
    if (e.target.classList.contains("del-btn")) {
        const currentPrice = e.target.dataset.price
        
        items = items.filter((item) => {
            return item.price != currentPrice
        })

        e.target.parentElement.remove()
        count()
    }
}

form.addEventListener("submit", handleSubmit);
itemsContainer.addEventListener("click", handleDelete)