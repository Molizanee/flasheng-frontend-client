import { useState } from 'react'
import { z } from 'zod'
import { Briefcase, Globe, Linkedin, Github, Layers } from 'lucide-react'
import Button from '../components/ui/Button'
import { type GenerationOptions } from '../lib/generation-options'

const generationOptionsSchema = z.object({
  jobUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  language: z.enum(['pt-br', 'en']),
  platformContent: z.enum(['linkedin', 'github', 'mixed']),
})

interface GenerationOptionsFormProps {
  onSubmit: (options: GenerationOptions) => void
  onBack: () => void
  initialOptions?: Partial<GenerationOptions>
  loading?: boolean
}

export default function GenerationOptionsForm({
  onSubmit,
  onBack,
  initialOptions,
  loading = false,
}: GenerationOptionsFormProps) {
  const [jobUrl, setJobUrl] = useState(initialOptions?.jobUrl || '')
  const [language, setLanguage] = useState<'pt-br' | 'en'>(
    initialOptions?.language || 'en'
  )
  const [platformContent, setPlatformContent] = useState<
    'linkedin' | 'github' | 'mixed'
  >(initialOptions?.platformContent || 'mixed')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const result = generationOptionsSchema.safeParse({
      jobUrl: jobUrl.trim() || '',
      language,
      platformContent,
    })

    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    onSubmit({
      jobUrl: result.data.jobUrl || '',
      language: result.data.language,
      platformContent: result.data.platformContent,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-h1 mb-2 text-text-primary">
          Opções do Resumo
        </h1>
        <p className="text-body-m text-text-tertiary">
          Configure as opções para personalizar seu resumo
        </p>
      </div>

      {/* TODO: Uncomment when job URL is implemented */}
      {/* <div>
        <label className="mb-2 block text-body-s font-medium text-text-secondary">
          <Briefcase className="mr-2 inline h-4 w-4" />
          URL da Vaga (opcional)
        </label>
        <input
          type="text"
          value={jobUrl}
          onChange={(e) => {
            setJobUrl(e.target.value)
            setError(null)
          }}
          placeholder="https://linkedin.com/jobs/..."
          className="w-full rounded-lg border border-border-default bg-bg-subtle px-4 py-3 text-body-m text-text-primary placeholder:text-text-disabled focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <p className="mt-1 text-body-xs text-text-tertiary">
          Cole a URL da vaga do LinkedIn para personalização avançada
        </p>
      </div> */}

      <div>
        <label className="mb-3 block text-body-s font-medium text-text-secondary">
          <Globe className="mr-2 inline h-4 w-4" />
          Idioma do Resumo
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setLanguage('pt-br')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all ${
              language === 'pt-br'
                ? 'border-primary bg-primary-subtle text-primary'
                : 'border-border-default text-text-tertiary hover:border-primary/50'
            }`}
          >
            <span className="text-body-m font-medium">Português (BR)</span>
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all ${
              language === 'en'
                ? 'border-primary bg-primary-subtle text-primary'
                : 'border-border-default text-text-tertiary hover:border-primary/50'
            }`}
          >
            <span className="text-body-m font-medium">English</span>
          </button>
        </div>
      </div>

      <div>
        <label className="mb-3 block text-body-s font-medium text-text-secondary">
          <Layers className="mr-2 inline h-4 w-4" />
          Conteúdo da Plataforma
        </label>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setPlatformContent('linkedin')}
            className={`flex items-center gap-3 rounded-lg border-2 p-4 transition-all ${
              platformContent === 'linkedin'
                ? 'border-primary bg-primary-subtle'
                : 'border-border-default hover:border-primary/50'
            }`}
          >
            <Linkedin className="h-5 w-5 text-text-tertiary" />
            <div className="text-left">
              <p className="text-body-m font-medium text-text-primary">
                LinkedIn
              </p>
              <p className="text-body-xs text-text-tertiary">
                Foco no conteúdo do LinkedIn
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPlatformContent('github')}
            className={`flex items-center gap-3 rounded-lg border-2 p-4 transition-all ${
              platformContent === 'github'
                ? 'border-primary bg-primary-subtle'
                : 'border-border-default hover:border-primary/50'
            }`}
          >
            <Github className="h-5 w-5 text-text-tertiary" />
            <div className="text-left">
              <p className="text-body-m font-medium text-text-primary">
                GitHub
              </p>
              <p className="text-body-xs text-text-tertiary">
                Foco no conteúdo do GitHub
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPlatformContent('mixed')}
            className={`flex items-center gap-3 rounded-lg border-2 p-4 transition-all ${
              platformContent === 'mixed'
                ? 'border-primary bg-primary-subtle'
                : 'border-border-default hover:border-primary/50'
            }`}
          >
            <Layers className="h-5 w-5 text-text-tertiary" />
            <div className="text-left">
              <p className="text-body-m font-medium text-text-primary">
                Mixto (Recomendado)
              </p>
              <p className="text-body-xs text-text-tertiary">
                Combina LinkedIn + GitHub
              </p>
            </div>
          </button>
        </div>
      </div>

      {error && (
        <p className="text-body-s text-danger">{error}</p>
      )}

      <div className="flex gap-3">
        <Button
          type="button"
          onClick={onBack}
          size="lg"
          variant="secondary"
          className="flex-1"
        >
          Voltar
        </Button>
        <Button type="submit" size="lg" variant="primary" className="flex-1" disabled={loading}>
          {loading ? 'Carregando...' : 'Continuar'}
        </Button>
      </div>
    </form>
  )
}
