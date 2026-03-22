import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Newspaper, 
  ArrowRight, 
  Loader2, 
  TrendingUp, 
  ShoppingBag,
  Bell,
  Mail,
  Calendar,
  Tag
} from 'lucide-react';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import { useNewsStore } from '../../store/newsStore';
import { useProductStore } from '../../store/productStore';


const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  const { news, loading, fetchNews } = useNewsStore() as any;
  const { products, fetchProducts } = useProductStore() as any;
  const { formatFCFA } = { formatFCFA: (val: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(val) };

  useEffect(() => {
    fetchNews();
    if (products.length === 0) fetchProducts();
  }, [fetchNews, fetchProducts, products.length]);

  const displayNews = Array.isArray(news) ? news : [];
  const marketOps = Array.isArray(products) ? products.slice(0, 4) : [];

  return (
    <div className="bg-white text-[#111827] min-h-screen">
      <VisitorHeader />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-24 pt-40">
        <header className="mb-20 text-center max-w-3xl mx-auto">
          <span className="px-4 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6 inline-block">
            LE JOURNAL D'AGROCONNECT
          </span>
          <h1 className="text-6xl md:text-8xl font-serif-display text-black mb-6 tracking-tight leading-[0.9]">
            L'Actualité <br/><span className="text-[var(--green-600)] italic">du Terroir</span>
          </h1>
          <p className="text-xl text-gray-500 font-light">
            Analyses, tendances et histoires de ceux qui façonnent l'agriculture de demain au Burkina Faso.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-20">
          {/* Main Feed */}
          <div className="space-y-24">
            {loading ? (
                <div className="py-32 text-center">
                    <Loader2 className="animate-spin text-[var(--green-600)] mx-auto mb-4" size={48} />
                    <p className="text-gray-400 font-medium tracking-widest uppercase text-xs">Rédaction en cours...</p>
                </div>
            ) : displayNews.length > 0 ? (
              displayNews.map((article: any, index: number) => (
                <article key={article._id || index} className="group cursor-pointer">
                  <div className="aspect-[16/9] rounded-[2rem] overflow-hidden mb-8 relative bg-gray-100">
                    <img 
                      src={article.image || "https://images.unsplash.com/photo-1595066117564-9686035987a0?auto=format&fit=crop&q=80&w=1200"} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" 
                    />
                    <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-xl text-[10px] font-black text-black tracking-widest uppercase shadow-sm border border-black/5">
                      {article.category || "CULTURES"}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">
                       <Calendar size={14} className="text-[var(--green-600)]" /> {article.date || "22 Mars 2026"}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif-display text-black mb-6 group-hover:text-[var(--green-600)] transition-colors leading-tight tracking-tight">
                      {article.title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed text-lg font-light mb-8 line-clamp-3">
                      {article.excerpt || "Les nouvelles dynamiques du marché agricole imposent une adaptation rapide des producteurs locaux..."}
                    </p>
                    <button className="flex items-center gap-2 text-black font-bold uppercase text-xs tracking-widest group/btn hover:text-[var(--green-600)] transition-all underline underline-offset-8 decoration-gray-200 hover:decoration-current">
                      Lire la suite
                      <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </article>
              ))
            ) : (
                <div className="py-32 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                    <Newspaper className="text-gray-300 mx-auto mb-6" size={64} />
                    <h3 className="text-2xl font-serif-display text-black mb-2">Aucune nouvelle aujourd'hui</h3>
                    <p className="text-gray-500 max-w-sm mx-auto italic font-newsreader">Revenez plus tard pour les dernières mises à jour du marché.</p>
                </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-12 lg:sticky lg:top-32 h-fit">
            <div className="bg-[#f9fafb] rounded-[2.5rem] p-10 border border-gray-100 relative overflow-hidden group">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <TrendingUp size={20} className="text-[var(--green-600)]" /> Marché en direct
              </h3>
              <div className="space-y-6">
                {marketOps.length > 0 ? marketOps.map((item: any, index: number) => (
                  <div key={item._id || index} onClick={() => navigate(`/catalog/${item._id}`)} className="flex gap-4 cursor-pointer group/item items-center border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-200">
                        <img src={item.image} className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all" alt={item.name} />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-sm text-black group-hover/item:text-[var(--green-600)] transition-colors line-clamp-1">{item.name}</h4>
                        <p className="text-[var(--green-600)] font-bold text-sm mt-1">{formatFCFA(item.price)}</p>
                    </div>
                  </div>
                )) : (
                    <p className="text-xs text-gray-400 italic">Aucune donnée disponible</p>
                )}
              </div>
              <button onClick={() => navigate('/catalog')} className="w-full mt-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-[var(--green-700)] transition-all text-sm">
                Voir tout le marché
              </button>
            </div>

            <div className="bg-[#14532d] rounded-[2.5rem] p-10 text-center text-white relative overflow-hidden group">
              <Bell className="text-[var(--green-400)] mx-auto mb-6 animate-pulse" size={40} />
              <h3 className="text-2xl font-serif-display mb-4">La Lettre Agricole</h3>
              <p className="text-sm text-white/60 mb-8 font-light leading-relaxed">
                Recevez chaque lundi un condensé des prix et opportunités du Faso.
              </p>
              <div className="space-y-3">
                <input 
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-sm text-white focus:ring-1 focus:ring-white/40 outline-none placeholder:text-white/30" 
                  placeholder="votre@email.com" 
                />
                <button className="w-full bg-white text-black font-bold py-4 rounded-xl transition-all active:scale-95 text-sm">
                  S'abonner
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <VisitorFooter />
    </div>
  );
};

export default NewsPage;
