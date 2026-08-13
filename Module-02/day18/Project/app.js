import { transactions } from "./transaction.js";
import { getCredits, getDebit, getTotal, getReceipt } from "./report.js";

const credit = getCredits(transactions)
const debit = getDebit(transactions)
const creditTotal = getTotal(credit)
const debitTotal = getTotal(debit)
const receipts = getReceipt(transactions)

console.log("------ TeleBirr Transaction Report ------")
console.log("Credit transactions: ", credit)
console.log("Debit transactions: ", debit)
console.log("Total credit: ", creditTotal)
console.log("Total debit: ", debitTotal)
console.log("\n------- Receipt --------")
receipts.forEach((receipt) => {
    console.log(receipt)
})
console.log("\n------- Updating a Transaction --------")
const updatedTransaction = {...transactions[2], amount: 300}
console.log("Updated Transaction: ", updatedTransaction)
console.log("Original Transaction: ", transactions[2])
