import React from 'react';
import ShimmerButton from '../components/ShimmerButton';
import BackButton from '../components/BackButton';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto py-16 px-4 md:py-24">
        <BackButton className="mb-8" />
       <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <img 
              src="https://picsum.photos/seed/joyci-almeida/500/600" 
              alt="Joyci Almeida" 
              className="rounded-lg shadow-2xl shadow-amber-900/40 object-cover w-full h-96 md:h-auto aspect-[4/5]"
            />
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="font-serif text-3xl md:text-4xl text-amber-50">Sobre Joyci Almeida</h2>
            
            <div className="mt-8 space-y-6 text-amber-100/80 leading-relaxed text-sm md:text-base">
              <div>
                <h3 className="font-serif text-lg text-amber-100 tracking-wider mb-2">ATENDIMENTOS</h3>
                <p>
                  Com mais de 1000 atendimentos realizados, Joyci Almeida construiu uma reputação de excelência e confiança. Cada cliente recebe uma experiência única e personalizada, resultando em olhares transformados e autoestima elevada. Este número reflete não apenas a habilidade técnica, mas a paixão e o cuidado dedicados a cada procedimento.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg text-amber-100 tracking-wider mb-2">CERTIFICAÇÕES</h3>
                <p>
                  A busca incessante por conhecimento é um pilar da Luxury Studio. Com mais de 10 certificações nacionais e internacionais em estética facial, Joyci Almeida está sempre à frente das últimas tendências e das técnicas mais seguras e inovadoras do mercado, garantindo um serviço de vanguarda para suas clientes e alunas.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg text-amber-100 tracking-wider mb-2">GESTÃO E ESTRATÉGIA</h3>
                <p>
                  A excelência técnica encontra a visão estratégica. Formada em Administração e com especialização em Gestão de Pessoas, Joyci não apenas domina a arte dos cílios, mas também entende profundamente o que é necessário para construir e escalar um negócio de beleza bem-sucedido. Ela oferece uma mentoria completa que vai além da pinça, preparando suas alunas para serem verdadeiras empresárias.
                </p>
              </div>
            </div>

            <div className="mt-10">
                <a href="https://luxacademy.vercel.app/" target="_blank" rel="noopener noreferrer">
                    <ShimmerButton>Acesse o Curso</ShimmerButton>
                </a>
            </div>

          </div>
       </div>
    </div>
  );
};

export default AboutPage;