"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check, ExternalLink, Landmark } from "lucide-react";
import { nairaDetails, domiciliaryDetails } from "./transfer-data";
import PaymentForm from "./payment-form";

// Inline Custom SVGs/Images for Bank Logos to ensure high-fidelity representation
const AccessLogo = () => (
  <Image
    src="/img/give/accessbank.png"
    alt="Access Bank Logo"
    width={24}
    height={24}
    className="w-6 h-6 shrink-0 object-contain"
  />
);

const GtbLogo = () => (
  <Image
    src="/img/give/gtbank.png"
    alt="GTBank Logo"
    width={24}
    height={24}
    className="w-6 h-6 shrink-0 object-contain"
  />
);

const FidelityLogo = () => (
  <svg viewBox="0 0 100 100" className="w-6 h-6 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="20" width="80" height="60" rx="5" fill="#0C2340" />
    <path d="M10 20 L50 20 L25 80 L10 80 Z" fill="#00A859" />
  </svg>
);

const StanbicLogo = () => (
  <svg viewBox="0 0 100 100" className="w-6 h-6 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10 C65 10 80 15 80 25 C80 55 65 75 50 90 C35 75 20 55 20 25 C20 15 35 10 50 10 Z" fill="#0A3E8A" />
    <path d="M35 30 H65 V35 H35 Z M35 45 H65 V50 H35 Z M35 60 H55 V65 H35 Z" fill="#FFFFFF" opacity="0.8" />
  </svg>
);

const MoniepointLogo = () => (
  <div className="w-6 h-6 rounded-full bg-[#0052FF] flex items-center justify-center text-white text-[10px] font-sans font-black shrink-0 shadow-sm">
    M
  </div>
);

const PayPalLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 21h3.5c.8 0 1.5-.5 1.7-1.3l2.3-14.4c.1-.8-.5-1.3-1.2-1.3H9c-.8 0-1.5.5-1.7 1.3L5 19.7c-.1.8.5 1.3 1.2 1.3z" fill="#003087" />
    <path d="M11.5 17.5h3.5c.8 0 1.5-.5 1.7-1.3l2.3-14.4c.1-.8-.5-1.3-1.2-1.3H12.5c-.8 0-1.5.5-1.7 1.3l-2.3 14.4c-.1.8.5 1.3 1.2 1.3z" fill="#0079C1" opacity="0.85" />
  </svg>
);

const NigeriaFlag = () => (
  <div className="flex w-6 h-4 border border-gray-200/50 rounded-sm overflow-hidden shrink-0 shadow-sm">
    <div className="w-1/3 bg-[#008751]"></div>
    <div className="w-1/3 bg-white"></div>
    <div className="w-1/3 bg-[#008751]"></div>
  </div>
);

const renderBankLogo = (type: string) => {
  switch (type) {
    case "access":
      return <AccessLogo />;
    case "gtb":
    case "gtbank":
      return <GtbLogo />;
    case "fidelity":
      return <FidelityLogo />;
    case "stanbic":
      return <StanbicLogo />;
    case "moniepoint":
      return <MoniepointLogo />;
    case "paypal":
      return <PayPalLogo />;
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
  }
};

