import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "../hooks/useCart";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const { total } = useCart();

  const { mutate: createPaymentIntent, data: paymentData } = useMutation({
    mutationFn: async (amount: number) => {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      return response.json();
    },
  });

  useEffect(() => {
    if (total > 0) {
      createPaymentIntent(total);
    }
  }, [total]);

  const clientSecret = paymentData?.clientSecret;

  if (!clientSecret)
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>Loading...</p>
      </div>
    );

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
