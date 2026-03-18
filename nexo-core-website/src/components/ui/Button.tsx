import { motion, type HTMLMotionProps } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'text' | 'white';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  href?: string;
  showArrow?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-nexo-teal to-nexo-teal-light text-white shadow-btn hover:shadow-lg',
  secondary:
    'border-2 border-nexo-teal text-nexo-teal bg-transparent hover:bg-nexo-teal/5',
  text: 'text-nexo-teal bg-transparent hover:underline underline-offset-4',
  white:
    'bg-white text-nexo-teal shadow-btn hover:shadow-lg',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  showArrow = false,
  fullWidth = false,
  isLoading = false,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `
    inline-flex items-center justify-center gap-2 
    font-body font-semibold 
    rounded-btn 
    transition-all duration-250 
    cursor-pointer 
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        {...motionProps}
      >
        {isLoading ? (
          <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
        {showArrow && !isLoading && <ArrowRight className="w-4 h-4" />}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      disabled={isLoading}
      {...motionProps}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
      {showArrow && !isLoading && <ArrowRight className="w-4 h-4" />}
    </motion.button>
  );
}
