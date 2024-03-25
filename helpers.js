function calculateDiscount(price, discount){
        const fixedDiscount = discount ? Math.min(100, discount): 0 ? Math.max(0, discount) : 0
        return (price - ((price * fixedDiscount) / 100 )) * 100
           
}

module.exports = {
    calculateDiscount
}