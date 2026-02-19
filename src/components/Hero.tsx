import { useAuth } from "../contexts/AuthContext";
import { Zap, Linkedin, Github, Sparkles } from "lucide-react";
import Badge from "./ui/Badge";
import Button from "./ui/Button";

export default function Hero() {
  const { user } = useAuth();
  const ctaLink = user ? "/generate" : "/login";
  return (
    <section className="dot-grid relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Background glow effects */}
      <div className="hero-glow top-[-200px] left-[20%] bg-accent-primary" />
      <div className="hero-glow top-[100px] right-[-100px] bg-accent-secondary" />
      <div className="hero-glow bottom-[-100px] left-[40%] bg-glow-cyan opacity-[0.08]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="animate-fade-in-up mb-8 flex justify-center">
            <Badge>Resumos Inteligentes para Profissionais de Tech</Badge>
          </div>

          {/* Headline */}
          <h1 className="text-display-l animate-fade-in-up animation-delay-200 mb-6 md:text-display-xl">
            Seu Curriculo{" "}
            <span className="gradient-text">Otimizado Para o Futuro</span> do
            Recrutamento
          </h1>

          {/* Subtext */}
          <p className="text-body-l animate-fade-in-up animation-delay-400 mx-auto mb-10 max-w-2xl text-text-secondary md:text-lg">
            Curriculos tradicionais do LinkedIn nao sao otimizados para os
            processos seletivos modernos com agentes de IA analisando perfis. O
            FlashEng gera um resumo profissional combinando seus dados mais
            atualizados do GitHub e LinkedIn.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up animation-delay-600 mb-16">
            <Button to={ctaLink} size="xl" variant="primary">
              Gerar Resumo Agora
            </Button>
          </div>

          {/* Trust line */}
          <div className="animate-fade-in-up animation-delay-600">
            <p className="text-label mb-6 text-text-disabled">
              Integrando com as melhores plataformas
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {/* LinkedIn */}
              <div className="flex items-center gap-2 text-text-disabled transition-colors hover:text-text-tertiary">
                <Linkedin className="h-5 w-5" />
                <span className="text-body-m font-medium">LinkedIn</span>
              </div>
              {/* GitHub */}
              <div className="flex items-center gap-2 text-text-disabled transition-colors hover:text-text-tertiary">
                <Github className="h-5 w-5" />
                <span className="text-body-m font-medium">GitHub</span>
              </div>
              {/* AI */}
              <div className="flex items-center gap-2 text-text-disabled transition-colors hover:text-text-tertiary">
                <Sparkles className="h-5 w-5" />
                <span className="text-body-m font-medium">IA Generativa</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-base to-transparent" />
    </section>
  );
}
