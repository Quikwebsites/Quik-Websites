import Image from 'next/image';

export default function Home() {
  return (
    <div className="">
      <Image src="/logo.svg" alt="Logo" width={180} height={40} />
      <h1 className="text-2xl">Qwick Websites</h1>
    </div>
  );
}
