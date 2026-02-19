interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantClasses = {
    default: 'border-border-default bg-bg-elevated text-text-secondary',
    success: 'border-success/20 bg-success-subtle text-success',
    warning: 'border-warning/20 bg-warning-subtle text-warning',
    danger: 'border-danger/20 bg-danger-subtle text-danger',
    info: 'border-info/20 bg-info-subtle text-info',
  }

  const dotClasses = {
    default: 'bg-accent-primary shadow-[0_0_6px_rgba(59,130,246,0.8)]',
    success: 'bg-success shadow-[0_0_6px_rgba(34,197,94,0.8)]',
    warning: 'bg-warning shadow-[0_0_6px_rgba(245,158,11,0.8)]',
    danger: 'bg-danger shadow-[0_0_6px_rgba(239,68,68,0.8)]',
    info: 'bg-info shadow-[0_0_6px_rgba(99,102,241,0.8)]',
  }

  return (
    <span
      className={`text-label inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 backdrop-blur-sm ${variantClasses[variant]} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotClasses[variant]}`} />
      {children}
    </span>
  )
}
