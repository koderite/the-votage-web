"use client";

import { useState, useCallback } from "react";
import { usePaystack } from "@/lib/usePaystack";
import { FUND_OPTIONS, type PaystackCurrency } from "@/lib/paystack.types";
import { Button } from "../ui/button";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";

interface PaymentFormProps {
  currency: PaystackCurrency;
  title?: string;
  description?: string;
}

export default function PaymentForm({
  currency,
  title,
  description,
}: PaymentFormProps) {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [fund, setFund] = useState("general");
  const [formError, setFormError] = useState<string | null>(null);

  const currencySymbol = currency === "NGN" ? "₦" : "$";
  const currencyLabel = currency === "NGN" ? "Nigerian Naira" : "US Dollar";

  const {
    initializePayment,
    isLoading,
    isVerifying,
    isSuccess,
    error,
    verifiedData,
    reset,
  } = usePaystack({
    email,
    amount: parseFloat(amount) || 0,
    currency,
    fund,
    onSuccess: (ref) => {
      console.log(`Payment successful: ${ref}`);
    },
    onClose: () => {
      console.log("Payment modal closed");
    },
  });

  const validateForm = useCallback((): boolean => {
    setFormError(null);

    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setFormError("Please enter a valid email address");
      return false;
    }

    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setFormError("Please enter a valid amount greater than 0");
      return false;
    }

    if (currency === "NGN" && parsedAmount < 100) {
      setFormError("Minimum amount is ₦100");
      return false;
    }

    if (currency === "USD" && parsedAmount < 1) {
      setFormError("Minimum amount is $1");
      return false;
    }

    return true;
  }, [email, amount, currency]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    await initializePayment();
  };

  const handleReset = () => {
    reset();
    setEmail("");
    setAmount("");
    setFund("general");
    setFormError(null);
  };

  // Success state
  if (isSuccess && verifiedData) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-green-900 mb-2">
          Payment Successful!
        </h3>
        <p className="text-sm text-green-700 mb-1">
          Thank you for your generous giving.
        </p>
        <p className="text-xs text-green-600 mb-4">
          Reference: {verifiedData.reference}
        </p>
        <button
          onClick={handleReset}
          className="text-sm text-green-700 underline hover:text-green-900 transition-colors cursor-pointer"
        >
          Make another payment
        </button>
      </div>
    );
  }

  // Verifying state
  if (isVerifying) {
    return (
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
        <p className="text-sm text-blue-800 font-medium">
          Verifying your payment...
        </p>
        <p className="text-xs text-blue-600 mt-1">
          Please wait while we confirm your transaction.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Header */}
      {(title || description) && (
        <div className="mb-2">
          {title && (
            <h3 className="text-black font-semibold text-sm mb-1">{title}</h3>
          )}
          {description && (
            <p className="text-text-body text-xs">{description}</p>
          )}
        </div>
      )}

      {/* Fund Selector */}
      <div>
        <label className="text-text-body text-xs font-medium block mb-1.5">
          Select Fund
        </label>
        <select
          value={fund}
          onChange={(e) => setFund(e.target.value)}
          className="w-full border border-gray-200 text-black text-sm rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-all"
        >
          {FUND_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div>
        <label className="text-text-body text-xs font-medium block mb-1.5">
          Amount ({currencyLabel})
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
            {currencySymbol}
          </span>
          <input
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setFormError(null);
            }}
            className="w-full border border-gray-200 text-black text-sm rounded-lg pl-8 pr-3 py-2.5 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-all"
            placeholder="0.00"
            min="0"
            step="any"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="text-text-body text-xs font-medium block mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setFormError(null);
          }}
          className="w-full border border-gray-200 text-black text-sm rounded-lg px-3 py-2.5 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-all"
          placeholder="your@email.com"
        />
      </div>

      {/* Errors */}
      {(formError || error) && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
          <p className="text-xs text-red-700">{formError || error}</p>
        </div>
      )}

      {/* Currency Badge */}
      <div className="flex justify-between px-3 py-2 text-xs rounded-lg bg-gray-50 border border-gray-100">
        <span className="text-gray-500">Currency</span>
        <span className="text-black font-medium">
          {currency} ({currencyLabel})
        </span>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="black"
        className="w-full h-12 text-sm font-semibold"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </span>
        ) : (
          `Proceed to pay ${amount ? currencySymbol : ""}${amount ?? ""} `
        )}
      </Button>

      {/* Security note */}
      <p className="text-[10px] text-gray-400 text-center">
        Secured by Paystack. Your payment details are encrypted.
      </p>
    </form>
  );
}
