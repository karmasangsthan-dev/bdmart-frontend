export const getProductOldPriceRange = (variants, currencyRate) => {
    let highestOldPrice = variants[0]?.sizes[0]?.oldPrice
      ? variants[0]?.sizes[0]?.oldPrice
      : 0;
    let lowestOldPrice = variants[0]?.sizes[0]?.oldPrice
      ? variants[0]?.sizes[0]?.oldPrice
      : 0;
  
    variants.forEach((variant) => {
      variant.sizes.forEach((size) => {
        const sizePrice = size.oldPrice ;
        if (sizePrice > highestOldPrice) {
            highestOldPrice = sizePrice;
        }
        if (sizePrice < lowestOldPrice) {
            lowestOldPrice = sizePrice;
        }
      });
    });
    return { highestOldPrice, lowestOldPrice };
  };
  