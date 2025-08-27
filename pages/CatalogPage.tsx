import React, { useState } from 'react';
import { Procedure, Category, SubCategory } from '../types';
import { CATEGORIES } from '../public/data/procedures';
import ProcedureCard from '../components/ProcedureCard';
import BackButton from '../components/BackButton';

interface CatalogPageProps {
  onProcedureSelect: (procedure: Procedure) => void;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ onProcedureSelect }) => {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [openSubCategoryId, setOpenSubCategoryId] = useState<string | null>(null);

  const handleToggleCategory = (categoryId: string) => {
    setOpenCategoryId(prevId => {
      const newId = prevId === categoryId ? null : categoryId;
      if (newId !== prevId) {
        setOpenSubCategoryId(null); // Reset subcategory when category changes
      }
      return newId;
    });
  };

  const handleToggleSubCategory = (subCategoryId: string) => {
    setOpenSubCategoryId(prevId => (prevId === subCategoryId ? null : subCategoryId));
  };

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 flex flex-col items-center">
       <div className="w-full max-w-5xl self-start">
        <BackButton className="mb-8" />
      </div>
      <div className="text-center mb-8 md:mb-12 max-w-3xl">
        <h1 className="font-serif text-2xl md:text-4xl text-amber-50">Serviços</h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm text-amber-100/70">
          Clique e explore nossa seleção de procedimentos premium
        </p>
      </div>
      
      <div className="w-full max-w-5xl grid grid-cols-1 gap-2 md:gap-4">
        {CATEGORIES.map((category: Category) => {
          const isCategoryOpen = openCategoryId === category.id;
          return (
            <div key={category.id} className="border border-amber-200/20 rounded-lg overflow-hidden transition-all duration-300 bg-gray-900/50">
              <button
                onClick={() => handleToggleCategory(category.id)}
                className="w-full flex justify-between items-center p-3 md:p-5 text-left hover:bg-amber-200/5 transition-colors"
                aria-expanded={isCategoryOpen}
                aria-controls={`category-content-${category.id}`}
              >
                <h2 className="font-serif text-sm md:text-xl text-amber-100">
                  {category.name}
                </h2>
                <span
                  className={`inline-block text-amber-200 transform transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`}
                >
                  ▼
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                                            <h3 className="font-serif text-sm md:text-lg text-amber-100/90">
                                                {subCategory.name}
                                            </h3>
                                            <span
                                                className={`inline-block text-amber-200/80 transform transition-transform duration-300 ${isSubCategoryOpen ? 'rotate-180' : ''}`}
                                            >
                                                ▼
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
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CatalogPage;