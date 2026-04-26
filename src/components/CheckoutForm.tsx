import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import styles from '../styles/components_CSS/CheckoutForm.module.css'

const CheckoutForm = () => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const { clearCart } = useCart();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsLoading(true);
    setError("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-success`,
      },
    });

    if (error) {
      setError(error.message ?? "Payment Failed");
      setIsLoading(false);
    } else {
      await clearCart();
      navigate("/order-success");
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <PaymentElement />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={isLoading || !stripe}>
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
