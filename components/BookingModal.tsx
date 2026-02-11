
import React, { useState, useEffect, useRef } from 'react';
import { Procedure, BookingFormData } from '../types';
import ShimmerButton from './ShimmerButton';
import ImageCarousel from './ImageCarousel';

interface BookingModalProps {
  procedure: Procedure | null;
  onClose: () => void;
  isOpen: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}

const PaymentOption: React.FC<{ value: string; label: string; description: string; selected: boolean; onChange: (value: any) => void }> = ({ value, label, description, selected, onChange }) => (
    <div 
        onClick={() => onChange(value)}
        className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${selected ? 'bg-amber-400/10 border-amber-300 shadow-lg shadow-amber-900/40' : 'bg-gray-800/50 border-amber-50/20 hover:border-amber-200/50 hover:bg-gray-800'}`}
    >
        <p className={`font-semibold text-sm ${selected ? 'text-amber-200' : 'text-amber-50'}`}>{label}</p>
        <p className="text-xs text-amber-100/60 mt-1">{description}</p>
    </div>
);

const CheckboxOption: React.FC<{ label: string; selected: boolean; onChange: () => void }> = ({ label, selected, onChange }) => (
  <div 
    onClick={onChange}
    className={`p-3 border rounded-lg cursor-pointer flex items-center justify-between transition-all duration-300 ${selected ? 'bg-amber-400/10 border-amber-300 text-amber-100' : 'bg-gray-800/50 border-amber-50/20 text-amber-100/60 hover:bg-gray-800'}`}
  >
    <span className="text-sm font-medium">{label}</span>
    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selected ? 'bg-amber-400 border-amber-400' : 'border-gray-500'}`}>
      {selected && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  </div>
);

