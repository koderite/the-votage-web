import { Copy } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function LocalPayment() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (value: string, index: number) => {
    navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="rounded-2xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] px-6 py-8">
      <div className="grid place-items-center mb-6">
        <Image
          src="/img/give/banklogo.svg"
          alt="Bank Logo"
          width={30}
          height={30}
          className="mb-4"
        />
        <h1 className="font-display-light text-black">Bank Transfer</h1>
      </div>

      <div className="bg-linear-90 from-[#c145ff61] to-[#1FDDF261] rounded-lg p-6">
        <div className="flex gap-4 items-center">
          <Image
            src="/img/give/banklogo.svg"
            alt="Bank Logo"
            width={30}
            height={30}
          />

          <div>
            <h1 className="text-black">Local Payment (Nigerian)</h1>
            <p className="text-sm text-text-body">Direct bank transfer </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 mt-6">
        {bankdetails.map((detail, index) => (
          <div
            key={detail.name}
            className="flex gap-4 justify-between items-center  shadow-lg rounded-2xl p-6"
          >
            <div>
              <p className="text-text-body text-sm mb-1">{detail.name}</p>
              <h1 className="text-sm text-black font-bold">{detail.value}</h1>
            </div>
            <div
              title={copiedIndex === index ? "Copied!" : "Copy to clipboard"}
            >
              <Copy
                className="text-black cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => handleCopy(detail.value, index)}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-between px-6 py-3 text-xs rounded-md bg-[#EBEBEB]">
          <p className="text-black">Currency</p>
          <p className="text-black">NGN (Nigerian Naira)</p>
        </div>
      </div>
    </div>
  );
}

export const bankdetails = [
  {
    name: "Bank Name",
    value: "ACCESS BANK PLC",
  },
  {
    name: "Account Name",
    value: "VOTAGE MINISTRY",
  },
  {
    name: "Account Number",
    value: "0796105815",
  },
];
