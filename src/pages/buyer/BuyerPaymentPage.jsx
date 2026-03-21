import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BuyerPaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState('orange');

  return (
    <div className="flex-1 py-12 px-6 max-w-[1200px] mx-auto w-full mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Central Payment Canvas */}
        <div className="lg:col-span-8 w-full">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="font-['DM_Serif_Display'] text-4xl lg:text-5xl text-[#0c200d] mb-4">Paiement sécurisé</h1>
            <p className="text-[#3e4a3d] font-body">Finalisez votre commande en toute tranquillité via nos partenaires de paiement certifiés.</p>
          </div>

          {/* Payment Methods Grid */}
          <section className="mb-12">
            <h2 className="font-['Newsreader'] text-xl font-bold mb-6 italic border-l-4 border-[#006b2c] pl-4">Sélectionnez votre mode de paiement</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Orange Money */}
              <button 
                onClick={() => setSelectedMethod('orange')}
                className={`flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-200 border-2 ${selectedMethod === 'orange' ? 'border-[#006b2c] bg-white shadow-sm' : 'border-transparent bg-[#e1fbdc] hover:bg-[#d0e9cb]'}`}
              >
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMdaefx6SN29tUwFVEQOnufUhoXJ_WnwN_Nm32tv7yaU0eSA2UzhhsgW-S3Bg3OdMa3QPhXoDvV4-EdEtxWIgjWflbojSflHWgQWGigC0974WpsxHbeidwUbCYp9JDun9IfCGBQ4Nmw5kxQ4FX68YCPW6dSD3yWHAPQYEKClRyxa6-bvK_tAy_e6sigjHo85rA7NVm2kEufau5miQ9pgUjEoiV4Rt-DezQqRTgUCDIekSEZH4AOFoRVG3-9TzppJuTBs1tHsy4cKU" alt="Orange Money" className="w-12 h-12 mb-3 object-contain" />
                <span className={`font-medium text-sm ${selectedMethod === 'orange' ? 'text-[#006b2c] font-bold' : 'text-[#0c200d]'}`}>Orange Money</span>
              </button>

              {/* Moov Money */}
              <button 
                onClick={() => setSelectedMethod('moov')}
                className={`flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-200 border-2 ${selectedMethod === 'moov' ? 'border-[#006b2c] bg-white shadow-sm' : 'border-transparent bg-[#e1fbdc] hover:bg-[#d0e9cb]'}`}
              >
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhK1sDQ-CVQudpZXyE6Li6FK9Y7clCmnqxSHmP22yN39i30kTzdDNqq7c5Refe6_sbFdXreY5FNW8D30DBPMNPi00ucbzeX8lfvbhIOEF0ucGKOw9E25f7-inAMoK4Sfl6FQ3q--f7CabGo6GjhTSsMZRYoUa9K0Xk89FydR499R6I04vpEsw0gzJxFvxVGqTg_jC0bJL80Qzn3R921vWBaeXwZXK3u8jIjW1BTjRxWLVc_5oQXKrALbetHpmGFCWwSk2h3bRxhY0" alt="Moov Money" className="w-12 h-12 mb-3 object-contain" />
                <span className={`font-medium text-sm ${selectedMethod === 'moov' ? 'text-[#006b2c] font-bold' : 'text-[#0c200d]'}`}>Moov Money</span>
              </button>

              {/* Carte */}
              <button 
                onClick={() => setSelectedMethod('card')}
                className={`flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-200 border-2 ${selectedMethod === 'card' ? 'border-[#006b2c] bg-white shadow-sm' : 'border-transparent bg-[#e1fbdc] hover:bg-[#d0e9cb]'}`}
              >
                <span className={`material-symbols-outlined text-4xl mb-3 ${selectedMethod === 'card' ? 'text-[#006b2c]' : 'text-[#3e4a3d]'}`}>credit_card</span>
                <span className={`font-medium text-sm ${selectedMethod === 'card' ? 'text-[#006b2c] font-bold' : 'text-[#0c200d]'}`}>Carte Bancaire</span>
              </button>

              {/* Virement */}
              <button 
                onClick={() => setSelectedMethod('bank')}
                className={`flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-200 border-2 ${selectedMethod === 'bank' ? 'border-[#006b2c] bg-white shadow-sm' : 'border-transparent bg-[#e1fbdc] hover:bg-[#d0e9cb]'}`}
              >
                <span className={`material-symbols-outlined text-4xl mb-3 ${selectedMethod === 'bank' ? 'text-[#006b2c]' : 'text-[#3e4a3d]'}`}>account_balance</span>
                <span className={`font-medium text-sm ${selectedMethod === 'bank' ? 'text-[#006b2c] font-bold' : 'text-[#0c200d]'}`}>Virement</span>
              </button>
            </div>
          </section>

          {/* Active Payment Form */}
          <div className="bg-white rounded-xl p-8 mb-12 shadow-sm border border-[#d0e9cb]/50">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#006b2c]"></span>
              <h3 className="font-bold text-lg">
                Détails {selectedMethod === 'orange' ? 'Orange Money' : selectedMethod === 'moov' ? 'Moov Money' : selectedMethod === 'card' ? 'Carte Bancaire' : 'Virement'}
              </h3>
            </div>
            
            {selectedMethod === 'orange' || selectedMethod === 'moov' ? (
              <div className="max-w-md">
                <label className="block text-sm font-medium text-[#3e4a3d] mb-2">Numéro de téléphone</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[#3e4a3d]">+226</span>
                  <input type="text" className="w-full pl-16 pr-4 py-4 bg-[#e1fbdc]/50 border-none focus:ring-2 focus:ring-[#006b2c] rounded-xl font-mono text-lg" placeholder="7x xx xx xx" />
                </div>
                <p className="mt-3 text-xs text-[#3e4a3d] italic">Un message de confirmation USSD sera envoyé sur votre mobile.</p>
              </div>
            ) : selectedMethod === 'card' ? (
              <div className="max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#3e4a3d] mb-2">Numéro de carte</label>
                  <input type="text" className="w-full px-4 py-4 bg-[#e1fbdc]/50 border-none focus:ring-2 focus:ring-[#006b2c] rounded-xl font-mono text-lg" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#3e4a3d] mb-2">Expiration</label>
                    <input type="text" className="w-full px-4 py-4 bg-[#e1fbdc]/50 border-none focus:ring-2 focus:ring-[#006b2c] rounded-xl font-mono text-lg" placeholder="MM/AA" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#3e4a3d] mb-2">CVV</label>
                    <input type="text" className="w-full px-4 py-4 bg-[#e1fbdc]/50 border-none focus:ring-2 focus:ring-[#006b2c] rounded-xl font-mono text-lg" placeholder="123" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-md">
                <p className="text-[#3e4a3d]">Veuillez effectuer un virement aux coordonnées bancaires suivantes :</p>
                <div className="bg-[#e1fbdc]/50 p-4 rounded-xl mt-4 space-y-2 font-mono text-sm">
                  <p><strong>Banque:</strong> Coris Bank International</p>
                  <p><strong>IBAN:</strong> BF00 0000 0000 0000 00</p>
                  <p><strong>Bénéficiaire:</strong> AgroConnect BF</p>
                </div>
              </div>
            )}
          </div>

          {/* Protected Box */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 flex items-start gap-4 mb-12">
            <span className="material-symbols-outlined text-blue-600 fill-current">verified_user</span>
            <div>
              <h4 className="font-bold text-blue-900 text-sm uppercase tracking-wider mb-1">Transaction Protégée</h4>
              <p className="text-blue-800 text-sm leading-relaxed">Vos données sont cryptées par SSL 256-bit. AgroConnect ne stocke aucune information bancaire. Votre paiement est sécurisé par le protocole 3D-Secure.</p>
            </div>
          </div>

          {/* Main Action */}
          <div className="flex flex-col items-center">
            <button className="w-full max-w-md bg-gradient-to-br from-[#006b2c] to-[#00873a] text-white py-5 rounded-xl font-bold text-lg shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3 active:scale-95">
              Payer 85 000 FCFA <span className="material-symbols-outlined text-xl">lock</span>
            </button>
            <Link to="/buyer/orders" className="mt-6 text-[#006b2c] font-medium hover:underline flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Modifier la commande
            </Link>
          </div>
        </div>

        {/* Sidebar Recap */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 bg-white p-8 rounded-xl shadow-sm border border-[#d0e9cb]/50">
          <h3 className="font-['DM_Serif_Display'] text-2xl mb-8 border-b border-[#dcf5d6] pb-4">Récapitulatif</h3>
          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-[#3e4a3d] font-body">Produits</span>
              <span className="font-mono font-medium">70 000 FCFA</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#3e4a3d] font-body">Livraison</span>
              <span className="font-mono font-medium">15 000 FCFA</span>
            </div>
            <div className="pt-6 border-t border-dashed border-[#bdcaba] flex justify-between items-center">
              <span className="font-bold text-lg">Total à payer</span>
              <span className="font-mono font-bold text-2xl text-[#006b2c]">85 000 FCFA</span>
            </div>
          </div>

          <div className="bg-[#e1fbdc]/50 p-4 rounded-lg">
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#2e6a41] mb-3">Articles commandés</h4>
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded bg-[#d0e9cb] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#2e6a41]">eco</span>
              </div>
              <div className="flex-grow">
                <p className="text-sm font-bold truncate">Maïs sec</p>
                <p className="text-xs text-[#3e4a3d]">Quantité: 10 sacs</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
