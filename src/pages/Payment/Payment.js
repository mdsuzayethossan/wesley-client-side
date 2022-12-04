import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);
const Payment = () => {
  const location = useLocation();
  const product = location.state.product;
  const { name } = product;
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>
        Payment for <span style={{ color: "green" }}>{name}</span>
      </h3>
      <div className="w-96 my-16">
        <Elements stripe={stripePromise}>
          <CheckoutForm product={product} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
