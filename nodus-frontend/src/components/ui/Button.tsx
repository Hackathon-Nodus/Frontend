interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-indigo-electric text-white hover:bg-indigo-600',
    secondary: 'bg-surface-white text-content-charcoal border border-outline-subtle hover:bg-surface-gray',
  };

  return (
    <button
      className={`px-4 py-2 rounded-nodus font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
