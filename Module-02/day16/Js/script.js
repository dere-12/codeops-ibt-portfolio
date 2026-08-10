const bill = Number(prompt("Enter bill"));
const partySize = Number(prompt("Enter partysize"));

let tip = null;

if (bill > 300) {
  tip = bill * 0.1;
} else {
  tip = bill * 0.05;
}

const total = bill + tip;

const perPerson = total / partySize;

console.log(
  `Total bill amount = ETB ${total} and per person amount = ETB ${perPerson}`,
);

const paymentMethod = "CBE";
let serviceFee;

switch (paymentMethod) {
  case "CBE":
    serviceFee = total * 0.02;
    console.log(`${paymentMethod} service Fee = ETB ${serviceFee}.`);
    break;

  case "Tele Birr":
    serviceFee = total * 0.03;
    console.log(`${paymentMethod} service Fee = ETB ${serviceFee}.`);
    break;

  default:
    console.log("Payment method not listed.");
}
