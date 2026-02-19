interface InlineCodeProps {
  children: React.ReactNode
  className?: string
}

export default function InlineCode({ children, className = '' }: InlineCodeProps) {
  return (
    <code
      className={`rounded-sm bg-bg-subtle px-1.5 py-0.5 font-mono text-[13px] text-text-code ${className}`}
    >
      {children}
    </code>
  )
}
