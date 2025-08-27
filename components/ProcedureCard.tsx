
import React from 'react';
import { Procedure } from '../types';

interface ProcedureCardProps {
  procedure: Procedure;
  onClick: (procedure: Procedure) => void;
}

const ProcedureCard: React.FC<ProcedureCardProps> = ({ procedure, onClick }) => {
  const cardClasses = `
    relative group w-full h-72 md:h-80 rounded-lg overflow-hidden border-2 border-transparent 
    transition-all duration-500 ease-in-out cursor-pointer
    hover:border-amber-200/50 hover:shadow-2xl hover:shadow-amber-900/50
    ${procedure.comingSoon ? 'opacity-50 cursor-not-allowed' : 'shimmer-effect'}
  `;

  return (
    <div className={cardClasses} onClick={() => !procedure.comingSoon && onClick(procedure)}>
      <img src={procedure.images[0]} alt={procedure.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 p-6 text-white w-full">
        <h3 className="font-serif text-base md:text-xl font-semibold text-amber-50 drop-shadow-md">{procedure.name}</h3>
        
        <div className="mt-1 text-xs md:text-sm text-amber-100/80">
          {procedure.price.includes('|')
            ? procedure.price.split('|').map((part, i) => <span key={i} className="block leading-tight">{part.trim()}</span>)
            : procedure.price
          }
        </div>
        
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center text-amber-200 text-sm">
          <span>{procedure.comingSoon ? 'Disponível em breve' : 'Ver detalhes e agendar'}</span>
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1 font-bold text-lg">&rarr;</span>
        </div>
      </div>

      {procedure.comingSoon && (
        <div className="absolute top-4 right-4 bg-amber-200 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
          EM BREVE
        </div>
      )}
    </div>
  );
};

export default ProcedureCard;
