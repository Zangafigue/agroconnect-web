import React, { useEffect } from 'react';
import VisitorHeader from '../../components/shared/VisitorHeader';
import VisitorFooter from '../../components/shared/VisitorFooter';
import { useNewsStore } from '../../store/newsStore';
import { useProductStore } from '../../store/productStore';
import { useNavigate } from 'react-router-dom';
import { formatFCFA } from '../../utils/currency';

export default function NewsPage() {
  const navigate = useNavigate();
  const { news, loading, fetchNews } = useNewsStore();
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchNews();
    if (products.length === 0) fetchProducts();
  }, [fetchNews, fetchProducts, products.length]);

  const displayNews = Array.isArray(news) ? news : [];
  const marketOps = Array.isArray(products) ? products.slice(0, 4) : [];

  return (
    <div className="bg-background font-body min-h-screen">
      <VisitorHeader />
      
      <main className="max-w-7xl mx-auto px-8 py-16">
        <header className="mb-16">
          <h1 className="text-5xl font-serif-display text-on-surface mb-4">Actualités Agricoles</h1>
          <p className="text-xl text-on-surface-variant">Suivez les tendances du marché et les innovations du secteur.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          {/* Main Feed */}
          <div className="space-y-12">
            {loading ? (
                <div className="py-20 text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-on-surface-variant font-bold">Chargement des actualités...</p>
                </div>
            ) : displayNews.length > 0 ? (
              displayNews.map((article, index) => (
                <article key={`news-art-${article.id || article._id || index}`} className="border-b border-outline-variant/10 pb-12 last:border-0">
                  <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-6 relative">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-xs font-bold text-primary">
                      {article.category}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-newsreader text-outline mb-3">{article.date}</div>
                    <h2 className="text-3xl font-serif-display text-on-surface mb-4 group-hover:text-primary transition-colors leading-tight">
                      {article.title}
                    </h2>
                    <p className="text-on-surface-variant leading-relaxed line-clamp-2 mb-6">
                      {article.excerpt}
                    </p>
                    <button className="flex items-center gap-2 text-primary font-bold group/btn">
                      Lire la suite 
                      <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                    </button>
                  </div>
                </article>
              ))
            ) : (
                <div className="py-20 text-center bg-surface-container-low rounded-3xl border-2 border-dashed border-outline-variant/30">
                    <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">newspaper</span>
                    <p className="text-on-surface-variant font-bold text-xl">Aucune actualité disponible</p>
                    <p className="text-outline">Revenez plus tard pour les dernières nouvelles du secteur.</p>
                </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10">
              <h3 className="text-xl font-serif-display mb-6">Opportunités du Marché</h3>
              <div className="space-y-6">
                {marketOps.length > 0 ? marketOps.map((item, index) => (
                  <div key={`news-trend-${item.id || item._id || index}`} onClick={() => navigate(`/catalog/${item.id || item._id}`)} className="flex gap-4 cursor-pointer group">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={item.name} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-primary font-mono font-bold mt-1">{formatFCFA(item.price)}</p>
                        <p className="text-[10px] text-outline mt-0.5">{item.location}</p>
                    </div>
                  </div>
                )) : (
                    <p className="text-xs text-outline italic">Aucune opportunité pour le moment</p>
                )}
              </div>
            </div>

            <div className="bg-primary-container/30 rounded-3xl p-8 text-center border border-primary/10">
              <h3 className="text-xl font-serif-display mb-4">Newsletter</h3>
              <p className="text-sm text-on-surface-variant mb-6">Recevez les alertes de prix directement dans votre boîte mail.</p>
              <div className="space-y-3">
                <input className="w-full bg-white border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="votre@email.com" />
                <button className="w-full bg-primary text-white font-bold py-3 rounded-xl transition-transform active:scale-95 shadow-lg shadow-primary/20">S'abonner</button>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <VisitorFooter />
    </div>
  );
}
