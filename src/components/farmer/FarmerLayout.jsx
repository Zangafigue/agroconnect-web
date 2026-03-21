import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function FarmerLayout() {
  const { user } = useAuthStore();
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  const navLinks = [
    { name: 'Tableau de bord', path: '/farmer/dashboard', icon: 'dashboard' },
    { name: 'Produits', path: '/farmer/products', icon: 'inventory_2' },
    { name: 'Commandes', path: '/farmer/orders', icon: 'shopping_cart' },
    { name: 'Portefeuille', path: '/farmer/wallet', icon: 'payments' },
    { name: 'Messages', path: '/farmer/messages', icon: 'chat' },
    { name: 'Mon Profil', path: '/farmer/profile', icon: 'person' },
  ];

  const userInitials = user?.firstName ? user.firstName.charAt(0) + (user.lastName ? user.lastName.charAt(0) : '') : 'F';

  return (
    <div className="flex h-screen bg-[#ebffe5] text-[#0c200d] font-body selection:bg-primary/20">
      {/* SIDEBAR */}
      <aside className="bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-headline tracking-tight h-screen w-64 fixed left-0 top-0 overflow-y-auto shadow-[24px_0_24px_rgba(12,32,13,0.06)] flex flex-col py-6 px-4 z-50">
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">AgroConnect BF</h1>
          <p className="text-sm opacity-70 font-sans">Espace Agriculteur</p>
        </div>
        <nav className="flex-1 space-y-2 font-sans">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  active 
                    ? 'text-emerald-800 dark:text-emerald-100 font-bold border-r-4 border-emerald-600 bg-emerald-100/80 dark:bg-emerald-900/50' 
                    : 'text-emerald-600/70 dark:text-emerald-400/70 hover:bg-emerald-100'
                }`}
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-6 border-t border-emerald-100/50">
          <Link to="/farmer/products/new" className="w-full bg-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-container active:scale-95 transition-all">
            <span className="material-symbols-outlined">add</span>
            <span>Nouvelle Récolte</span>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* TOP NAV BAR */}
        <header className="sticky top-0 w-full z-40 bg-[#ebffe5]/80 backdrop-blur-md flex justify-between items-center h-16 px-8 max-w-full border-b border-outline-variant/10">
          <div className="flex items-center bg-emerald-50 px-4 py-2 rounded-full w-96 border border-primary/10">
            <span className="material-symbols-outlined text-outline mr-2">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-sm w-full font-headline italic" placeholder="Rechercher..." type="text" />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4 items-center">
              <button className="text-primary hover:bg-primary/10 rounded-full p-2 transition-colors active:opacity-70">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="text-primary hover:bg-primary/10 rounded-full p-2 transition-colors active:opacity-70">
                <span className="material-symbols-outlined">help_outline</span>
              </button>
            </div>
            <Link to="/farmer/profile" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity group">
              <div className="text-right">
                <p className="text-sm font-semibold text-primary">{user?.firstName} {user?.lastName}</p>
                <p className="text-[10px] text-outline uppercase tracking-widest">Mon Profil</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold ring-2 ring-primary/20">
                {userInitials}
              </div>
            </Link>
          </div>
        </header>

        {/* CONTENT CANVAS */}
        <div className="flex-1 overflow-x-hidden p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
