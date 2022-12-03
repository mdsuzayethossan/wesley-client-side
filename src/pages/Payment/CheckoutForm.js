import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading";

const CheckoutForm = ({ OrderInfo }) => {
  const { _id, price, userName, email, productId } = OrderInfo;
  const [cardErr, setCardErr] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_domain}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      setLoading(false);
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setLoading(false);
      setCardErr(error.message);
    } else {
      setCardErr("");
    }
    setSuccess("");
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email: email,
          },
        },
      });
    if (confirmError) {
      setCardErr(confirmError.message);
      setLoading(false);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const payment = {
        orderId: _id,
        productId,
        email,
        price,
        transactionId: paymentIntent.id,
      };
      fetch(`${process.env.REACT_APP_domain}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            toast.success("Congtats! your payment completed successfully");
            setLoading(false);
            setSuccess("Congtats! your payment completed successfully");
            setTransactionId(paymentIntent.id);
          }
        });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {(loading && <Loading></Loading>) || (
          <button
            className="btn btn-sm btn-primary text-white mt-8"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
        )}
      </form>
      {cardErr && (
        <div className="alert alert-error shadow-lg mt-5">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{cardErr}</span>
          </div>
        </div>
      )}
      {success && (
        <>
          <div className="alert alert-success shadow-lg mt-5">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{success}</span>
            </div>
          </div>
          <p>
            Your transactionId{" "}
            <span className="font-bold">{transactionId}</span>
          </p>
        </>
      )}
    </>
  );
};

export default CheckoutForm;
