interface SkeletonProps {
  width?: string
  height?: string
  className?: string
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export default function Skeleton({
  width,
  height,
  className = '',
  rounded = 'md',
}: SkeletonProps) {
  const radiusClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  }

  return (
    <div
      className={`skeleton ${radiusClasses[rounded]} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}
