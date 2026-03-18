import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  dark?: boolean;
}

export default function Card({
  children,
  className = '',
  hover = true,
  dark = false,
}: CardProps) {
  const baseClasses = dark
    ? 'bg-[#1A2E3D] border border-nexo-teal/20'
    : 'bg-white border border-nexo-light-gray';

  if (hover) {
    return (
      <motion.div
        className={`
          rounded-card p-6 shadow-card
          ${baseClasses}
          ${className}
        `}
        whileHover={{
          y: -6,
          boxShadow: '0 12px 40px rgba(13,27,42,0.14)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={`
        rounded-card p-6 shadow-card
        ${baseClasses}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
