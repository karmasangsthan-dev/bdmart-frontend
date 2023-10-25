export const getProductPriceRangeDetails = (variants, currencyRate) => {
  console.log({ currencyRate });
  let highestPrice = variants[0]?.sizes[0]?.price
    ? variants[0]?.sizes[0]?.price
    : 0;
  let lowestPrice = variants[0]?.sizes[0]?.price
    ? variants[0]?.sizes[0]?.price
    : 0;

  variants.forEach((variant) => {
    variant.sizes.forEach((size) => {
      const sizePrice = size.price * currencyRate;
      console.log(typeof sizePrice);
      if (sizePrice > highestPrice) {
        highestPrice = Number(sizePrice * currencyRate);
      }
      if (sizePrice < lowestPrice) {
        lowestPrice = Number(sizePrice * currencyRate);
      }
    });
  });
  console.log({ highestPrice, lowestPrice });
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
