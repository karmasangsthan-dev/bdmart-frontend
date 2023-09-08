export const getProductPriceRange = (variants, currencyRate) => {
  console.log(variants);
  let highestPrice = variants[0]?.sizes[0]?.price
    ? variants[0]?.sizes[0]?.price
    : 0;
  let lowestPrice = variants[0]?.sizes[0]?.price
    ? variants[0]?.sizes[0]?.price
    : 0;

  variants.forEach((variant) => {
    variant.sizes.forEach((size) => {
      const sizePrice = size.price * currencyRate;
      if (sizePrice > highestPrice) {
        highestPrice = sizePrice.toFixed(2);
      }
      if (sizePrice < lowestPrice) {
        lowestPrice = sizePrice.toFixed(2);
      }
    });
  });

  return { highestPrice, lowestPrice };
};
