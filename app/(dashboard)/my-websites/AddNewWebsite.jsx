import { PlusIcon } from "lucide-react";

export default function AddNewWebsite() {
  return (
    <div className="shadow-10px flex h-[353px] w-full max-w-[251px] flex-col items-center justify-center gap-5 rounded-[20px] bg-darkGreen">
      <p className="text-lg font-medium tracking-tight text-lightGreen">
        Add a new site
      </p>

      <button className="flex h-[35px] w-[91px] items-center justify-center rounded-xl bg-gray300">
        <PlusIcon size={18} />
      </button>
    </div>
  );
}
