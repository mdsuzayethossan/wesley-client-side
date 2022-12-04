import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useState, useEffect, useContext } from "react";
import Loading from "../../components/Loading";
import { AuthContext } from "../../contexts/AuthProvider";

const CheckoutForm = ({ product }) => {
  const { user } = useContext(AuthContext);
  const { price, id } = product;
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
            name: user.displayName,
            email: user?.email,
          },
        },
      });
    if (confirmError) {
      setCardErr(confirmError.message);
      setLoading(false);
      return;
    }
    console.log(paymentIntent);
    setSuccess("Congtats! your payment completed successfully");
    setTransactionId(paymentIntent.id);
    setLoading(false);
    // if (paymentIntent.status === "succeeded") {
    //   const payment = {
    //     productId: id,
    //     email: user?.email,
    //     price,
    //     transactionId: paymentIntent.id,
    //   };
    //   fetch(`${process.env.REACT_APP_domain}/payment`, {
    //     method: "POST",
    //     body: JSON.stringify(payment),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.insertedId) {
    //         setLoading(false);
    //         setSuccess("Congtats! your payment completed successfully");
    //         setTransactionId(paymentIntent.id);
    //       }
    //     });
    // }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ width: "450px", margin: "0 auto" }}
      >
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
      <div style={{ width: "650px", margin: "0 auto", textAlign: "center" }}>
        {" "}
        {cardErr && <h3 style={{ color: "red" }}>{cardErr}</h3>}
        {success && (
          <h3 style={{ color: "green" }}>
            {success}
            <br />
            <span>setTransactionId: {transactionId}</span>
          </h3>
        )}
      </div>
    </>
  );
};

export default CheckoutForm;
