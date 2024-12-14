import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuthStore } from "@/lib/store";
import { Dot, PlusSquare } from "lucide-react";
import Image from "next/image";

export default function PaymentMethod({
  paymentMethodsData,
  setShowNewCardModal,
  setLoadingPaymentMethods,
}) {
  const { paymentMethods, defaultPaymentMethodId } = paymentMethodsData;
  const [checkedId, setCheckedId] = useState();

  const activeMethod = paymentMethods?.find(
    (method) => method.id === defaultPaymentMethodId,
  );

  return (
    <div>
      <p className="mb-2 text-lg font-bold tracking-tight text-gray80">
        Payment method
      </p>

      <RadioGroup
        defaultValue={activeMethod?.id}
        onValueChange={(e) => setCheckedId(e)}
        className="flex flex-col flex-wrap gap-3 md:flex-row"
      >
        {paymentMethods &&
          paymentMethods.map((method) => (
            <Method
              key={method.id}
              data={method}
              isActive={activeMethod?.id === method.id}
              isChecked={checkedId === method.id}
              setLoadingPaymentMethods={setLoadingPaymentMethods}
            />
          ))}

        <NewMethod setShowNewCardModal={setShowNewCardModal} />
      </RadioGroup>
    </div>
  );
}

function NewMethod({ setShowNewCardModal }) {
  return (
    <button
      onClick={() => setShowNewCardModal(true)}
      className="flex w-full flex-col items-center justify-center gap-[2px] rounded-xl border-2 pt-2 md:size-[72px]"
    >
      <PlusSquare size={20} color="#739A88" />
      <p className="text-base text-darkGreen">New</p>
    </button>
  );
}

function Method({ data, isActive, isChecked, setLoadingPaymentMethods }) {
  const { currentUser } = useAuthStore();

  const setActiveCard = async () => {
    setLoadingPaymentMethods(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/set-default-card`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId: currentUser?.customerId,
            paymentMethodId: data.id,
          }),
        },
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
      setLoadingPaymentMethods(false);
    }
  };

  return (
    <div>
      <Label
        htmlFor={data.id}
        className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-gray200 px-4 pb-2 pt-3 text-base font-normal md:w-[260px] [&:has(button[aria-checked=true])]:border-greenGradientColor2"
      >
        <div className="space-y-2">
          <div className="flex gap-3 pt-1">
            <RadioGroupItem value={data.id} id={data.id} />

            <div className="-mt-1">
              <p className="text-gray900">**** {data.card.last4}</p>

              <div className="flex capitalize text-[#677489]">
                <p className="max-w-[100px] truncate">
                  {data.card.display_brand.split("_").join(" ")}
                </p>
                {/* <Dot color="#677489" /> */}
                {/* <p>Edit</p> */}
              </div>
            </div>
          </div>
        </div>

        <Image
          src={`/icons/${data.card.display_brand}.svg`}
          alt={data.card.display_brand + "logo"}
          width={40}
          height={40}
          onError={(e) => (e.target.src = "/icons/ion_card-outline.svg")}
          className="w-[40px] object-contain object-center"
        />
      </Label>

      {isActive && (
        <p className="pl-2 pt-2 text-xs font-light tracking-tight text-gray60">
          Currently active
        </p>
      )}

      {isChecked && !isActive && (
        <button
          onClick={setActiveCard}
          className="-mt-[4px] pl-2 pt-2 text-xs font-light tracking-tight text-black underline"
        >
          Make Active
        </button>
      )}
    </div>
  );
}
