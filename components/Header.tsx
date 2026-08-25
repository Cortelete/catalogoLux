
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';

const NavLink: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void; isMobile?: boolean }> = ({ to, children, onClick, isMobile = false }) => {
  const baseLinkClass = "relative transition-colors duration-300 before:content-[''] before:absolute before:bottom-[-4px] before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-[2px] before:bg-amber-300 before:transition-all before:duration-300";
  const activeLinkClass = "text-amber-200 before:w-full";
  const inactiveLinkClass = "text-amber-50/80 hover:text-amber-100 hover:before:w-full";
  const mobileLinkClass = "text-3xl font-display";

  return (
    <ReactRouterDOM.NavLink 
      to={to} 
      onClick={onClick}
      className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass} ${isMobile ? mobileLinkClass : ''}`}
    >
      {children}
    </ReactRouterDOM.NavLink>
  )
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="py-2 px-4 md:px-6 w-full z-30 sticky top-0 bg-black/60 backdrop-blur-lg border-b border-amber-50/10">
        <div className="container mx-auto flex justify-between items-center">
          <ReactRouterDOM.NavLink to="/" className="text-lg md:text-xl font-display text-amber-100 font-semibold tracking-wider hover:text-amber-200 transition-colors">
            Luxury Studio
          </ReactRouterDOM.NavLink>
          
          <nav className="hidden md:flex items-center space-x-6 md:space-x-10 text-sm font-medium uppercase tracking-wider">
            <NavLink to="/">Início</NavLink>
            <NavLink to="/sobre">Sobre</NavLink>
          </nav>
          
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} aria-label="Abrir menu" className="text-amber-100 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex flex-col items-center justify-center animate-fade-in">
          <button onClick={closeMenu} className="absolute top-6 right-5 p-2" aria-label="Fechar menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <nav className="flex flex-col items-center space-y-10">
            <NavLink to="/" onClick={closeMenu} isMobile>Início</NavLink>
            <NavLink to="/sobre" onClick={closeMenu} isMobile>Sobre</NavLink>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
