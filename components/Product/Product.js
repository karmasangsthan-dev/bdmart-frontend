import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function Product({ item }) {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (event, productId) => {
    setSelectedProduct(productId);
  }
  const handleQunatityIncrement = (id) => {
    toast(id)
  }
  const handleQunatityDecrement = (id) => {
    toast(id)
  }
  return (
    <div className="product-link bestselling-product-container product border p-3 ms-3 mt-3 mb-4 me-3 rounded-3 shadow">
      <picture>
        <Image
          onClick={() => router.push(`/productDetails/${item._id}`)}
          src={item.thumbnail}
          layout="responsive"
          width={1000}
          height={1000}
          alt="img"
        />

      </picture>
      <div className="main-detail">
        <div className="item-name" onClick={() => router.push(`/productDetails/${item._id}`)}>{item.title?.length > 20 ? `${item.title.slice(0, 18)}...` : item.title}</div>
      </div>
      <div className="item-price">{item.price ? item?.price : 30}.00$</div>
      <div className="old-price">
        <del>{item.oldPrice ? item?.oldPrice : 40}.00$</del>
      </div>
      <div className="save-price">{item.savedPrice ? item?.savedPrice : 10}.00$</div>
      <div id="" >
        <button className="cart-btn w-100 " onClick={(event) => handleAddToCart(event, item._id)}>Add to Cart<i className="far plus-ico fa-plus-square text-white"></i></button>
      </div>
    </div>
  );
}
