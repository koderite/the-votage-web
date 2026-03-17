// app/api/makeup/route.ts - API route for Make-up Class form submissions

export async function POST(request: Request) {
  // Get the Google Apps Script URL from environment variables
  const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL || "";

  if (!googleScriptUrl) {
    console.error("Makeup API: Missing GOOGLE_SCRIPT_URL");
    return Response.json(
      { status: "error", message: "Server configuration error: Missing GOOGLE_SCRIPT_URL" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    console.log("Makeup API: Submitting data to Google Sheets...");
    console.log("Makeup API: Payload:", JSON.stringify(body, null, 2));

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      redirect: "follow",
    });

    console.log("Makeup API: Response status:", response.status);
    console.log("Makeup API: Response ok:", response.ok);

    const responseText = await response.text();
    console.log("Makeup API: Response text:", responseText);

    // Check if response is not OK
    if (!response.ok) {
      console.error("Makeup API: Google Sheets returned error status");
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
      console.log("Makeup API: Submission successful");
      return Response.json({ 
        status: "success", 
        message: "Make-up class request submitted successfully",
        details: responseText 
      });
    }

    // If we got here, the response might contain an error message
    console.warn("Makeup API: Response may contain error:", responseText);
    return Response.json({ 
      status: "error", 
      message: responseText || "Submission may have failed. Please try again.",
      rawResponse: responseText.substring(0, 500)
    });

  } catch (error) {
    console.error("Makeup API error:", error);
    return Response.json(
      { 
        status: "error", 
        message: error instanceof Error ? error.message : "Failed to submit make-up class request" 
      },
      { status: 500 }
    );
  }
}
