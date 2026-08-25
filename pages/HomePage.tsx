
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import ShimmerButton from '../components/ShimmerButton';
import { Procedure, Category, SubCategory } from '../types';
import { CATEGORIES } from '../public/data/procedures';

interface HomePageProps {
  onProcedureSelect?: (procedure: Procedure, procedureList?: Procedure[]) => void;
}

const CATEGORY_IMAGES: Record<string, string> = {
  'lash': '/img/categories/EC.png',
  'designSobrancelhas': '/img/categories/S.png',
  'limpezaPele': '/img/categories/LP.png',
  'laser': '/img/categories/RL.png'
};

const HomePage: React.FC<HomePageProps> = ({ onProcedureSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleOpenCategory = (category: Category) => {
    setSelectedCategory(category);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseCategory = () => {
    setSelectedCategory(null);
    document.body.style.overflow = 'auto';
  };

  const getCategoryProcedures = (category: Category | null): Procedure[] => {
    if (!category) return [];
    if (category.procedures) return category.procedures;
    if (category.subCategories) {
      return category.subCategories.flatMap(sub => sub.procedures);
    }
    return [];
  };

  const handleSelectProcedure = (proc: Procedure) => {
    if (onProcedureSelect) {
      const allProcs = getCategoryProcedures(selectedCategory);
      onProcedureSelect(proc, allProcs);
    }
  };

  const handleCategoryImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, categoryName: string) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://placehold.co/1000x800/1f2937/fbbf24?text=${encodeURIComponent(categoryName)}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Banner */}
      <div className="relative flex flex-col items-center justify-center text-center py-24 px-4 overflow-hidden border-b border-white/5">
        <div 
          className="absolute inset-0 -z-10 h-full w-full bg-cover bg-center opacity-10 scale-110" 
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1596495768390-e593749b5c87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}
        ></div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-t from-[#0d0d0d] via-black/50 to-transparent"></div>
        
        <div className="animate-fade-in-up flex flex-col items-center">
          <h2 className="font-serif text-lg md:text-xl text-amber-200/90 tracking-wider">
            Excelência em Beleza e Cuidado
          </h2>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-amber-50 mt-4 leading-tight drop-shadow-lg uppercase">
            Sua beleza inspira nosso melhor
          </h1>
          <p className="mt-6 max-w-2xl text-sm md:text-base text-amber-100/80">
            Bem-vinda ao Luxury Studio Joyci Almeida, onde cada detalhe é pensado para realçar sua essência com sofisticação e excelência.
          </p>
        </div>
      </div>

      {/* Catalog Section */}
      <div className="container mx-auto py-12 md:py-20 px-4 flex flex-col animate-fade-in">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-amber-100">Catálogo de Serviços</h2>
          <p className="mt-4 text-amber-100/70">
            Escolha uma área para ver os procedimentos disponíveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
          {CATEGORIES.map((category) => (
            <div 
              key={category.id}
              onClick={() => handleOpenCategory(category)}
              className="group relative h-64 md:h-80 rounded-2xl overflow-hidden cursor-pointer border border-amber-50/10 hover:border-amber-300/50 transition-all duration-500 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:-translate-y-1"
            >
              <div className="absolute inset-0">
                 <img 
                   src={CATEGORY_IMAGES[category.id]} 
                   alt={category.name}
                   onError={(e) => handleCategoryImageError(e, category.name)}
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="font-serif text-3xl text-amber-50 mb-2 drop-shadow-md group-hover:text-amber-200 transition-colors">
                  {category.name}
                </h3>
                <div className="flex items-center text-sm text-amber-100/80 uppercase tracking-wider font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  Ver opções
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Lista de Procedimentos */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 animate-fade-in">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={handleCloseCategory}
          ></div>

          <div className="relative w-[95%] md:w-full max-w-2xl bg-[#0F0F0F] rounded-2xl border border-amber-50/20 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-fade-in-up">
            
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-amber-50/10 bg-[#141414]">
              <h2 className="font-serif text-xl md:text-3xl text-amber-100 truncate pr-2">{selectedCategory.name}</h2>
              <button 
                onClick={handleCloseCategory}
                className="p-2 text-amber-100/60 hover:text-amber-200 hover:bg-white/5 rounded-full transition-colors flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto p-3 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-amber-900/50 scrollbar-track-transparent">
              
              {selectedCategory.subCategories && selectedCategory.subCategories.map((sub: SubCategory) => (
                <div key={sub.id} className="animate-fade-in">
                  <h3 className="text-amber-200/50 text-xs font-bold uppercase tracking-widest mb-3 ml-1 border-l-2 border-amber-500/50 pl-3">
                    {sub.name}
                  </h3>
                  <div className="space-y-3">
                    {sub.procedures.map((proc) => (
                      <ProcedureListItem 
                        key={proc.id} 
                        procedure={proc} 
                        onClick={() => handleSelectProcedure(proc)} 
                      />
                    ))}
                  </div>
                </div>
              ))}

              {selectedCategory.procedures && (
                 <div className="space-y-3 animate-fade-in">
                    {selectedCategory.procedures.map((proc) => (
                      <ProcedureListItem 
                        key={proc.id} 
                        procedure={proc} 
                        onClick={() => handleSelectProcedure(proc)} 
                      />
                    ))}
                 </div>
              )}

              {(!selectedCategory.subCategories?.length && !selectedCategory.procedures?.length) && (
                <div className="text-center py-12 text-amber-100/40">
                  <p>Em breve novidades nesta categoria.</p>
                </div>
              )}
            </div>
            
             <div className="p-3 md:p-4 border-t border-amber-50/5 bg-[#141414] text-center">
                <p className="text-[10px] md:text-xs text-amber-100/30">Luxury Studio Joyci Almeida</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProcedureListItem: React.FC<{ procedure: Procedure; onClick: () => void }> = ({ procedure, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        group relative flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 
        hover:bg-amber-500/10 hover:border-amber-500/30 transition-all duration-300 cursor-pointer gap-4
        ${procedure.comingSoon ? 'opacity-50 pointer-events-none grayscale' : ''}
      `}
    >
      <div className="flex items-start md:items-center gap-4 w-full md:w-auto">
        <div className="h-14 w-14 md:h-12 md:w-12 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0 border border-white/10 group-hover:border-amber-400/50 transition-colors">
          <img 
            src={procedure.images[0]} 
            alt="" 
            className="w-full h-full object-cover" 
            onError={(e) => {
                e.currentTarget.onerror = null; 
                e.currentTarget.src = `https://placehold.co/200x200/1f2937/fbbf24?text=${encodeURIComponent(procedure.name.substring(0,2))}`;
            }}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-amber-50 group-hover:text-amber-100 transition-colors text-base md:text-lg">
            {procedure.name}
          </h4>
          <p className="text-sm text-amber-100/50 font-light line-clamp-2 md:truncate md:max-w-xs leading-tight mt-1">
            {procedure.comingSoon ? 'Em breve' : procedure.description}
          </p>
        </div>
      </div>

      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto border-t md:border-t-0 border-white/5 pt-3 md:pt-0 pl-0 md:pl-2 gap-2">
         <div className="flex flex-col md:items-end">
             {procedure.price.split('|').map((part, index) => (
                <span key={index} className="text-sm font-semibold text-amber-200 whitespace-nowrap">
                   {part.replace('Aplicação:', 'Aplic:').replace('Manutenção:', 'Manut:').trim()}
                </span>
             ))}
         </div>
         
         {procedure.comingSoon ? (
            <span className="text-[10px] bg-gray-700 text-gray-300 px-2 py-0.5 rounded">Breve</span>
         ) : (
            <span className="text-xs text-amber-400 font-medium md:text-amber-400/0 md:opacity-0 md:group-hover:text-amber-400 md:group-hover:opacity-100 transition-all transform md:translate-x-2 md:group-hover:translate-x-0 flex items-center bg-amber-500/10 md:bg-transparent px-3 py-1 rounded-full md:p-0 md:rounded-none border border-amber-500/20 md:border-0">
              Agendar
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
         )}
      </div>
    </div>
  );
};

export default HomePage;
