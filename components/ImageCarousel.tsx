
import React, { useState, useRef } from 'react';

interface ImageCarouselProps {
  images: string[];
  procedureName: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, procedureName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartRef = useRef<{ x: number, y: number } | null>(null);

  if (!images || images.length === 0) {
    return (
        <div className="relative w-full h-full group bg-gray-800 rounded-t-xl md:rounded-l-xl md:rounded-t-none flex items-center justify-center">
            <p className="text-amber-100/50">Nenhuma imagem disponível</p>
        </div>
    );
  }

  const goToPrevious = (e?: React.MouseEvent) => {
    if(e) e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e?: React.MouseEvent) => {
    if(e) e.stopPropagation();
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://placehold.co/800x800/1f2937/fbbf24?text=${encodeURIComponent(procedureName)}`;
  };

  // Swipe logic for Carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    // Impede que o swipe da imagem propague para o swipe do modal (mudança de procedimento)
    e.stopPropagation();
    touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Impede propagação para o container pai (modal)
    e.stopPropagation();

    if (!touchStartRef.current) return;
    
    const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
    };

    const deltaX = touchStartRef.current.x - touchEnd.x;
    
    // Swipe Threshold de 30px
    if (Math.abs(deltaX) > 30) {
        if (deltaX > 0) {
            // Swipe Left (dedo da direita pra esquerda) -> Próxima Imagem
            goToNext();
        } else {
            // Swipe Right (dedo da esquerda pra direita) -> Imagem Anterior
            goToPrevious();
        }
    }
    
    touchStartRef.current = null;
  };

  return (
    <div 
        className="relative w-full h-full group bg-gray-800 md:rounded-l-xl overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
    >
      <img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`${procedureName} - Imagem ${currentIndex + 1}`}
        onError={handleImageError}
        className="w-full h-full object-cover animate-fade-in"
      />
      
      {/* Indicadores Visuais de Navegação (Setas visíveis no hover em desktop, ou sempre úteis) */}
      {images.length > 1 && (
        <>
            <button onClick={goToPrevious} className="absolute top-1/2 -translate-y-1/2 left-3 text-white rounded-full h-9 w-9 flex items-center justify-center bg-black/40 hover:bg-black/60 cursor-pointer opacity-0 group-hover:opacity-100 transition-all z-10 hidden md:flex" aria-label="Imagem anterior">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={goToNext} className="absolute top-1/2 -translate-y-1/2 right-3 text-white rounded-full h-9 w-9 flex items-center justify-center bg-black/40 hover:bg-black/60 cursor-pointer opacity-0 group-hover:opacity-100 transition-all z-10 hidden md:flex" aria-label="Próxima imagem">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center space-x-2 z-10">
                {images.map((_, slideIndex) => (
                <button
                    key={slideIndex}
                    aria-label={`Ir para imagem ${slideIndex + 1}`}
                    onClick={(e) => { e.stopPropagation(); goToSlide(slideIndex); }}
                    className={`cursor-pointer h-2 w-2 rounded-full transition-all duration-300 shadow-sm ${
                    currentIndex === slideIndex ? 'bg-amber-200 w-5' : 'bg-white/50 hover:bg-white/80'
                    }`}
                ></button>
                ))}
            </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
