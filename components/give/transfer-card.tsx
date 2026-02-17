"use client";

import { Landmark } from "lucide-react";
import { CopyField } from "./copy-field";
import Image from "next/image";
import { div } from "framer-motion/client";

interface TransferCardProps {
  data: any;
  accent?: string;
  bordercolor?: string;
}

export default function TransferCard({
  data,
  accent = "bg-gray-50",
  bordercolor = "#000000",
}: TransferCardProps) {
  return (
    <div
      style={{ borderColor: bordercolor }}
      className={`rounded-2xl border-l-5 shadow-[5px_5px_5px_rgba(0,0,0,0.2)]  px-4 py-6 bg-white`}
    >
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <Image
          src="/img/give/banklogo.svg"
          alt="Bank Logo"
          width={30}
          height={30}
          className="mb-3"
        />{" "}
        <h3 className="text-black font-display-light">{data.title}</h3>
      </div>

      {/* Beneficiary */}
      <div className="rounded-xl shadow-[3px_5px_5px_rgba(0,0,0,0.2)] p-4 mb-6">
        <CopyField
          label="Beneficiary’s A/C Number"
          value={data.beneficiaryAccountNumber}
        />
        <div className="mt-4">
          <CopyField label="For Final Credit" value={data.forFinalCredit} />
        </div>
      </div>

      {/* Transfer Route */}
      <h4 className="font-display-light text-black text-center mb-3">
        TRANSFER ROUTE
      </h4>

      <div className="rounded-xl border p-4 mb-6">
        <CopyField label="Correspondent Bank" value={data.correspondentBank} />
        <div className="mt-4">
          <CopyField label="Swift Code" value={data.swiftCode} />
        </div>
        <div className="mt-4">
          <CopyField label="For Final Credit" value={data.forFinalCredit} />
        </div>
      </div>

      {/* For Credit Of */}
      <div className={`rounded-xl p-4 ${accent}`}>
        <p className="text-xs text-gray-500 mb-3">FOR CREDIT OF</p>

        <CopyField label="" value={data.creditOf.bankName} />

        <div className="mt-4">
          <CopyField
            label="Access Bank A/C with Maxi Texas"
            value={data.creditOf.accessBankAccount}
          />
        </div>

        <div className="mt-4">
          <CopyField
            label="Beneficiary’s Bank Swift"
            value={data.creditOf.beneficiaryBankSwift}
          />
        </div>
      </div>
    </div>
  );
}
