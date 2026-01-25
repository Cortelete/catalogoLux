
import React from 'react';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const ShimmerButton: React.FC<ShimmerButtonProps> = ({ children, className = '', onClick, variant = 'primary', ...props }) => {
  const baseClasses = "relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all duration-300 rounded-lg group";

  const variantClasses = {
    primary: "text-amber-50 bg-gray-800 border border-amber-50/20 glow-effect",
    secondary: "text-amber-200 bg-transparent border border-amber-200/50 hover:bg-amber-400/10"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default ShimmerButton;
