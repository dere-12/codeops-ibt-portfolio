// Exercise - 1
function vat(price, rate = 0.15) {
    return price * rate
}

const vatArrow = (price, rate = 0.15) => price * rate

// console.log(vat(1000))
// console.log(vatArrow(1000))



// Exercise - 2
function makeCounter() {
    let count = 0

    return counter = () => {
        count ++
        return count
    }
}

const counter1 = makeCounter()
const counter2 = makeCounter()

// console.log(counter1())
// console.log(counter1())
// console.log(counter1())
// console.log("----------------")
// console.log(counter2())
// console.log(counter2())
// console.log(counter2())



// Exercise - 3
function discountBy(rate) {
    return function(price) {
        return price * (1 - rate)
    }
}

const memberPrice = discountBy(0.10)
const salePrice = discountBy(0.30)

// console.log(memberPrice(1000))
// console.log(salePrice(1000))



// Exercise -4 
function applyToAll(arr, fn) {
    let result = []
    for (const item of arr) {
        result.push(fn(item))
    }

    return result
}

const prices = [200, 1200, 50, 900, 100]
const addVat = (price) => price + price * 0.15

// console.log(applyToAll(prices, addVat))
// console.log(applyToAll(prices, (price) => price + price*0.15))



// Exercise - 5
const cities = ["Addis Ababa", "Hawassa", "Bahir Dar", "Mekelle", "Adama", "..."]

cities.forEach((city, index) => {
    console.log(`${index + 1}. ${city}`)
})