export const getProductPriceRangeDetails = (variants, currencyRate) => {
  let highestPrice = variants[0]?.sizes[0]?.price
    ? variants[0]?.sizes[0]?.price
    : 0;
  let lowestPrice = variants[0]?.sizes[0]?.price
    ? variants[0]?.sizes[0]?.price
    : 0;

  variants.forEach((variant) => {
    variant.sizes.forEach((size) => {
      const sizePrice = size.price;
      if (sizePrice > highestPrice) {
        highestPrice = sizePrice;
      }
      if (sizePrice < lowestPrice) {
        lowestPrice = sizePrice;
      }
    });
  });
  return { highestPrice, lowestPrice };
};
export const getProductPriceRangeForCard = (variants, currencyRate) => {
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
