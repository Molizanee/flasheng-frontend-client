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

export interface CreditPlanResponse {
  id: string
  name: string
  credits_amount: number
  price_brl_cents: number
  is_active: boolean
}

export interface UserProfileResponse {
  id: string
  linkedin_url: string | null
  credits: number
  created_at: string
  updated_at: string
}

export interface UserProfileUpdate {
  linkedin_url: string
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
    linkedinPdf?: File,
    token?: string,
    options?: {
      jobUrl?: string
      language?: 'pt-br' | 'en'
      platformContent?: 'linkedin' | 'github' | 'mixed'
    }
  ): Promise<ResumeJobCreatedResponse> {
    const formData = new FormData()
    formData.append('github_token', githubToken)
    if (linkedinPdf) {
      formData.append('linkedin_pdf', linkedinPdf)
    }

    if (options?.jobUrl) {
      formData.append('linkedin_job_url', options.jobUrl)
    }
    if (options?.language) {
      formData.append('language', options.language)
    }
    if (options?.platformContent) {
      formData.append('platform_content', options.platformContent)
    }

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

  getPaymentStatus(paymentId: string, token: string): Promise<PaymentStatusResponse> {
    return request(`/api/v1/payment/${paymentId}`, { token })
  },

  getCreditBalance(token: string): Promise<CreditBalanceResponse> {
    return request('/api/v1/payment/balance', { token })
  },

  getCreditPlans(): Promise<CreditPlanResponse[]> {
    return request('/api/v1/payment/plans')
  },

  getUserProfile(token: string): Promise<UserProfileResponse> {
    return request('/api/v1/users/me', { token })
  },

  updateUserProfile(
    data: UserProfileUpdate,
    token: string
  ): Promise<UserProfileResponse> {
    return request('/api/v1/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
      token,
    })
  },

  createPayment(token: string, planId: string): Promise<PaymentResponse> {
    return request('/api/v1/payment/create', {
      method: 'POST',
      body: JSON.stringify({ plan_id: planId }),
      token,
    })
  },
}