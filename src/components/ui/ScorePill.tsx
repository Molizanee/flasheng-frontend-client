interface ScorePillProps {
  score: number
  className?: string
}

export default function ScorePill({ score, className = '' }: ScorePillProps) {
  const tier =
    score >= 90 ? 'success' : score >= 75 ? 'warning' : 'danger'

  const tierClasses = {
    success: 'text-success bg-success-subtle border-success/20',
    warning: 'text-warning bg-warning-subtle border-warning/20',
    danger: 'text-danger bg-danger-subtle border-danger/20',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-xs font-medium ${tierClasses[tier]} ${className}`}
    >
      {score}%
    </span>
  )
}
