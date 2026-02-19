import { Github, Linkedin, Sparkles, TrendingUp } from 'lucide-react'
import Badge from './ui/Badge'
import GlassCard from './ui/GlassCard'

const features = [
  {
    icon: <Github className="h-7 w-7" />,
    title: 'Dados Reais do GitHub',
    description:
      'Repositorios, commits, pull requests e READMEs analisados para extrair suas habilidades tecnicas reais e contribuicoes mais recentes.',
  },
  {
    icon: <Linkedin className="h-7 w-7" />,
    title: 'Perfil LinkedIn Integrado',
    description:
      'Experiencia profissional, formacao, certificacoes e recomendacoes do seu perfil LinkedIn integrados automaticamente.',
  },
  {
    icon: <Sparkles className="h-7 w-7" />,
    title: 'Otimizado para Agentes de IA',
    description:
      'Formatacao e estrutura projetadas para que agentes de IA de recrutamento consigam interpretar e ranquear seu perfil com precisao.',
  },
  {
    icon: <TrendingUp className="h-7 w-7" />,
    title: 'Sempre Atualizado',
    description:
      'Baseado nos seus dados mais recentes. Cada novo commit, projeto ou atualizacao no LinkedIn e refletida no seu resumo.',
  },
]

export default function Features() {
  return (
    <section id="diferenciais" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <Badge className="mb-6">Diferenciais</Badge>
          <h2 className="text-h1 mb-6 md:text-display-l">
            Construido Para{' '}
            <span className="gradient-text">Destacar Voce</span>
          </h2>
          <p className="text-body-l mx-auto max-w-2xl text-text-secondary">
            Cada detalhe foi pensado para criar o resumo profissional mais
            completo e otimizado possivel.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, i) => (
            <GlassCard key={i} className="flex gap-5 p-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-accent-secondary">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-h3 mb-2 text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-body-m text-text-secondary">
                  {feature.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
