import { Link } from 'react-router-dom'
import { FilePlus, Sparkles } from 'lucide-react'
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
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent-primary/10 ring-1 ring-primary/10">
          <FilePlus className="h-11 w-11 text-primary" />
        </div>
        <h3 className="text-h3 mb-3 text-text-primary">
          Nenhum resumo ainda
        </h3>
        <p className="text-body-m max-w-md text-text-tertiary mb-8">
          Crie seu primeiro resumo profissional otimizado com IA em poucos
          cliques. É rápido e fácil!
        </p>
        <Link
          to="/generate"
          className="inline-flex items-center gap-2 rounded-lg bg-accent-primary px-6 py-3 text-body-m font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110"
        >
          <Sparkles className="h-5 w-5" />
          Gerar Meu Primeiro Resumo
        </Link>
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
