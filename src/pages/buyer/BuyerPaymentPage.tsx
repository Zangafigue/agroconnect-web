import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Building2, 
  ArrowLeft, 
  CheckCircle2, 
  Info,
  Smartphone,
  ChevronRight,
  TrendingUp,
  Receipt,
  Truck,
  Leaf
} from 'lucide-react';
import { formatFCFA } from '../../utils/currency';

const BuyerPaymentPage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('orange');
  const navigate = useNavigate();

  return (
    <div className="flex-1 py-16 px-6 md:px-12 max-w-7xl mx-auto w-full mb-32 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Central Payment Canvas */}
        <div className="lg:col-span-8 w-full space-y-12">
          <div className="text-center lg:text-left">
            <h1 className="font-serif-display text-5xl lg:text-6xl text-on-surface mb-6 leading-tight">Paiement sécurisé</h1>
            <p className="text-on-surface-variant font-medium text-lg max-w-2xl">Finalisez votre commande via nos partenaires certifiés. Vos fonds sont protégés par séquestre jusqu'à livraison.</p>
          </div>

          {/* Payment Methods Grid */}
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-outline mb-8 border-l-4 border-primary pl-6 py-1">Mode de règlement</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { id: 'orange', label: 'Orange Money', icon: Smartphone, color: '#FF6600' },
                { id: 'moov', label: 'Moov Money', icon: Smartphone, color: '#004A99' },
                { id: 'card', label: 'Carte Bancaire', icon: CreditCard, color: 'primary' },
                { id: 'bank', label: 'Virement', icon: Building2, color: 'primary' }
              ].map((method) => (
                <button 
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex flex-col items-center justify-center p-8 rounded-[2rem] transition-all duration-300 border-2 ${selectedMethod === method.id ? 'border-primary bg-primary/5 shadow-2xl scale-105' : 'border-transparent bg-surface-container-low hover:bg-surface-container-high'}`}
                >
                  <div className={`p-4 rounded-2xl mb-4 ${selectedMethod === method.id ? 'bg-primary text-white shadow-lg' : 'bg-white text-outline shadow-sm'}`}>
                    <method.icon size={28} />
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest font-black text-center ${selectedMethod === method.id ? 'text-primary' : 'text-outline'}`}>{method.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Active Payment Form */}
          <div className="bg-surface-container-lowest rounded-[3rem] p-10 border border-outline-variant/10 shadow-sm">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
              <h3 className="font-serif-display text-2xl text-on-surface">
                Détails du paiement 
              </h3>
            </div>
            
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              {['orange', 'moov'].includes(selectedMethod) ? (
                <div className="max-w-md space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Numéro de téléphone</label>
                    <div className="relative group">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-outline group-focus-within:text-primary transition-colors">+226</span>
                      <input type="text" className="w-full pl-20 pr-6 py-5 bg-surface-container-low focus:bg-white border-2 border-transparent focus:border-primary/20 rounded-2xl font-mono text-xl font-black focus:ring-0 transition-all shadow-inner" placeholder="7x xx xx xx" />
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <Info size={18} className="text-primary mt-1 shrink-0" />
                    <p className="text-xs font-medium text-on-surface-variant italic">Un message de confirmation USSD sera envoyé sur votre mobile pour valider la transaction.</p>
                  </div>
                </div>
              ) : selectedMethod === 'card' ? (
                <div className="max-w-md space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Numéro de carte</label>
                    <div className="relative group">
                       <input type="text" className="w-full px-6 py-5 bg-surface-container-low focus:bg-white border-2 border-transparent focus:border-primary/20 rounded-2xl font-mono text-xl font-black focus:ring-0 transition-all shadow-inner" placeholder="0000 0000 0000 0000" />
                       <CreditCard className="absolute right-6 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={20} />
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-1 space-y-3">
                      <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Expiration</label>
                      <input type="text" className="w-full px-6 py-5 bg-surface-container-low focus:bg-white border-2 border-transparent focus:border-primary/20 rounded-2xl font-mono text-lg font-black transition-all shadow-inner" placeholder="MM/AA" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">CVV</label>
                      <input type="text" className="w-full px-6 py-5 bg-surface-container-low focus:bg-white border-2 border-transparent focus:border-primary/20 rounded-2xl font-mono text-lg font-black transition-all shadow-inner" placeholder="123" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-lg p-8 bg-surface-container-low/50 rounded-2xl border border-outline-variant/5 border-dashed">
                  <p className="text-sm font-medium text-on-surface-variant mb-6">Effectuez votre virement avec ces informations :</p>
                  <div className="space-y-4 font-mono text-xs font-black uppercase tracking-widest text-on-surface">
                    <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                       <span className="text-outline">Banque</span>
                       <span>Coris Bank International</span>
                    </div>
                    <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                       <span className="text-outline">IBAN</span>
                       <span className="text-primary select-all">BF54 0000 0000 0000 00</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-outline">Bénéficiaire</span>
                       <span>AgroConnect BF</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Trust Banner */}
          <div className="bg-primary/5 rounded-[2rem] p-8 border border-primary/10 flex items-start gap-6 group hover:bg-primary/10 transition-colors">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg group-hover:rotate-12 transition-transform">
               <ShieldCheck size={32} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-on-surface">Paiement 100% Sécurisé</h4>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                Vos données sont cryptées par SSL 256-bit. Votre paiement est conservé en séquestre et ne sera libéré au vendeur qu'après confirmation de votre réception conforme.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <button className="w-full max-w-md bg-primary text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-4 group">
              Valider le paiement <Lock size={20} className="group-hover:rotate-12 transition-transform" />
            </button>
            <button onClick={() => navigate(-1)} className="mt-8 text-outline font-black text-[10px] uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
              <ArrowLeft size={14} /> Retour à la commande
            </button>
          </div>
        </div>

        {/* Sidebar Recap */}
        <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
           <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-outline-variant/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
              
              <h3 className="font-serif-display text-3xl mb-10 border-b border-outline-variant/10 pb-6 relative z-10">Récapitulatif</h3>
              
              <div className="space-y-6 mb-10 relative z-10">
                <div className="flex justify-between items-center group">
                  <span className="text-on-surface-variant font-bold text-sm">Produits</span>
                  <span className="font-mono font-black text-on-surface">70 000 FCFA</span>
                </div>
                <div className="flex justify-between items-center group">
                  <span className="text-on-surface-variant font-bold text-sm flex items-center gap-2">
                    <Truck size={14} className="text-tertiary" /> Livraison
                  </span>
                  <span className="font-mono font-black text-on-surface">15 000 FCFA</span>
                </div>
                <div className="pt-8 border-t-4 border-dashed border-outline-variant/20 flex flex-col gap-2">
                  <span className="text-[10px] font-black text-outline uppercase tracking-widest">Montant Total</span>
                  <span className="font-mono font-black text-4xl text-primary">{formatFCFA(85000)}</span>
                </div>
              </div>

              <div className="p-6 bg-surface-container-low/50 rounded-2xl space-y-4 border border-outline-variant/5 relative z-10">
                <h4 className="font-black text-[10px] uppercase tracking-widest text-primary mb-2">Ma commande</h4>
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Leaf size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-on-surface uppercase tracking-wider">Maïs sec local</p>
                    <p className="text-[10px] font-bold text-outline uppercase mt-0.5">Quantité: 10 sacs</p>
                  </div>
                </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default BuyerPaymentPage;
