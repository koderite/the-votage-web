"use client";

import Image from "next/image";
import PaymentForm from "./payment-form";
import { CreditCard } from "lucide-react";

export default function InternationalPayment() {
  return (
    <div className="rounded-2xl bg-white h-fit shadow-[0_0_20px_rgba(0,0,0,0.08)] px-6 py-8">
      {/* Header */}
      <div className="grid place-items-center mb-6">
        <Image
          src="/img/give/banklogo.svg"
          alt="Bank Logo"
          width={30}
          height={30}
          className="mb-4"
        />
        <h1 className="font-display-light text-black">International Giving</h1>
      </div>

      {/* International Payment - USD */}
      <div>
        <div className="rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 p-5 mb-5">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h2 className="text-black font-medium">International Payment</h2>
              <p className="text-sm text-text-body">
                Pay securely in USD with your card
              </p>
            </div>
          </div>
        </div>

        <PaymentForm
          currency="USD"
          title="Card Payment (USD)"
          description="For international donors paying in US Dollars"
        />
      </div>
    </div>
  );
}

