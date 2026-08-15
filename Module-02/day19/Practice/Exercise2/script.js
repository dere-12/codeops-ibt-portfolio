// Exercise - 1
const h1Element = document.querySelector("h1")
h1Element.textContent = "Hi There!"
h1Element.classList.toggle("green")



// Exercise - 2
const cities = ["Addis Ababa", "Hawassa", "Bahir Dar"]
const citiesUl = document.getElementById("cities")

cities.forEach((city) => {
   const cityRow = document.createElement("li")
   cityRow.textContent = city

   citiesUl.append(cityRow)
})



// Exercise - 3
const btn = document.querySelector(".btn")
const btnContainer = document.querySelector("#btn-container")

btn.addEventListener("click", (e) => {
    console.log(e.target)
})

btnContainer.addEventListener("click", (e) => {
    console.log(e.target)
})



// Exercise - 4
const itemsContainer = document.querySelector("#items-cont")

itemsContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("delete")) {
        e.target.parentElement.remove()
    }
})



// Exercise - 5
const form = document.querySelector("#form")
const nameListContainer = document.querySelector("#formItems")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const nameList = document.createElement("li")
    const name = document.querySelector("#name").value.trim()

    nameList.textContent = name
    nameListContainer.append(nameList)
    form.reset()
})