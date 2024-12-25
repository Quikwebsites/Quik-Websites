import Link from "next/link";
import { PlusIcon } from "lucide-react";

export default function AddNewWebsite() {
  return (
    <div className="flex h-[353px] w-full max-w-[251px] flex-col items-center justify-center gap-5 rounded-[20px] bg-darkGreen shadow-10px">
      <p className="text-lg font-medium tracking-tight text-lightGreen">
        Add a new site
      </p>

      <Link href={`${process.env.NEXT_PUBLIC_WEBFLOW_URL}/quik-pricing`}>
        <button className="flex h-[35px] w-[91px] items-center justify-center rounded-xl bg-gray300">
          <PlusIcon size={18} />
        </button>
      </Link>
    </div>
  );
}
