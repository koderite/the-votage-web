import { submitToGoogleSheets, type GoogleSheetsResult } from '@/lib/google-sheets'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("ClaimCert API: Submitting data to Google Sheets...")
    console.log("ClaimCert API: Payload:", JSON.stringify(body, null, 2))

    const result: GoogleSheetsResult = await submitToGoogleSheets(body, 'CERT')
    console.log("ClaimCert API:", result.status, "-", result.message)

    if (result.status === 'success') {
      return Response.json({
        status: 'success',
        message: 'Certificate claim submitted successfully',
        details: result.details,
      })
    }

    return Response.json(
      { status: 'error', message: result.message, details: result.details },
      { status: 500 }
    )
  } catch (error) {
    console.error("ClaimCert API error:", error)
    return Response.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to submit certificate claim',
      },
      { status: 500 }
    )
  }
}
