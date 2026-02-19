import { FilePlus } from 'lucide-react'
import ResumeCard from './ResumeCard'
import type { MyResumeItem } from '../../lib/api'

interface ResumeGridProps {
  resumes: MyResumeItem[]
  loading?: boolean
}

export default function ResumeGrid({ resumes, loading }: ResumeGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="glass-card flex flex-col overflow-hidden rounded-lg"
          >
            <div className="h-48 animate-pulse bg-bg-elevated/50" />
            <div className="flex gap-2 p-4">
              <div className="h-9 flex-1 animate-pulse rounded-md bg-bg-elevated" />
              <div className="h-9 flex-1 animate-pulse rounded-md bg-bg-elevated" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (resumes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-bg-elevated">
          <FilePlus className="h-10 w-10 text-text-disabled" />
        </div>
        <h3 className="text-h3 mb-2 text-text-tertiary">
          Nenhum resumo gerado
        </h3>
        <p className="text-body-m max-w-sm text-text-disabled">
          Clique em "Gerar Novo Resumo" para criar seu primeiro resumo
          profissional otimizado com IA.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {resumes.map((resume, index) => (
        <ResumeCard key={index} resume={resume} />
      ))}
    </div>
  )
}
