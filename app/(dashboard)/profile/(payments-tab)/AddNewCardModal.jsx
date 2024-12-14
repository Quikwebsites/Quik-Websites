"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useElements,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  AddressElement,
  useStripe,
} from "@stripe/react-stripe-js";
import { Check, X } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingSpinner from "@/components/layout/loading-spinner";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

// Address element styles
const appearance = {
  theme: "flat",
  variables: {
    colorPrimary: "#16240d",
    colorBackground: "#ffffff",
    colorText: "#16240d",
    fontSizeBase: "16px",
    borderRadius: "16px",
    fontFamily: "futura PT, sans-serif",
    fontWeightBold: "500",
  },
  rules: {
    ".Input": {
      border: "1px solid #e2e8f0",
      borderRadius: "16px",
      padding: "16px",
    },
    ".Label": {
      color: "#16240d",
      fontWeight: "500",
      marginBottom: "8px",
    },
    ".Input:focus": {
      boxShadow: "none",
      borderColor: "#e2e8f0",
    },
    ".Input::placeholder": {
      color: "#94a3b8",
    },
  },
};

// Card number, cvv,
const inputStyle = {
  base: {
    fontSize: "16px",
    colorPrimary: "#16240d",

    color: "#16240d",
    "::placeholder": {
      color: "#94a3b8",
    },

    fontSize: "16px",
    color: "#16240d",
    fontWeight: "400",
    fontFamily: "futura PT, sans-serif",
    "::placeholder": {
      color: "#94a3b8",
    },
  },
  invalid: {
    color: "#f43f5e",
  },
};

export default function AddNewCardModal({ setShowNewCardModal }) {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-10 bg-black/30 backdrop-blur-sm">
      <div className="relative flex max-h-[94%] w-full max-w-[656px] flex-col overflow-auto rounded-2xl bg-white px-8 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Check
              size={24}
              strokeWidth={3}
              className="rounded-full bg-gradient-green2 p-1 text-white"
            />
            <p className="text-base font-medium">Add new card</p>
          </div>

          <button
            onClick={() => setShowNewCardModal(false)}
            className="flex flex-col items-center gap-2"
          >
            <X
              size={28}
              strokeWidth={2.5}
              className="rounded-full bg-black p-1 text-white"
            />
          </button>
        </div>

        <Elements stripe={stripePromise} options={{ appearance }}>
          <AddNewCardForm />
        </Elements>
      </div>
    </div>
  );
}

// Add a new card form
function AddNewCardForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [defaultCard, setDefaultCard] = useState(false);
  const [addressElementData, setAddressElementData] = useState();
  const { currentUser } = useAuthStore();

  const stripe = useStripe();
  const elements = useElements();

  // Handle add card
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      // create a card setup intent to get client_secret
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/card-setup-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customerId: currentUser?.customerId }),
        },
      );
      const { client_secret } = await response.json();

      if (!client_secret)
        throw new Error({ message: "Failed to create setup intent." });

      // Add new card with billing_details
      const { setupIntent, error: cardSetupError } =
        await stripe.confirmCardSetup(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: addressElementData,
          },
        });

      if (cardSetupError) throw new Error(cardSetupError.message);

      // set as default card if checkbox is checked
      if (defaultCard) {
        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/set-default-card`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customerId: currentUser?.customerId,
              paymentMethodId: setupIntent.payment_method,
            }),
          },
        );
      }

      setError(null);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (success) window.location.reload();
    }, 500);

    return () => clearTimeout(timeout);
  }, [success]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Card Number, CVV & Expiry date */}
        <div className="mb-4 flex flex-col gap-3 [&_.inpG]:w-full [&_.inp]:mt-1 [&_.inp]:rounded-2xl [&_.inp]:border [&_.inp]:border-gray20 [&_.inp]:p-4 [&_label]:text-[14.88px] [&_label]:font-[450] [&_label]:text-darkGreen">
          <div className="inpG">
            <label htmlFor="cardnumber">Card number</label>

            <CardNumberElement
              options={{
                iconStyle: "solid",
                showIcon: true,
                style: inputStyle,
              }}
              className="inp"
            />
          </div>

          <div className="flex gap-3">
            <div className="inpG">
              <label htmlFor="cvv">CVC</label>

              <CardCvcElement
                className="inp"
                options={{ showIcon: true, style: inputStyle }}
              />
            </div>

            <div className="inpG">
              <label htmlFor="exp-date">Expiry date</label>

              <CardExpiryElement
                className="inp"
                options={{ style: inputStyle }}
              />
            </div>
          </div>
        </div>

        {/* Address element with zip code */}
        <AddressElement
          onChange={(e) => setAddressElementData(e.value)}
          options={{
            mode: "billing",
            display: { name: "full" },
            // fields: { phone: "always" },
          }}
        />

        <div className="mt-6 flex items-center justify-between">
          <Checkbox
            id="notifications"
            title="Set as default"
            checked={defaultCard}
            onCheckedChange={() => setDefaultCard(!defaultCard)}
            className="rounded-md data-[state=checked]:border-black data-[state=checked]:bg-black"
          />

          <Button
            type="submit"
            variant="secondary"
            size="sm"
            disabled={!stripe || !elements}
            className="text-sm font-bold"
          >
            Add Card <Check size={20} />
          </Button>
        </div>

        {error && (
          <p className="text-lg font-[450] text-destructive50">{error}</p>
        )}
        {success && (
          <p className="text-lg font-[450] text-success50">
            Card added successfully
          </p>
        )}
      </form>

      {loading && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/60">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}
