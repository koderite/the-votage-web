// app/api/claimcert/route.ts - API route for Certificate Claim form submissions

export async function POST(request: Request) {
  // Get the Google Apps Script URL from environment variables
  const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL || "";

  if (!googleScriptUrl) {
    console.error("ClaimCert API: Missing GOOGLE_SCRIPT_URL");
    return Response.json(
      { status: "error", message: "Server configuration error: Missing GOOGLE_SCRIPT_URL" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    console.log("ClaimCert API: Submitting data to Google Sheets...");
    console.log("ClaimCert API: Payload:", JSON.stringify(body, null, 2));

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      redirect: "follow",
    });

    console.log("ClaimCert API: Response status:", response.status);
    console.log("ClaimCert API: Response ok:", response.ok);

    const responseText = await response.text();
    console.log("ClaimCert API: Response text:", responseText);

    // Check if response is not OK
    if (!response.ok) {
      console.error("ClaimCert API: Google Sheets returned error status");
      return Response.json(
        { 
          status: "error", 
          message: `Google Sheets submission failed: ${response.status} ${response.statusText}` 
        },
        { status: 500 }
      );
    }

    // Check response content for success indicators
    const lowerResponse = responseText.toLowerCase();
    if (lowerResponse.includes("success") || 
        lowerResponse.includes("ok") || 
        lowerResponse.includes("thank") ||
        lowerResponse.includes("error") === false) {
      console.log("ClaimCert API: Submission successful");
      return Response.json({ 
        status: "success", 
        message: "Certificate claim submitted successfully",
        details: responseText 
      });
    }

    // If we got here, the response might contain an error message
    console.warn("ClaimCert API: Response may contain error:", responseText);
    return Response.json({ 
      status: "error", 
      message: responseText || "Submission may have failed. Please try again.",
      rawResponse: responseText.substring(0, 500)
    });

  } catch (error) {
    console.error("ClaimCert API error:", error);
    return Response.json(
      { 
        status: "error", 
        message: error instanceof Error ? error.message : "Failed to submit certificate claim" 
      },
      { status: 500 }
    );
  }
}
