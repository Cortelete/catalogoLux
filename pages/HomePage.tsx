import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import ShimmerButton from '../components/ShimmerButton';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full min-h-[calc(100vh-160px)] px-4">
      <div 
        className="absolute inset-0 -z-10 h-full w-full bg-cover bg-center opacity-10" 
        style={{backgroundImage: "url('https://picsum.photos/seed/homepage-bg/1920/1080')"}}
      ></div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      
      <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-amber-50 leading-tight drop-shadow-lg uppercase hover:text-amber-200 transition-colors">
        Sua beleza inspira nosso melhor
      </h1>
      <p className="mt-6 max-w-2xl text-xs md:text-base text-amber-100/80">
        Bem-vinda ao Luxury Studio Joyci Almeida, onde cada detalhe é pensado para realçar sua essência com sofisticação e excelência.
      </p>
      <div className="mt-10">
        <ReactRouterDOM.NavLink to="/catalogo">
          <ShimmerButton className="text-sm px-8 py-3">
            Acesse já nosso catálogo digital
          </ShimmerButton>
        </ReactRouterDOM.NavLink>
      </div>
    </div>
  );
};

export default HomePage;