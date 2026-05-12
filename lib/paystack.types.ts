// Paystack shared types and constants

export type PaystackCurrency = "NGN" | "USD";

export interface PaymentFormData {
  email: string;
  amount: number; // In the major currency unit (e.g., Naira, not kobo)
  fund: string;
  currency: PaystackCurrency;
}

export interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    status: string;
    reference: string;
    amount: number;
    currency: string;
    paid_at: string;
    channel: string;
    customer: {
      email: string;
    };
    metadata: Record<string, unknown>;
  };
}

export interface PaystackSuccessReference {
  reference: string;
  trans: string;
  status: string;
  message: string;
  transaction: string;
  trxref: string;
}

export interface FundOption {
  value: string;
  label: string;
}

export const FUND_OPTIONS: FundOption[] = [
  { value: "general", label: "General Fund" },
  { value: "missions", label: "Missions Fund" },
  { value: "building", label: "Building Fund" },
  { value: "welfare", label: "Welfare Fund" },
];
