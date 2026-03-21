import { useAuthStore } from '../../store/authStore';

export default function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 z-10">
      <div className="flex items-center text-gray-600 font-medium tracking-wide">
        Espace {
          user?.role === 'FARMER' ? 'Agriculteur' :
          user?.role === 'BUYER' ? 'Acheteur' :
          user?.role === 'TRANSPORTER' ? 'Transporteur' :
          user?.role === 'ADMIN' ? 'Administrateur' : ''
        }
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border border-green-200 shadow-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <span className="text-gray-700 font-medium hidden md:block">{user?.name || 'Utilisateur'}</span>
        </div>
        <button
          onClick={logout}
          className="text-red-500 hover:text-red-700 text-sm font-semibold transition px-3 py-1.5 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-100"
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
}
