import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import { useUserStore } from '../../store/userStore';
import { useProductStore } from '../../store/productStore';
import { useProducerStore } from '../../store/producerStore';
import { Target, ShieldCheck, TrendingUp, Users, ArrowRight } from 'lucide-react';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const { users, fetchUsers } = useUserStore() as any;
  const { products, fetchProducts } = useProductStore() as any;
  const { producers, fetchProducers } = useProducerStore() as any;

  useEffect(() => {
    if (users.length === 0) fetchUsers();
    if (products.length === 0) fetchProducts();
    if (producers.length === 0) fetchProducers();
  }, [fetchUsers, fetchProducts, fetchProducers, users.length, products.length, producers.length]);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary-container">
      <VisitorHeader />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <section className="text-center mb-32 animate-in fade-in slide-in-from-bottom duration-1000">
          <span className="px-5 py-2 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8 inline-block rounded-full shadow-sm">
            NOTRE MISSION & VISION
          </span>
          <h1 className="text-5xl md:text-8xl font-serif-display text-on-surface mb-10 tracking-tighter leading-[0.9]">
            Digitaliser le terroir <br/> <span className="italic text-primary">pour tout le Burkina</span>
          </h1>
          <p className="text-2xl text-on-surface-variant max-w-4xl mx-auto font-newsreader leading-relaxed italic">
            "AgroConnect BF est bien plus qu'une simple plateforme commerciale. C'est un écosystème conçu pour sécuriser les transactions, garantir une juste rémunération aux agriculteurs et faciliter l'accès à des produits de qualité pour tous."
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center mb-40">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/10 rounded-[4rem] -rotate-6 group-hover:rotate-0 transition-transform duration-700"></div>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDywVW5KP-jWoZ0EksqG-UTRBQiapJjua8DKoNmWVpPDNfb-jnJvk1V_23Dm1x5s2UjE9kOltOgnUEqebBvnaQXXcJWzs7xv0eCT6-D8OcvG-ypK0uMCQ2xOYswpsGpt1_Mq67KOTzKjIfcdNlAP_z9X3PQ-ZIjAZlm9Q3jffmXTsn-4LnR0p9GrXY6Z1Ko8lNbLhpi8vhaCtHABiKmo9bVRIfzJy78NkqawhlHmYh6Txm1j9N3IhuDBj2M3yAA7ReV3EfizhFJw_4" 
              className="relative rounded-[4rem] w-full h-[650px] object-cover shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] transition-all duration-700 group-hover:-translate-y-6" 
              alt="Agriculture Burkina Faso" 
            />
          </div>
          <div className="space-y-12">
            <div className="bg-white p-12 rounded-[3rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
              <h3 className="text-3xl font-serif-display text-primary mb-6 flex items-center gap-3">
                <Target size={28} /> Notre Vision
              </h3>
              <p className="text-on-surface-variant leading-relaxed font-body text-lg">
                Nous croyons en un Burkina Faso autosuffisant où chaque producteur, même dans les zones les plus reculées, peut accéder au marché national sans entrave et au prix juste.
              </p>
            </div>
            <div className="bg-white p-12 rounded-[3rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
              <h3 className="text-3xl font-serif-display text-secondary mb-6 flex items-center gap-3">
                <ShieldCheck size={28} /> Nos Valeurs
              </h3>
              <p className="text-on-surface-variant leading-relaxed font-body text-lg">
                Transparence, Sécurité et Solidarité sont les piliers de notre action. Nous utilisons la technologie pour renforcer les liens humains et non les remplacer.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest py-32 px-12 rounded-[5rem] text-center border border-outline-variant/10 shadow-inner overflow-hidden relative">
           <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
           </div>
          <h2 className="text-4xl md:text-5xl font-serif-display text-on-surface mb-20">Impact & Chiffres Clés</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 relative z-10">
            <div className="group">
              <p className="text-6xl font-mono font-bold text-primary mb-4 tracking-tighter group-hover:scale-110 transition-transform inline-block">
                {users.length > 0 ? users.length : "1.2K"}
              </p>
              <p className="text-[10px] font-black text-outline uppercase tracking-[0.3em]">Utilisateurs</p>
            </div>
            <div className="group">
              <p className="text-6xl font-mono font-bold text-secondary mb-4 tracking-tighter group-hover:scale-110 transition-transform inline-block">
                {producers.length > 0 ? producers.length : "840"}
              </p>
              <p className="text-[10px] font-black text-outline uppercase tracking-[0.3em]">Agriculteurs</p>
            </div>
            <div className="group">
              <p className="text-6xl font-mono font-bold text-tertiary mb-4 tracking-tighter group-hover:scale-110 transition-transform inline-block">
                {products.length > 0 ? products.length : "2.1K"}
              </p>
              <p className="text-[10px] font-black text-outline uppercase tracking-[0.3em]">Annonces</p>
            </div>
            <div className="group">
              <p className="text-6xl font-mono font-bold text-primary mb-4 tracking-tighter group-hover:scale-110 transition-transform inline-block">
                24/7
              </p>
              <p className="text-[10px] font-black text-outline uppercase tracking-[0.3em]">Assistance</p>
            </div>
          </div>
        </section>

        <section className="mt-40 text-center pb-20">
          <div className="bg-primary/5 rounded-[4rem] p-20 border-2 border-dashed border-primary/20">
            <h2 className="text-4xl md:text-6xl font-serif-display mb-12 text-on-surface tracking-tight">Prêt à transformer l'avenir ?</h2>
            <div className="flex flex-wrap justify-center gap-8">
              <button 
                onClick={() => navigate('/register')}
                className="px-14 py-5 bg-primary text-white font-bold rounded-2xl shadow-2xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all text-lg"
              >
                Rejoindre l'aventure
              </button>
              <button 
                onClick={() => navigate('/catalog')}
                className="px-14 py-5 border-2 border-primary/20 text-primary font-bold rounded-2xl hover:bg-white active:scale-95 transition-all text-lg"
              >
                Explorer le marché
              </button>
            </div>
          </div>
        </section>
      </main>
      <VisitorFooter />
    </div>
  );
};

export default AboutPage;
