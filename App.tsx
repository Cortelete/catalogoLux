import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Procedure } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CatalogPage from './pages/CatalogPage';
import BookingModal from './components/BookingModal';

const AppContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
  const location = ReactRouterDOM.useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleProcedureSelect = (procedure: Procedure) => {
    setSelectedProcedure(procedure);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Add a small delay to allow for fade-out animation if implemented
    setTimeout(() => setSelectedProcedure(null), 300);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#111111]">
      <Header />
      <main className="flex-grow">
        <ReactRouterDOM.Routes>
          <ReactRouterDOM.Route path="/" element={<HomePage />} />
          <ReactRouterDOM.Route path="/sobre" element={<AboutPage />} />
          <ReactRouterDOM.Route path="/catalogo" element={<CatalogPage onProcedureSelect={handleProcedureSelect} />} />
        </ReactRouterDOM.Routes>
      </main>
      <Footer />
      <BookingModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        procedure={selectedProcedure}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ReactRouterDOM.HashRouter>
      <AppContent />
    </ReactRouterDOM.HashRouter>
  );
};

export default App;