
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-4 md:px-8 mt-16 border-t border-amber-50/10">
      <div className="container mx-auto text-center">
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
