export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "USD"
  }).format(price)
}