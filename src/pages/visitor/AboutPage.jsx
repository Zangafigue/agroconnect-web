import { useNavigate } from 'react-router-dom';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import { useUserStore } from '../../store/userStore';
import { useProductStore } from '../../store/productStore';
import { useProducerStore } from '../../store/producerStore';

export default function AboutPage() {
  const { users, fetchUsers } = useUserStore();
  const { products, fetchProducts } = useProductStore();
  const { producers, fetchProducers } = useProducerStore();

  React.useEffect(() => {
    if (users.length === 0) fetchUsers();
    if (products.length === 0) fetchProducts();
    if (producers.length === 0) fetchProducers();
  }, [users.length, products.length, producers.length, fetchUsers, fetchProducts, fetchProducers]);
  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary-container">
      <VisitorHeader />
      
      <main className="max-w-7xl mx-auto px-8 py-20">
        <section className="text-center mb-20 animate-fade-in">
          <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block rounded-full">
            Notre Mission
          </span>
          <h1 className="text-5xl md:text-7xl font-serif-display text-on-surface mb-8 tracking-tighter">
            Digitaliser l'agriculture <br/> <span className="italic text-primary">pour le Burkina Faso</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-3xl mx-auto font-newsreader leading-relaxed">
            AgroConnect BF est bien plus qu'une simple plateforme commerciale. C'est un écosystème conçu pour sécuriser les transactions, garantir une juste rémunération aux agriculteurs et faciliter l'accès à des produits de qualité pour tous.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/10 rounded-[3rem] -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDywVW5KP-jWoZ0EksqG-UTRBQiapJjua8DKoNmWVpPDNfb-jnJvk1V_23Dm1x5s2UjE9kOltOgnUEqebBvnaQXXcJWzs7xv0eCT6-D8OcvG-ypK0uMCQ2xOYswpsGpt1_Mq67KOTzKjIfcdNlAP_z9X3PQ-ZIjAZlm9Q3jffmXTsn-4LnR0p9GrXY6Z1Ko8lNbLhpi8vhaCtHABiKmo9bVRIfzJy78NkqawhlHmYh6Txm1j9N3IhuDBj2M3yAA7ReV3EfizhFJw_4" className="relative rounded-[3rem] w-full h-[500px] object-cover shadow-2xl transition-all duration-500 group-hover:-translate-y-4" alt="Agriculture Burkina" />
          </div>
          <div className="space-y-8">
            <div className="bg-surface-container-low p-10 rounded-[2.5rem] border border-outline-variant/10 hover:shadow-xl transition-all">
              <h3 className="text-2xl font-serif-display text-primary mb-4">Notre Vision</h3>
              <p className="text-on-surface-variant leading-relaxed font-body">
                Nous croyons en un Burkina Faso autosuffisant où chaque producteur, même dans les zones les plus reculées, peut accéder au marché national sans entrave et au prix juste.
              </p>
            </div>
            <div className="bg-surface-container-low p-10 rounded-[2.5rem] border border-outline-variant/10 hover:shadow-xl transition-all">
              <h3 className="text-2xl font-serif-display text-secondary mb-4">Nos Valeurs</h3>
              <p className="text-on-surface-variant leading-relaxed font-body">
                Transparence, Sécurité et Solidarité sont les piliers de notre action. Nous utilisons la technologie pour renforcer les liens humains et non les remplacer.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest py-24 px-12 rounded-[4rem] text-center border border-outline-variant/5 shadow-sm">
          <h2 className="text-4xl font-serif-display text-on-surface mb-16">Chiffres Clés</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <p className="text-5xl font-mono font-bold text-primary mb-2 tracking-tighter">{users.length || "..."}</p>
              <p className="text-xs font-bold text-outline uppercase tracking-widest">Utilisateurs</p>
            </div>
            <div>
              <p className="text-5xl font-mono font-bold text-primary mb-2 tracking-tighter">{producers.length || "..."}</p>
              <p className="text-xs font-bold text-outline uppercase tracking-widest">Agriculteurs</p>
            </div>
            <div>
              <p className="text-5xl font-mono font-bold text-primary mb-2 tracking-tighter">{products.length || "..."}</p>
              <p className="text-xs font-bold text-outline uppercase tracking-widest">Produits</p>
            </div>
            <div>
              <p className="text-5xl font-mono font-bold text-primary mb-2 tracking-tighter">24h/7</p>
              <p className="text-xs font-bold text-outline uppercase tracking-widest">Support</p>
            </div>
          </div>
        </section>

        <section className="mt-32 text-center pb-20">
          <h2 className="text-4xl font-serif-display mb-10 text-on-surface">Prêt à transformer l'avenir ?</h2>
          <div className="flex justify-center gap-6">
            <button 
              onClick={() => navigate('/register')}
              className="px-12 py-5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
            >
              Rejoindre l'aventure
            </button>
            <button 
              onClick={() => navigate('/catalog')}
              className="px-12 py-5 border-2 border-primary text-primary font-bold rounded-2xl hover:bg-primary/5 active:scale-95 transition-all"
            >
              Consulter le marché
            </button>
          </div>
        </section>
      </main>
      <VisitorFooter />
    </div>
  );
}
