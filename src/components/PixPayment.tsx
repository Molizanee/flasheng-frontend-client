import { useState, useEffect, useCallback } from 'react'
import { Check, Loader2, Copy, CheckCircle, CreditCard } from 'lucide-react'
import { api, type PaymentResponse, type CreditPlanResponse } from '../lib/api'

interface PixPaymentProps {
  onPaymentConfirmed: () => void
  token: string
  initialPlanId?: string
}

export default function PixPayment({ onPaymentConfirmed, token, initialPlanId }: PixPaymentProps) {
  const [plans, setPlans] = useState<CreditPlanResponse[]>([])
  const [selectedPlan, setSelectedPlan] = useState<CreditPlanResponse | null>(null)
  const [payment, setPayment] = useState<PaymentResponse | null>(null)
  const [loadingPlans, setLoadingPlans] = useState(true)
  const [loadingPayment, setLoadingPayment] = useState(false)
  const [error, setError] = useState<string | null>(() => token ? null : 'Token de autenticacao nao encontrado')
  const [copied, setCopied] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (!token) return

    api
      .getCreditPlans()
      .then((data) => {
        const activePlans = data.filter(p => p.is_active)
        setPlans(activePlans)
        
        if (initialPlanId) {
          const matchingPlan = activePlans.find(p => p.id === initialPlanId)
          if (matchingPlan) {
            setSelectedPlan(matchingPlan)
            return
          }
        }
        
        if (activePlans.length > 0) {
          setSelectedPlan(activePlans[0])
        }
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Erro ao carregar planos')
      })
      .finally(() => setLoadingPlans(false))
  }, [token, initialPlanId])

  useEffect(() => {
    if (!token || !selectedPlan || payment) return

    setLoadingPayment(true)
    api
      .createPayment(token, selectedPlan.id)
      .then(setPayment)
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Erro ao criar pagamento')
      })
      .finally(() => setLoadingPayment(false))
  }, [token, selectedPlan, payment])

  const pollPaymentStatus = useCallback(async () => {
    if (!payment || confirmed) return

    try {
      const status = await api.getPaymentStatus(payment.id, token)

      if (status.status === 'PAID') {
        setConfirmed(true)
        setTimeout(() => onPaymentConfirmed(), 1500)
        return
      }

      if (status.status === 'EXPIRED' || status.status === 'CANCELLED') {
        setError('Pagamento expirado ou cancelado')
        return
      }
    } catch (err) {
      console.error('Error polling payment status:', err)
    }
  }, [payment, token, confirmed, onPaymentConfirmed])

  useEffect(() => {
    if (!payment || confirmed || error) return

    const interval = setInterval(pollPaymentStatus, 3000)
    return () => clearInterval(interval)
  }, [payment, confirmed, error, pollPaymentStatus])

  const handleCopyCode = async () => {
    if (!payment?.br_code) return

    try {
      await navigator.clipboard.writeText(payment.br_code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (loadingPlans || loadingPayment) {
    return (
      <div className="flex flex-col items-center">
        <Loader2 className="h-8 w-8 animate-spin text-text-tertiary" />
        <p className="mt-4 text-body-s text-text-tertiary">
          {loadingPlans ? 'Carregando planos...' : 'Criando pagamento...'}
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 rounded-full bg-danger-subtle p-3">
          <CheckCircle className="h-6 w-6 text-danger" />
        </div>
        <p className="text-body-s text-text-tertiary">{error}</p>
      </div>
    )
  }

  if (!selectedPlan || plans.length === 0) {
    return (
      <div className="flex flex-col items-center text-center">
        <p className="text-body-s text-text-tertiary">Nenhum plano disponivel</p>
      </div>
    )
  }

  const handleSelectPlan = (plan: CreditPlanResponse) => {
    setSelectedPlan(plan)
    setPayment(null)
    setError(null)
  }

  const formatPrice = (cents: number) => (cents / 100).toFixed(2).replace('.', ',')

  return (
    <div className="flex w-full max-w-md flex-col items-center">
      <h3 className="text-h3 mb-2 text-text-primary">Escolha um plano</h3>
      <p className="mb-6 text-body-s text-text-tertiary">
        Selecione a quantidade de creditos que deseja comprar
      </p>

      <div className="mb-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {plans.map((plan, index) => {
          const isSelected = selectedPlan?.id === plan.id
          const isPopular = index === 1
          return (
            <button
              key={plan.id}
              onClick={() => handleSelectPlan(plan)}
              disabled={loadingPayment}
              className={`group relative flex flex-col items-center rounded-xl border-2 p-4 transition-all duration-200 overflow-visible ${
                isSelected
                  ? 'border-primary bg-primary-subtle shadow-lg shadow-primary/10'
                  : 'border-border-default bg-bg-elevated hover:border-primary/50 hover:shadow-md hover:shadow-primary/5'
              } ${loadingPayment ? 'opacity-50 pointer-events-none' : ''}`}
            >
              {isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-white shadow-md">
                  Popular
                </span>
              )}
              <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                isSelected ? 'bg-primary text-white' : 'bg-bg-subtle text-text-tertiary'
              }`}>
                <CreditCard className="h-5 w-5" />
              </div>
              <p className="text-xl font-bold text-text-primary">{plan.credits_amount}</p>
              <p className="text-body-s text-text-tertiary mb-2">creditos</p>
              <div className={`mt-auto flex items-baseline gap-1 ${
                isSelected ? 'text-primary' : 'text-text-secondary'
              }`}>
                <span className="text-body-m font-bold">R$</span>
                <span className="text-lg font-bold">{formatPrice(plan.price_brl_cents)}</span>
              </div>
              {isSelected && (
                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white shadow-md">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {payment && (
        <>
          <h3 className="text-h3 mb-2 text-text-primary">Pagamento via PIX</h3>
          <p className="mb-6 text-body-s text-text-tertiary">
            Escaneie o QR Code abaixo para pagar R${formatPrice(payment.amount_cents)} e receber{' '}
            {payment.credits_purchased} credito{payment.credits_purchased !== 1 ? 's' : ''} de
            geracao.
          </p>

          {!confirmed ? (
            <>
              <div className="mb-6 rounded-2xl bg-white p-4">
                <img
                  src={payment.br_code_base64}
                  alt="QR Code PIX"
                  width={200}
                  height={200}
                />
              </div>

              <div className="mb-4 rounded-xl bg-bg-elevated px-6 py-3 text-center">
                <p className="text-2xl font-bold text-text-primary">R$ {formatPrice(payment.amount_cents)}</p>
                <p className="text-body-s text-text-tertiary">
                  {payment.credits_purchased} credito{payment.credits_purchased !== 1 ? 's' : ''} de
                  geracao
                </p>
              </div>

              <button
                onClick={handleCopyCode}
                className="mb-4 flex items-center gap-2 rounded-lg bg-bg-elevated px-4 py-2 text-body-s text-text-secondary transition-colors hover:bg-bg-subtle"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-success" />
                    <span className="text-success">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copiar codigo PIX</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 text-body-s text-text-tertiary">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Aguardando pagamento...</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-subtle">
                <Check className="h-8 w-8 text-success" />
              </div>
              <p className="text-lg font-semibold text-success">Pagamento Confirmado!</p>
              <p className="mt-1 text-body-s text-text-tertiary">Redirecionando para geracao...</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
