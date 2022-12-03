import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);
const Payment = () => {
  const OrderInfo = useLoaderData();
  const { name } = OrderInfo;
  return (
    <div>
      <h3 className="text-3xl font-semibold">
        Payment for <span className="text-primary">{name}</span>
      </h3>
      <div className="w-96 my-16">
        <Elements stripe={stripePromise}>
          <CheckoutForm OrderInfo={OrderInfo} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
