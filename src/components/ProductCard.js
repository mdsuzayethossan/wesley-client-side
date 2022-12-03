import React from "react";

const ProductCard = ({ product }) => {
  const { img, price } = product;
  return (
    <div>
      <img src={img} style={{ width: "400px" }} alt="" />
      <p>${price}</p>
      <button>Buy Now</button>
    </div>
  );
};

export default ProductCard;
