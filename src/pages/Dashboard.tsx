import { useState, useEffect } from "react";
import { useResumes, useCredits } from "../hooks/useResumes";
import { useAuth } from "../contexts/AuthContext";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import ResumeGrid from "../components/dashboard/ResumeGrid";
import LinkedInOnboardingModal from "../components/LinkedInOnboardingModal";
import PixPayment from "../components/PixPayment";
import Button from "../components/ui/Button";
import { DollarSign, Zap, AlertCircle, RefreshCw, CreditCard } from "lucide-react";
import { api, type CreditPlanResponse } from "../lib/api";

export default function Dashboard() {
  const { resumes, loading, error, refresh } = useResumes();
  const { credits, refresh: refreshCredits } = useCredits();
  const { userProfile, updateUserProfile, session } = useAuth();
  const [activeSection, setActiveSection] = useState<"resumes" | "credits">(
    "resumes",
  );
  const [plans, setPlans] = useState<CreditPlanResponse[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    if (activeSection !== "credits") return;

    api.getCreditPlans()
      .then((data) => {
        const activePlans = data.filter(p => p.is_active);
        setPlans(activePlans);
        if (activePlans.length > 0) {
          setSelectedPlanId(activePlans[0].id);
        }
      })
      .catch(console.error)
      .finally(() => setPlansLoading(false));
  }, [activeSection]);

  useEffect(() => {
    if (userProfile && !userProfile.linkedin_url) {
      setShowOnboarding(true);
    }
  }, [userProfile]);

  const formatPrice = (cents: number) => (cents / 100).toFixed(2).replace('.', ',');

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

            {/* Plans */}
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-h3 mb-2 text-text-primary">
                Escolha um plano
              </h3>
              <p className="text-body-s text-text-tertiary mb-6">
                Selecione a quantidade de creditos que deseja comprar
              </p>

              {plansLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : plans.length === 0 ? (
                <p className="text-body-s text-text-tertiary py-8 text-center">Nenhum plano disponivel</p>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {plans.map((plan, index) => {
                    const isSelected = selectedPlanId === plan.id;
                    const isPopular = index === 1;
                    return (
                      <button
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`group relative flex flex-col items-center rounded-xl border-2 p-5 transition-all duration-200 overflow-visible ${
                          isSelected
                            ? 'border-primary bg-primary-subtle shadow-lg shadow-primary/10'
                            : 'border-border-default bg-bg-elevated hover:border-primary/50 hover:shadow-md hover:shadow-primary/5'
                        }`}
                      >
                        {isPopular && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-white shadow-md">
                            Mais popular
                          </span>
                        )}
                        <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${
                          isSelected ? 'bg-primary text-white' : 'bg-bg-subtle text-text-tertiary'
                        }`}>
                          <CreditCard className="h-6 w-6" />
                        </div>
                        <p className="text-2xl font-bold text-text-primary">{plan.credits_amount}</p>
                        <p className="text-body-s text-text-tertiary mb-3">creditos</p>
                        <div className={`mt-auto flex items-baseline gap-1 ${
                          isSelected ? 'text-primary' : 'text-text-secondary'
                        }`}>
                          <span className="text-body-m font-bold">R$</span>
                          <span className="text-h3 font-bold">{formatPrice(plan.price_brl_cents)}</span>
                        </div>
                        {isSelected && (
                          <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shadow-md">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="mt-6">
                <Button
                  onClick={() => setShowPaymentModal(true)}
                  size="md"
                  variant="primary"
                  className="w-full"
                  disabled={!selectedPlanId}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Comprar Creditos
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {showOnboarding && (
        <LinkedInOnboardingModal
          onSubmit={async (url) => {
            await updateUserProfile({ linkedin_url: url })
            setShowOnboarding(false)
          }}
        />
      )}

      {showPaymentModal && session && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="glass-card max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6">
            <PixPayment
              token={session.access_token}
              initialPlanId={selectedPlanId || undefined}
              onPaymentConfirmed={() => {
                setShowPaymentModal(false)
                refreshCredits()
              }}
            />
            <Button
              onClick={() => setShowPaymentModal(false)}
              variant="ghost"
              size="sm"
              className="mt-4 w-full"
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
