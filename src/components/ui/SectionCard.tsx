interface SectionCardProps {
  children: React.ReactNode
  className?: string
}

export default function SectionCard({ children, className = '' }: SectionCardProps) {
  return (
    <div
      className={`rounded-lg bg-bg-elevated p-6 shadow-md ${className}`}
    >
      {children}
    </div>
  )
}
