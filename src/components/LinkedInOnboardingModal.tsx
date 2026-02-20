import { useState } from 'react'
import { z } from 'zod'
import { Linkedin, Loader2, Check } from 'lucide-react'
import Button from '../components/ui/Button'

const linkedinUrlSchema = z
  .string()
  .url('URL inválida')
  .includes('linkedin.com', 'Deve ser uma URL do LinkedIn')

interface LinkedInOnboardingModalProps {
  onSubmit: (linkedinUrl: string) => Promise<void>
}

export default function LinkedInOnboardingModal({ onSubmit }: LinkedInOnboardingModalProps) {
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const result = linkedinUrlSchema.safeParse(linkedinUrl.trim())
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    setLoading(true)
    try {
      await onSubmit(result.data)
      setSuccess(true)
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar URL')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70"
        style={{ animation: 'backdrop-enter 200ms ease forwards' }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
        className="glass-panel relative z-10 w-full max-w-md rounded-xl p-6 shadow-float"
        style={{ animation: 'modal-enter 250ms var(--ease-enter) forwards' }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-subtle">
            {success ? (
              <Check className="h-8 w-8 text-success" />
            ) : (
              <Linkedin className="h-8 w-8 text-text-accent" />
            )}
          </div>

          <h2 id="onboarding-title" className="text-h2 mb-2 text-text-primary">
            Bem-vindo ao FlashEng!
          </h2>
          <p className="mb-6 text-body-m text-text-tertiary">
            Para continuar, precisamos do seu perfil do LinkedIn. Cole a URL do
            seu perfil abaixo.
          </p>

          {success ? (
            <p className="text-body-m text-success">Perfil vinculado com sucesso!</p>
          ) : (
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <input
                  type="text"
                  value={linkedinUrl}
                  onChange={(e) => {
                    setLinkedinUrl(e.target.value)
                    setError(null)
                  }}
                  placeholder="https://linkedin.com/in/seu-perfil"
                  className="w-full rounded-lg border border-border-default bg-bg-subtle px-4 py-3 text-body-m text-text-primary placeholder:text-text-disabled focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {error && (
                  <p className="mt-2 text-body-s text-danger">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                variant="primary"
                className="w-full"
                disabled={loading || !linkedinUrl.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Continuar'
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
