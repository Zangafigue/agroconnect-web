import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Tractor, Leaf, CheckCircle2, Clock, ArrowRight, Zap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Avatar from '../../components/shared/Avatar';
import { formatFCFA } from '../../utils/currency';
import userService from '../../services/userService';

const UnifiedDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore() as any;

  const handleRequestSell = async () => {
    try {
      const resp = await userService.requestSell();
      updateUser(resp.user);
    } catch (err) { console.error(err); }
  };

  const handleActivateDeliver = async () => {
    try {
      const resp = await userService.activateDeliver();
      updateUser(resp.user);
    } catch (err) { console.error(err); }
  };

  const capabilityCards = [
    {
      id: 'buy',
      label: 'Acheteur',
      icon: <ShoppingCart size={24} />,
      active: user?.canBuy,
      status: 'Activé',
      desc: 'Commandez des produits frais.',
      action: () => navigate('/catalog'),
      actionLabel: 'Aller au marché'
    },
    {
      id: 'sell',
      label: 'Vendeur',
      icon: <Leaf size={24} />,
      active: user?.canSell,
      status: user?.canSellStatus === 'pending' ? 'En attente' : (user?.canSellStatus === 'approved' ? 'Validé' : 'Non activé'),
      desc: 'Vendez vos récoltes.',
      action: user?.canSell ? () => navigate('/dashboard/products') : (user?.canSellStatus === 'pending' ? null : handleRequestSell),
      actionLabel: user?.canSell ? 'Gérer mes produits' : (user?.canSellStatus === 'pending' ? 'En cours...' : 'Demander à vendre')
    },
    {
      id: 'deliver',
      label: 'Transporteur',
      icon: <Tractor size={24} />,
      active: user?.canDeliver,
      status: user?.canDeliver ? 'Activé' : 'Non activé',
      desc: 'Effectuez des livraisons.',
      action: user?.canDeliver ? () => navigate('/dashboard/missions') : handleActivateDeliver,
      actionLabel: user?.canDeliver ? 'Voir les missions' : 'Devenir livreur'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif-display text-[var(--text-primary)] tracking-tight mb-2">Mon Espace</h1>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Bienvenue, <span className="font-bold">{user?.firstName}</span>.</p>
        </div>
        <div className="flex items-center gap-3">
           <Avatar name={user?.firstName} size="md" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {capabilityCards.map((c) => (
          <Card key={c.id} className="p-8 group relative overflow-hidden">
            <div className="relative z-10 flex flex-col h-full">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${c.active ? 'bg-[var(--text-primary)] text-white' : 'bg-[var(--bg-muted)] text-[var(--gray-400)]'}`}>
                {c.icon}
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">{c.label}</h3>
                  {c.active && <CheckCircle2 size={16} className="text-[var(--green-600)]" />}
                </div>
                <div className={`text-[10px] font-black uppercase tracking-widest ${c.active ? 'text-[var(--green-600)]' : 'text-[var(--gray-400)]'}`}>
                  {c.status}
                </div>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 flex-grow">{c.desc}</p>
              {c.action && (
                <Button variant={c.active ? 'ghost' : 'primary'} size="md" onClick={c.action} className="w-full font-bold" disabled={c.status === 'En attente'}>
                  {c.actionLabel}
                  {c.status !== 'En attente' && <ArrowRight size={18} className="ml-2" />}
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[var(--text-primary)]" />
                <h2 className="text-lg font-bold">Activités Récentes</h2>
              </div>
              <Link to="/dashboard/orders" className="text-xs font-bold text-[var(--text-primary)] hover:underline">Voir tout <ArrowRight size={14} className="inline ml-1"/></Link>
           </div>
           <Card className="p-12 text-center">
              <h3 className="text-lg font-bold">Aucune activité pour le moment.</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Effectuez votre premier achat pour commencer.</p>
              <Button variant="primary" size="md" onClick={() => navigate('/catalog')}>Explorer le marché</Button>
           </Card>
        </div>
        <div className="space-y-6">
           <Card className="bg-[var(--text-primary)] text-white p-8 group overflow-hidden">
              <Zap size={24} className="mb-4" />
              <h3 className="text-xl font-bold mb-3">Compte Universel</h3>
              <p className="text-sm text-white/80 leading-relaxed font-body">Activez des capacités selon vos besoins.</p>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default UnifiedDashboard;
