import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Building2, 
  ArrowLeft, 
  Info,
  Smartphone,
  Truck
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';

const BuyerPaymentPage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('orange');
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12 font-body max-w-5xl mx-auto animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Paiement Sécurisé</h1>
          <p className="text-[14px] text-[var(--text-secondary)]">
            Vos fonds sont protégés par séquestre et libérés uniquement après confirmation de réception.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Payment Process */}
        <div className="lg:col-span-2 space-y-8">
          
          <Card className="p-8 space-y-6 border-[var(--border-light)]">
            <h2 className="text-[14px] font-bold text-[var(--text-primary)] uppercase tracking-widest border-l-4 border-[var(--text-accent)] pl-3">Mode de règlement</h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: 'orange', label: 'Orange Money', icon: Smartphone, color: '#FF6600' },
                { id: 'moov', label: 'Moov Money', icon: Smartphone, color: '#004A99' },
                { id: 'card', label: 'Carte Bancaire', icon: CreditCard },
                { id: 'bank', label: 'Virement', icon: Building2 }
              ].map((method) => (
                <button 
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all border-2 ${selectedMethod === method.id ? 'border-[var(--text-accent)] bg-[var(--text-accent)]/5 shadow-md' : 'border-[var(--border-light)] bg-[var(--bg-muted)] hover:border-[var(--text-accent)]/30'}`}
                >
                  <method.icon size={24} className={`mb-3 ${selectedMethod === method.id ? 'text-[var(--text-accent)]' : 'text-[var(--text-secondary)]'}`} />
                  <span className={`text-[10px] uppercase font-bold text-center ${selectedMethod === method.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>{method.label}</span>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-[var(--border-light)]">
               {['orange', 'moov'].includes(selectedMethod) ? (
                 <div className="space-y-6 max-w-sm mx-auto md:mx-0">
                    <Input 
                      label="Numéro de téléphone mobile"
                      placeholder="7x xx xx xx"
                      className="font-mono text-lg py-3 bg-[var(--bg-surface)] border-[var(--border-light)]"
                      icon={<span className="text-[var(--text-secondary)] font-bold pl-2">+226</span>}
                    />
                    <div className="flex items-start gap-3 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                      <Info size={16} className="text-amber-500 mt-0.5 shrink-0" />
                      <p className="text-[11px] font-medium text-amber-500 leading-relaxed">
                        Un message USSD sera envoyé sur votre téléphone pour autoriser le prélèvement.
                      </p>
                    </div>
                 </div>
               ) : selectedMethod === 'card' ? (
                 <div className="space-y-4 max-w-md mx-auto md:mx-0">
                    <Input label="Numéro de carte" placeholder="0000 0000 0000 0000" icon={<CreditCard size={18} />} className="font-mono text-lg bg-[var(--bg-surface)]" />
                    <div className="flex gap-4">
                       <Input label="Expiration" placeholder="MM/AA" className="font-mono text-lg text-center bg-[var(--bg-surface)]" />
                       <Input label="CVV" placeholder="123" className="font-mono text-lg text-center bg-[var(--bg-surface)]" />
                    </div>
                 </div>
               ) : (
                 <div className="bg-[var(--bg-muted)] p-6 rounded-xl border border-[var(--border-light)] max-w-md mx-auto md:mx-0">
                    <p className="text-[12px] text-[var(--text-primary)] font-bold mb-4">Informations pour le virement :</p>
                    <div className="space-y-3 font-mono text-[11px]">
                       <div className="flex justify-between border-b border-[var(--border-light)] pb-2">
                          <span className="text-[var(--text-secondary)]">Banque</span>
                          <span className="font-bold text-[var(--text-primary)]">Coris Bank International</span>
                       </div>
                       <div className="flex justify-between border-b border-[var(--border-light)] pb-2">
                          <span className="text-[var(--text-secondary)]">IBAN</span>
                          <span className="font-bold text-[var(--text-accent)] select-all">BF54 0000 0000 0000 00</span>
                       </div>
                    </div>
                 </div>
               )}
            </div>
          </Card>

          <Card className="bg-[var(--text-accent)]/5 border border-[var(--text-accent)]/10 shadow-sm flex items-start gap-4 p-6">
             <div className="w-10 h-10 bg-[var(--bg-surface)] rounded-xl shadow-sm flex items-center justify-center text-[var(--text-accent)] shrink-0 border border-[var(--border-light)]">
                <ShieldCheck size={20} />
             </div>
             <div>
                <h4 className="text-[12px] font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1">Garantie AgroConnect</h4>
                <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                   Vos paiements sont sécurisés via un système de séquestre (Escrow). Le producteur ne reçoit les fonds qu'une fois votre livraison conforme actée.
                </p>
             </div>
          </Card>

        </div>

        {/* Right Column: Order Summary */}
        <div className="space-y-6">
           <Card className="p-8 sticky top-24 border-[var(--border-light)]">
              <h3 className="text-[18px] font-display font-bold text-[var(--text-primary)] mb-6 pb-4 border-b border-[var(--border-light)]">Récapitulatif</h3>
              
              <div className="space-y-4 mb-6">
                 <div className="flex justify-between text-[13px]">
                    <span className="text-[var(--text-secondary)]">Produits (Maïs sec)</span>
                    <span className="font-bold font-mono text-[var(--text-primary)]">70 000 F</span>
                 </div>
                 <div className="flex justify-between text-[13px]">
                    <span className="text-[var(--text-secondary)] flex items-center gap-1"><Truck size={14} className="text-[var(--text-accent)]" /> Transport</span>
                    <span className="font-bold font-mono text-[var(--text-primary)]">15 000 F</span>
                 </div>
                 <div className="flex justify-between text-[13px]">
                    <span className="text-[var(--text-secondary)]">Frais de service (2%)</span>
                    <span className="font-bold font-mono text-[var(--text-primary)]">1 700 F</span>
                 </div>
              </div>
              
              <div className="pt-6 border-t border-[var(--border-light)] mb-8">
                 <div className="flex justify-between items-end">
                    <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Total net</span>
                    <span className="text-3xl font-mono font-bold text-[var(--text-accent)]">{formatFCFA(86700)}</span>
                 </div>
              </div>

              <div className="space-y-4">
                 <Button variant="primary" size="lg" className="w-full justify-center shadow-lg shadow-[var(--text-accent)]/20" icon={<Lock size={16} />}>
                    Payer 86 700 F
                 </Button>
                 <Button variant="ghost" size="sm" className="w-full justify-center text-[var(--text-secondary)] font-bold hover:text-[var(--text-primary)]" icon={<ArrowLeft size={14} />} onClick={() => navigate(-1)}>
                    Annuler & Retour
                 </Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default BuyerPaymentPage;
