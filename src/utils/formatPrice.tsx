export function formatPrice( price: number) {
    const formatedPrice = price?.toFixed(2);
    const currency = "€"
    return `${formatedPrice}${currency}`;
}