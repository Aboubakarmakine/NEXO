interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  color?: 'teal' | 'white';
}

export default function SectionLabel({
  children,
  className = '',
  color = 'teal',
}: SectionLabelProps) {
  const colorClass = color === 'white' ? 'text-nexo-teal-light' : 'text-nexo-teal';

  return (
    <span
      className={`
        text-label
        ${colorClass}
        mb-4 block
        ${className}
      `}
    >
      {children}
    </span>
  );
}
