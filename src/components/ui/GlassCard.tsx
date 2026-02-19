interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={`glass-card rounded-lg p-6 ${hover ? '' : 'hover:transform-none hover:shadow-none'} ${className}`}
    >
      {children}
    </div>
  )
}
