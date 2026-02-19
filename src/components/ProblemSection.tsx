import { AlertTriangle, Code, Zap } from 'lucide-react'
import Badge from './ui/Badge'
import GlassCard from './ui/GlassCard'

const problems = [
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: 'Agentes de IA Filtram Candidatos',
    description:
      'Recrutadores modernos usam agentes de IA para analisar e filtrar curriculos automaticamente. Seu perfil do LinkedIn nao foi projetado para ser interpretado por essas ferramentas — e voce esta perdendo oportunidades sem saber.',
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: 'Seu GitHub Conta a Historia Real',
    description:
      'Seus repositorios, commits e READMEs contem suas contribuicoes mais recentes e relevantes. Recrutadores que analisam seu codigo veem um profissional diferente do que o LinkedIn mostra.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'FlashEng Une os Dois Mundos',
    description:
      'O FlashEng combina seu perfil LinkedIn com seus dados do GitHub para criar um resumo profissional que se destaca tanto para agentes de IA quanto para recrutadores humanos.',
  },
]

export default function ProblemSection() {
  return (
    <section id="problema" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <Badge className="mb-6">O Problema</Badge>
          <h2 className="text-h1 mb-6 md:text-display-l">
            Curriculos do LinkedIn{' '}
            <span className="gradient-text">Nao Foram Feitos Para IA</span>
          </h2>
          <p className="text-body-l text-text-secondary">
            O processo seletivo mudou. Empresas usam inteligencia artificial para
            analisar candidatos antes mesmo de um humano ver seu perfil. Seu
            curriculo precisa estar preparado.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((item, i) => (
            <GlassCard key={i} className="flex flex-col gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-subtle text-accent-secondary">
                {item.icon}
              </div>
              <h3 className="text-h3 text-text-primary">{item.title}</h3>
              <p className="text-body-m text-text-secondary">{item.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
