import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  // Padding rule: Horizontal padding must be exactly 2x vertical padding
  const sizeStyles = {
    sm: 'py-2 px-4 text-xs font-semibold rounded-md gap-1.5',
    md: 'py-2.5 px-5 text-sm font-semibold rounded-lg gap-2',
    lg: 'py-3.5 px-7 text-base font-bold rounded-lg gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#007360] text-white hover:bg-[#43AB98] active:bg-[#005c4d] shadow-xs hover:shadow-md transition-colors border border-transparent',
    secondary:
      'bg-[#43AB98]/15 text-[#007360] hover:bg-[#43AB98]/25 active:bg-[#43AB98]/35 border border-[#43AB98]/30 transition-colors shadow-2xs hover:shadow-xs',
    outline:
      'bg-transparent text-[#007360] border-2 border-[#007360] hover:bg-[#007360]/10 active:bg-[#007360]/20 transition-colors',
    ghost:
      'bg-transparent text-[#333333] hover:text-[#007360] hover:bg-[#007360]/8 active:bg-[#007360]/15 transition-colors',
    danger:
      'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition-colors shadow-xs hover:shadow-md',
  };

  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02, transition: { duration: 0.15, ease: 'easeOut' } }}
      whileTap={disabled ? undefined : { scale: 0.98, transition: { duration: 0.1 } }}
      className={`inline-flex items-center justify-center whitespace-nowrap select-none focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyle} ${className}`}
      disabled={disabled}
      {...(props as any)}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </motion.button>
  );
};
