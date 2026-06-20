export interface ApiResponse<T> {
  data: T | null
  error: string | null
  status: number
  ok: boolean
}

export class HttpClient {
  private baseUrl?: string
  private defaultHeaders: Record<string, string>

  constructor(options?: { baseUrl?: string; headers?: Record<string, string> }) {
    this.baseUrl = options?.baseUrl
    this.defaultHeaders = options?.headers ?? {}
  }

  private async request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = this.baseUrl ? `${this.baseUrl}${path}` : path

    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...this.defaultHeaders,
          ...options.headers,
        },
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        let detail = 'Request failed'
        try {
          const parsed = JSON.parse(text)
          detail =
            typeof parsed.detail === 'string'
              ? parsed.detail
              : Array.isArray(parsed.detail)
                ? parsed.detail.map((d: any) => d.msg).join(', ')
                : JSON.stringify(parsed)
        } catch {
          if (text) detail = text
        }
        return { data: null, error: detail, status: res.status, ok: false }
      }

      const data = (await res.json()) as T
      return { data, error: null, status: res.status, ok: true }
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : 'Network error',
        status: 0,
        ok: false,
      }
    }
  }

  async get<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: 'GET' })
  }

  async post<T>(
    path: string,
    body?: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const headers = options?.headers ?? {}
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      headers: { ...headers },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  }

  async put<T>(
    path: string,
    body?: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const headers = options?.headers ?? {}
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      headers: { ...headers },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  }

  async delete<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...options, method: 'DELETE' })
  }
}

export const http = new HttpClient()
