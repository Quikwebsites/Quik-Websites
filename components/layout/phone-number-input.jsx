import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
export default function PhoneNumberInput(props) {
  return (
    <PhoneInput
      forceDialCode={true}
      defaultCountry="gb"
      className="h-12 w-full max-w-[520px] rounded-full border border-gray30 bg-white !text-base font-[450] tracking-[-0.112px] !text-gray60 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-darkGreen placeholder:text-gray40 focus-visible:outline-none disabled:cursor-not-allowed md:text-sm"
      {...props}
    />
  );
}
