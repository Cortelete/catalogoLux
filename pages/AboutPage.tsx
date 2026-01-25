
import React from 'react';
import ShimmerButton from '../components/ShimmerButton';
import BackButton from '../components/BackButton';

const InfoCard: React.FC<{ icon: React.ReactNode; number: string; title: string; description: string }> = ({ icon, number, title, description }) => (
  <div className="bg-white/5 border border-amber-50/10 rounded-xl p-5 flex flex-col items-start hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1 group">
    <div className="bg-amber-500/10 p-2 rounded-lg text-amber-300 mb-3 group-hover:text-amber-100 group-hover:bg-amber-500/20 transition-colors">
      {icon}
    </div>
    <span className="font-display text-3xl text-amber-200 font-bold mb-1">{number}</span>
    <h3 className="text-amber-50 font-medium uppercase tracking-wider text-xs mb-2">{title}</h3>
    <p className="text-amber-100/60 text-sm leading-snug">{description}</p>
  </div>
);

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto py-10 px-4 md:py-16 min-h-screen animate-fade-in flex flex-col items-center">
        <div className="w-full max-w-5xl mx-auto mb-6">
            <BackButton />
        </div>

        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            
            {/* Coluna da Foto (Esquerda/Topo) */}
            <div className="w-full md:w-5/12 flex flex-col items-center md:items-start animate-fade-in-up">
                <div className="relative w-full max-w-sm">
                    {/* Elemento Decorativo de Fundo */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 to-transparent rounded-2xl transform translate-x-2 translate-y-2"></div>
                    
                    {/* Foto */}
                    <div className="relative rounded-2xl overflow-hidden border border-amber-50/10 shadow-2xl shadow-black/50 aspect-[4/5]">
                        <img 
                            src="/img/joy.png"
                            alt="Joyci Almeida" 
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            onError={(e) => {
                                e.currentTarget.onerror = null; 
                                e.currentTarget.src = "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1887&auto=format&fit=crop";
                            }}
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                            <h2 className="font-display text-3xl text-amber-50">Joyci Almeida</h2>
                            <p className="text-amber-200/80 font-light text-sm tracking-widest uppercase">Especialista em Sobrancelhas</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Coluna de Conteúdo (Direita/Baixo) */}
            <div className="w-full md:w-7/12 flex flex-col justify-center space-y-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                
                <div>
                    <h1 className="font-serif text-3xl md:text-4xl text-amber-100 mb-4">
                        Arte, Técnica e <span className="text-amber-400 italic">Excelência</span>.
                    </h1>
                    <p className="text-amber-100/70 leading-relaxed text-sm md:text-base">
                        Bem-vinda ao universo Luxury Studio. Aqui, a beleza é tratada com precisão técnica e sofisticação. 
                        Minha missão é realçar sua essência através de procedimentos personalizados e seguros.
                    </p>
                </div>

                {/* Grid de Cards (Highlights) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        number="+2.000"
                        title="Atendimentos"
                        description="Olhares transformados com técnicas exclusivas e personalizadas."
                    />
                    
                    <InfoCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
                        number="15+"
                        title="Certificações"
                        description="Formação Nacional e Internacional. Sempre à frente das tendências."
                    />

                    <InfoCard 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                        number="Mentora"
                        title="Gestão & Carreira"
                        description="Formada em Adm e Gestão de Pessoas. Preparando novas empresárias."
                    />
                     
                     <div className="flex flex-col justify-center items-start p-4">
                        <p className="text-amber-200/60 text-xs mb-4 uppercase tracking-widest">Quer aprender comigo?</p>
                        <a href="https://luxacademy.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full">
                            <ShimmerButton className="w-full justify-center text-sm" variant="secondary">
                                Conhecer a Lux Academy
                            </ShimmerButton>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default AboutPage;
