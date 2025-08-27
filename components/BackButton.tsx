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
      <span className="mr-2 text-xl transition-transform group-hover:-translate-x-1">&larr;</span>
      Voltar
    </button>
  );
};

export default BackButton;
