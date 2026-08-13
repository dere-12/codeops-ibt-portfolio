// Exercise - 1

const prices = [500, 100, 800, 1200, 300, 1500];

const priceWithVat = prices.map((price) => {
  return price = price + price * 0.15;
});

const under1000 = priceWithVat.filter((u) => {
    return u < 1000
})

const total = under1000.reduce((acc, curr) => {
    return acc + curr 
}, 0)

// console.log(priceWithVat)
// console.log(under1000);
// console.log(total);



// Exercise - 2
const customer = {
    name: "Abel",
    city: "Addis Ababa",
    balance: 1000
}

// for (const [key, value] of Object.entries(customer)) {
//     console.log(`${key}: ${value}`)
// }



// Exercise - 3
const {name, city} = customer

function greet({name}) {
    console.log(`Hello, ${name}`)
}

// console.log(name)
// console.log(city);
// greet(customer)



// Exercise - 4
const updatedCustomer = {...customer, city: "Hawassa", phone: 12345}
// console.log(updatedCustomer)
// console.log(customer)