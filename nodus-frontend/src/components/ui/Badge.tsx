interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'info' | 'neutral';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-surface-gray text-content-slate',
    success: 'bg-green-50 text-green-700',
    info: 'bg-blue-50 text-blue-700',
    neutral: 'bg-gray-100 text-gray-500',
  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${variants[variant]}`}>
      {children}
    </span>
  );
}
