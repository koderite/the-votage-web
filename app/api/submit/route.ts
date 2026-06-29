
import { submitToGoogleSheets } from '@/lib/google-sheets'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await submitToGoogleSheets(body, (body.formType as string) || undefined)
    return Response.json(result)
  } catch (error) {
    console.error("API submit error:", error)
    return Response.json(
      { status: 'error', message: 'Failed to submit data' },
      { status: 500 }
    )
  }
}
