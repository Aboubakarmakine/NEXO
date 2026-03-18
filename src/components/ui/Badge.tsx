type BadgeVariant = 'core' | 'coming-soon' | 'active' | 'infra' | 'chain' | 'money';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  core: 'bg-nexo-teal/10 text-nexo-teal border-nexo-teal/20',
  'coming-soon': 'bg-nexo-mid-gray/10 text-nexo-mid-gray border-nexo-mid-gray/20',
  active: 'bg-nexo-green/10 text-nexo-green border-nexo-green/20',
  infra: 'bg-nexo-green-dark/10 text-nexo-green-dark border-nexo-green-dark/20',
  chain: 'bg-nexo-purple/10 text-nexo-purple border-nexo-purple/20',
  money: 'bg-nexo-amber/10 text-nexo-amber border-nexo-amber/20',
};

export default function Badge({
  variant = 'core',
  children,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-3 py-1
        rounded-pill
        border
        font-mono text-[11px] font-bold uppercase tracking-widest
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
