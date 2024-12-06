import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dot, PlusSquare } from "lucide-react";
import Image from "next/image";

export default function PaymentMethod({ paymentMethodsData }) {
  const { paymentMethods, defaultPaymentMethodId } = paymentMethodsData;

  const activeMethod =
    paymentMethods.find((method) => method.id === defaultPaymentMethodId) ||
    paymentMethods[0];

  return (
    <div>
      <p className="mb-2 text-lg font-bold tracking-tight text-gray80">
        Payment method
      </p>

      <RadioGroup
        defaultValue={activeMethod.id}
        className="flex flex-col gap-3 md:flex-row"
      >
        {paymentMethods.map((method) => (
          <Method
            key={method.id}
            data={method}
            isActive={activeMethod.id === method.id}
          />
        ))}

        <NewMethod />
      </RadioGroup>
    </div>
  );
}

function NewMethod() {
  return (
    <button className="flex size-[72px] flex-col items-center justify-center gap-[2px] rounded-xl border-2 pt-2">
      <PlusSquare size={20} color="#739A88" />
      <p className="text-base text-darkGreen">New</p>
    </button>
  );
}

function Method({ data, isActive }) {
  return (
    <div>
      <Label
        htmlFor={data.id}
        className="flex w-[260px] cursor-pointer items-center justify-between rounded-xl border-2 border-gray200 px-4 pb-2 pt-3 text-base font-normal [&:has(button[aria-checked=true])]:border-greenGradientColor2"
      >
        <div className="space-y-2">
          <div className="flex gap-3 pt-1">
            <RadioGroupItem value={data.id} id={data.id} />

            <div className="-mt-1">
              <p className="text-gray900">**** {data.card.last4}</p>

              <div className="flex capitalize text-[#677489]">
                <p>{data.card.display_brand}</p>
                <Dot color="#677489" />
                <p>Edit</p>
              </div>
            </div>
          </div>
        </div>

        <Image
          src={
            data.card.display_brand
              ? `/icons/${data.card.display_brand}.svg`
              : "/icons/ion_card-outline.svg"
          }
          alt={data.card.display_brand + "logo"}
          width={40}
          height={40}
          className="w-[40px] object-contain object-center"
        />
      </Label>

      {isActive && (
        <p className="pl-2 pt-2 text-xs font-light tracking-tight text-gray60">
          Currently active
        </p>
      )}
    </div>
  );
}
