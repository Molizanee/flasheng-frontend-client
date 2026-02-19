const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

interface RequestOptions {
  method?: string
  body?: FormData | string
  headers?: Record<string, string>
  token?: string
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, token } = options

  const config: RequestInit = {
    method,
    headers: {
      ...headers,
    },
  }

  // Attach Bearer token when provided
  if (token) {
    ;(config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
  }

  if (body) {
    config.body = body
    // Don't set Content-Type for FormData - browser sets it with boundary
    if (typeof body === 'string') {
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
      } as Record<string, string>
    }
  }

  const response = await fetch(`${BACKEND_URL}${endpoint}`, config)

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }))
    throw new Error(error.detail || `HTTP ${response.status}`)
  }

  return response.json()
}

// --- API Types ---

export interface ResumeJobCreatedResponse {
  job_id: string
  status: string
  message: string
}

export interface ResumeJobResponse {
  id: string
  status: string
  github_username?: string | null
  html_url?: string | null
  pdf_url?: string | null
  error?: string | null
  created_at: string
  updated_at: string
}

export interface ResumeDownloadResponse {
  html_url: string
  pdf_url: string
}

export interface ResumeDownloadLinks {
  pdf: string | null
  html: string | null
}

export interface MyResumeItem {
  resume_cover: string
  download_links: ResumeDownloadLinks
}

export type PaymentStatus = 'PENDING' | 'PAID' | 'EXPIRED' | 'CANCELLED'

export interface PaymentResponse {
  id: string
  amount_cents: number
  credits_purchased: number
  status: PaymentStatus
  br_code: string
  br_code_base64: string
  created_at: string
  expires_at: string | null
}

export interface PaymentStatusResponse {
  id: string
  status: PaymentStatus
  credits_purchased: number
  expires_at: string | null
}

export interface CreditBalanceResponse {
  credits: number
}

// --- API Methods ---

export const api = {
  healthCheck(): Promise<Record<string, unknown>> {
    return request('/health')
  },

  getMyResumes(token: string): Promise<MyResumeItem[]> {
    return request('/api/v1/resume/my-resumes', { token })
  },

  generateResume(
    githubToken: string,
    linkedinPdf: File,
    token?: string,
  ): Promise<ResumeJobCreatedResponse> {
    const formData = new FormData()
    formData.append('github_token', githubToken)
    formData.append('linkedin_pdf', linkedinPdf)

    return request('/api/v1/resume/generate', {
      method: 'POST',
      body: formData,
      token,
    })
  },

  getJobStatus(jobId: string): Promise<ResumeJobResponse> {
    return request(`/api/v1/resume/${jobId}`)
  },

  getDownloadUrls(jobId: string): Promise<ResumeDownloadResponse> {
    return request(`/api/v1/resume/${jobId}/download`)
  },

  createPayment(token: string): Promise<PaymentResponse> {
    return request('/api/v1/payment/create', {
      method: 'POST',
      token,
    })
  },

  getPaymentStatus(paymentId: string, token: string): Promise<PaymentStatusResponse> {
    return request(`/api/v1/payment/${paymentId}`, { token })
  },

  getCreditBalance(token: string): Promise<CreditBalanceResponse> {
    return request('/api/v1/payment/balance', { token })
  },
}
