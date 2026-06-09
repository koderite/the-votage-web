import { submitToGoogleSheets, type GoogleSheetsResult } from '@/lib/google-sheets'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Enrollment API: Submitting data to Google Sheets...")
    console.log("Enrollment API: Payload:", JSON.stringify(body, null, 2))

    const result: GoogleSheetsResult = await submitToGoogleSheets(body, 'ENROLLMENT')
    console.log("Enrollment API:", result.status, "-", result.message)

    if (result.status === 'success') {
      return Response.json({
        status: 'success',
        message: 'Enrollment submitted successfully',
        details: result.details,
      })
    }

    return Response.json(
      { status: 'error', message: result.message, details: result.details },
      { status: 500 }
    )
  } catch (error) {
    console.error("Enrollment API error:", error)
    return Response.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to submit enrollment',
      },
      { status: 500 }
    )
  }
}