export default function JoinMission() {
  const [activeTab, setActiveTab] = useState<"naira" | "domiciliary">("naira");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (value: string, id: string) => {
    navigator.clipboard.writeText(value);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="give-options" className="w-full py-16 md:py-24 px-4 bg-gray-50 lg:px-30 lg:pt-35 lg:pb-30 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl lg:text-section-heading font-black text-black leading-tight uppercase mb-4">
            Join the Mission Through Giving
          </h2>
          <p className="font-body text-gray-700 text-body-text lg:text-body-text-lg max-w-3xl mx-auto">
            We give because generosity is the heart of God and the center of our
            Faith. Every giving helps spread the Gospel, builds lives, and
            sustains the vision God has entrusted to the Ministry.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-200/70 p-1.5 rounded-full flex gap-1 border border-gray-300/40 shadow-inner">
            <button
              onClick={() => setActiveTab("naira")}
              className={`rounded-full px-6 py-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeTab === "naira"
                ? "bg-black text-white shadow-md scale-105"
                : "text-gray-600 hover:text-black"
                }`}
            >
              Naira Account
            </button>
            <button
              onClick={() => setActiveTab("domiciliary")}
              className={`rounded-full px-6 py-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeTab === "domiciliary"
                ? "bg-black text-white shadow-md scale-105"
                : "text-gray-600 hover:text-black"
                }`}
            >
              Domiciliary Account
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="relative">
          {activeTab === "naira" && (
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-300 space-y-8">
              {/* Primary Bank Card (Fidelity/Access Layout) */}
              <div className={`rounded-2xl border p-6 ${nairaDetails.primary.accentBg} ${nairaDetails.primary.borderColor} shadow-sm transition-all hover:shadow-md`}>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    {renderBankLogo(nairaDetails.primary.logoType)}
                    <span className="font-bold text-gray-800 tracking-wide text-base md:text-lg">
                      {nairaDetails.primary.bankName}
                    </span>
                  </div>
                  <NigeriaFlag />
                </div>

                {/* Grid of Accounts */}
                <div className={`grid grid-cols-1 ${nairaDetails.primary.accounts.length > 1 ? "md:grid-cols-2" : ""} gap-4`}>
                  {nairaDetails.primary.accounts.map((acc, index) => {
                    const id = `primary-${index}`;
                    const isCopied = copiedId === id;
                    return (
                      <div
                        key={acc.label}
                        className="bg-white rounded-xl p-4 flex justify-between items-center shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-gray-200 transition-all hover:shadow-md group"
                      >
                        <div>
                          <p className="text-xs md:text-sm font-bold text-gray-400 tracking-wider mb-1.5">
                            {acc.label}
                          </p>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight font-mono">
                            {acc.accountNumber}
                          </h3>
                        </div>
                        <button
                          onClick={() => handleCopy(acc.accountNumber, id)}
                          className="text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-50 rounded-lg cursor-pointer shrink-0"
                          title="Copy account number"
                        >
                          {isCopied ? (
                            <Check size={18} className="text-green-600 animate-scale-up" />
                          ) : (
                            <Copy size={18} className="transition-transform group-hover:scale-105" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Grid: Other Accounts & PayPal */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                {/* Other Accounts Container */}
                <div className={`rounded-2xl border p-6 flex flex-col justify-between ${nairaDetails.other.accentBg} ${nairaDetails.other.borderColor} shadow-sm`}>
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <Landmark className="w-5 h-5 text-gray-700 shrink-0" />
                        <span className="font-bold text-gray-800 tracking-wide text-base md:text-lg">
                          {nairaDetails.other.title}
                        </span>
                      </div>
                      <NigeriaFlag />
                    </div>

                    <div className="space-y-4">
                      {nairaDetails.other.accounts.map((acc, index) => {
                        const id = `other-${index}`;
                        const isCopied = copiedId === id;
                        return (
                          <div
                            key={id}
                            className="bg-white rounded-xl p-4 flex justify-between items-center shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-gray-200 transition-all hover:shadow-md group"
                          >
                            <div className="flex-1 min-w-0 pr-3">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {renderBankLogo(acc.logoType)}
                                <span className="text-xs md:text-sm font-bold text-gray-600 uppercase tracking-wide">
                                  {acc.bankName}
                                </span>
                                <span className="text-[10px] text-gray-400">|</span>
                                <span className="text-xs md:text-sm font-medium text-gray-500">
                                  {acc.label}
                                </span>
                              </div>
                              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mt-1.5 font-mono">
                                {acc.accountNumber}
                              </h3>
                            </div>
                            <button
                              onClick={() => handleCopy(acc.accountNumber, id)}
                              className="text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-50 rounded-lg cursor-pointer shrink-0"
                              title="Copy account number"
                            >
                              {isCopied ? (
                                <Check size={18} className="text-green-600 animate-scale-up" />
                              ) : (
                                <Copy size={18} className="transition-transform group-hover:scale-105" />
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* PayPal Container */}
                <div id="online-giving" className={`rounded-2xl border flex flex-col justify-between overflow-hidden ${nairaDetails.paypal.accentBg} ${nairaDetails.paypal.borderColor} shadow-sm hover:shadow-md transition-all`}>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      {renderBankLogo("paypal")}
                      <span className="font-bold text-gray-800 tracking-wide text-base md:text-lg">
                        {nairaDetails.paypal.title}
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4 font-body">
                      {nairaDetails.paypal.description}
                    </p>
                  </div>

                  <a
                    href={nairaDetails.paypal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-black hover:bg-neutral-800 text-white py-5 text-sm md:text-base font-bold tracking-wider uppercase text-center flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md"
                  >
                    {nairaDetails.paypal.buttonText}
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>


            </div>
          )}

          {activeTab === "domiciliary" && (
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-300 space-y-8">
              {/* Domiciliary Bank Card */}
              <div className={`rounded-2xl border p-6 ${domiciliaryDetails.accentBg} ${domiciliaryDetails.borderColor} shadow-sm transition-all hover:shadow-md`}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    {renderBankLogo(domiciliaryDetails.logoType)}
                    <span className="font-bold text-gray-800 tracking-wide text-base md:text-lg">
                      {domiciliaryDetails.bankName}
                    </span>
                  </div>
                  <NigeriaFlag />
                </div>


                {/* Grid of Domiciliary Accounts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Swift Code card */}
                  <div className="bg-white rounded-xl p-4 flex justify-between items-center shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-gray-200 transition-all hover:shadow-md group">
                    <div>
                      <p className="text-xs md:text-sm font-bold text-gray-400 tracking-wider mb-1.5">
                        SWIFT CODE
                      </p>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight font-mono">
                        {domiciliaryDetails.swiftCode}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleCopy(domiciliaryDetails.swiftCode, "swift-code")}
                      className="text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-50 rounded-lg cursor-pointer shrink-0"
                      title="Copy swift code"
                    >
                      {copiedId === "swift-code" ? (
                        <Check size={18} className="text-green-600 animate-scale-up" />
                      ) : (
                        <Copy size={18} className="transition-transform group-hover:scale-105" />
                      )}
                    </button>
                  </div>

                  {/* Currencies */}
                  {domiciliaryDetails.accounts.map((acc, index) => {
                    const id = `dom-${index}`;
                    const isCopied = copiedId === id;
                    let icon = null;
                    if (acc.currency === "USD") {
                      icon = <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-sm">$</div>;
                    } else if (acc.currency === "GBP") {
                      icon = <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-sm">£</div>;
                    } else if (acc.currency === "EUR") {
                      icon = <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-sm">€</div>;
                    }

                    return (
                      <div
                        key={acc.label}
                        className="bg-white rounded-xl p-4 flex justify-between items-center shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-gray-200 transition-all hover:shadow-md group"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            {icon}
                            <span className="text-xs md:text-sm font-bold text-gray-400 tracking-wider">
                              {acc.label}
                            </span>
                          </div>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight font-mono">
                            {acc.accountNumber}
                          </h3>
                        </div>
                        <button
                          onClick={() => handleCopy(acc.accountNumber, id)}
                          className="text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-50 rounded-lg cursor-pointer shrink-0"
                          title="Copy account number"
                        >
                          {isCopied ? (
                            <Check size={18} className="text-green-600 animate-scale-up" />
                          ) : (
                            <Copy size={18} className="transition-transform group-hover:scale-105" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>


            </div>
          )}
        </div>
      </div>
    </section>
  );
}
