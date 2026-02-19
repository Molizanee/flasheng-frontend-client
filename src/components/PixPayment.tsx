import { useState, useEffect, useCallback } from 'react'
import { Check, Loader2, Copy, CheckCircle } from 'lucide-react'
import { api, type PaymentResponse } from '../lib/api'

interface PixPaymentProps {
  onPaymentConfirmed: () => void
  token: string
}

export default function PixPayment({ onPaymentConfirmed, token }: PixPaymentProps) {
  const [payment, setPayment] = useState<PaymentResponse | null>(null)
  const [loading, setLoading] = useState(() => !!token)
  const [error, setError] = useState<string | null>(() => token ? null : 'Token de autenticacao nao encontrado')
  const [copied, setCopied] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (!token) return

    api
      .createPayment(token)
      .then(setPayment)
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Erro ao criar pagamento')
      })
      .finally(() => setLoading(false))
  }, [token])

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

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <Loader2 className="h-8 w-8 animate-spin text-text-tertiary" />
        <p className="mt-4 text-body-s text-text-tertiary">Criando pagamento...</p>
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

  if (!payment) {
    return (
      <div className="flex flex-col items-center text-center">
        <p className="text-body-s text-text-tertiary">Falha ao carregar pagamento</p>
      </div>
    )
  }

  const amountReais = (payment.amount_cents / 100).toFixed(2).replace('.', ',')

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-h3 mb-2 text-text-primary">Pagamento via PIX</h3>
      <p className="mb-6 text-body-s text-text-tertiary">
        Escaneie o QR Code abaixo para pagar R${amountReais} e receber{' '}
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
            <p className="text-2xl font-bold text-text-primary">R$ {amountReais}</p>
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
    </div>
  )
}
