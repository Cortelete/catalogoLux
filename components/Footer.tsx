
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 md:px-8 mt-16 border-t border-amber-50/10">
      <div className="container mx-auto text-center flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-amber-100/70 mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} Luxury Studio Joyci Almeida. Todos os direitos reservados.
        </p>
        <a 
          href="https://www.instagram.com/inteligenciarte.ia" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block text-sm text-amber-100/50 hover:text-amber-100 transition-colors"
        >
          <span>Desenvolvido por @InteligenciArte.IA</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
