import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dot, PlusSquare } from "lucide-react";
import Image from "next/image";

const paymentsMethods = [
  {
    type: "Visa",
    number: "**** 3304",
    icon: "/icons/visa.svg",
    isActive: true,
  },
  {
    type: "Mastercard",
    number: "**** 4029",
    icon: "/icons/mastercard.svg",
    isActive: false,
  },
];

const generateID = (idFrom) => {
  return idFrom.toLowerCase().split(" ").join("-");
};

export default function PaymentMethod() {
  const activeMethod =
    paymentsMethods.find((method) => method.isActive) || paymentsMethods[0];

  return (
    <div>
      <p className="mb-2 text-lg font-bold tracking-tight text-gray80">
        Payment method
      </p>

      <RadioGroup
        defaultValue={generateID(activeMethod.type + activeMethod.number)}
        className="flex flex-col gap-3 md:flex-row"
      >
        {paymentsMethods.map((method) => (
          <Method data={method} />
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

function Method({ data }) {
  const { number, type, icon, isActive } = data;

  return (
    <div>
      <Label
        htmlFor={generateID(type + number)}
        className="flex w-[260px] cursor-pointer items-center justify-between rounded-xl border-2 border-gray200 px-4 pb-2 pt-3 text-base font-normal [&:has(button[aria-checked=true])]:border-greenGradientColor2"
      >
        <div className="space-y-2">
          <div className="flex gap-3 pt-1">
            <RadioGroupItem
              value={generateID(type + number)}
              id={generateID(type + number)}
            />

            <div className="-mt-1">
              <p className="text-gray900">{number}</p>

              <div className="flex text-[#677489]">
                <p>{type}</p>
                <Dot color="#677489" />
                <p>Edit</p>
              </div>
            </div>
          </div>
        </div>

        <Image
          src={icon}
          alt={type + "logo"}
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
