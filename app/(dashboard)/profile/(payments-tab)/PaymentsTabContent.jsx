import PaymentHistory from "./PaymentHistory";
import { paymentHistoryColumns } from "./paymentHistoryColumns";
import PaymentMethod from "./PaymentMethod";
import { format } from "date-fns";

export default async function PaymentsTabContent() {
  const paymentMethods = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL +
      "/api/stripe/payment-methods?customerId=cus_RLpFJzolVGpc6l",
  );
  const paymentMethodsData = await paymentMethods.json();

  const paymentHistory = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL +
      "/api/stripe/payment-history?customerId=cus_RLpFJzolVGpc6l",
  );
  const paymentHistoryData = await paymentHistory.json();

  const formattedPaymentHistory = paymentHistoryData.map((item) => ({
    id: item.id,
    transaction: item.description,
    amount: item.amount / 100,
    date: format(Date(item.created), "P"),
    status: item.status,
    account: {
      type: item.payment_method_details.card.brand,
      number: item.payment_method_details.card.last4,
      icon: `/icons/${item.payment_method_details.card.brand}.svg`,
      expires: `${item.payment_method_details.card.exp_year}/${item.payment_method_details.card.exp_month}`,
    },
  }));

  return (
    <div className="mt-11">
      <PaymentMethod paymentMethodsData={paymentMethodsData} />

      <PaymentHistory
        data={formattedPaymentHistory}
        columns={paymentHistoryColumns}
      />
    </div>
  );
}
