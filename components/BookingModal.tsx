import React, { useState, useEffect } from 'react';
import { Procedure, BookingFormData } from '../types';
import ShimmerButton from './ShimmerButton';
import ImageCarousel from './ImageCarousel';

interface BookingModalProps {
  procedure: Procedure | null;
  onClose: () => void;
  isOpen: boolean;
}

const PaymentOption: React.FC<{ value: string; label: string; description: string; selected: boolean; onChange: (value: any) => void }> = ({ value, label, description, selected, onChange }) => (
    <div 
        onClick={() => onChange(value)}
        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${selected ? 'bg-amber-400/20 border-amber-300' : 'bg-gray-700/50 border-amber-50/20 hover:border-amber-200/50'}`}
    >
        <p className={`font-semibold text-sm ${selected ? 'text-amber-200' : 'text-amber-50'}`}>{label}</p>
        <p className="text-xs text-amber-100/60">{description}</p>
    </div>
);

const BookingModal: React.FC<BookingModalProps> = ({ procedure, onClose, isOpen }) => {
  const [step, setStep] = useState(0);
  const [isMaleVersion, setIsMaleVersion] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    preferredDate: '',
    preferredTime: '',
    paymentMethod: '',
    observations: '',
  });

  useEffect(() => {
    if (procedure) {
      setIsMaleVersion(false);
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

  const nextStep = () => {
    if (step === 0 && !formData.name) return;
    if (step === 1 && (!formData.preferredDate || !formData.preferredTime)) return;
    // Step 2 (observations) is optional
    if (step === 3 && !formData.paymentMethod) return;
    setStep(prev => prev + 1);
  };
  
  const prevStep = () => setStep(prev => prev - 1);
  
  const resetAndClose = () => {
    setStep(0);
    setIsMaleVersion(false);
    setFormData({ name: '', preferredDate: '', preferredTime: '', paymentMethod: '', observations: '' });
    onClose();
  };

  const currentProcedureName = isMaleVersion && procedure.maleVersion ? procedure.maleVersion.name : procedure.name;
  const currentPrice = isMaleVersion && procedure.maleVersion ? procedure.maleVersion.price : procedure.price;
  const currentDescription = isMaleVersion && procedure.maleVersion ? procedure.maleVersion.description : procedure.description;
  const currentDetails = isMaleVersion && procedure.maleVersion ? procedure.maleVersion.details : procedure.details;
  const currentImages = isMaleVersion && procedure.maleVersion?.images ? procedure.maleVersion.images : procedure.images;

  const generateWhatsAppMessage = () => {
    const studioPhone = '5542999722042';
    const paymentMethodText = {
        pix: 'Pix',
        credito: 'Cartão de Crédito',
        debito: 'Cartão de Débito'
    };
    
    const message = `Olá, Joyci! Gostaria de agendar o procedimento de *${currentProcedureName}*.

*Meus Dados:*
*Nome:* ${formData.name}
*Data Preferencial:* ${formData.preferredDate}
*Horário Preferencial:* ${formData.preferredTime}
*Forma de Pagamento:* ${paymentMethodText[formData.paymentMethod as keyof typeof paymentMethodText]}
${formData.observations ? `*Observações:* ${formData.observations}` : ''}

Aguardo seu contato para confirmar. Obrigada! ✨`;
    
    return `https://wa.me/${studioPhone}?text=${encodeURIComponent(message)}`;
  };
  
  const renderStepContent = () => {
    switch(step) {
      case 0: // Name
        return (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-amber-100/80 mb-2">Qual seu nome completo?</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-700/50 border border-amber-50/20 rounded-lg p-3 focus:ring-1 focus:ring-amber-200 focus:outline-none transition" placeholder="Seu nome" />
            <div className="flex gap-4 mt-6">
               <button onClick={resetAndClose} className="w-1/3 text-amber-200">Voltar</button>
               <ShimmerButton onClick={nextStep} className="w-2/3" disabled={!formData.name}>Próximo</ShimmerButton>
            </div>
          </div>
        );
      case 1: // Date & Time
        return (
           <div>
            <label htmlFor="preferredDate" className="block text-sm font-medium text-amber-100/80 mb-2">Qual a melhor data e horário para você?</label>
            <div className="flex gap-4">
              <input type="date" id="preferredDate" name="preferredDate" value={formData.preferredDate} onChange={handleInputChange} className="w-1/2 bg-gray-700/50 border border-amber-50/20 rounded-lg p-3 focus:ring-1 focus:ring-amber-200 focus:outline-none transition" />
              <input type="time" id="preferredTime" name="preferredTime" value={formData.preferredTime} onChange={handleInputChange} className="w-1/2 bg-gray-700/50 border border-amber-50/20 rounded-lg p-3 focus:ring-1 focus:ring-amber-200 focus:outline-none transition" />
            </div>
            <div className="flex gap-4 mt-6">
               <button onClick={prevStep} className="w-1/3 text-amber-200">Voltar</button>
               <ShimmerButton onClick={nextStep} className="w-2/3" disabled={!formData.preferredDate || !formData.preferredTime}>Próximo</ShimmerButton>
            </div>
          </div>
        );
      case 2: // Observations
        return (
          <div>
            <label htmlFor="observations" className="block text-sm font-medium text-amber-100/80 mb-2">Tem alguma observação ou alergia?</label>
            <textarea id="observations" name="observations" value={formData.observations} onChange={handleInputChange} rows={3} className="w-full bg-gray-700/50 border border-amber-50/20 rounded-lg p-3 focus:ring-1 focus:ring-amber-200 focus:outline-none transition" placeholder="Ex: sou alérgica a esmalte, tenho a pele sensível, etc. (opcional)"></textarea>
             <div className="flex gap-4 mt-6">
               <button onClick={prevStep} className="w-1/3 text-amber-200">Voltar</button>
               <ShimmerButton onClick={nextStep} className="w-2/3">Próximo</ShimmerButton>
            </div>
          </div>
        );
       case 3: // Payment Method
        return (
          <div>
            <label className="block text-sm font-medium text-amber-100/80 mb-2">Qual será a forma de pagamento?</label>
            <div className="space-y-3">
              <PaymentOption value="pix" label="Pix" description="Pagamento instantâneo." selected={formData.paymentMethod === 'pix'} onChange={handlePaymentChange} />
              <PaymentOption value="credito" label="Cartão de Crédito" description="Até 2x com taxa da máquina." selected={formData.paymentMethod === 'credito'} onChange={handlePaymentChange} />
              <PaymentOption value="debito" label="Cartão de Débito" description="Pagamento à vista." selected={formData.paymentMethod === 'debito'} onChange={handlePaymentChange} />
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={prevStep} className="w-1/3 text-amber-200">Voltar</button>
              <ShimmerButton onClick={nextStep} className="w-2/3" disabled={!formData.paymentMethod}>Finalizar</ShimmerButton>
            </div>
          </div>
        );
       case 4: // Confirmation
        const paymentMethodText = {
            pix: 'Pix',
            credito: 'Cartão de Crédito',
            debito: 'Cartão de Débito'
        };
        return (
          <div className="text-center">
            <h4 className="font-serif text-base md:text-lg text-amber-50">Confirme seus dados</h4>
            <div className="text-left bg-gray-800/50 p-4 rounded-lg my-4 text-amber-100/90 text-sm space-y-2">
              <p><strong>Procedimento:</strong> {currentProcedureName}</p>
              <p><strong>Nome:</strong> {formData.name}</p>
              <p><strong>Data/Hora:</strong> {formData.preferredDate} às {formData.preferredTime}</p>
              <p><strong>Pagamento:</strong> {paymentMethodText[formData.paymentMethod as keyof typeof paymentMethodText]}</p>
              {formData.observations && <p><strong>Observações:</strong> {formData.observations}</p>}
            </div>
            <p className="text-xs text-amber-100/60 mb-4">Ao clicar no botão, você será redirecionada para o WhatsApp para enviar sua solicitação de agendamento.</p>
            <div className="flex gap-4 mt-6">
              <button onClick={prevStep} className="w-1/3 text-amber-200">Editar</button>
              <a href={generateWhatsAppMessage()} target="_blank" rel="noopener noreferrer" className="w-2/3" onClick={resetAndClose}>
                <ShimmerButton className="w-full">Confirmar e Enviar</ShimmerButton>
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={resetAndClose}>
      <div 
        className="relative bg-gray-900 border border-amber-200/20 shadow-2xl shadow-amber-900/40 rounded-xl w-full max-w-4xl flex flex-col md:flex-row max-h-[90vh] overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={resetAndClose} className="absolute top-3 right-3 z-20 text-amber-200/70 hover:text-amber-200 transition-transform hover:scale-110">
          <span className="text-3xl font-light">&times;</span>
        </button>

        {/* Carousel Side */}
        <div className="w-full md:w-5/12 flex-shrink-0 bg-gray-800">
          <ImageCarousel images={currentImages} procedureName={currentProcedureName} />
        </div>

        {/* Info & Form Side */}
        <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col overflow-y-auto">
          <div className="flex-shrink-0">
            <h3 className="font-serif text-xl md:text-2xl text-amber-50">{currentProcedureName}</h3>
            <p className="text-amber-100/80 mt-2 text-sm">{currentDescription}</p>
            <div className="font-serif text-lg md:text-xl text-amber-200 mt-4">
               {currentPrice.includes('|')
                ? currentPrice.split('|').map((part, i) => <span key={i} className="block leading-tight text-base md:text-lg">{part.trim()}</span>)
                : currentPrice
              }
            </div>
             {procedure.maleVersion && (
              <div className="mt-4 bg-gray-800/50 p-3 rounded-lg flex items-center transition-colors duration-300">
                  <input 
                      type="checkbox" 
                      id="male-version-checkbox"
                      checked={isMaleVersion}
                      onChange={(e) => setIsMaleVersion(e.target.checked)}
                      className="h-5 w-5 cursor-pointer rounded bg-gray-700 border-amber-50/30 text-amber-300 focus:ring-amber-200 focus:ring-offset-gray-900"
                  />
                  <label htmlFor="male-version-checkbox" className="ml-3 text-sm text-amber-100/80 cursor-pointer">
                      Atendimento Masculino <span className="text-amber-200 font-medium">(+ R$10,00)</span>
                  </label>
              </div>
            )}
            <ul className="mt-4 space-y-2 text-sm text-amber-100/70 list-disc list-inside">
              {currentDetails?.map((detail, i) => <li key={i}>{detail}</li>)}
            </ul>
          </div>

          <div className="flex-grow mt-8 border-t border-amber-50/10 pt-8">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;