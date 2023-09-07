export const getProductPriceRange = (variants, currencyRate) => {
  let highestPrice = variants[0]?.price ? variants[0]?.price : 0;
  let lowestPrice = variants[0]?.price ? variants[0]?.price : 0;

  variants.forEach((variant) => {
    if (variant.price > highestPrice) {
      highestPrice = (variant.price * currencyRate).toFixed(2);
    }
    if (variant.price < lowestPrice) {
      lowestPrice = (variant.price * currencyRate).toFixed(2);
    }
  });

  return { highestPrice, lowestPrice };
};
