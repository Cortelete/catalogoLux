
import React from 'react';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ShimmerButton: React.FC<ShimmerButtonProps> = ({ children, className = '', onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-amber-50 transition-all duration-500 bg-gray-800 border border-amber-50/20 rounded-lg group shimmer-effect ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default ShimmerButton;
