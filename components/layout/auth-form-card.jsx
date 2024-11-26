export default function AuthFormCard({ children, title, description }) {
  return (
    <div className="shadow-10px w-full rounded-2xl bg-white p-6 md:w-[460px]">
      <h1 className="mb-2 text-4xl font-normal capitalize tracking-tight text-darkGreen">
        {title}
      </h1>
      <p className="text-base font-normal tracking-tight text-gray40">
        {description}
      </p>

      <div className="mt-[33px]">{children}</div>
    </div>
  );
}
