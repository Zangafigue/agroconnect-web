import { Link, useNavigate } from 'react-router-dom';

export default function ProductDetailPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background font-body antialiased min-h-screen">
      <header className="docked full-width top-0 sticky z-50 bg-[#ebffe5] shadow-sm border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-bold font-headline text-[#006b2c]">AgroConnect BF</Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/catalog" className="text-[#006b2c] font-bold border-b-2 border-[#006b2c] pb-1 font-headline text-sm tracking-tight">Market</Link>
            <Link to="#" className="text-[#0c200d] hover:text-[#006b2c] transition-colors duration-200 font-headline text-sm font-medium tracking-tight">Producers</Link>
            <Link to="#" className="text-[#0c200d] hover:text-[#006b2c] transition-colors duration-200 font-headline text-sm font-medium tracking-tight">How it works</Link>
            <Link to="#" className="text-[#0c200d] hover:text-[#006b2c] transition-colors duration-200 font-headline text-sm font-medium tracking-tight">News</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/login')} className="text-[#0c200d] hover:text-[#006b2c] font-headline text-sm font-medium active:scale-95 transition-transform">Login</button>
            <button onClick={() => navigate('/register')} className="bg-[#006b2c] text-white px-5 py-2 rounded-xl font-headline text-sm font-medium active:scale-95 transition-transform">Sign Up</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-outline mb-8">
          <Link className="hover:text-primary" to="/catalog">Market</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <Link className="hover:text-primary" to="#">Céréales</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-on-background font-medium">Maïs sec</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-[48px]">
          <div className="space-y-6">
            <div className="relative group">
              <img alt="Maïs sec" className="w-full h-[420px] object-cover rounded-[12px]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2Vx9tKz6g_BR4TQs2o8AFnzUfajUaMem7LPfl24jZr9zw_6gArOYE97VE40dqtdKJYfnb_HES38hMK2E8iFPQ15MwDeCc5cdNzY2FlABrtITMh5z594zdHqshE5s1c_281-ASIjcV1cw_Kw1VOCUelULfXXchiqQBczug0qROhghkFHkGmmA3pmieynshU50zIbmYTsGtaHC4fVusLXAmjUsTJIEWNwU06l6n_YnTnH9UU073GjsMF0tvQyIpwx-kAxyrhptLxwM"/>
              <div className="absolute top-4 left-4 bg-[#fef3c7] text-[#b45309] px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                  CÉRÉALES
              </div>
              <div className="absolute top-4 right-4 bg-[#dcfce7] text-[#15803d] px-3 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  DISPONIBLE
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="h-20 rounded-[8px] overflow-hidden border-2 border-primary cursor-pointer ring-2 ring-primary/20">
                <img className="w-full h-full object-cover" alt="Vignette" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKimcUID2C9gz8taI8QDX0wNtYfuT_AfWwBM-mKghGBaiEr30t9pbPS-FBhQyYgPCJDFDoyR4AKgPm1y0TdLBEds4zCsKsA-vd7c3TK1qrTlTrWo2A_JxcS8ZDQA9CTMNENQiiXF0Ha_hVVj7ZLVXhJZp8SZT_g0i1mZFhfLj8NMpVWwMOtD4D5gbfHL4RiLUNOREIEzh6aeStyPISpaQhJ09A4jSD4T0qenx-EV_DjyXR24j-XTjIdeegpTyI4DeiY1Pz6qPkJFk"/>
              </div>
              <div className="h-20 rounded-[8px] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity bg-surface-container-low">
                <img className="w-full h-full object-cover" alt="Vignette" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-oH9AHdLHs8fXCeUTNAc5uSxbu1f6Rm21vSd854oVSWXmyaSctWEvFg9_Mb9thLUkQoS6fO-ysKsQgcChG7ettnrRI3j9XYWiEIHh2tseGzVd3qIzB5umnyrFJu7WLlXnR_7Sem_9sbCQxsD9ScsfU6dsbPGC1XUoQj0-dnwiQj9IgUjeCTHb1-n1Gi1kG8rVCrex-ttCa2fnKOlKE_hom8oY8pz5A2eAawBU3rsnp52f2KHr1Q_BFSY9lZrXVhHtmHaE8tw2nwQ"/>
              </div>
              <div className="h-20 rounded-[8px] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity bg-surface-container-low">
                <img className="w-full h-full object-cover" alt="Vignette" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqHJr58xnaDaXF4tt9jLHOPY1B70vLPtURAMxAMipzRAyZocT_Tim12CdfsiKN6ybvYxLugn8bSs_7U1R0D15N8x5u-PJ0wdkjJcidQ_Z9g78ZMLsQPt-L9FAa63F7EZ3JwGVNE5FoAonl2fl_i9E9vpMUobHkJGewrSZqhFOxzMtYEfXusFyIbKJT0WPMBu96yFBSX3rhJnh-pWGFPyY9HSBAq6mIkoNPLXjUK4x7iWy7SLX4IJR9JKrJyawcUfyMarcaIRBU_0E"/>
              </div>
              <div className="h-20 rounded-[8px] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity bg-surface-container-low relative">
                <img className="w-full h-full object-cover opacity-40" alt="Vignette" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOOK7wOvYPF4iTP3-x54LbaoQX7yl4q9SkZJxKpbCUoMd8ejKTOqqiWyuWtMxjAuVwhJI8lGuqKGojrEYbpU7xkJvZqQFYrjqHRxX-3SqFjDyhVZ1ex7kOKcz2NaAX6BnNS4B2tkLGxlklEr-I9q5_KORhKVEPjeqZiKKbv8sj6_21VLsw8pH4vHWjQ-rWhXkGKjALpw2Yv7PPk_kkpPs5cle9mEw-rxg7PJbv2nR8MuS1woweuGXdGQ-GGEJ8BZ9_nudarKoUs0E"/>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-on-surface">+2</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-outline uppercase tracking-widest">
              <span>Marché</span><span className="material-symbols-outlined text-[10px]">arrow_forward_ios</span><span>Céréales</span>
            </div>
            <h1 className="font-serif-display text-[2rem] leading-tight text-on-background mb-4">
              Maïs sec de qualité supérieure
            </h1>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-mono text-[2rem] font-bold text-[#16a34a]">5 000 FCFA</span>
              <span className="text-outline text-lg">/ sac (100kg)</span>
            </div>
            <div className="flex items-center gap-2 text-[#16a34a] font-medium bg-[#ebffe5] border border-green-200 w-fit px-4 py-2 rounded-xl mb-8">
              <span className="material-symbols-outlined">inventory_2</span>
              <span>Stock disponible : 500 kg (50 sacs)</span>
            </div>
            
            <div className="bg-surface-container-low/50 rounded-[12px] p-4 mb-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center font-bold text-xl shrink-0">
                AK
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-on-background">Amadou Kaboré</h3>
                  <div className="flex items-center gap-1 text-sm font-bold text-tertiary">
                    <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    4.8
                  </div>
                </div>
                <p className="text-sm text-outline-variant">Agriculteur • Bobo-Dioulasso</p>
              </div>
            </div>
            
            <div className="bg-surface-container-highest/40 border border-[#86efac]/30 rounded-[12px] p-6">
              <h4 className="font-bold text-lg mb-2 text-on-background">Intéressé par ce produit ?</h4>
              <p className="text-on-surface-variant text-sm mb-6">Connectez-vous pour commander ce lot ou contacter directement le producteur.</p>
              <div className="flex flex-col gap-3">
                <button onClick={() => navigate('/register')} className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold hover:bg-primary-container transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">person_add</span>
                  S'inscrire
                </button>
                <button onClick={() => navigate('/login')} className="w-full border-2 border-primary text-primary py-3 rounded-xl font-bold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">login</span>
                  Se connecter
                </button>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-20 pt-12 border-t border-outline-variant/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-body font-semibold text-2xl mb-8 text-on-background">Description détaillée</h2>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                Ce maïs est cultivé selon des méthodes durables dans la région de Bobo-Dioulasso. Récolté à pleine maturité, il bénéficie d'un séchage naturel optimal pour garantir une conservation longue durée sans perte de qualité nutritionnelle. Parfait pour la consommation humaine ou la transformation agro-industrielle.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span className="text-on-background"><strong className="font-semibold">Variété :</strong> Maïs jaune hybride haute performance</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span className="text-on-background"><strong className="font-semibold">Récolte :</strong> Saison 2023 - Récente</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span className="text-on-background"><strong className="font-semibold">Humidité :</strong> Inférieure à 13% (conforme stockage)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span className="text-on-background"><strong className="font-semibold">Conditionnement :</strong> Sacs neufs de 100kg</span>
                </li>
              </ul>
            </div>
            
            <div className="h-[220px] rounded-[12px] overflow-hidden bg-surface-container relative">
              <img alt="Carte localisation" className="w-full h-full object-cover grayscale opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZJrSQW0pdjyhddmeu36MRydZDya3b-o9KmgP81tRl4YyfRlynUIls2G3rpVgNShOCThNzim1blsxXE9-1n4uRmClg-2JQalpCuFx0g4zPLCnzwryJvCJpTrY4qNR-gkFCQJliTaAjdWfJ9D9MkGk0U95wVD4lXHNQ9yioeD8oyeBCry6btIx4JkxfArXKW7vNZRnk_m3dpbZc34sgxHbJP6Rxiu0nJ-FzW1nEbMPDQ0IxzUpZ66FbO4rAa9wLRRWETxVkVsf0WmE"/>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-primary text-on-primary p-3 rounded-full shadow-lg">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-primary">
                BOBO-DIOULASSO
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-body font-semibold text-2xl mb-8 text-on-background">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest border border-transparent rounded-[12px] overflow-hidden hover:shadow-xl hover:border-surface-variant transition-all duration-300 group cursor-pointer">
              <div className="h-40 relative">
                <img className="w-full h-full object-cover" alt="Sorgho" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL1BpqrO5BIIfqiHI_Vf_JbBGfzEDjRFrCw12sdeqw5teJYsBWcQz05YWtjFW_NRo6n0EFvib1gGUdA31wpj0cIl3z2OFfY1vJMudz0hZmVclcsRDDOF2Xn9RmcYzvdfD2bADAV9_0vXuP5NDcORiYBjsrKaoPNJTiDMWUC1TQYQMiGvpmx48olComuoZCTfN6uoAocy2aJQHaa5wMSJydr405pjs1ZENnwX8CGZQmKRk3Rb0evpqwpLLsPkYS3Ty2N0Gf77x6DZE"/>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-on-background mb-1">Sorgho blanc local</h4>
                <p className="text-xs text-outline mb-3">500 kg disponibles</p>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-primary font-bold">4 500 FCFA</span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-container-lowest border border-transparent rounded-[12px] overflow-hidden hover:shadow-xl hover:border-surface-variant transition-all duration-300 group cursor-pointer">
              <div className="h-40 relative">
                <img className="w-full h-full object-cover" alt="Petit mil" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7kp5jfcnCc9Kzpp9x_ysC-Vz8omcTDTX2HVKPrZhR9_FUPtobmC_IcZiLhUfxa3PVBrNXSvxfVZc5VcRm3pWKIuBrZTHRlO46_2VuIAqjld_yYhufRQX1ZmY9mydDrP_lrdCeGLrl7mmgzOPOmwdiN3rZXEwgewvk0aIUFdf0p6FiHfyWjM_fvY2Nx0Nbr6QC_QPAjRttHGyq_NKTWI0PANp0K6pxAOXc13eJyXq6ilj4gpOMoBeVljBkPs5ULZkSJfft9E9KPFw"/>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-on-background mb-1">Petit Mil (Souna)</h4>
                <p className="text-xs text-outline mb-3">200 kg disponibles</p>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-primary font-bold">6 000 FCFA</span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-transparent rounded-[12px] overflow-hidden hover:shadow-xl hover:border-surface-variant transition-all duration-300 group cursor-pointer">
              <div className="h-40 relative">
                <img className="w-full h-full object-cover" alt="Niébé" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf7xoIxrp6O9HyyVUQkFC4eZrwB6zy_k3mTWMhwf8dycx_5qT3_iRmhXj_MhdzgASXdI6mT0mINddIIZvxqgzQkmycuZzEo0tgez9rC25wvjrCpMKkMVSI6vOHYnYVPmzMScc62n3wwlGX9eCyfWQseX4cxY_2-PAtg_oytRgIHQMK-hTbRh7Be5gXUcnp4-Z7yytvYNXWdcWQoazPJHfiy9NCF23jmuHk-LomaHW2gtyF3i8qlaQStBWZGTA7xEzIdsqlv9UVBd8"/>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-on-background mb-1">Niébé de Koudougou</h4>
                <p className="text-xs text-outline mb-3">100 kg disponibles</p>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-primary font-bold">7 500 FCFA</span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-transparent rounded-[12px] overflow-hidden hover:shadow-xl hover:border-surface-variant transition-all duration-300 group cursor-pointer">
              <div className="h-40 relative">
                <img className="w-full h-full object-cover" alt="Maïs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBqX8Fs3FwEu9mpt6SD-BdFwiM2TYpgDCsFqgfEChxsQP5smCOQmdR8Sz3dj1oPc_4TjNsRo-NI8MFbIsaQqLlQBfhbZLsfSRjAqjgxfJ1siEPted3sLR1Q3-BtMV1o_wdNiDZn66xiw5mrInNBSdHqi6l8t3f30CqoYVKN36ImmLF4LARdz5NWfoUo9uL55d893Dr80_wfuiiUolc4sllkJhkLPKyueJf-5K7DHm430mIoU5lD_evoQ6qeBmH-ehZ8NFqiZm_jgs"/>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-on-background mb-1">Maïs blanc concassé</h4>
                <p className="text-xs text-outline mb-3">1000 kg disponibles</p>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-primary font-bold">5 200 FCFA</span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-[#ebffe5] border-t border-[#6e7b6c]/15 pt-12 pb-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 max-w-7xl mx-auto">
          <div>
            <span className="text-xl font-bold text-[#006b2c] mb-4 block font-headline">AgroConnect BF</span>
            <p className="font-headline text-sm leading-relaxed text-[#0c200d]/80">
              Faciliter l'accès aux marchés pour les producteurs burkinabè grâce à la précision numérique.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-sm text-[#006b2c] mb-4">Navigation</h5>
            <ul className="space-y-2 font-headline text-sm">
              <li><Link to="/catalog" className="text-[#0c200d]/80 hover:text-[#006b2c] hover:underline">Marketplace</Link></li>
              <li><Link to="#" className="text-[#0c200d]/80 hover:text-[#006b2c] hover:underline">Producer Directory</Link></li>
              <li><Link to="#" className="text-[#0c200d]/80 hover:text-[#006b2c] hover:underline">Logistics</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-sm text-[#006b2c] mb-4">Informations</h5>
            <ul className="space-y-2 font-headline text-sm">
              <li><Link to="#" className="text-[#0c200d]/80 hover:text-[#006b2c] hover:underline">Pricing</Link></li>
              <li><Link to="#" className="text-[#0c200d]/80 hover:text-[#006b2c] hover:underline">Privacy Policy</Link></li>
              <li><Link to="#" className="text-[#0c200d]/80 hover:text-[#006b2c] hover:underline">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-sm text-[#006b2c] mb-4">Contact</h5>
            <p className="font-headline text-sm text-[#0c200d]/80 mb-4">Restez informé de nos actualités.</p>
            <div className="flex gap-2">
              <input className="bg-surface-container-low border border-transparent rounded-xl text-sm w-full focus:ring-2 focus:ring-[#006b2c] outline-none px-3" placeholder="Email" type="email"/>
              <button className="bg-[#006b2c] text-white p-2 px-4 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-[#6e7b6c]/10 text-center">
          <p className="font-headline text-sm text-[#0c200d]/60">© 2024 AgroConnect BF. Precision Agriculture for Burkina Faso.</p>
        </div>
      </footer>
    </div>
  );
}
