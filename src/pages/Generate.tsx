import { useState, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../lib/api'
import type { ResumeJobResponse } from '../lib/api'
import FileUpload from '../components/FileUpload'
import PixPayment from '../components/PixPayment'
import GenerationProgress from '../components/GenerationProgress'
import Button from '../components/ui/Button'
import { ArrowLeft, Zap, Check, XCircle } from 'lucide-react'

type Step = 'upload' | 'payment' | 'generating' | 'complete' | 'error'

interface SavedResume {
  id: string
  jobId: string
  status: string
  createdAt: string
  htmlUrl?: string | null
  pdfUrl?: string | null
  githubUsername?: string | null
}

const RESUMES_KEY = 'flasheng_resumes'

function saveResume(resume: SavedResume) {
  const existing = JSON.parse(localStorage.getItem(RESUMES_KEY) || '[]') as SavedResume[]
  existing.unshift(resume)
  localStorage.setItem(RESUMES_KEY, JSON.stringify(existing))
}

export default function Generate() {
  const { providerToken, session } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState<Step>('upload')
  const [linkedinPdf, setLinkedinPdf] = useState<File | null>(null)
  const [jobId, setJobId] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [credits, setCredits] = useState<number>(0)

  useEffect(() => {
    if (!session?.access_token) return

    api
      .getCreditBalance(session.access_token)
      .then((result) => setCredits(result.credits))
      .catch((err) => console.error('Failed to fetch credits:', err))
  }, [session])

  const handleStartGeneration = useCallback(async () => {
    if (!linkedinPdf || !providerToken) {
      setErrorMsg('Arquivo PDF ou token do GitHub nao encontrado. Faca login novamente.')
      setStep('error')
      return
    }

    try {
      const result = await api.generateResume(providerToken, linkedinPdf, session?.access_token ?? undefined)
      setJobId(result.job_id)
      setStep('generating')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro ao iniciar geracao')
      setStep('error')
    }
  }, [linkedinPdf, providerToken, session])

  const handlePaymentConfirmed = useCallback(async () => {
    if (!session?.access_token) return
    try {
      const result = await api.getCreditBalance(session.access_token)
      setCredits(result.credits)
    } catch (err) {
      console.error('Failed to fetch credits:', err)
    }
    handleStartGeneration()
  }, [session, handleStartGeneration])

  const handleUploadContinue = () => {
    if (!linkedinPdf) return

    if (credits > 0) {
      handleStartGeneration()
    } else {
      setStep('payment')
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

  const stepIndicators = [
    { key: 'upload', label: 'Upload' },
    { key: 'payment', label: 'Pagamento' },
    { key: 'generating', label: 'Geracao' },
  ]

  const currentStepIndex =
    step === 'upload' ? 0 : step === 'payment' ? 1 : 2

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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary">
            <Zap className="h-6 w-6 text-text-primary" />
          </div>
          <span className="font-display text-2xl font-bold text-text-primary">
            Flash<span className="text-text-accent">Eng</span>
          </span>
        </div>

        {/* Step indicators */}
        {step !== 'complete' && step !== 'error' && (
          <div className="mb-8 flex items-center gap-3">
            {stepIndicators.map((s, i) => (
              <div key={s.key} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                      i <= currentStepIndex
                        ? 'bg-accent-primary text-text-primary'
                        : 'bg-bg-subtle text-text-disabled'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-body-s ${
                      i <= currentStepIndex
                        ? 'text-text-primary'
                        : 'text-text-disabled'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < stepIndicators.length - 1 && (
                  <div
                    className={`h-px w-8 ${
                      i < currentStepIndex
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
          {step === 'upload' && (
            <>
              <h1 className="text-h1 mb-2 text-center text-text-primary">
                Gerar Seu Resumo
              </h1>
              <p className="mb-8 text-center text-text-tertiary">
                Faca upload do seu perfil do LinkedIn exportado em PDF para
                gerar seu resumo otimizado com IA.
              </p>

              <div className="flex flex-col gap-6">
                <FileUpload onFileSelect={setLinkedinPdf} file={linkedinPdf} />

                {credits > 0 && (
                  <div className="rounded-xl bg-accent-subtle px-4 py-3 text-center">
                    <p className="text-body-s text-text-accent">
                      Voce tem <span className="font-bold">{credits}</span>{' '}
                      credito{credits !== 1 ? 's' : ''} disponivel
                      {credits !== 1 ? 'is' : ''}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleUploadContinue}
                  size="lg"
                  variant="primary"
                  className="w-full"
                  disabled={!linkedinPdf}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  {credits > 0 ? 'Gerar Resumo' : 'Continuar para Pagamento'}
                </Button>
              </div>
            </>
          )}

          {step === 'payment' && (
            <PixPayment
              onPaymentConfirmed={handlePaymentConfirmed}
              token={session?.access_token ?? ''}
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
                Erro na Geracao
              </h2>
              <p className="mb-6 text-body-s text-text-tertiary">{errorMsg}</p>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setStep('upload')
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
