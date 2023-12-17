

export const getProductOldPriceRange = (product) => {

  const updatedVariants = [];

  for (let index = 0; index < product?.variants?.length; index++) {
    const variant = product.variants[index];

    if (variant) {
      const matchingColorVariant = updatedVariants.find(
        (v) =>
          v.color.r === variant.color.r &&
          v.color.g === variant.color.g &&
          v.color.b === variant.color.b &&
          v.color.a === variant.color.a
      );

      if (matchingColorVariant) {
        matchingColorVariant.sizes.push({
          size: variant.size,
          oldPrice: variant.oldPrice,
          price: variant.price,
          stock: variant.stock,
          status: variant.status,
          _id: variant?._id,
        });
      } else if (!matchingColorVariant) {
        const newVariant = {
          color: variant?.color,
          image: variant?.image,
          sizes: [
            {
              size: variant.size,
              oldPrice: variant.oldPrice,
              price: variant.price,
              stock: variant.stock,
              status: variant.status,
              _id: variant?._id,
            },
          ],
        };
        updatedVariants.push(newVariant);
      }
    }
  }


  const variants = updatedVariants;




  let highestOldPrice = variants[0]?.sizes[0]?.oldPrice
    ? variants[0]?.sizes[0]?.oldPrice
    : 0;
  let lowestOldPrice = variants[0]?.sizes[0]?.oldPrice
    ? variants[0]?.sizes[0]?.oldPrice
    : 0;

  variants.forEach((variant) => {
    variant.sizes.forEach((size) => {
      const sizePrice = size.oldPrice;
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
