import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function Sidebar() {
  const { user } = useAuthStore();
  const location = useLocation();

  const getLinks = () => {
    switch (user?.role) {
      case 'FARMER':
        return [
          { name: 'Tableau de bord', path: '/farmer' },
          { name: 'Mes Produits', path: '/farmer/products' },
          { name: 'Mes Commandes', path: '/farmer/orders' },
          { name: 'Messagerie', path: '/farmer/messages' },
          { name: 'Portefeuille', path: '/farmer/wallet' },
          { name: 'Profil', path: '/farmer/profile' },
        ];
      case 'BUYER':
        return [
          { name: 'Tableau de bord', path: '/buyer' },
          { name: 'Mes Achats', path: '/buyer/orders' },
          { name: 'Messagerie', path: '/buyer/messages' },
        ];
      case 'TRANSPORTER':
        return [
          { name: 'Tableau de bord', path: '/transporter' },
          { name: 'Missions Disponibles', path: '/transporter/missions' },
          { name: 'Mes Livraisons', path: '/transporter/deliveries' },
          { name: 'Messagerie', path: '/transporter/messages' },
          { name: 'Portefeuille', path: '/transporter/wallet' },
        ];
      case 'ADMIN':
        return [
          { name: 'Tableau de bord', path: '/admin' },
          { name: 'Utilisateurs', path: '/admin/users' },
          { name: 'Produits', path: '/admin/products' },
          { name: 'Commandes', path: '/admin/orders' },
          { name: 'Litiges', path: '/admin/disputes' },
          { name: 'Paiements', path: '/admin/payments' },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <aside className="w-64 bg-green-800 text-white min-h-screen flex flex-col transition-all duration-300">
      <div className="p-6 font-bold text-2xl tracking-wide flex items-center justify-center border-b border-green-700">
        <span className="text-yellow-400 mr-2">🌾</span> AgroConnect
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-4 py-3 rounded-lg transition-colors ${
              location.pathname === link.path
                ? 'bg-green-700 font-semibold'
                : 'hover:bg-green-700/50 hover:pl-6'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
