
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

const BackButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const navigate = ReactRouterDOM.useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`inline-flex items-center text-sm text-amber-200/80 hover:text-amber-200 transition-colors group ${className}`}
      aria-label="Voltar para a página anterior"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Voltar
    </button>
  );
};

export default BackButton;
