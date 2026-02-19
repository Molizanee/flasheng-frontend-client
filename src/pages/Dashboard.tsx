import { useState } from "react";
import { useResumes, useCredits } from "../hooks/useResumes";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import ResumeGrid from "../components/dashboard/ResumeGrid";
import Button from "../components/ui/Button";
import { Plus, DollarSign, Zap, AlertCircle, RefreshCw } from "lucide-react";

export default function Dashboard() {
  const { resumes, loading, error, refresh } = useResumes();
  const { credits } = useCredits();
  const [activeSection, setActiveSection] = useState<"resumes" | "credits">(
    "resumes",
  );

  return (
    <div className="min-h-screen bg-bg-void">
      <DashboardNavbar
        credits={credits}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {activeSection === "resumes" && (
          <>
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-h1 text-text-primary">Seus Resumos</h1>
                <p className="mt-1 text-body-s text-text-tertiary">
                  {loading
                    ? "Carregando..."
                    : resumes.length === 0
                      ? "Nenhum resumo gerado ainda"
                      : `${resumes.length} resumo${resumes.length !== 1 ? "s" : ""} gerado${resumes.length !== 1 ? "s" : ""}`}
                </p>
              </div>
              <Button to="/generate" size="md" variant="primary">
                Gerar Novo Resumo
              </Button>
            </div>

            {/* Error state */}
            {error && (
              <div className="mb-6 flex items-center gap-3 rounded-lg border border-danger/20 bg-danger-subtle px-4 py-3">
                <AlertCircle className="h-5 w-5 shrink-0 text-danger" />
                <p className="flex-1 text-body-s text-danger">{error}</p>
                <button
                  onClick={refresh}
                  className="flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-body-s font-medium text-danger transition-colors hover:bg-danger/10"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Tentar novamente</span>
                </button>
              </div>
            )}

            {/* Grid */}
            <ResumeGrid resumes={resumes} loading={loading} />
          </>
        )}

        {activeSection === "credits" && (
          <div className="mx-auto max-w-2xl">
            <h1 className="text-h1 mb-8 text-text-primary">Seus Creditos</h1>

            {/* Credits card */}
            <div className="glass-card mb-8 rounded-2xl p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-s text-text-tertiary">
                    Creditos Disponiveis
                  </p>
                  <p className="mt-1 text-5xl font-bold text-text-primary">
                    {credits}
                  </p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-subtle">
                  <DollarSign className="h-8 w-8 text-text-accent" />
                </div>
              </div>
            </div>

            {/* Pricing info */}
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-h3 mb-4 text-text-primary">
                Como funcionam os creditos
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-xs font-bold text-text-accent">
                    1
                  </div>
                  <div>
                    <p className="text-body-m font-medium text-text-primary">
                      1 credito = 1 geracao de resumo
                    </p>
                    <p className="text-body-s text-text-tertiary">
                      Cada credito permite gerar um resumo profissional completo
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-xs font-bold text-text-accent">
                    2
                  </div>
                  <div>
                    <p className="text-body-m font-medium text-text-primary">
                      1 credito = R$ 10,00
                    </p>
                    <p className="text-body-s text-text-tertiary">
                      Pagamento via PIX de forma rapida e segura
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-xs font-bold text-text-accent">
                    3
                  </div>
                  <div>
                    <p className="text-body-m font-medium text-text-primary">
                      Download em PDF e HTML
                    </p>
                    <p className="text-body-s text-text-tertiary">
                      Baixe seus resumos nos dois formatos a qualquer momento
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  to="/generate"
                  size="md"
                  variant="primary"
                  className="w-full"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Comprar Credito e Gerar Resumo
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
