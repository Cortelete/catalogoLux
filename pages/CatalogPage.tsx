
import React, { useState } from 'react';
import { Procedure, Category, SubCategory } from '../types';
import { CATEGORIES } from '../public/data/procedures';
import BackButton from '../components/BackButton';
import * as ReactRouterDOM from 'react-router-dom';
import ShimmerButton from '../components/ShimmerButton';

interface CatalogPageProps {
  onProcedureSelect: (procedure: Procedure) => void;
}

<<<<<<< HEAD
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
=======
const CatalogPage: React.FC<CatalogPageProps> = ({ onProcedureSelect }) => {
  // Maintenance Mode Flag
  const isUnderConstruction = true;

  const [openCategoryId, setOpenCategoryId] = useState<string | null>(CATEGORIES[0]?.id ?? null);
  const [openSubCategoryId, setOpenSubCategoryId] = useState<string | null>(null);

  // Maintenance Form State
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [maintenanceFormData, setMaintenanceFormData] = useState({
    name: '',
    procedure: '',
    preference: ''
  });

  const handleMaintenanceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMaintenanceFormData(prev => ({ ...prev, [name]: value }));
  };

  const getMaintenanceWhatsAppLink = () => {
    const { name, procedure, preference } = maintenanceFormData;
    const studioPhone = '5542999722042';
    
    const message = `Olá, Joyci! Vi o aviso de reforma no catálogo, mas gostaria de informações sobre agendamento.

*Nome:* ${name}
*Procedimento de Interesse:* ${procedure}
*Preferência de Horário:* ${preference}

Aguardo seu retorno! ✨`;
    
    return `https://wa.me/${studioPhone}?text=${encodeURIComponent(message)}`;
  };

  const handleToggleCategory = (categoryId: string) => {
    setOpenCategoryId(prevId => {
      const newId = prevId === categoryId ? null : categoryId;
      if (newId !== prevId) {
        setOpenSubCategoryId(null);
      }
      return newId;
    });
>>>>>>> 7a0062d2dcdcf85a05ee05f8f2cd778f0bc5b0c4
  };

  const handleCloseCategory = () => {
    setSelectedCategory(null);
    document.body.style.overflow = 'auto';
  };

  const handleSelectProcedure = (proc: Procedure) => {
    handleCloseCategory();
    onProcedureSelect(proc);
  };

  // Handler para erro de imagem da categoria
  const handleCategoryImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, categoryName: string) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://placehold.co/1000x800/1f2937/fbbf24?text=${encodeURIComponent(categoryName)}`;
  };

  if (isUnderConstruction) {
    return (
      <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-[60vh] animate-fade-in relative">
        <div className="absolute top-0 left-4 md:left-8 mt-8">
            <BackButton />
        </div>
        
        <div className="bg-gray-900/60 p-8 md:p-12 rounded-xl border border-amber-500/20 shadow-2xl shadow-amber-900/20 max-w-2xl w-full backdrop-blur-md text-center mt-12">
            <div className="mb-6 flex justify-center">
                 <div className="p-4 bg-amber-900/20 rounded-full border border-amber-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                 </div>
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-amber-100 mb-4 tracking-wide">CATÁLOGO EM REFORMA</h1>
            <p className="text-amber-100/70 text-base md:text-lg mb-8 leading-relaxed">
                Estamos atualizando nosso catálogo para trazer novidades incríveis e uma experiência ainda melhor para você. 
                <br className="hidden md:block" />
                Por favor, retorne em breve para conferir nossos novos procedimentos.
            </p>
            
            {!showMaintenanceForm ? (
                <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 border border-amber-200/10 rounded-lg bg-black/20 w-full">
                        <p className="text-amber-200/90 text-sm">
                            Para agendamentos urgentes ou dúvidas, entre em contato via WhatsApp.
                        </p>
                    </div>
                    
                    <button 
                        onClick={() => setShowMaintenanceForm(true)}
                        className="mt-4 inline-block"
                    >
                        <ShimmerButton>Falar no WhatsApp</ShimmerButton>
                    </button>
                </div>
            ) : (
                <div className="w-full text-left space-y-4 animate-fade-in-up bg-black/20 p-6 rounded-lg border border-amber-500/10">
                    <h3 className="text-amber-100 font-display text-lg text-center mb-4">Solicitar Agendamento</h3>
                    <div>
                      <label className="block text-xs font-medium text-amber-100/70 mb-1.5 ml-1 uppercase tracking-wider">Seu Nome</label>
                      <input 
                        type="text" 
                        name="name"
                        value={maintenanceFormData.name}
                        onChange={handleMaintenanceInputChange}
                        placeholder="Digite seu nome"
                        className="w-full bg-gray-800/50 border border-amber-50/20 rounded-lg p-3 text-amber-100 placeholder-amber-100/30 focus:ring-1 focus:ring-amber-200 focus:border-amber-200/50 focus:outline-none text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-amber-100/70 mb-1.5 ml-1 uppercase tracking-wider">Procedimento de Interesse</label>
                      <input 
                        type="text" 
                        name="procedure"
                        value={maintenanceFormData.procedure}
                        onChange={handleMaintenanceInputChange}
                        placeholder="Qual procedimento deseja?"
                        className="w-full bg-gray-800/50 border border-amber-50/20 rounded-lg p-3 text-amber-100 placeholder-amber-100/30 focus:ring-1 focus:ring-amber-200 focus:border-amber-200/50 focus:outline-none text-sm transition-all"
                      />
                    </div>
                     <div>
                      <label className="block text-xs font-medium text-amber-100/70 mb-1.5 ml-1 uppercase tracking-wider">Preferência de Horário</label>
                      <input 
                        type="text" 
                        name="preference"
                        value={maintenanceFormData.preference}
                        onChange={handleMaintenanceInputChange}
                        placeholder="Ex: Tarde, Sábado pela manhã..."
                        className="w-full bg-gray-800/50 border border-amber-50/20 rounded-lg p-3 text-amber-100 placeholder-amber-100/30 focus:ring-1 focus:ring-amber-200 focus:border-amber-200/50 focus:outline-none text-sm transition-all"
                      />
                    </div>
                    
                    <div className="flex gap-3 mt-6 pt-2">
                      <button 
                        onClick={() => setShowMaintenanceForm(false)}
                        className="flex-1 py-3 text-sm text-amber-200/60 hover:text-amber-100 transition-colors uppercase tracking-wide font-medium"
                      >
                        Voltar
                      </button>
                      <a 
                          href={getMaintenanceWhatsAppLink()} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`flex-1 ${(!maintenanceFormData.name || !maintenanceFormData.procedure) ? 'pointer-events-none opacity-50 saturate-0' : ''}`}
                      >
                          <ShimmerButton className="w-full text-xs py-3 px-4 uppercase">Enviar Mensagem</ShimmerButton>
                      </a>
                    </div>
                </div>
            )}
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
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
=======
    <div className="container mx-auto py-8 md:py-12 px-4 flex flex-col items-center animate-fade-in">
       <div className="w-full max-w-6xl self-start">
        <BackButton className="mb-8" />
      </div>
      <div className="text-center mb-8 md:mb-12 max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl text-amber-100">Catálogo de Serviços</h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-amber-100/70">
          Explore nossa seleção de procedimentos premium, criados para realçar sua beleza natural com sofisticação e cuidado.
        </p>
      </div>
      
      <div className="w-full max-w-6xl grid grid-cols-1 gap-3">
        {CATEGORIES.map((category: Category) => {
          const isCategoryOpen = openCategoryId === category.id;
          return (
            <div key={category.id} className="border border-amber-200/20 rounded-lg overflow-hidden transition-all duration-300 bg-gray-900/50">
              <button
                onClick={() => handleToggleCategory(category.id)}
                className="w-full flex justify-between items-center p-4 md:p-5 text-left hover:bg-amber-200/5 transition-colors"
                aria-expanded={isCategoryOpen}
                aria-controls={`category-content-${category.id}`}
              >
                <h2 className="font-serif text-lg md:text-xl text-amber-100">
                  {category.name}
                </h2>
                <span
                  className={`inline-block text-amber-200 transform transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>

              <div
                id={`category-content-${category.id}`}
                className={`transition-all duration-500 ease-in-out grid ${
                  isCategoryOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                    {category.procedures && (
                        <div className="p-4 md:p-6 border-t border-amber-200/10">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.procedures.map((procedure) => (
                                    <ProcedureCard 
                                    key={procedure.id} 
                                    procedure={procedure} 
                                    onClick={onProcedureSelect}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {category.subCategories && (
                        <div className="p-2 md:p-4 border-t border-amber-200/10 space-y-2">
                            {category.subCategories.map((subCategory: SubCategory) => {
                                const isSubCategoryOpen = openSubCategoryId === subCategory.id;
                                return (
                                    <div key={subCategory.id} className="border border-amber-200/10 rounded-md overflow-hidden bg-gray-800/40">
                                        <button
                                            onClick={() => handleToggleSubCategory(subCategory.id)}
                                            className="w-full flex justify-between items-center p-3 md:p-4 text-left hover:bg-amber-200/5 transition-colors"
                                            aria-expanded={isSubCategoryOpen}
                                            aria-controls={`subcategory-content-${subCategory.id}`}
                                        >
                                            <h3 className="font-serif text-base md:text-lg text-amber-100/90">
                                                {subCategory.name}
                                            </h3>
                                            <span
                                                className={`inline-block text-amber-200/80 transform transition-transform duration-300 ${isSubCategoryOpen ? 'rotate-180' : ''}`}
                                            >
                                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </button>
                                        <div
                                            id={`subcategory-content-${subCategory.id}`}
                                            className={`transition-all duration-500 ease-in-out grid ${
                                                isSubCategoryOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                            }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="p-4 md:p-6 border-t border-amber-200/10">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                        {subCategory.procedures.map((procedure) => (
                                                            <ProcedureCard 
                                                            key={procedure.id} 
                                                            procedure={procedure} 
                                                            onClick={onProcedureSelect}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
>>>>>>> 7a0062d2dcdcf85a05ee05f8f2cd778f0bc5b0c4
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
                        onClick={() => handleSelectProcedure(proc)} 
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
                        onClick={() => handleSelectProcedure(proc)} 
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
