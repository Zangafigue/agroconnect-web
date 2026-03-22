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
import { formatFCFA } from '../../utils/currency';

const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  const { news, loading, fetchNews } = useNewsStore() as any;
  const { products, fetchProducts } = useProductStore() as any;

  useEffect(() => {
    fetchNews();
    if (products.length === 0) fetchProducts();
  }, [fetchNews, fetchProducts, products.length]);

  const displayNews = Array.isArray(news) ? news : [];
  const marketOps = Array.isArray(products) ? products.slice(0, 4) : [];

  return (
    <div className="bg-background text-on-background font-body min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <VisitorHeader />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <header className="mb-20">
          <span className="px-5 py-2 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6 inline-block shadow-sm">
            INFOS & TENDANCES DU MARCHÉ
          </span>
          <h1 className="text-5xl md:text-8xl font-serif-display text-on-surface mb-6 tracking-tighter leading-[0.9]">
            Actualités <span className="text-primary italic">Agricoles</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl font-newsreader italic">"Suivez les tendances du marché national et les innovations qui transforment notre secteur."</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[2.2fr_1fr] gap-20">
          {/* Main Feed */}
          <div className="space-y-20">
            {loading ? (
                <div className="py-32 text-center bg-white rounded-[4rem] border border-outline-variant/10 shadow-inner">
                    <Loader2 className="animate-spin text-primary mx-auto mb-6" size={48} />
                    <p className="text-on-surface-variant font-bold text-xl font-headline animate-pulse">Impression du journal en cours...</p>
                </div>
            ) : displayNews.length > 0 ? (
              displayNews.map((article: any, index: number) => (
                <article key={article._id || index} className="group cursor-pointer">
                  <div className="aspect-[21/9] rounded-[3rem] overflow-hidden mb-10 relative shadow-2xl">
                    <img 
                      src={article.image || "https://images.unsplash.com/photo-1595066117564-9686035987a0?auto=format&fit=crop&q=80&w=1200"} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-1000" 
                    />
                    <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-md px-6 py-2 rounded-2xl text-[10px] font-black text-primary tracking-widest uppercase shadow-xl border border-primary/5">
                      {article.category || "CULTURES"}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 text-xs font-bold text-outline-variant mb-6 uppercase tracking-widest">
                       <Calendar size={14} className="text-primary" /> {article.date || "21 Mars 2026"}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif-display text-on-surface mb-6 group-hover:text-primary transition-colors leading-[1.1] tracking-tight">
                      {article.title}
                    </h2>
                    <p className="text-on-surface-variant leading-relaxed text-lg font-body mb-8 line-clamp-3">
                      {article.excerpt || "Découvrez comment les nouvelles techniques d'irrigation solaire sont en train de révolutionner la production maraîchère dans le Nord du Burkina Faso..."}
                    </p>
                    <button className="flex items-center gap-3 text-primary font-black uppercase text-xs tracking-[0.2em] group/btn hover:gap-5 transition-all underline underline-offset-8">
                      Lire l'article complet
                      <ArrowRight size={18} className="transition-transform" />
                    </button>
                  </div>
                </article>
              ))
            ) : (
                <div className="py-32 text-center bg-white rounded-[4rem] border-4 border-dashed border-primary/5">
                    <Newspaper className="text-outline-variant mx-auto mb-8" size={80} />
                    <h3 className="text-3xl font-serif-display text-on-surface mb-4">Silence dans les kiosques</h3>
                    <p className="text-on-surface-variant font-medium max-w-md mx-auto italic font-newsreader">"Aucun article n'a encore été publié aujourd'hui. Profitez de ce calme pour aller faire un tour sur le marché !"</p>
                </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-16 lg:sticky lg:top-32 h-fit">
            <div className="bg-white rounded-[3.5rem] p-10 border border-outline-variant/10 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform"></div>
              <h3 className="text-2xl font-serif-display mb-10 flex items-center gap-3">
                <TrendingUp size={24} className="text-primary" /> Opportunités
              </h3>
              <div className="space-y-8">
                {marketOps.length > 0 ? marketOps.map((item: any, index: number) => (
                  <div key={item._id || index} onClick={() => navigate(`/catalog/${item._id}`)} className="flex gap-5 cursor-pointer group/item items-center">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-lg group-hover/item:scale-105 transition-transform">
                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-on-surface group-hover/item:text-primary transition-colors line-clamp-1">{item.name}</h4>
                        <p className="text-primary font-mono font-bold mt-1.5">{formatFCFA(item.price)} <span className="text-[10px] text-outline-variant font-medium">/ {item.unit}</span></p>
                        <p className="text-[10px] font-bold text-outline uppercase tracking-widest mt-1.5 flex items-center gap-1">
                            <Tag size={10} /> {item.location || item.city}
                        </p>
                    </div>
                  </div>
                )) : (
                    <p className="text-xs text-outline italic">Aucune opportunité pour le moment</p>
                )}
              </div>
              <button onClick={() => navigate('/catalog')} className="w-full mt-10 py-4 bg-primary/5 text-primary font-bold rounded-2xl hover:bg-primary hover:text-white transition-all">
                Tout le marché
              </button>
            </div>

            <div className="bg-[#14532d] rounded-[3.5rem] p-12 text-center shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
              <Bell className="text-white mx-auto mb-8 animate-ring group-hover:scale-110 transition-transform" size={48} />
              <h3 className="text-2xl font-serif-display mb-4 text-white">Alertes de Prix</h3>
              <p className="text-sm text-white/70 mb-10 leading-relaxed italic font-newsreader">"Soyez le premier informé dès qu'une opportunité majeure se présente dans votre filière."</p>
              <div className="space-y-4">
                <div className="relative group/input text-left">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within/input:text-white transition-colors" />
                    <input 
                      className="w-full bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:ring-2 focus:ring-white/30 outline-none placeholder:text-white/40" 
                      placeholder="votre@email.com" 
                    />
                </div>
                <button className="w-full bg-white text-[#14532d] font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-xl hover:shadow-white/20">
                  M'inscrire gratuitement
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
