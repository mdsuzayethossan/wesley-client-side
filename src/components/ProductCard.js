import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { img, price, name } = product;
  const navigate = useNavigate();
  return (
    <div>
      <img src={img} style={{ width: "400px" }} alt="" />
      <p>{name}</p>
      <p>${price}</p>
      <button
        onClick={() => navigate("/payment", { state: { product } })}
        className="btn btn-sm btn-primary text-white"
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;
