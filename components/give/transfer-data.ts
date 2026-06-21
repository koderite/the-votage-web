// Votage Ministry Bank Details and Giving Configurations

export interface BankAccount {
  label: string;
  accountNumber: string;
  currency?: string;
}

export interface BankGroup {
  bankName: string;
  logoType: "access" | "gtb" | "fidelity" | "stanbic" | "moniepoint" | "generic";
  flagCode: string;
  accentBg: string;
  borderColor: string;
  accounts: BankAccount[];
}

export interface OtherAccountItem {
  bankName: string;
  label: string;
  accountNumber: string;
  logoType: "access" | "gtb" | "stanbic" | "moniepoint" | "generic";
}

export const nairaDetails = {
  // Primary local bank: Access Bank for Offering/Tithe
  primary: {
    bankName: "Access Bank PLC",
    logoType: "access" as const,
    flagCode: "NG",
    accentBg: "bg-gray-50",
    borderColor: "border-gray-200",
    accounts: [
      { label: "OFFERING/TITHE", accountNumber: "0796105815" },
    ],
  },
  // Other accounts section: GTBank Building Account
  other: {
    title: "Other Accounts",
    flagCode: "NG",
    accentBg: "bg-gray-50",
    borderColor: "border-gray-200",
    accounts: [
      {
        bankName: "GTBank",
        label: "Building Account",
        accountNumber: "0731261043",
        logoType: "gtb" as const,
      },
    ] as OtherAccountItem[],
  },
  // PayPal giving section
  paypal: {
    title: "Give via PayPal",
    accentBg: "bg-gray-50",
    borderColor: "border-gray-200",
    description: "Give securely from anywhere in the world using PayPal balance, credit/debit cards, or bank accounts.",
    buttonText: "GIVE NOW",
    url: "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=Thewinlos@gmail.com&item_name=Giving%20to%20Voice%20of%20this%20Age%20Ministry",
  }
};

export const domiciliaryDetails = {
  // GTBank details for domiciliary accounts
  bankName: "GTBank (Guaranty Trust Bank)",
  logoType: "gtb" as const,
  flagCode: "NG",
  accentBg: "bg-gray-50",
  borderColor: "border-gray-200",
  instructionsUrl: "https://www.gtbank.com/help-centre/ways-to-bank",
  swiftCode: "GTBINGLA", // Standard GTBank SWIFT Code
  accounts: [
    { label: "USD - DOMICILIARY ACCOUNT", accountNumber: "0756539936", currency: "USD" },
    { label: "GBP - DOMICILIARY ACCOUNT", accountNumber: "0741387991", currency: "GBP" },
    { label: "EURO - DOMICILIARY ACCOUNT", accountNumber: "0756539943", currency: "EUR" },
  ] as BankAccount[],
};