const StepIndicator: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => (
  <div className="flex items-center justify-center space-x-2 mb-6 md:mb-8">
    {Array.from({ length: totalSteps }).map((_, i) => (
      <div key={i} className="flex items-center">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${i <= currentStep ? 'bg-amber-300 text-gray-900' : 'bg-gray-700 text-amber-200/50'}`}>
          {i + 1}
        </div>
        {i < totalSteps - 1 && <div className={`w-4 md:w-8 h-px transition-all duration-300 ${i < currentStep ? 'bg-amber-300' : 'bg-gray-700'}`} />}
      </div>
    ))}
  </div>
);

const DAYS_OPTIONS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const SHIFT_OPTIONS = ['Manhã', 'Tarde', 'Noite'];

const BookingModal: React.FC<BookingModalProps> = ({ procedure, onClose, isOpen, onNext, onPrev }) => {
  const [step, setStep] = useState(0);
  const [isMaleVersion, setIsMaleVersion] = useState(false);
  const [isToggleOptionSelected, setIsToggleOptionSelected] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    birthDate: '',
    preferredDays: [],
    preferredTimes: [],
    paymentMethod: '',
    observations: '',
  });

  // Swipe handling states
  const touchStartRef = useRef<{ x: number, y: number } | null>(null);

  useEffect(() => {
    if (procedure) {
      setIsMaleVersion(false);
      setIsToggleOptionSelected(false);
    }
  }, [procedure]);


  if (!isOpen || !procedure) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentChange = (value: 'pix' | 'credito' | 'debito') => {
      setFormData(prev => ({ ...prev, paymentMethod: value }));
  };

  const toggleDay = (day: string) => {
    setFormData(prev => {
      const days = prev.preferredDays.includes(day)
        ? prev.preferredDays.filter(d => d !== day)
        : [...prev.preferredDays, day];
      return { ...prev, preferredDays: days };
    });
  };

  const toggleTime = (time: string) => {
    setFormData(prev => {
      const times = prev.preferredTimes.includes(time)
        ? prev.preferredTimes.filter(t => t !== time)
        : [...prev.preferredTimes, time];
      return { ...prev, preferredTimes: times };
    });
  };

  const nextStep = () => {
    if (step === 0 && (!formData.name || !formData.birthDate)) return;
    if (step < 4) setStep(prev => prev + 1);
  };
  
  const prevStep = () => setStep(prev => prev - 1);
  
  const resetAndClose = () => {
    setStep(0);
    setIsMaleVersion(false);
    setIsToggleOptionSelected(false);
    setFormData({ 
      name: '', 
      birthDate: '', 
      preferredDays: [], 
      preferredTimes: [], 
      paymentMethod: '', 
      observations: '' 
    });
    onClose();
  };

  // Swipe Handlers for Procedure Navigation (on the modal container)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    
    const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
    };

    const deltaX = touchStartRef.current.x - touchEnd.x;
    const deltaY = touchStartRef.current.y - touchEnd.y;

    // Se o movimento for predominantemente horizontal (> 50px de swipe, e movimento X > movimento Y)
    // Isso evita confundir com o scroll vertical (deltaY)
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            // Swipe Left (Movimento para a esquerda) -> Próximo Item
            if (onNext) onNext();
        } else {
            // Swipe Right (Movimento para a direita) -> Item Anterior
            if (onPrev) onPrev();
        }
    }
    
    touchStartRef.current = null;
  };

  // Base Data Logic
  let currentProcedureName = isMaleVersion && procedure.maleVersion ? procedure.maleVersion.name : procedure.name;
  let basePriceString = isMaleVersion && procedure.maleVersion ? procedure.maleVersion.price : procedure.price;
  const currentDescription = isMaleVersion && procedure.maleVersion ? procedure.maleVersion.description : procedure.description;
  const currentDetails = isMaleVersion && procedure.maleVersion ? procedure.maleVersion.details : procedure.details;
  const currentImages = isMaleVersion && procedure.maleVersion?.images ? procedure.maleVersion.images : procedure.images;

  // Toggle Option Logic (e.g., Henna)
  let displayedPrice = basePriceString;
  
  if (isToggleOptionSelected && procedure.toggleOption) {
    currentProcedureName += ` + ${procedure.toggleOption.label}`;
    const numericPrice = parseFloat(basePriceString.replace(/[^\d,]/g, '').replace(',', '.'));
    if (!isNaN(numericPrice)) {
        const newPrice = numericPrice + procedure.toggleOption.priceIncrement;
        displayedPrice = `R$ ${newPrice.toFixed(2).replace('.', ',')}`;
    } else {
        displayedPrice = `${basePriceString} (+ R$ ${procedure.toggleOption.priceIncrement.toFixed(2).replace('.', ',')})`;
    }
  }

  const generateWhatsAppMessage = () => {
    const studioPhone = '5542999722042';
    const paymentMethodText = {
        pix: 'Pix',
        credito: 'Cartão de Crédito',
        debito: 'Cartão de Débito',
        '': 'A definir'
    };
    
    let formattedBirthDate = 'Não informado';
    if(formData.birthDate) {
        const [year, month, day] = formData.birthDate.split('-');
        formattedBirthDate = `${day}/${month}/${year}`;
    }

    const message = `Olá, Joyci! Gostaria de agendar o procedimento de *${currentProcedureName}* (${displayedPrice}).

*Meus Dados:*
*Nome:* ${formData.name}
*Data de Nascimento:* ${formattedBirthDate}

*Preferências de Agendamento:*
*Dias:* ${formData.preferredDays.length > 0 ? formData.preferredDays.join(', ') : 'Qualquer dia'}
*Turnos:* ${formData.preferredTimes.length > 0 ? formData.preferredTimes.join(', ') : 'Qualquer horário'}

*Forma de Pagamento:* ${paymentMethodText[formData.paymentMethod as keyof typeof paymentMethodText] || 'A definir'}
${formData.observations ? `\n*Observações:* ${formData.observations}` : ''}

Aguardo seu contato para verificar disponibilidade. Obrigada! ✨`;
    
    return `https://wa.me/${studioPhone}?text=${encodeURIComponent(message)}`;
  };
  
  const renderStepContent = () => {
    switch(step) {
      case 0:
        return (
          <div className="animate-fade-in-up">
            <div className="space-y-4 md:space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-amber-100/80 mb-2">Qual seu nome completo? <span className="text-amber-400">*</span></label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-700/50 border border-amber-50/20 rounded-lg p-3 focus:ring-1 focus:ring-amber-200 focus:outline-none transition" placeholder="Seu nome" />
              </div>
              
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-amber-100/80 mb-2">Data de Nascimento <span className="text-amber-400">*</span></label>
                <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleInputChange} className="w-full bg-gray-700/50 border border-amber-50/20 rounded-lg p-3 focus:ring-1 focus:ring-amber-200 focus:outline-none transition" />
              </div>
            </div>
            
            <div className="flex gap-4 mt-6 md:mt-8">
               <button onClick={resetAndClose} className="w-1/3 text-amber-200/80 hover:text-amber-100 transition-colors">Cancelar</button>
               <ShimmerButton onClick={nextStep} className="w-2/3" disabled={!formData.name || !formData.birthDate}>Próximo</ShimmerButton>
            </div>
          </div>
        );
      case 1:
        return (
           <div className="animate-fade-in-up">
            <p className="text-sm text-amber-100/60 mb-4">Selecione suas preferências (Opcional)</p>
            
            <label className="block text-sm font-medium text-amber-100/90 mb-3">Dias da Semana Preferidos</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-6">
              {DAYS_OPTIONS.map(day => (
                <CheckboxOption 
                  key={day} 
                  label={day} 
                  selected={formData.preferredDays.includes(day)} 
                  onChange={() => toggleDay(day)} 
                />
              ))}
            </div>

            <label className="block text-sm font-medium text-amber-100/90 mb-3">Horários Preferidos</label>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {SHIFT_OPTIONS.map(time => (
                <CheckboxOption 
                  key={time} 
                  label={time} 
                  selected={formData.preferredTimes.includes(time)} 
                  onChange={() => toggleTime(time)} 
                />
              ))}
            </div>

            <div className="flex gap-4 mt-6 md:mt-8">
               <button onClick={prevStep} className="w-1/3 text-amber-200/80 hover:text-amber-100 transition-colors">Voltar</button>
               <div className="w-2/3 flex gap-2">
                 <button onClick={nextStep} className="flex-1 border border-amber-200/20 rounded-lg text-amber-200/60 hover:text-amber-100 hover:border-amber-200/50 transition-colors">Pular</button>
                 <ShimmerButton onClick={nextStep} className="flex-[2]">Próximo</ShimmerButton>
               </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in-up">
            <label htmlFor="observations" className="block text-sm font-medium text-amber-100/80 mb-2">Tem alguma observação ou alergia? (Opcional)</label>
            <textarea id="observations" name="observations" value={formData.observations} onChange={handleInputChange} rows={4} className="w-full bg-gray-700/50 border border-amber-50/20 rounded-lg p-3 focus:ring-1 focus:ring-amber-200 focus:outline-none transition" placeholder="Ex: sou alérgica a esmalte, tenho a pele sensível, etc."></textarea>
             <div className="flex gap-4 mt-6 md:mt-8">
               <button onClick={prevStep} className="w-1/3 text-amber-200/80 hover:text-amber-100 transition-colors">Voltar</button>
               <div className="w-2/3 flex gap-2">
                 <button onClick={nextStep} className="flex-1 border border-amber-200/20 rounded-lg text-amber-200/60 hover:text-amber-100 hover:border-amber-200/50 transition-colors">Pular</button>
                 <ShimmerButton onClick={nextStep} className="flex-[2]">Próximo</ShimmerButton>
               </div>
            </div>
          </div>
        );
       case 3:
        return (
          <div className="animate-fade-in-up">
            <label className="block text-sm font-medium text-amber-100/80 mb-3">Qual será a forma de pagamento? (Opcional)</label>
            <div className="space-y-3">
              <PaymentOption value="pix" label="Pix" description="Pagamento instantâneo." selected={formData.paymentMethod === 'pix'} onChange={handlePaymentChange} />
              <PaymentOption value="credito" label="Cartão de Crédito" description="Até 2x com taxa da máquina." selected={formData.paymentMethod === 'credito'} onChange={handlePaymentChange} />
              <PaymentOption value="debito" label="Cartão de Débito" description="Pagamento à vista." selected={formData.paymentMethod === 'debito'} onChange={handlePaymentChange} />
            </div>
            <div className="flex gap-4 mt-6 md:mt-8">
              <button onClick={prevStep} className="w-1/3 text-amber-200/80 hover:text-amber-100 transition-colors">Voltar</button>
               <div className="w-2/3 flex gap-2">
                 <button onClick={nextStep} className="flex-1 border border-amber-200/20 rounded-lg text-amber-200/60 hover:text-amber-100 hover:border-amber-200/50 transition-colors">Pular</button>
                 <ShimmerButton onClick={nextStep} className="flex-[2]">Finalizar</ShimmerButton>
               </div>
            </div>
          </div>
        );
       case 4:
        const paymentMethodText = { pix: 'Pix', credito: 'Cartão de Crédito', debito: 'Cartão de Débito', '': 'A definir' };
        
        let formattedBirthDate = '-';
        if(formData.birthDate) {
            const [year, month, day] = formData.birthDate.split('-');
            formattedBirthDate = `${day}/${month}/${year}`;
        }

        return (
          <div className="text-center animate-fade-in-up">
            <h4 className="font-display text-xl text-amber-100">Confirme seus dados</h4>
            <div className="text-left bg-gray-800/50 p-4 rounded-lg my-4 text-amber-100/90 text-sm space-y-2 border border-amber-50/10">
              <p><strong>Procedimento:</strong> {currentProcedureName}</p>
              <p><strong>Valor:</strong> {displayedPrice}</p>
              <p><strong>Nome:</strong> {formData.name}</p>
              <p><strong>Nascimento:</strong> {formattedBirthDate}</p>
              <div className="border-t border-white/5 pt-2 mt-2">
                <p><strong>Dias:</strong> {formData.preferredDays.length ? formData.preferredDays.join(', ') : 'Qualquer'}</p>
                <p><strong>Horários:</strong> {formData.preferredTimes.length ? formData.preferredTimes.join(', ') : 'Qualquer'}</p>
              </div>
              <p><strong>Pagamento:</strong> {paymentMethodText[formData.paymentMethod as keyof typeof paymentMethodText]}</p>
              {formData.observations && <p><strong>Observações:</strong> {formData.observations}</p>}
            </div>
            <p className="text-xs text-amber-100/60 mb-6">Ao clicar no botão, você será redirecionada para o WhatsApp para enviar sua solicitação de agendamento.</p>
            <div className="flex gap-4">
              <button onClick={prevStep} className="w-1/3 text-amber-200/80 hover:text-amber-100 transition-colors">Editar</button>
              <a href={generateWhatsAppMessage()} target="_blank" rel="noopener noreferrer" className="w-2/3" onClick={resetAndClose}>
                <ShimmerButton className="w-full">Confirmar e Enviar</ShimmerButton>
              </a>
            </div>
          </div>
        );
      default: return null;
    }
  }

  // Z-Index alterado para 60 para ficar acima do modal de categorias (z-50)
  // Layout ajustado:
  // Mobile: flex-col, h-[100dvh], overflow-y-auto no container pai (para imagem rolar junto).
  // Desktop: flex-row, h-auto, overflow-hidden no container pai. Imagem (esq) fixa, Content (dir) scroll.
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-0 md:p-4 animate-fade-in" onClick={resetAndClose}>
      <div 
        className="relative bg-gray-900 border border-amber-200/20 shadow-2xl shadow-amber-900/40 rounded-none md:rounded-xl w-full max-w-4xl flex flex-col md:flex-row h-[100dvh] md:h-auto md:max-h-[95vh] overflow-y-auto md:overflow-hidden scroll-smooth" 
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button onClick={resetAndClose} className="fixed md:absolute top-4 right-4 z-50 text-amber-200/70 hover:text-amber-200 transition-transform hover:scale-110 hover:rotate-90 bg-black/40 rounded-full p-1 md:bg-transparent">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Container da Imagem: Em mobile aspect-square para mostrar foto 500x500 inteira. Em desktop é coluna esquerda. */}
        <div className="w-full md:w-5/12 flex-shrink-0 bg-gray-800 aspect-square md:aspect-auto md:h-auto relative overflow-hidden">
          <ImageCarousel images={currentImages} procedureName={currentProcedureName} />
          {/* Overlay gradiente inferior para transição suave na imagem em mobile */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent md:hidden pointer-events-none"></div>
        </div>

        {/* Container do Conteúdo: Em mobile vem abaixo da imagem (no fluxo). Em desktop é coluna direita com scroll próprio. */}
        <div className="w-full md:w-7/12 p-4 md:p-8 flex flex-col md:overflow-y-auto min-h-max bg-gray-900 relative z-10 -mt-6 rounded-t-3xl md:mt-0 md:rounded-none shadow-[0_-5px_20px_rgba(0,0,0,0.5)] md:shadow-none border-t border-amber-50/5 md:border-t-0">
          <div className="flex-shrink-0 pt-2 md:pt-0">
            <h3 className="font-display text-xl md:text-3xl text-amber-100 leading-tight pr-8">{currentProcedureName}</h3>
            <p className="text-amber-100/80 mt-2 md:mt-3 text-sm leading-snug">{currentDescription}</p>
            <div className="font-serif text-lg md:text-xl text-amber-200 mt-4 break-words">
               {displayedPrice.includes('|')
                ? displayedPrice.split('|').map((part, i) => <span key={i} className="block leading-tight text-base md:text-lg">{part.trim()}</span>)
                : displayedPrice
              }
            </div>
             
             {/* Checkbox para Male Version */}
             {procedure.maleVersion && (
              <div className="mt-4 bg-gray-800/50 p-3 rounded-lg flex items-center transition-colors duration-300 border border-amber-50/10">
                  <input 
                      type="checkbox" 
                      id="male-version-checkbox"
                      checked={isMaleVersion}
                      onChange={(e) => {
                          setIsMaleVersion(e.target.checked);
                      }}
                      className="h-5 w-5 cursor-pointer rounded bg-gray-700 border-amber-50/30 text-amber-300 focus:ring-amber-200 focus:ring-offset-gray-900 flex-shrink-0"
                  />
                  <label htmlFor="male-version-checkbox" className="ml-3 text-sm text-amber-100/80 cursor-pointer">
                      Atendimento Masculino <span className="text-amber-200 font-medium">(+ R$10,00)</span>
                  </label>
              </div>
            )}

            {/* Checkbox Genérico (ex: Henna) */}
            {procedure.toggleOption && (
                <div className="mt-4 bg-gray-800/50 p-3 rounded-lg flex items-center transition-colors duration-300 border border-amber-50/10">
                    <input 
                        type="checkbox" 
                        id="toggle-option-checkbox"
                        checked={isToggleOptionSelected}
                        onChange={(e) => setIsToggleOptionSelected(e.target.checked)}
                        className="h-5 w-5 cursor-pointer rounded bg-gray-700 border-amber-50/30 text-amber-300 focus:ring-amber-200 focus:ring-offset-gray-900 flex-shrink-0"
                    />
                    <label htmlFor="toggle-option-checkbox" className="ml-3 text-sm text-amber-100/80 cursor-pointer">
                        {procedure.toggleOption.label} <span className="text-amber-200 font-medium">(+ R$ {procedure.toggleOption.priceIncrement.toFixed(2).replace('.', ',')})</span>
                    </label>
                </div>
            )}

            <ul className="mt-4 space-y-2 text-sm text-amber-100/70 list-none">
                {currentDetails?.map((detail, i) => 
                <li key={i} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>{detail}</span>
                </li>
              )}
            </ul>
          </div>

          <div className="flex-grow mt-6 md:mt-8 border-t border-amber-50/10 pt-4 md:pt-6 pb-4 mb-20 md:mb-0">
            <StepIndicator currentStep={step} totalSteps={5} />
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
