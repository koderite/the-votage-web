// app/api/submit/route.ts - API proxy for SpreadAPI

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(
      process.env.GOOGLE_SCRIPT_URL || "",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        redirect: "follow",
      },
    );

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("API submit error:", error);
    return Response.json(
      { status: "error", message: "Failed to submit data" },
      { status: 500 },
    );
  }
}
