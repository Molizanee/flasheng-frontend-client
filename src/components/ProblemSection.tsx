import { Clock, Unplug, Sparkles } from 'lucide-react'
import Badge from './ui/Badge'
import GlassCard from './ui/GlassCard'

const problems = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Montar um Currículo Leva Horas',
    description:
      'Você gasta tempo formatando, escrevendo e revisando um currículo que nunca reflete de verdade suas habilidades mais recentes. E quando finalmente termina, ele já está desatualizado.',
  },
  {
    icon: <Unplug className="h-6 w-6" />,
    title: 'LinkedIn e GitHub Estão Desconectados',
    description:
      'Suas melhores provas de trabalho estão espalhadas: experiências no LinkedIn, código no GitHub. Nenhum currículo tradicional une as duas fontes de forma inteligente.',
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'O core Resolve Isso',
    description:
      'O core automatiza a leitura do seu perfil LinkedIn e GitHub, mesclando tudo em um currículo otimizado — em português ou inglês — pronto para você se candidatar rápido.',
  },
]

export default function ProblemSection() {
  return (
    <section id="problema" className="relative py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <Badge className="mb-6">O Problema</Badge>
          <h2 className="text-h1 mb-6 md:text-display-l">
            Montar um Bom Currículo{' '}
            <span className="gradient-text">Leva Horas</span>
          </h2>
          <p className="text-body-l text-text-secondary">
            Você sabe que precisa de um currículo atualizado, mas o processo
            manual é lento, repetitivo e nunca mostra seu verdadeiro potencial.
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
