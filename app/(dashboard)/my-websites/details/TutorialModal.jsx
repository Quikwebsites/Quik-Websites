import { X } from "lucide-react";

export default function TutorialModal({ setShowTutorialModal }) {
  return (
    <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-10 bg-black/80">
      <button
        onClick={() => setShowTutorialModal(false)}
        className="flex flex-col items-center gap-2"
      >
        <X size={64} strokeWidth={3} className="rounded-full bg-white p-3" />
        <p className="text-[13px] font-semibold tracking-widest text-white">
          CLOSE TUTORIAL
        </p>
      </button>

      <iframe
        loading="lazy"
        src="https://www.youtube.com/embed/A_18Yt64GWI"
        title="Client Introduction to Using Markup.io for Website Feedback"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="h-full max-h-[450px] w-[95%] max-w-[748px] rounded-3xl"
      ></iframe>
    </div>
  );
}
