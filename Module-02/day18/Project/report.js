function getCredits(transactions) {
    return transactions.filter((transaction) => {
        return transaction.type === "credit"
    })
}

function getDebit(transactions) {
    return transactions.filter((transaction) => {
        return transaction.type === "debit"
    })
}

function getTotal(transactions) {
    return transactions.reduce((acc, current) => {
        return acc + current.amount
    }, 0)
}

function getReceipt(transactions) {
    return transactions.map(({customer, amount}) => {
        return `Receipt: ${customer} paid ETB ${amount}.`
    })
}

export {getCredits, getDebit, getTotal, getReceipt}