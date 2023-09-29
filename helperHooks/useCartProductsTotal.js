export const useCartProductsTotal = (products) => {
  let total = 0;

  for (let index = 0; index < products?.length; index++) {
    total +=
      products[index]?.variant?.price * products[index]?.variant?.quantity;
  }
  return total;
};
