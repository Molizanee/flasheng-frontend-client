import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  to,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  loading = false,
}: ButtonProps) {
  const sizeClasses = {
    sm: "h-8 px-3 text-body-s gap-1.5",
    md: "h-10 px-5 text-body-m gap-2",
    lg: "h-12 px-6 text-body-l gap-2.5",
    xl: "h-14 px-8 text-body-l gap-3",
  };

  const variantClasses = {
    primary: "btn-cta text-text-primary font-semibold animate-pulse-glow",
    secondary:
      "bg-bg-elevated text-text-primary border border-border-default hover:bg-bg-subtle hover:border-border-active transition-all duration-[var(--duration-fast)]",
    ghost:
      "bg-transparent text-text-secondary border border-border-default hover:bg-bg-subtle hover:border-border-active hover:text-text-primary transition-all duration-[var(--duration-fast)]",
    outline:
      "bg-transparent text-text-primary border border-border-default hover:bg-bg-elevated hover:border-border-active transition-all duration-[var(--duration-fast)]",
  };

  const base = `relative flex inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus-visible:outline-2 focus-visible:outline-accent-primary focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = loading ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="relative z-10">{children}</span>
    </>
  ) : (
    <span className="relative z-10">{children}</span>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={base}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={base}
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
}
