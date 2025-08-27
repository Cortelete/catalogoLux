
import React, { useState } from 'react';

interface ImageCarouselProps {
  images: string[];
  procedureName: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, procedureName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
        <div className="relative w-full h-64 md:h-full group bg-gray-800 rounded-t-xl md:rounded-l-xl md:rounded-t-none flex items-center justify-center">
            <p className="text-amber-100/50">Nenhuma imagem disponível</p>
        </div>
    );
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative w-full h-64 md:h-full group bg-gray-800 rounded-t-xl md:rounded-l-xl md:rounded-t-none overflow-hidden">
      <img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`${procedureName} - Imagem ${currentIndex + 1}`}
        className="w-full h-full object-cover animate-fade-in"
      />
      {images.length > 1 && (
        <>
            <button onClick={goToPrevious} className="absolute top-1/2 -translate-y-1/2 left-3 text-white rounded-full h-10 w-10 flex items-center justify-center bg-black/40 hover:bg-black/60 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" aria-label="Imagem anterior">
                <span className="text-3xl font-bold">&lsaquo;</span>
            </button>
            <button onClick={goToNext} className="absolute top-1/2 -translate-y-1/2 right-3 text-white rounded-full h-10 w-10 flex items-center justify-center bg-black/40 hover:bg-black/60 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10" aria-label="Próxima imagem">
                <span className="text-3xl font-bold">&rsaquo;</span>
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center space-x-2 z-10">
                {images.map((_, slideIndex) => (
                <button
                    key={slideIndex}
                    aria-label={`Ir para imagem ${slideIndex + 1}`}
                    onClick={(e) => { e.stopPropagation(); goToSlide(slideIndex); }}
                    className={`cursor-pointer h-2 w-2 rounded-full transition-all duration-300 ${
                    currentIndex === slideIndex ? 'bg-amber-200 w-4' : 'bg-white/50 hover:bg-white/80'
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
