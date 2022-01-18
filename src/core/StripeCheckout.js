import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

// this component receives products, setReload method, and reload
const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  // method for calculating final amount of cart
  const getFinalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });

    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("STATUS: ", status);
        // cartEmpty();
      })
      .catch((err) => console.log(err));
  };

  // conditional rendering of Pay with strip button and signin
  //
  const showStripeButton = () => {
    return isAuthenticated() ? (
      // show if signin
      <StripeCheckoutButton
        stripeKey="pk_test_51KIuCOSJ3giIz90xawRu1uaKXxJK3tOfoMBQLKxGXJbUEKLmjYjPwD26NJumcWSdLSZgNhdDg1B4tU24HoIvzRcK00seaepSHD"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy t-shirts"
        // shippingAddress
        // billingAddress
      >
        <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      // show if not signedin
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
