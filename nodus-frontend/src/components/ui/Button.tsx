import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-indigo-electric text-white hover:bg-indigo-600',
  secondary:
    'border border-outline-subtle bg-surface-white text-content-charcoal hover:bg-surface-gray',
};

const sizeClasses: Record<ButtonSize, string> = {
  md: 'px-4 py-2',
  lg: 'h-14 px-6 text-sm',
};

export function Button({
  children,
  className,
  size = 'md',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-nodus font-medium transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
