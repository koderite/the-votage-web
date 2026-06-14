export interface GoogleSheetsResult {
  status: 'success' | 'error'
  message: string
  details?: string
}

export async function submitToGoogleSheets(
  data: Record<string, unknown>,
  formType?: string
): Promise<GoogleSheetsResult> {
  const scriptUrl = formType
    ? process.env.GOOGLE_GTA_SCRIPT_URL
    : " "

  if (!scriptUrl) {
    return {
      status: 'error',
      message: 'Server configuration error: Missing GOOGLE_SCRIPT_URL',
    }
  }

  const response = await fetch(scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    redirect: 'follow',
  })

  const responseText = await response.text()

  if (!response.ok) {
    return {
      status: 'error',
      message: `Google Sheets submission failed: ${response.status} ${response.statusText}`,
      details: responseText,
    }
  }

  const lower = responseText.toLowerCase()
  if (
    lower.includes('success') ||
    lower.includes('ok') ||
    lower.includes('thank') ||
    !lower.includes('error')
  ) {
    return { status: 'success', message: 'Submitted successfully', details: responseText }
  }

  return {
    status: 'error',
    message: responseText || 'Submission may have failed. Please try again.',
    details: responseText.substring(0, 500),
  }
}
