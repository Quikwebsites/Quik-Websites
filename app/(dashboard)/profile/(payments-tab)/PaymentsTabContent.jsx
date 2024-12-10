"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { paymentHistoryColumns } from "./paymentHistoryColumns";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/layout/loading-spinner";
import PaymentMethod from "./PaymentMethod";
import PaymentHistory from "./PaymentHistory";
import AddNewCardModal from "./AddNewCardModal";

export default function PaymentsTabContent() {
  const [showNewCardModal, setShowNewCardModal] = useState(false);
  const [paymentMethodsData, setPaymentMethodsData] = useState();
  const [paymentHistoryData, setPaymentHistoryData] = useState();
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(true);
  const [loadingPaymentHistory, setLoadingPaymentHistory] = useState(true);

  const loading = loadingPaymentMethods || loadingPaymentHistory;

  const { toast } = useToast();

  const getPaymentMethods = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
          "/api/stripe/payment-methods?customerId=cus_Qgjzmn8G7jDp8P",
      );
      const data = await response.json();
      setPaymentMethodsData(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error fetching payment methods",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingPaymentMethods(false);
    }
  };

  const getPaymentHistory = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
          "/api/stripe/payment-history?customerId=cus_Qgjzmn8G7jDp8P",
      );
      const data = await response.json();

      const formattedPaymentHistory = data.map((item) => ({
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

      setPaymentHistoryData(formattedPaymentHistory);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error fetching payment methods",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingPaymentHistory(false);
    }
  };

  useEffect(() => {
    if (showNewCardModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showNewCardModal]);

  useEffect(() => {
    getPaymentMethods();
    getPaymentHistory();
  }, []);

  if (loading) return <LoadingSpinner position="mx-auto mt-60" />;

  return (
    <div className="mt-11">
      <PaymentMethod
        paymentMethodsData={paymentMethodsData}
        setShowNewCardModal={setShowNewCardModal}
      />

      <PaymentHistory
        data={paymentHistoryData}
        columns={paymentHistoryColumns}
      />

      {showNewCardModal && (
        <AddNewCardModal setShowNewCardModal={setShowNewCardModal} />
      )}
    </div>
  );
}
