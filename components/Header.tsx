
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';

const NavLink: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void; isMobile?: boolean }> = ({ to, children, onClick, isMobile = false }) => {
  const activeLinkClass = "text-amber-200 border-b-2 border-amber-200";
  const inactiveLinkClass = "text-amber-50/80 hover:text-amber-100 transition-colors";
  const mobileLinkClass = "text-2xl py-4";

  return (
    <ReactRouterDOM.NavLink 
      to={to} 
      onClick={onClick}
      className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} ${isMobile ? mobileLinkClass : ''}`}
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
      <header className="py-4 px-4 md:px-6 w-full z-30 sticky top-0 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <ReactRouterDOM.NavLink to="/" className="text-lg md:text-xl font-serif text-amber-50 font-bold tracking-wider uppercase hover:text-amber-200 transition-colors">
            Luxury Studio
          </ReactRouterDOM.NavLink>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4 md:space-x-8 text-xs md:text-sm font-medium uppercase tracking-wider">
            <NavLink to="/">Início</NavLink>
            <NavLink to="/catalogo">Catálogo</NavLink>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} aria-label="Abrir menu" className="text-amber-50 text-3xl flex items-center justify-center h-8 w-8">
              &#9776;
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex flex-col items-center justify-center animate-fade-in">
          <button onClick={closeMenu} className="absolute top-5 right-5" aria-label="Fechar menu">
            <span className="text-4xl text-amber-200">&times;</span>
          </button>
          <nav className="flex flex-col items-center space-y-8 text-lg font-medium uppercase tracking-wider">
            <NavLink to="/" onClick={closeMenu} isMobile>Início</NavLink>
            <NavLink to="/catalogo" onClick={closeMenu} isMobile>Catálogo</NavLink>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;