function calculateDiscount(price: number, discount: number): number{
    const fixedDiscount = discount ? Math.min(100, discount): 0 ? Math.max(0, discount) : 0
    return (price - ((price * fixedDiscount) / 100 )) * 100
       
}

export default calculateDiscount