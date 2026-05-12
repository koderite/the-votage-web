import { NextRequest, NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_BASE_URL = "https://api.paystack.co";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { status: false, message: "Transaction reference is required" },
        { status: 400 }
      );
    }

    // --- Verify transaction via Paystack API ---
    const paystackResponse = await fetch(
      `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok || !paystackData.status) {
      return NextResponse.json(
        {
          status: false,
          message: paystackData.message || "Verification failed",
        },
        { status: paystackResponse.status }
      );
    }

    const txn = paystackData.data;

    return NextResponse.json({
      status: true,
      message: "Transaction verified",
      data: {
        id: txn.id,
        status: txn.status,
        reference: txn.reference,
        amount: txn.amount,
        currency: txn.currency,
        paid_at: txn.paid_at,
        channel: txn.channel,
        customer: {
          email: txn.customer?.email,
        },
        metadata: txn.metadata,
      },
    });
  } catch (error) {
    console.error("Paystack verify error:", error);
    return NextResponse.json(
      { status: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
