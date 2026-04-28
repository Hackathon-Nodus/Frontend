import type { ReactNode } from 'react';

import { cn } from '../../utils/cn';

type BadgeVariant = 'default' | 'success' | 'info' | 'neutral';
type BadgeTone = 'accent' | 'success' | 'warning' | 'neutral';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  tone?: BadgeTone;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-surface-gray text-content-slate',
  success: 'bg-green-50 text-green-700',
  info: 'bg-blue-50 text-blue-700',
  neutral: 'bg-gray-100 text-gray-500',
};

const toneClasses: Record<BadgeTone, string> = {
  accent: 'border border-indigo-200 bg-indigo-50 text-indigo-700',
  success: 'border border-emerald-200 bg-emerald-50 text-emerald-700',
  warning: 'border border-amber-200 bg-amber-50 text-amber-700',
  neutral: 'border border-slate-200 bg-slate-100 text-slate-600',
};

export function Badge({
  children,
  className,
  tone,
  variant = 'default',
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]',
        tone ? toneClasses[tone] : variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
