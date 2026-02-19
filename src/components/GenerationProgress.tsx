import { useState, useEffect, useCallback } from 'react'
import { api } from '../lib/api'
import type { ResumeJobResponse } from '../lib/api'
import { Loader2, Check, XCircle } from 'lucide-react'

interface GenerationProgressProps {
  jobId: string
  onComplete: (job: ResumeJobResponse) => void
  onError: (error: string) => void
}

export default function GenerationProgress({
  jobId,
  onComplete,
  onError,
}: GenerationProgressProps) {
  const [status, setStatus] = useState('pending')
  const [progress, setProgress] = useState(0)

  const pollStatus = useCallback(async () => {
    try {
      const job = await api.getJobStatus(jobId)
      setStatus(job.status)

      if (job.status === 'completed') {
        setProgress(100)
        onComplete(job)
        return true
      }

      if (job.status === 'failed') {
        onError(job.error || 'Erro ao gerar resumo')
        return true
      }

      return false
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Erro ao verificar status')
      return true
    }
  }, [jobId, onComplete, onError])

  useEffect(() => {
    let cancelled = false

    // Simulate progress bar while waiting
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev
        return prev + Math.random() * 15
      })
    }, 800)

    const poll = async () => {
      if (cancelled) return
      const done = await pollStatus()
      if (!done && !cancelled) {
        setTimeout(poll, 3000) // Poll every 3 seconds
      }
    }

    poll()

    return () => {
      cancelled = true
      clearInterval(progressTimer)
    }
  }, [pollStatus])

  const statusMessages: Record<string, string> = {
    pending: 'Preparando geracao...',
    processing: 'Analisando seus dados do GitHub e LinkedIn...',
    completed: 'Resumo gerado com sucesso!',
    failed: 'Erro ao gerar resumo',
  }

  const statusIcons: Record<string, React.ReactNode> = {
    pending: <Loader2 className="h-8 w-8 animate-spin text-text-accent" />,
    processing: <Loader2 className="h-8 w-8 animate-spin text-text-accent" />,
    completed: <Check className="h-8 w-8 text-success" />,
    failed: <XCircle className="h-8 w-8 text-danger" />,
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6">
        {statusIcons[status] || statusIcons.pending}
      </div>

      <h3 className="text-h3 mb-2 text-text-primary">
        {status === 'completed' ? 'Pronto!' : 'Gerando seu Resumo'}
      </h3>
      <p className="mb-6 text-body-s text-text-tertiary">
        {statusMessages[status] || statusMessages.pending}
      </p>

      {/* Progress bar */}
      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-bg-subtle">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <p className="text-body-s text-text-disabled">
        {status === 'completed'
          ? 'Redirecionando para o dashboard...'
          : 'Isso pode levar alguns minutos'}
      </p>
    </div>
  )
}
