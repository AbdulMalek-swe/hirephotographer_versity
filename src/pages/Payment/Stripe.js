 
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
 
 
import React, { useEffect, useState } from "react";
 
import axios from "apiService/axios";
import CheckoutForm from "./Checkoute";
import { useParams } from "react-router-dom";
 
export default   function Stripe() {
  const [paymentIntent, setPaymentIntent] = useState(null);
  const {id} = useParams()
  useEffect(() => {
    axios
      .post(`/payment`, { payment_type: "subscription",id:id })
      .then((response) => {
        console.log(response,'please give me the error');
        //  console.log("payment intent data",response?.data);
        setPaymentIntent(response?.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const stripePromise = loadStripe(paymentIntent?.publish_key);

  const appearance = {
    theme: "light",
    labels: "floating",
  };

  const options = {
    clientSecret: paymentIntent?.client_secret,
    appearance,
  };
  
  
  // console.log(d);
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={paymentIntent?.amount} />
    </Elements>
  );
}