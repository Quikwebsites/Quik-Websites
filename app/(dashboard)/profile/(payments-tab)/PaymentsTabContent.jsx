import PaymentHistory from "./PaymentHistory";
import { paymentHistoryColumns } from "./paymentHistoryColumns";
import PaymentMethod from "./PaymentMethod";
import { dummyPaymentsHistory } from "./dummyPaymentsHistory";

export default function PaymentsTabContent() {
  return (
    <div className="mt-11">
      <PaymentMethod />

      <PaymentHistory
        data={dummyPaymentsHistory}
        columns={paymentHistoryColumns}
      />
    </div>
  );
}
