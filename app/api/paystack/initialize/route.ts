import { NextRequest, NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_BASE_URL = "https://api.paystack.co";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, amount, currency, metadata } = body;

    // --- Validation ---
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { status: false, message: "A valid email is required" },
        { status: 400 }
      );
    }

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { status: false, message: "Amount must be greater than 0" },
        { status: 400 }
      );
    }

    const validCurrencies = ["NGN", "USD"];
    if (!currency || !validCurrencies.includes(currency)) {
      return NextResponse.json(
        { status: false, message: "Currency must be NGN or USD" },
        { status: 400 }
      );
    }

    // Convert to the smallest unit (kobo for NGN, cents for USD)
    const amountInSmallestUnit = Math.round(amount * 100);

    // Generate unique reference
    const reference = `votage_${currency.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // --- Initialize transaction via Paystack API ---
    const paystackResponse = await fetch(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amountInSmallestUnit,
          currency,
          reference,
          metadata: {
            ...metadata,
            custom_fields: [
              {
                display_name: "Fund",
                variable_name: "fund",
                value: metadata?.fund || "general",
              },
              {
                display_name: "Ministry",
                variable_name: "ministry",
                value: "Votage Ministry",
              },
            ],
          },
          channels: currency === "USD"
            ? ["card"]
            : ["card", "bank", "ussd", "bank_transfer", "mobile_money"],
        }),
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok || !paystackData.status) {
      return NextResponse.json(
        {
          status: false,
          message: paystackData.message || "Failed to initialize transaction",
        },
        { status: paystackResponse.status }
      );
    }

    return NextResponse.json({
      status: true,
      message: "Transaction initialized",
      data: paystackData.data,
    });
  } catch (error) {
    console.error("Paystack initialize error:", error);
    return NextResponse.json(
      { status: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
