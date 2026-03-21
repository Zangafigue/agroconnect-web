import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-[#ebffe5] dark:bg-slate-950 shadow-sm dark:shadow-none docked full-width top-0 sticky z-50">
        <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-bold font-headline text-[#006b2c] dark:text-green-400">
            AgroConnect BF
          </div>
          <div className="hidden md:flex items-center space-x-8 font-headline text-sm font-medium tracking-tight">
            <Link to="/catalog" className="text-[#0c200d]/80 dark:text-slate-300 hover:text-[#006b2c] transition-colors duration-200">Market</Link>
            <Link to="#" className="text-[#0c200d]/80 dark:text-slate-300 hover:text-[#006b2c] transition-colors duration-200">Producers</Link>
            <Link to="#" className="text-[#0c200d]/80 dark:text-slate-300 hover:text-[#006b2c] transition-colors duration-200">How it works</Link>
            <Link to="#" className="text-[#0c200d]/80 dark:text-slate-300 hover:text-[#006b2c] transition-colors duration-200">News</Link>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/login')} className="px-5 py-2 text-[#006b2c] font-medium active:scale-95 transition-transform hover:bg-[#d6efd0] rounded-lg">Login</button>
            <button onClick={() => navigate('/register')} className="px-6 py-2 bg-primary-container text-on-primary-container font-bold rounded-lg active:scale-95 transition-transform shadow-md">Sign Up</button>
          </div>
        </nav>
      </header>

      <section className="h-[580px] bg-hero-field relative flex items-center" data-alt="Vaste champ agricole au Burkina Faso sous un lever de soleil ocre">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-3xl">
            <span className="text-primary-fixed bg-primary-container/30 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] mb-6 inline-block uppercase">
              AGRI-TECH BURKINA FASO
            </span>
            <h1 className="text-5xl md:text-7xl font-serif-display text-white mb-6 leading-[1.1]">
              L'excellence agricole du Burkina Faso, à portée de clic
            </h1>
            <p className="text-xl text-white/90 mb-10 max-w-xl font-body leading-relaxed">
              Connectez-vous directement aux producteurs certifiés et transformez la chaîne d'approvisionnement agricole.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalog" className="px-8 py-4 bg-[#16a34a] text-white font-bold rounded-xl active:scale-95 transition-transform shadow-lg hover:brightness-110">
                Explorer le marché
              </Link>
              <Link to="/register" className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl active:scale-95 transition-transform hover:bg-white hover:text-primary transition-colors">
                Devenir partenaire
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-serif-display text-on-surface mb-4">Nos Filières Stratégiques</h2>
            <div className="w-24 h-1.5 bg-tertiary-container rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#14532d] p-10 rounded-xl flex flex-col justify-between group hover:shadow-xl transition-all h-[280px]">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-4xl text-primary-fixed" data-icon="grass">grass</span>
                <span className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors" data-icon="arrow_outward">arrow_outward</span>
              </div>
              <div>
                <h3 className="text-3xl font-serif-display text-white mb-2 tracking-tight">CÉRÉALES</h3>
                <p className="text-white/70 font-body text-sm">Maïs, Sorgho, Mil et Riz de qualité supérieure récoltés localement.</p>
              </div>
            </div>
            <div className="border-2 border-primary/10 bg-white p-10 rounded-xl flex flex-col justify-between group hover:border-primary transition-all h-[280px]">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-4xl text-primary" data-icon="nutrition">nutrition</span>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors" data-icon="arrow_outward">arrow_outward</span>
              </div>
              <div>
                <h3 className="text-3xl font-serif-display text-on-surface mb-2 tracking-tight">LÉGUMES</h3>
                <p className="text-on-surface-variant font-body text-sm">Produits maraîchers frais direct des périmètres irrigués.</p>
              </div>
            </div>
            <div className="border-2 border-primary/10 bg-white p-10 rounded-xl flex flex-col justify-between group hover:border-primary transition-all h-[280px]">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-4xl text-primary" data-icon="eco">eco</span>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors" data-icon="arrow_outward">arrow_outward</span>
              </div>
              <div>
                <h3 className="text-3xl font-serif-display text-on-surface mb-2 tracking-tight">FRUITS</h3>
                <p className="text-on-surface-variant font-body text-sm">Mangues, Agrumes et Papayes gorgés de soleil du Sud-Ouest.</p>
              </div>
            </div>
            <div className="border-2 border-primary/10 bg-white p-10 rounded-xl flex flex-col justify-between group hover:border-primary transition-all h-[280px]">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-4xl text-primary" data-icon="pets">pets</span>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors" data-icon="arrow_outward">arrow_outward</span>
              </div>
              <div>
                <h3 className="text-3xl font-serif-display text-on-surface mb-2 tracking-tight">ÉLEVAGE</h3>
                <p className="text-on-surface-variant font-body text-sm">Bétail et volaille élevés selon des normes de santé rigoureuses.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif-display text-on-surface mb-2">Produits Vedettes</h2>
              <p className="text-on-surface-variant font-body">Les meilleures offres disponibles en ce moment</p>
            </div>
            <Link to="/catalog" className="text-primary font-bold flex items-center gap-2 group underline-offset-4 hover:underline">
              Tout voir <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div onClick={() => navigate('/catalog/1')} className="bg-surface-container-lowest rounded-xl overflow-hidden group cursor-pointer">
              <div className="h-56 relative overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Épis de maïs jaune fraîchement récoltés" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOQbG8JDIK6vGUzBVqMEJ5zI6FC5ZhkVPnuqse0S7hCdxf2U1SSB1q3xTEZgDscGi3iG8HpJs0BFs99pmHUMXpLtkAOmMDnkvx6Ig1iGKkQ-FennHKWjN08QNs7jiDlzHtwQublD0HE7ntsHeYVnog2-QUB6Z8wssfeG_2tQ6Tr6yz5PaJnxFQLeLu0U2qjwW5m5S2uceFEn_uCOPn3NKAMarBkeewhCEL47SaG9t49jm7uRzdyL74SRQZ7WvEhK129gkC_5Fqi1M"/>
                <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">CONFIRMÉE</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-on-surface font-headline">Maïs Blanc Premium</h3>
                  <span className="font-mono text-primary font-bold text-lg">18,500 FCFA/sac</span>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/10">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">SM</div>
                  <span className="text-sm font-medium text-on-surface-variant">Saran M. - Bobo Dioulasso</span>
                </div>
              </div>
            </div>
            <div onClick={() => navigate('/catalog/2')} className="bg-surface-container-lowest rounded-xl overflow-hidden group cursor-pointer">
              <div className="h-56 relative overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Tomates rouges mûres en caisse" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk6-lAhMJLJBTlmx9d2IIzbR0gcVOOw_fBHlBIl4VlOTHg8KepiSdx8EajQF2qBpAuBvbkwS-xqM-gccloBl7juIfbA2SlYqFmRyl57ompbSwmAVk6I9GOr_7L5w7cBoM0OUceaxN9nF8i3poBNFd4uMu8x7Q1Jqj9Wno34Nxf4zvsUyS6Cw-95nO363AkQwF1KE4VKPxJw7R_JgNQHeC-Nkx51IYPQCn8Ml0uS_8jdxkE5RaL8cE3EJS7Qzjtrb1y6ntCRj4wVqk"/>
                <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">LIBÉRÉ</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-on-surface font-headline">Tomates de Réo</h3>
                  <span className="font-mono text-primary font-bold text-lg">4,200 FCFA/caisse</span>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/10">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">IK</div>
                  <span className="text-sm font-medium text-on-surface-variant">Issaka K. - Sanguié</span>
                </div>
              </div>
            </div>
            <div onClick={() => navigate('/catalog/3')} className="bg-surface-container-lowest rounded-xl overflow-hidden group cursor-pointer">
              <div className="h-56 relative overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Grains de sorgho séchés au soleil" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDywVW5KP-jWoZ0EksqG-UTRBQiapJjua8DKoNmWVpPDNfb-jnJvk1V_23Dm1x5s2UjE9kOltOgnUEqebBvnaQXXcJWzs7xv0eCT6-D8OcvG-ypK0uMCQ2xOYswpsGpt1_Mq67KOTzKjIfcdNlAP_z9X3PQ-ZIjAZlm9Q3jffmXTsn-4LnR0p9GrXY6Z1Ko8lNbLhpi8vhaCtHABiKmo9bVRIfzJy78NkqawhlHmYh6Txm1j9N3IhuDBj2M3yAA7ReV3EfizhFJw_4"/>
                <span className="absolute top-4 left-4 bg-tertiary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">EN ATTENTE</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-on-surface font-headline">Sorgho Rouge Local</h3>
                  <span className="font-mono text-primary font-bold text-lg">22,000 FCFA/sac</span>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/10">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">AB</div>
                  <span className="text-sm font-medium text-on-surface-variant">Adama B. - Ouahigouya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#14532d] py-24 text-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif-display mb-4">Pourquoi Choisir AgroConnect BF ?</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Nous digitalisons la confiance pour bâtir une agriculture burkinabè résiliente et prospère.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl text-primary-fixed" data-icon="handshake">handshake</span>
              </div>
              <h3 className="text-xl font-bold mb-3 font-headline">Connexion Directe</h3>
              <p className="text-white/60 text-sm leading-relaxed">Éliminez les intermédiaires inutiles. Traitez directement avec ceux qui cultivent la terre.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl text-primary-fixed" data-icon="account_balance_wallet">account_balance_wallet</span>
              </div>
              <h3 className="text-xl font-bold mb-3 font-headline">Négociation Équitable</h3>
              <p className="text-white/60 text-sm leading-relaxed">Transparence totale sur les prix du marché pour une rémunération juste des producteurs.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl text-primary-fixed" data-icon="local_shipping">local_shipping</span>
              </div>
              <h3 className="text-xl font-bold mb-3 font-headline">Logistique Fiable</h3>
              <p className="text-white/60 text-sm leading-relaxed">Réseau de transporteurs certifiés pour garantir la fraîcheur et la sécurité de vos produits.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif-display text-on-surface mb-8">Comment ça marche ?</h2>
            <div className="inline-flex p-1 bg-surface-container-high rounded-lg font-label text-sm">
              <button className="px-6 py-2 bg-white text-primary font-bold rounded shadow-sm">Acheteurs</button>
              <button className="px-6 py-2 text-on-surface-variant hover:text-primary">Producteurs</button>
              <button className="px-6 py-2 text-on-surface-variant hover:text-primary">Transporteurs</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative group">
              <div className="text-8xl font-serif-display text-primary/10 absolute -top-4 -left-4 group-hover:text-primary/20 transition-colors">1</div>
              <div className="relative pt-12">
                <h4 className="text-xl font-bold mb-2 font-headline">Exploration</h4>
                <p className="text-on-surface-variant text-sm">Naviguez par filière ou région pour trouver les produits dont vous avez besoin.</p>
              </div>
            </div>
            <div className="relative group">
              <div className="text-8xl font-serif-display text-primary/10 absolute -top-4 -left-4 group-hover:text-primary/20 transition-colors">2</div>
              <div className="relative pt-12">
                <h4 className="text-xl font-bold mb-2 font-headline">Négociation</h4>
                <p className="text-on-surface-variant text-sm">Discutez des quantités et des prix directement sur notre messagerie sécurisée.</p>
              </div>
            </div>
            <div className="relative group">
              <div className="text-8xl font-serif-display text-primary/10 absolute -top-4 -left-4 group-hover:text-primary/20 transition-colors">3</div>
              <div className="relative pt-12">
                <h4 className="text-xl font-bold mb-2 font-headline">Paiement</h4>
                <p className="text-on-surface-variant text-sm">Effectuez votre transaction via Mobile Money ou virement, les fonds sont sécurisés.</p>
              </div>
            </div>
            <div className="relative group">
              <div className="text-8xl font-serif-display text-primary/10 absolute -top-4 -left-4 group-hover:text-primary/20 transition-colors">4</div>
              <div className="relative pt-12">
                <h4 className="text-xl font-bold mb-2 font-headline">Réception</h4>
                <p className="text-on-surface-variant text-sm">Suivez votre commande jusqu'à la livraison finale par nos partenaires logistiques.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-[#f0fdf4] rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-tertiary/5 rounded-full -ml-24 -mb-24"></div>
            <h2 className="text-4xl md:text-5xl font-serif-display text-primary mb-6 relative z-10">Rejoignez 1 200 acteurs agricoles</h2>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 font-body relative z-10">Faites partie de la révolution agricole digitale au Burkina Faso. Créez votre compte gratuitement aujourd'hui.</p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <Link to="/register" className="px-10 py-4 bg-primary text-white font-bold rounded-xl active:scale-95 transition-transform shadow-lg">S'inscrire gratuitement</Link>
              <Link to="/catalog" className="px-10 py-4 border-2 border-primary text-primary font-bold rounded-xl active:scale-95 transition-transform hover:bg-primary/5">Consulter le marché</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#ebffe5] dark:bg-slate-950 border-t border-[#6e7b6c]/15 dark:border-slate-800 w-full pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 max-w-7xl mx-auto">
          <div>
            <span className="text-xl font-bold text-[#006b2c] dark:text-green-400 mb-4 block font-headline">AgroConnect BF</span>
            <p className="text-[#0c200d]/80 dark:text-slate-400 text-sm font-newsreader leading-relaxed">
              Faciliter les échanges agricoles pour un Burkina Faso autosuffisant et prospère.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 font-label">Plateforme</h4>
            <div className="flex flex-col space-y-2 text-sm font-newsreader">
              <Link to="/catalog" className="text-[#0c200d]/80 dark:text-slate-400 hover:text-[#006b2c] transition-colors">Marketplace</Link>
              <Link to="#" className="text-[#0c200d]/80 dark:text-slate-400 hover:text-[#006b2c] transition-colors">Producer Directory</Link>
              <Link to="#" className="text-[#0c200d]/80 dark:text-slate-400 hover:text-[#006b2c] transition-colors">Logistics</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 font-label">Support</h4>
            <div className="flex flex-col space-y-2 text-sm font-newsreader">
              <Link to="#" className="text-[#0c200d]/80 dark:text-slate-400 hover:text-[#006b2c] transition-colors">Pricing</Link>
              <Link to="#" className="text-[#0c200d]/80 dark:text-slate-400 hover:text-[#006b2c] transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-[#0c200d]/80 dark:text-slate-400 hover:text-[#006b2c] transition-colors">Terms of Service</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 font-label">Newsletter</h4>
            <p className="text-sm text-on-surface-variant mb-4">Restez informé des cours du marché.</p>
            <div className="flex gap-2">
              <input className="bg-surface-container-low border-0 rounded-lg text-sm w-full focus:ring-2 focus:ring-[#006b2c] outline-none px-3" placeholder="Email" type="email"/>
              <button className="bg-[#006b2c] text-white px-4 rounded-lg active:scale-95 transition-transform flex items-center justify-center">
                <span className="material-symbols-outlined text-sm" data-icon="send">send</span>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-[#6e7b6c]/10 text-center">
          <p className="text-[#0c200d]/60 dark:text-slate-500 text-xs font-newsreader">
            © 2024 AgroConnect BF. Precision Agriculture for Burkina Faso.
          </p>
        </div>
      </footer>
    </>
  );
}
