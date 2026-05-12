"use client";

import { Copy, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import PaymentForm from "./payment-form";

export default function LocalPayment() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (value: string, index: number) => {
    navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="rounded-2xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.08)] px-6 py-8">
      {/* Header */}
      <div className="grid place-items-center mb-6">
        <Image
          src="/img/give/banklogo.svg"
          alt="Bank Logo"
          width={30}
          height={30}
          className="mb-4"
        />
        <h1 className="font-display-light text-black">Local Giving (NGN)</h1>
      </div>

      {/* Bank Transfer Details */}
      <div className="bg-linear-90 from-[#c145ff61] to-[#1FDDF261] rounded-lg p-6 mb-6">
        <div className="flex gap-4 items-center">
          <Image
            src="/img/give/banklogo.svg"
            alt="Bank Logo"
            width={30}
            height={30}
          />
          <div>
            <h1 className="text-black font-medium">Bank Transfer</h1>
            <p className="text-sm text-text-body">Direct bank transfer</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 mb-8">
        {bankdetails.map((detail, index) => (
          <div
            key={detail.name}
            className="flex gap-4 justify-between items-center shadow-sm rounded-xl p-4 border border-gray-100"
          >
            <div>
              <p className="text-text-body text-xs mb-1">{detail.name}</p>
              <h1 className="text-sm text-black font-bold">{detail.value}</h1>
            </div>
            <button
              title={copiedIndex === index ? "Copied!" : "Copy to clipboard"}
              onClick={() => handleCopy(detail.value, index)}
              className="cursor-pointer transition-all duration-200 hover:scale-110"
            >
              {copiedIndex === index ? (
                <CheckCircle className="text-green-500 w-5 h-5" />
              ) : (
                <Copy className="text-gray-400 hover:text-black w-5 h-5 transition-colors" />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-4 text-gray-400 uppercase tracking-wider">
            Or pay online
          </span>
        </div>
      </div>

      {/* Paystack Payment Form (NGN) */}
      <PaymentForm
        currency="NGN"
        title="Pay Online with Paystack"
        description="Instant payment via card, bank transfer, or USSD"
      />
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
