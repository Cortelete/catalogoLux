
import React, { useState } from 'react';
import { Procedure, Category, SubCategory } from '../types';
import { CATEGORIES } from '../public/data/procedures';
import BackButton from '../components/BackButton';

interface CatalogPageProps {
  onProcedureSelect: (procedure: Procedure) => void;
}

// Mapas de imagens para os cards das categorias
const CATEGORY_IMAGES: Record<string, string> = {
  'lash': '/img/categories/EC.png',
  'designSobrancelhas': '/img/categories/S.png',
  'limpezaPele': '/img/categories/LP.png',
  'laser': '/img/categories/RL.png'
};

const CatalogPage: React.FC<CatalogPageProps> = ({ onProcedureSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleOpenCategory = (category: Category) => {
    setSelectedCategory(category);
    // Impede rolagem da página de fundo
    document.body.style.overflow = 'hidden';
  };

  const handleCloseCategory = () => {
    setSelectedCategory(null);
    document.body.style.overflow = 'auto';
  };

  const handleSelectProcedure = (proc: Procedure) => {
<<<<<<< HEAD
    // Mantém a categoria aberta ao fundo
=======
    // Mantém a categoria aberta ao fundo para que o botão voltar (X do modal) retorne à lista
    // handleCloseCategory(); 
>>>>>>> 7d82df5b2c5ac05a43d4d5b37168e322d13fb43b
    onProcedureSelect(proc);
  };

  // Helper para obter lista plana de procedimentos da categoria atual para navegação
  const getCategoryProcedures = (category: Category | null): Procedure[] => {
    if (!category) return [];
    if (category.procedures) return category.procedures;
    if (category.subCategories) {
      return category.subCategories.flatMap(sub => sub.procedures);
    }
    return [];
  };

  // Handler para erro de imagem da categoria
  const handleCategoryImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, categoryName: string) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://placehold.co/1000x800/1f2937/fbbf24?text=${encodeURIComponent(categoryName)}`;
  };

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 min-h-screen animate-fade-in flex flex-col">
       <div className="w-full max-w-6xl mx-auto mb-8">
        <BackButton />
      </div>

      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl text-amber-100">Nossos Serviços</h1>
        <p className="mt-4 text-amber-100/70">
          Escolha uma área para ver os procedimentos disponíveis.
        </p>
      </div>

      {/* Grid de Cards das Categorias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
        {CATEGORIES.map((category) => (
          <div 
            key={category.id}
            onClick={() => handleOpenCategory(category)}
            className="group relative h-64 md:h-80 rounded-2xl overflow-hidden cursor-pointer border border-amber-50/10 hover:border-amber-300/50 transition-all duration-500 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:-translate-y-1"
          >
            {/* Imagem de Fundo */}
            <div className="absolute inset-0">
               <img 
                 src={CATEGORY_IMAGES[category.id]} 
                 alt={category.name}
                 onError={(e) => handleCategoryImageError(e, category.name)}
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            </div>

            {/* Conteúdo do Card */}
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h2 className="font-serif text-3xl text-amber-50 mb-2 drop-shadow-md group-hover:text-amber-200 transition-colors">
                {category.name}
              </h2>
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

      {/* Modal de Lista de Procedimentos (Menu Suspenso) */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 animate-fade-in">
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={handleCloseCategory}
          ></div>

          {/* Janela do Modal */}
          {/* Alterado w-full e margens para garantir que caiba em mobile small */}
          <div className="relative w-[95%] md:w-full max-w-2xl bg-[#0F0F0F] rounded-2xl border border-amber-50/20 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-fade-in-up">
            
            {/* Header do Modal */}
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

            {/* Lista Scrollável */}
            <div className="overflow-y-auto p-3 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-amber-900/50 scrollbar-track-transparent">
              {/* Passagem de contexto para navegação no modal futuro */}
              {/* Nota: O componente CatalogPage não renderiza o BookingModal diretamente, 
                  mas o App.tsx sim. Precisamos de uma forma de passar a lista para o App.tsx 
                  OU o App.tsx precisa saber navegar.
                  
                  Para simplificar e manter a estrutura atual onde App.tsx gerencia o estado do modal:
                  O App.tsx terá que lidar com next/prev. 
                  Como o onProcedureSelect é passado para o App, vamos "hackear" 
                  adicionando propriedades extras ao procedimento ou mudando a interface no App?
                  
                  Melhor abordagem: Modificar App.tsx para receber lista de procedimentos?
                  Não, vamos injetar next/prev no componente ProcedureListItem ou passar uma função enriquecida.
                  
                  Na verdade, a maneira mais limpa sem refatorar o App inteiro é:
                  O BookingModal recebe onNext/onPrev. O App.tsx precisa fornecer isso.
                  Mas o App.tsx não sabe a lista atual.
                  
                  Solução: Vamos passar um objeto estendido no onProcedureSelect.
                  Mas typescript vai reclamar.
                  
                  Vamos fazer o seguinte: O CatalogPage agora vai exportar uma função utilitária ou 
                  simplesmente renderizar o BookingModal? Não, o BookingModal está no App.
                  
                  Vamos alterar o CatalogPage para injetar navegação no onProcedureSelect?
                  Não, onProcedureSelect espera (Procedure).
                  
                  Vamos alterar a prop `onProcedureSelect` para aceitar `(proc: Procedure, allProcs: Procedure[])`.
                  Isso requer mudar a interface CatalogPageProps e App.tsx.
              */}
              
              {/* Opção 1: Exibir Subcategorias (se existirem) */}
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
                        onClick={() => {
                            // Encontra a lista completa deste contexto
                            const allProcs = getCategoryProcedures(selectedCategory);
                            // @ts-ignore - Passando argumento extra para o App.tsx lidar
                            onProcedureSelect(proc, allProcs);
                        }} 
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* Opção 2: Exibir Procedimentos Diretos (se não houver subcategorias) */}
              {selectedCategory.procedures && (
                 <div className="space-y-3 animate-fade-in">
                    {selectedCategory.procedures.map((proc) => (
                      <ProcedureListItem 
                        key={proc.id} 
                        procedure={proc} 
                        onClick={() => {
                            const allProcs = getCategoryProcedures(selectedCategory);
                            // @ts-ignore
                            onProcedureSelect(proc, allProcs);
                        }} 
                      />
                    ))}
                 </div>
              )}

              {/* Estado vazio */}
              {(!selectedCategory.subCategories?.length && !selectedCategory.procedures?.length) && (
                <div className="text-center py-12 text-amber-100/40">
                  <p>Em breve novidades nesta categoria.</p>
                </div>
              )}
            </div>
            
             {/* Footer do Modal (Decorativo) */}
             <div className="p-3 md:p-4 border-t border-amber-50/5 bg-[#141414] text-center">
                <p className="text-[10px] md:text-xs text-amber-100/30">Luxury Studio Joyci Almeida</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente auxiliar para item da lista
// REFORMULADO PARA MOBILE: Flex-col em mobile, Flex-row em desktop
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
      {/* Container Esquerdo: Imagem e Textos */}
      <div className="flex items-start md:items-center gap-4 w-full md:w-auto">
        {/* Avatar da imagem do procedimento */}
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
        
        <div className="flex-1 min-w-0"> {/* min-w-0 ajuda no truncamento flex */}
          <h4 className="font-medium text-amber-50 group-hover:text-amber-100 transition-colors text-base md:text-lg">
            {procedure.name}
          </h4>
          <p className="text-sm text-amber-100/50 font-light line-clamp-2 md:truncate md:max-w-xs leading-tight mt-1">
            {procedure.comingSoon ? 'Em breve' : procedure.description}
          </p>
        </div>
      </div>

      {/* Container Direito: Preço e Botão */}
      {/* Em mobile: Linha separada com borda superior */}
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

export default CatalogPage;
