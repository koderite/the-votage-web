"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type {
  PaystackCurrency,
} from "./paystack.types";
import type { PaystackPop } from '@/types'

declare global {
  interface Window {
    PaystackPop: PaystackPop
  }
}

interface PaystackHandler {
  openIframe(): void;
}

interface PaystackPopSetupConfig {
  key: string;
  email: string;
  amount: number;
  currency: PaystackCurrency;
  ref: string;
  metadata: {
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
  channels: string[];
  callback: (response: { reference: string }) => void;
  onClose: () => void;
}

interface UsePaystackConfig {
  email: string;
  amount: number; // In major unit (Naira or Dollar)
  currency: PaystackCurrency;
  fund: string;
  onSuccess?: (reference: string) => void;
  onClose?: () => void;
}

interface UsePaystackReturn {
  initializePayment: () => Promise<void>;
  isLoading: boolean;
  isVerifying: boolean;
  isSuccess: boolean;
  error: string | null;
  verifiedData: VerifiedTransaction | null;
  reset: () => void;
}

interface VerifiedTransaction {
  reference: string;
  status: string;
  amount: number;
  currency: string;
  paid_at: string;
}

// Ensure Paystack inline script is loaded only once
let paystackScriptLoaded = false;
let paystackScriptPromise: Promise<void> | null = null;

function loadPaystackScript(): Promise<void> {
  if (paystackScriptLoaded) return Promise.resolve();
  if (paystackScriptPromise) return paystackScriptPromise;

  paystackScriptPromise = new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Cannot load Paystack on the server"));
      return;
    }

    // Check if already loaded
    if (window.PaystackPop) {
      paystackScriptLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v2/inline.js";
    script.async = true;
    script.onload = () => {
      paystackScriptLoaded = true;
      resolve();
    };
    script.onerror = () => {
      paystackScriptPromise = null;
      reject(new Error("Failed to load Paystack"));
    };
    document.head.appendChild(script);
  });

  return paystackScriptPromise;
}

/**
 * Custom hook for Paystack payments.
 *
 * Flow:
 * 1. Call /api/paystack/initialize server-side to get a reference
 * 2. Open Paystack checkout popup via PaystackPop inline JS
 * 3. On success callback, verify the transaction via /api/paystack/verify
 */
export function usePaystack(config: UsePaystackConfig): UsePaystackReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifiedData, setVerifiedData] = useState<VerifiedTransaction | null>(null);

  // Use ref to keep latest config without causing re-renders
  const configRef = useRef(config);
  configRef.current = config;

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;

  // Preload Paystack script on mount
  useEffect(() => {
    loadPaystackScript().catch(() => {
      // Silently fail — will retry when user clicks pay
    });
  }, []);

  // Server-side verification
  const verifyTransaction = useCallback(async (ref: string) => {
    setIsVerifying(true);
    try {
      const res = await fetch(
        `/api/paystack/verify?reference=${encodeURIComponent(ref)}`
      );
      const data = await res.json();

      if (data.status && data.data?.status === "success") {
        setVerifiedData({
          reference: data.data.reference,
          status: data.data.status,
          amount: data.data.amount,
          currency: data.data.currency,
          paid_at: data.data.paid_at,
        });
        setIsSuccess(true);
        configRef.current.onSuccess?.(ref);
      } else {
        setError("Payment verification failed. Please contact support.");
      }
    } catch {
      setError("Could not verify payment. Please contact support.");
    } finally {
      setIsVerifying(false);
    }
  }, []);

  // Main payment function
  const initializePayment = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    setVerifiedData(null);

    try {
      // Ensure Paystack script is loaded
      await loadPaystackScript();

      // Step 1: Initialize transaction server-side
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: configRef.current.email,
          amount: configRef.current.amount,
          currency: configRef.current.currency,
          metadata: { fund: configRef.current.fund },
        }),
      });

      const data = await res.json();

      if (!data.status) {
        setError(data.message || "Failed to initialize payment");
        setIsLoading(false);
        return;
      }

      const serverReference = data.data.reference;

      // Step 2: Open Paystack checkout popup
      const PaystackPop = window.PaystackPop;
      if (!PaystackPop) {
        setError("Paystack is not available. Please refresh the page.");
        setIsLoading(false);
        return;
      }

      const handler = PaystackPop.setup({
        key: publicKey,
        email: configRef.current.email,
        amount: Math.round(configRef.current.amount * 100), // kobo/cents
        currency: configRef.current.currency,
        ref: serverReference,
        metadata: {
          custom_fields: [
            {
              display_name: "Fund",
              variable_name: "fund",
              value: configRef.current.fund,
            },
            {
              display_name: "Ministry",
              variable_name: "ministry",
              value: "Votage Ministry",
            },
          ],
        },
        channels:
          configRef.current.currency === "USD"
            ? ["card"]
            : ["card", "bank", "ussd", "bank_transfer"],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback: (response: any) => {
          setIsLoading(false);
          // Step 3: Verify the transaction server-side
          verifyTransaction(response.reference || serverReference);
        },
        onClose: () => {
          setIsLoading(false);
          configRef.current.onClose?.();
        },
      });

      handler.openIframe();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setIsLoading(false);
    }
  }, [publicKey, verifyTransaction]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsVerifying(false);
    setIsSuccess(false);
    setError(null);
    setVerifiedData(null);
  }, []);

  return {
    initializePayment,
    isLoading,
    isVerifying,
    isSuccess,
    error,
    verifiedData,
    reset,
  };
}
