
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Procedure } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import AboutPage from './pages/AboutPage';
import BookingModal from './components/BookingModal';

const AppContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
  const [currentProcedureList, setCurrentProcedureList] = useState<Procedure[]>([]);
  const location = ReactRouterDOM.useLocation();
  const navigate = ReactRouterDOM.useNavigate();

  // Redireciona para a página inicial sempre que o componente é montado (recarregamento da página)
  useEffect(() => {
     navigate('/');
  }, []);

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

  // @ts-ignore - Recebe lista opcional do CatalogPage
  const handleProcedureSelect = (procedure: Procedure, procedureList: Procedure[] = []) => {
    setSelectedProcedure(procedure);
    if (procedureList && procedureList.length > 0) {
      setCurrentProcedureList(procedureList);
    } else {
      setCurrentProcedureList([procedure]);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
        setSelectedProcedure(null);
        setCurrentProcedureList([]);
    }, 300);
  };

  const handleNextProcedure = () => {
    if (!selectedProcedure || currentProcedureList.length <= 1) return;
    const currentIndex = currentProcedureList.findIndex(p => p.id === selectedProcedure.id);
    if (currentIndex !== -1 && currentIndex < currentProcedureList.length - 1) {
        setSelectedProcedure(currentProcedureList[currentIndex + 1]);
    }
  };

  const handlePrevProcedure = () => {
    if (!selectedProcedure || currentProcedureList.length <= 1) return;
    const currentIndex = currentProcedureList.findIndex(p => p.id === selectedProcedure.id);
    if (currentIndex > 0) {
        setSelectedProcedure(currentProcedureList[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d0d]">
      <Header />
      <main className="flex-grow">
        <ReactRouterDOM.Routes>
          <ReactRouterDOM.Route path="/" element={<HomePage />} />
          <ReactRouterDOM.Route path="/catalogo" element={<CatalogPage onProcedureSelect={handleProcedureSelect} />} />
          <ReactRouterDOM.Route path="/sobre" element={<AboutPage />} />
        </ReactRouterDOM.Routes>
      </main>
      <Footer />
      <BookingModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        procedure={selectedProcedure}
        onNext={handleNextProcedure}
        onPrev={handlePrevProcedure}
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
