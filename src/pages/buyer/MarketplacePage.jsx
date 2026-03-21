import React from 'react';
import { Link } from 'react-router-dom';

export default function MarketplacePage() {
  return (
    <div className="pb-20 px-6 max-w-7xl mx-auto">
      {/* Search & Hero */}
      <section className="mb-12">
        <h1 className="font-['Newsreader'] text-5xl text-[#0c200d] mb-8 leading-tight">
          Le Marché des <br /><span className="text-[#006b2c] italic">Producteurs Locaux</span>
        </h1>
        <div className="bg-white p-2 rounded-2xl shadow-sm flex flex-col md:flex-row gap-2 max-w-4xl border border-white">
          <div className="flex-1 flex items-center px-4 gap-3 bg-[#e1fbdc] rounded-xl">
            <span className="material-symbols-outlined text-[#6e7b6c]">search</span>
            <input 
              type="text" 
              className="w-full bg-transparent border-none focus:ring-0 text-[#0c200d] py-4 placeholder:text-[#6e7b6c]/60" 
              placeholder="Rechercher des produits, céréales ou légumes..." 
            />
          </div>
          <div className="flex items-center px-4 gap-3 bg-[#e1fbdc] rounded-xl md:w-64">
            <span className="material-symbols-outlined text-[#6e7b6c]">location_on</span>
            <select className="w-full bg-transparent border-none focus:ring-0 text-[#0c200d] py-4 appearance-none cursor-pointer">
              <option>Toutes régions</option>
              <option>Ouagadougou</option>
              <option>Bobo-Dioulasso</option>
              <option>Koudougou</option>
            </select>
          </div>
          <button className="bg-[#006b2c] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#00873a] transition-colors shadow-md active:scale-95">
            Rechercher
          </button>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filter Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
          <div>
            <h4 className="font-bold text-[#0c200d] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006b2c]">filter_list</span>
              Catégories
            </h4>
            <div className="space-y-2">
              {[
                { label: 'Céréales', icon: 'grass', checked: true },
                { label: 'Légumes', icon: 'nutrition', checked: false },
                { label: 'Fruits', icon: 'eco', checked: false },
                { label: 'Huiles & Semences', icon: 'water_drop', checked: false },
              ].map((cat, idx) => (
                <label key={idx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#d6efd0] transition-colors cursor-pointer group">
                  <input type="checkbox" defaultChecked={cat.checked} className="rounded border-[#bdcaba] text-[#006b2c] focus:ring-[#006b2c] w-5 h-5" />
                  <span className="material-symbols-outlined text-[#6e7b6c] group-hover:text-[#006b2c]">{cat.icon}</span>
                  <span className="text-sm font-medium">{cat.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[#0c200d] mb-4">Prix (FCFA / kg)</h4>
            <div className="px-2">
              <input type="range" className="w-full accent-[#006b2c] h-1 bg-[#d0e9cb] rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between mt-2 font-mono text-xs text-[#6e7b6c]">
                <span>0</span>
                <span>50 000+</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[#0c200d] mb-4">Disponibilité</h4>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-[#bdcaba] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006b2c]"></div>
              <span className="ms-3 text-sm font-medium">En stock uniquement</span>
            </label>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-[#3e4a3d] font-medium">Affichage de <span className="text-[#0c200d] font-bold">1-6</span> sur 48 produits</p>
            <select className="bg-transparent border-none text-sm font-bold text-[#006b2c] focus:ring-0">
              <option>Trier par : Nouveautés</option>
              <option>Prix : Croissant</option>
              <option>Prix : Décroissant</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              { id: 1, title: 'Maïs Jaune Sissili', price: 185, img: 'AB6AXuCT7j2IYxFt2xKYa4RDDOylc-P1Ms1a6vPNECAWuoiOLPLk5sb8RzReQRK_wdvPURSMq1F2k3WonSvkpEqlb6ELXBX3j1FxXqFLbaKheDQmKqVl88zkAqPZcPhc_xyYJMr0uTXYp9_XT_B5jZZrQeSw7x6xeuB7yl2NV7TEvqYWjQY2dOPuff_8JYBm6BUZMq751D3ooKpFrMFXVyQeBzel50Yy3AHzlny238njDB8gDsCyogK4pNCz3E-Djm8uLTk0cu5EfUjX5sM', seller: 'Abdoulaye K.', Init: 'AK', type: 'primary', fav: true },
              { id: 2, title: 'Tomates de Loumbila', price: 450, img: 'AB6AXuDeV-sS64PAHjzRHa2fBzb51bzawP6KGZeDV3UicneCiY1Kc-R0V7a6prTib1poM63X4WZ6YcWTa9VeEz8unsExmQMkSQLRuWZXgwX4qLRYOf2vZBFIiDdQmAVVAGVAYK1Es4KaCWXjL024N0Y_Rb7TFAkJeOm6SyVA8FrUC9R9njkDhqCibOWNSzhVmpDcwonhyoYFcU5phMfXHoyCIX9k102Y1unj-O2W1IiBQYSuR0yfoLp7bj51ReprgLTqefBeMMODhhq_-S0', seller: 'Mariam O.', Init: 'MO', type: 'secondary', fav: false },
              { id: 3, title: 'Oignons de Galmi', price: 320, img: 'AB6AXuCj8dAcUPM2BllPaRbHgcqu4LLxSxhPJBidYnx0JMWHLpKWO77KkWB-copxkk2u6mFjhebVlXSaPh70UF7qEf1b-sfwFYjothWmyML8xYP_h4BbVEmglr6ZF0OJhzAom4jdgi5T_lVy598yWmzzEBZak9qa3BCJrFbsZu_VGt8qp7RNTi8iFq_KFaHUg7sl9SC1OPZxoPwM7yGU3egWbMIgWJC_JD51eeJWuqlYoY0bPLW_qiggIS_QZbF7H2V2BESDfVbilow2sPk', seller: 'Saliou D.', Init: 'SD', type: 'tertiary', fav: false },
              { id: 4, title: 'Sorgho Blanc Local', price: 210, img: 'AB6AXuAA6k5qHqTIct9WfA7dXonkSXP8f8kQrndIl865EtgwPSdKOuv0rffhlXw71ICGVtDGFdgcSBsAW0qTGIiDO-dzc6LZXNEURmotGt8KpSLi90DNMNKuJUzzGBhbw5jQULTvcYGZ_AqgoTEy8TmQ8lv_IiNia1XUdN7dB9vLAVz1fdYj8xUBOcclcmZtdErWLUWzIyp-8Oy5JWz88XB7jVr3YKRCIj0WHbAqEkrPAhb25Xn7zQolntHWvkSyXMnBe_1pEuT8rie8ehg', seller: 'Yacouba N.', Init: 'YN', type: 'outline', fav: true },
              { id: 5, title: 'Haricots de Koudougou', price: 600, img: 'AB6AXuCvBDNj61wZM4h_mp5q98_aYPh_GibS2Tu-g-vcMKiJs0c_cnC7Dmo7oIZ1cfy6Qw7dqYVHwoDqml7K6BbtC25c8_2IApLUoxmtRiE5uLGZPPVDB9asTcrXBZwiVNAPAlHvJyzbmIobnCjCqtqIEFufdx-7Jj980NoSJgJMwHcehNyi0OAeqCGIxleB8cyPpdsmAOCdkoxsCKhhGZljlu7Y7B_DnYBG8rlLt1q2uVoeCOCCz13CLPtOQATcFtzJvi_15Oa4VuMjjvM', seller: 'Idrissa K.', Init: 'IK', type: 'primary', fav: false },
              { id: 6, title: 'Arachides Décortiquées', price: 550, img: 'AB6AXuDMTJT1KzQXi3FkoNRNxiof-vmk3emRCm2e7HSz5dmRDrKgZFJVGoGM93rRrlCwwl6k_xlZ6MJRGcuOFoj1eV27ipaBEYOach8IzF-dYbbPJd6HFWJKjJ9T_3nCp_IrfBJzxNWC5E6cYkmKS8ygElHAma4m9Ku3ptxOT3Unwo9WiW5aeUe3mMov2NdCN7QYhhXrfThwiRZ1ruXJgLFIt2-ALkH_1cDQe8pDQGXOJCqTWuZz8sOEcK1hZUZjlCvsD-fjDY757ri5KsM', seller: 'Fatimata T.', Init: 'FT', type: 'secondary', fav: false },
            ].map((prod) => (
              <div key={prod.id} className="bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#00873a]/20">
                <Link to="/buyer/marketplace/product/1">
                  <div className="relative h-56">
                    <img src={`https://lh3.googleusercontent.com/aida-public/${prod.img}`} alt={prod.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#006b2c]/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm">DISPONIBLE</span>
                    </div>
                    <button className={`absolute top-4 right-4 h-10 w-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center transition-transform hover:scale-110 ${prod.fav ? 'text-[#ba1a1a]' : 'text-[#6e7b6c]'}`}>
                      <span className={`material-symbols-outlined ${prod.fav ? 'fill-current' : ''}`}>favorite</span>
                    </button>
                  </div>
                </Link>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-[#0c200d] leading-tight">{prod.title}</h3>
                    <span className="font-mono font-bold text-[#006b2c] text-lg">{prod.price} <span className="text-xs">FCFA/kg</span></span>
                  </div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className={`w-6 h-6 rounded-full text-[10px] flex items-center justify-center text-white font-bold
                      ${prod.type === 'primary' ? 'bg-[#006b2c]' : prod.type === 'secondary' ? 'bg-[#2e6a41]' : prod.type === 'tertiary' ? 'bg-[#984300]' : 'bg-[#6e7b6c]'}
                    `}>{prod.Init}</div>
                    <span className="text-xs text-[#6e7b6c] font-medium">{prod.seller} • <span className="text-[#984300]">★ 4.8</span></span>
                  </div>
                  <button className="w-full bg-[#006b2c] text-white py-3 rounded-xl font-bold hover:bg-[#00873a] transition-all active:scale-[0.98]">
                    Commander
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <nav className="mt-16 flex items-center justify-center gap-2">
            <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-[#d6efd0] text-[#3e4a3d] transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#006b2c] text-white font-bold shadow-md shadow-[#006b2c]/20">1</button>
            <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-[#d6efd0] text-[#3e4a3d] transition-colors font-medium">2</button>
            <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-[#d6efd0] text-[#3e4a3d] transition-colors font-medium">3</button>
            <span className="px-2 text-[#6e7b6c]">...</span>
            <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-[#d6efd0] text-[#3e4a3d] transition-colors font-medium">8</button>
            <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-[#d6efd0] text-[#3e4a3d] transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
