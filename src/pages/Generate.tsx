import { useState, useCallback, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../lib/api'
import type { ResumeJobResponse } from '../lib/api'
import GenerationOptionsForm from '../components/GenerationOptions'
import { type GenerationOptions, defaultGenerationOptions } from '../lib/generation-options'
import PixPayment from '../components/PixPayment'
import GenerationProgress from '../components/GenerationProgress'
import Button from '../components/ui/Button'
import { ArrowLeft, Check, XCircle } from 'lucide-react'
import type { CreditPlanResponse } from '../lib/api'
import { CoreLogo } from '../components/CoreLogo'

type Step = 'options' | 'payment' | 'generating' | 'complete' | 'error'

interface SavedResume {
  id: string
  jobId: string
  status: string
  createdAt: string
  htmlUrl?: string | null
  pdfUrl?: string | null
  githubUsername?: string | null
}

const RESUMES_KEY = 'core_resumes'

function saveResume(resume: SavedResume) {
  const existing = JSON.parse(localStorage.getItem(RESUMES_KEY) || '[]') as SavedResume[]
  existing.unshift(resume)
  localStorage.setItem(RESUMES_KEY, JSON.stringify(existing))
}

export default function Generate() {
  const { providerToken, session, signOut } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const planId = searchParams.get('plan')
  const [selectedPlan, setSelectedPlan] = useState<CreditPlanResponse | null>(null)

  const [step, setStep] = useState<Step>('options')
  const [jobId, setJobId] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [credits, setCredits] = useState<number>(0)
  const [creditsLoading, setCreditsLoading] = useState(true)
  const [generationOptions, setGenerationOptions] = useState<GenerationOptions>(defaultGenerationOptions)

  useEffect(() => {
    if (!session?.access_token) return

    setCreditsLoading(true)
    api
      .getUserProfile(session.access_token)
      .then((result) => setCredits(result.credits))
      .catch((err) => console.error('Failed to fetch credits:', err))
      .finally(() => setCreditsLoading(false))
  }, [session])

  const handleStartGeneration = useCallback(async (options?: GenerationOptions) => {
    const opts = options ?? generationOptions

    if (!providerToken) {
      await signOut()
      navigate('/login')
      return
    }


    try {
      const result = await api.generateResume(
        providerToken,
        undefined,
        session?.access_token,
        {
          jobUrl: opts.jobUrl || undefined,
          language: opts.language,
          platformContent: opts.platformContent,
        }
      )
      setJobId(result.job_id)
      setStep('generating')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro ao iniciar geração')
      setStep('error')
    }
  }, [providerToken, session, generationOptions, signOut, navigate])

  const handlePaymentConfirmed = useCallback(async () => {
    if (!session?.access_token) return
    try {
      const result = await api.getUserProfile(session.access_token)
      setCredits(result.credits)
    } catch (err) {
      console.error('Failed to fetch credits:', err)
    }
    handleStartGeneration()
  }, [session, handleStartGeneration])

  const handleOptionsContinue = async (options: GenerationOptions) => {
    setGenerationOptions(options)

    if (creditsLoading) return

    if (credits > 0) {
      handleStartGeneration(options)
    } else {
      // Fetch default plan for payment
      try {
        if (session?.access_token) {
          const plans = await api.getCreditPlans()
          const plan = planId
            ? plans.find((p) => p.id === planId) || plans[0]
            : plans[0]
          if (plan) {
            setSelectedPlan(plan)
            setStep('payment')
          }
        }
      } catch (err) {
        console.error('Failed to fetch plans:', err)
        setErrorMsg('Erro ao carregar planos de pagamento')
        setStep('error')
      }
    }
  }

  const handleGenerationComplete = useCallback(
    (job: ResumeJobResponse) => {
      saveResume({
        id: crypto.randomUUID(),
        jobId: job.id,
        status: job.status,
        createdAt: job.created_at,
        htmlUrl: job.html_url,
        pdfUrl: job.pdf_url,
        githubUsername: job.github_username,
      })

      setStep('complete')
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    },
    [navigate]
  )

  const handleGenerationError = useCallback((error: string) => {
    setErrorMsg(error)
    setStep('error')
  }, [])

  const hasCredits = credits > 0

  const stepIndicators = hasCredits
    ? [
      { key: 'options', label: 'Opções' },
      { key: 'generating', label: 'Geração' },
    ]
    : [
      { key: 'options', label: 'Opções' },
      { key: 'payment', label: 'Pagamento' },
      { key: 'generating', label: 'Geração' },
    ]

  const currentStepIndex =
    step === 'options' ? 0 :
      step === 'payment' || step === 'generating' ? (hasCredits ? 1 : 2) : 0

  return (
    <div className="dot-grid relative min-h-screen bg-bg-void">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-glow top-[-100px] left-[30%] bg-accent-primary" />
        <div className="hero-glow bottom-[-100px] right-[20%] bg-accent-secondary" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        {/* Back link */}
        <Link
          to={step === 'generating' ? '#' : '/dashboard'}
          className="mb-10 flex items-center gap-2 text-body-s text-text-tertiary transition-colors hover:text-text-secondary"
          onClick={(e) => {
            if (step === 'generating') e.preventDefault()
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para o dashboard
        </Link>

        {/* Logo */}
        <div className="mb-6 flex items-center gap-2">
          <CoreLogo />
        </div>

        {/* Step indicators */}
        {step !== 'complete' && step !== 'error' && (
          <div className="mb-8 flex items-center gap-3">
            {stepIndicators.map((s, i) => (
              <div key={s.key} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${i <= currentStepIndex
                      ? 'bg-accent-primary text-text-primary'
                      : 'bg-bg-subtle text-text-disabled'
                      }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-body-s ${i <= currentStepIndex
                      ? 'text-text-primary'
                      : 'text-text-disabled'
                      }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < stepIndicators.length - 1 && (
                  <div
                    className={`h-px w-8 ${i < currentStepIndex
                      ? 'bg-accent-primary'
                      : 'bg-border-faint'
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Step content */}
        <div className="glass-card w-full max-w-lg rounded-2xl p-8 md:p-10">
          {step === 'options' && (
            <GenerationOptionsForm
              initialOptions={generationOptions}
              loading={creditsLoading}
              onSubmit={(options) => {
                handleOptionsContinue(options)
              }}
              onBack={() => navigate('/dashboard')}
            />
          )}

          {step === 'payment' && selectedPlan && (
            <PixPayment
              onPaymentConfirmed={handlePaymentConfirmed}
              token={session?.access_token ?? ''}
              plan={selectedPlan}
            />
          )}

          {step === 'generating' && jobId && (
            <GenerationProgress
              jobId={jobId}
              onComplete={handleGenerationComplete}
              onError={handleGenerationError}
            />
          )}

          {step === 'complete' && (
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success-subtle">
                <Check className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-h2 mb-3 text-text-primary">
                Resumo Gerado!
              </h2>
              <p className="mb-6 text-text-tertiary">
                Seu resumo foi gerado com sucesso. Redirecionando para o
                dashboard...
              </p>
            </div>
          )}

          {step === 'error' && (
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-danger-subtle">
                <XCircle className="h-8 w-8 text-danger" />
              </div>
              <h2 className="text-h2 mb-3 text-text-primary">
                Erro na Geração
              </h2>
              <p className="mb-6 text-body-s text-text-tertiary">{errorMsg}</p>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setStep('options')
                    setErrorMsg(null)
                    setJobId(null)
                  }}
                  variant="primary"
                  size="md"
                >
                  Tentar Novamente
                </Button>
                <Link
                  to="/dashboard"
                  className="text-body-s text-text-disabled transition-colors hover:text-text-secondary"
                >
                  Voltar para o dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
