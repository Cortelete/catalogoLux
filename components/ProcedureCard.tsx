
import React from 'react';
import { Procedure } from '../types';

const ProcedureCard: React.FC<{ procedure: Procedure; onClick: (procedure: Procedure) => void; }> = ({ procedure, onClick }) => {
  const cardClasses = `
    relative group w-full h-72 md:h-80 rounded-lg overflow-hidden border border-amber-50/10 
    transition-all duration-500 ease-in-out cursor-pointer
    hover:border-amber-300/60 hover:shadow-2xl hover:shadow-amber-900/50 hover:-translate-y-2
    ${procedure.comingSoon ? 'opacity-50 cursor-not-allowed' : 'bg-gray-900'}
  `;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null; 
    e.currentTarget.src = `https://placehold.co/600x800/1f2937/fbbf24?text=${encodeURIComponent(procedure.name)}`;
  };

  return (
    <div className={cardClasses} onClick={() => !procedure.comingSoon && onClick(procedure)} role="button" tabIndex={procedure.comingSoon ? -1 : 0}>
      <img 
        src={procedure.images[0]} 
        alt={procedure.name} 
        onError={handleImageError}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 p-5 text-white w-full">
        <h3 className="font-serif text-lg md:text-xl font-semibold text-amber-50 drop-shadow-md">{procedure.name}</h3>
        
        <div className="mt-2 text-sm text-amber-100/80">
          {procedure.price.includes('|')
            ? procedure.price.split('|').map((part, i) => <span key={i} className="block leading-tight">{part.trim()}</span>)
            : procedure.price
          }
        </div>
        
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center text-amber-200 text-sm">
          <span>{procedure.comingSoon ? 'Disponível em breve' : 'Ver detalhes e agendar'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {procedure.comingSoon && (
        <div className="absolute top-4 right-4 bg-amber-200 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          EM BREVE
        </div>
      )}
    </div>
  );
};

export default ProcedureCard;
