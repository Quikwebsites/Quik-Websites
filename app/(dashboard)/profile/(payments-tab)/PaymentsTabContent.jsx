import PaymentHistory from "./PaymentHistory";
import { paymentHistoryColumns } from "./paymentHistoryColumns";
import PaymentMethod from "./PaymentMethod";
import { dummyPaymentsHistory } from "./dummyPaymentsHistory";

export default async function PaymentsTabContent() {
  const paymentMethods = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL +
      "/api/stripe/payment-methods?customerId=cus_RLpFJzolVGpc6l",
  );
  const paymentMethodsData = await paymentMethods.json();

  return (
    <div className="mt-11">
      <PaymentMethod paymentMethodsData={paymentMethodsData} />

      <PaymentHistory
        data={dummyPaymentsHistory}
        columns={paymentHistoryColumns}
      />
    </div>
  );
}
