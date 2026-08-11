function createLoyalityPoints(earnRule) {
    let points = 0 

    function earn(amount) {
        const earnedPoints = earnRule(amount)
        points += earnedPoints
    }

    function redeem(amount) {
        if (amount > points) {
            return false
        }

        points -= amount
        return true
    }

    function balance() {
        return points
    }

    return {
        earn,
        redeem, 
        balance
    }
}

function standardEarnRule(amount) {
    return Math.floor(amount / 10)
}

function holidayEarnRule(amount) {
    return Math.floor(amount / 10) * 2
}

// Test
const standardLoyalityPoints = createLoyalityPoints(standardEarnRule)
standardLoyalityPoints.earn(355)
console.log(standardLoyalityPoints.balance())
standardLoyalityPoints.redeem(10)
console.log(standardLoyalityPoints.balance())

console.log("_______________________")
const holidayLoyalityPoints = createLoyalityPoints(holidayEarnRule)
holidayLoyalityPoints.earn(800)
console.log(holidayLoyalityPoints.balance())
holidayLoyalityPoints.redeem(60)
console.log(holidayLoyalityPoints.balance())
