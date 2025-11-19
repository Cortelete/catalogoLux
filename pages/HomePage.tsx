
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import ShimmerButton from '../components/ShimmerButton';

const HomePage: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center h-full min-h-[calc(100vh-180px)] px-4 overflow-hidden">
      <div 
        className="absolute inset-0 -z-10 h-full w-full bg-cover bg-center opacity-10 scale-110" 
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1596495768390-e593749b5c87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}
      ></div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      
      <div className="animate-fade-in-up flex flex-col items-center">
        
        {/* Warning Banner */}
        <div className="bg-amber-900/30 border border-amber-500/40 p-4 rounded-lg mb-10 max-w-xl mx-auto backdrop-blur-sm shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          <div className="flex items-center justify-center space-x-3 text-amber-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-semibold tracking-wide text-sm md:text-base uppercase">ATENÇÃO: O CATÁLOGO ESTÁ EM REFORMA</span>
          </div>
        </div>

        <h2 className="font-serif text-xl md:text-2xl text-amber-200/90 tracking-wider">
          Excelência em Beleza e Cuidado
        </h2>
        <h1 className="font-display text-4xl md:text-5xl lg:text-7xl text-amber-50 mt-4 leading-tight drop-shadow-lg uppercase">
          Sua beleza inspira nosso melhor
        </h1>
        <p className="mt-8 max-w-2xl text-sm md:text-base text-amber-100/80">
          Bem-vinda ao Luxury Studio Joyci Almeida, onde cada detalhe é pensado para realçar sua essência com sofisticação e excelência.
        </p>
        <div className="mt-12">
          <ReactRouterDOM.NavLink to="/catalogo">
            <ShimmerButton className="text-sm px-10 py-4 uppercase tracking-wider">
              Acessar Catálogo
            </ShimmerButton>
          </ReactRouterDOM.NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
