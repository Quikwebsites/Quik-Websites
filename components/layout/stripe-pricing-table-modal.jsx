import { X } from "lucide-react";

export default function StripePricingTableModal({ setShowUpgradeModal }) {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-10 bg-black/80">
      <div className="min-h-[380px] min-w-[300px] overflow-auto rounded-2xl bg-white">
        <button
          onClick={() => setShowUpgradeModal(false)}
          className="ml-auto mr-4 mt-4 flex flex-col items-center gap-2"
        >
          <X
            size={28}
            strokeWidth={2.5}
            className="rounded-full bg-black p-1 text-white"
          />
        </button>

        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>

        <stripe-pricing-table
          pricing-table-id="prctbl_1QUsSzLFFDwzFn13JRgX7GyH"
          publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        ></stripe-pricing-table>
      </div>
    </div>
  );
}
