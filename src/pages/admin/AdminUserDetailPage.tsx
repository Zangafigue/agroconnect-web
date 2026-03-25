import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  ShieldAlert, 
  BadgeCheck, 
  Calendar, 
  ShoppingBag, 
  Edit3,
  Ban,
  CheckCircle2,
  Activity,
  Save,
  X
} from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import { formatFCFA } from '../../utils/currency';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import Avatar from '../../components/shared/Avatar';
import StatusBadge from '../../components/shared/StatusBadge';
import DataTable from '../../components/shared/DataTable';

const AdminUserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedUser: user, fetchUserById, updateUserStatus, updateUser, loading } = useUserStore() as any;
  
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    address: ''
  });

  useEffect(() => {
    if (id) {
      fetchUserById(id).then((data: any) => {
        if (data) {
          setFormData({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            phone: data.phone || '',
            city: data.city || data.address?.city || '',
            address: data.address?.full || data.address || ''
          });
        }
      });
    }
  }, [id, fetchUserById]);

  const handleEditSave = async () => {
    if (!id) return;
    setSaving(true);
    try {
      await updateUser(id, formData);
      setIsEditing(false);
      toast.success('Informations mises à jour');
    } catch (err) {
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async () => {
    if (user) {
      const newStatus = user.isActive === false;
      await updateUserStatus(user._id, newStatus);
      toast.success(newStatus ? 'Compte réactivé' : 'Compte suspendu');
    }
  };

  if (loading && !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-2 border-[var(--text-accent)] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">Chargement du dossier...</p>
      </div>
    );
  }

  if (!user && !loading) {
    return (
      <div className="p-20 text-center">
        <p className="text-[var(--text-muted)] font-bold mb-4">Utilisateur introuvable.</p>
        <Link to="/admin/users">
          <Button variant="secondary">Retour à l'annuaire</Button>
        </Link>
      </div>
    );
  }

  const columns = [
    { 
      header: 'Référence', 
      accessor: (item: any) => <span className="text-[12px] font-bold">#{item._id?.slice(-8).toUpperCase()}</span>,
      isMono: true 
    },
    { 
      header: 'Date', 
      accessor: (item: any) => <span>{new Date(item.createdAt).toLocaleDateString('fr-FR')}</span>
    },
    { 
      header: 'Montant', 
      accessor: (item: any) => <span className="font-bold">{formatFCFA(item.totalAmount || 0)}</span>,
      isMono: true
    },
    { 
      header: 'Statut', 
      accessor: (item: any) => <StatusBadge status={item.status} />,
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-8 pb-12 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:text-[var(--text-accent)] transition-all border border-[var(--border-light)]"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-1 flex items-center gap-3">
              Fiche Acteur 
              <span className="text-xl font-mono text-[var(--text-muted)] bg-[var(--bg-muted)] px-3 py-1 rounded-lg">
                #{user?._id?.slice(-6).toUpperCase()}
              </span>
            </h1>
            <p className="text-[14px] text-[var(--text-secondary)]">Dossier complet et historique opérationnel de l'utilisateur.</p>
          </div>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="secondary" onClick={() => setIsEditing(false)} icon={<X size={16} />}>Annuler</Button>
              <Button onClick={handleEditSave} isLoading={saving} icon={<Save size={16} />}>Enregistrer</Button>
            </>
          ) : (
            <Button variant="secondary" onClick={() => setIsEditing(true)} icon={<Edit3 size={16} />}>Modifier</Button>
          )}
          <Button 
            variant={user?.isActive !== false ? "danger" : "secondary"}
            onClick={handleToggleStatus}
            icon={user?.isActive !== false ? <Ban size={16} /> : <CheckCircle2 size={16} />}
          >
            {user?.isActive !== false ? 'Suspendre' : 'Réactiver'}
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="text-center p-8">
            <Avatar 
              name={`${user?.firstName} ${user?.lastName}`}
              role={user?.role}
              size="xl"
              image={user?.profilePicture}
              className="mx-auto mb-6 shadow-lg ring-4 ring-[var(--bg-surface)]"
            />
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              {user?.firstName} {user?.lastName}
            </h2>
            <div className="flex flex-col items-center gap-3">
              <span className="px-3 py-1 bg-[var(--bg-subtle)] text-[var(--text-accent)] border border-[var(--text-accent)]/10 rounded-full text-[10px] font-black uppercase tracking-widest">
                {user?.role}
              </span>
              <StatusBadge status={user?.isActive !== false ? 'ACTIF' : 'SUSPENDU'} />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-[var(--border-light)]">
               <div className="text-center">
                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Depuis</p>
                  <p className="text-[12px] font-bold text-[var(--text-primary)]">{new Date(user?.createdAt).toLocaleDateString('fr-FR')}</p>
               </div>
               <div className="text-center border-l border-[var(--border-light)]">
                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Localisation</p>
                  <p className="text-[12px] font-bold text-[var(--text-primary)]">{user?.city || 'Ouagadougou'}</p>
               </div>
            </div>
          </Card>

          <Card className="p-6">
             <h4 className="text-[13px] font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2 uppercase tracking-tight">
               <ShieldCheck size={16} className="text-[var(--text-accent)]" />
               Vérification & KYC
             </h4>
             <div className="space-y-4">
                <div className="p-4 bg-[var(--bg-subtle)] rounded-xl border border-[var(--text-accent)]/10 flex items-center justify-between">
                   <span className="text-[12px] font-medium text-[var(--text-secondary)]">Identité vérifiée</span>
                   {user?.isVerified ? (
                     <CheckCircle2 size={18} className="text-[var(--green-600)]" />
                   ) : (
                     <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-lg">EN ATTENTE</span>
                   )}
                </div>
                <div className="p-4 bg-[var(--bg-muted)]/30 rounded-xl border border-[var(--border-light)] flex items-center justify-between">
                   <span className="text-[12px] font-medium text-[var(--text-muted)]">Documents légaux</span>
                   <span className="text-[10px] font-bold text-[var(--text-muted)]">N/A</span>
                </div>
             </div>
          </Card>

          <Card className="p-6 bg-red-500/5 border-dashed border-2 border-red-500/20">
             <div className="flex items-start gap-4">
                <div className="p-2 bg-red-500/10 rounded-lg text-red-600">
                   <ShieldAlert size={20} />
                </div>
                <div>
                   <h4 className="text-[13px] font-bold text-red-600 mb-1">Zone Critique</h4>
                   <p className="text-[11px] text-red-600/70 leading-relaxed">
                     La suspension d'un compte bloque immédiatement tout accès aux fonds et interrompt les livraisons en cours.
                   </p>
                </div>
             </div>
          </Card>
        </div>

        {/* Info & Metrics */}
        <div className="lg:col-span-2 space-y-8">
          {/* Metrics Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <Card className="bg-[var(--bg-subtle)] border-l-4 border-l-[var(--text-accent)]">
                <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em] mb-3">Volume d'affaires</p>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{formatFCFA(user?.totalTraded || 0)}</h3>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--green-600)]">
                  <Activity size={12} /> Flux actif
                </div>
             </Card>
             <Card className="bg-[var(--bg-subtle)] border-l-4 border-l-[var(--text-secondary)]">
                <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em] mb-3">Opérations</p>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{user?.ordersCount || 0}</h3>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text-muted)]">
                  <ShoppingBag size={12} /> Transactions
                </div>
             </Card>
             <Card className="bg-red-500/5 border-l-4 border-l-red-500">
                <p className="text-[10px] font-bold text-red-600 uppercase tracking-[0.2em] mb-3">Litiges</p>
                <h3 className="text-2xl font-bold text-red-600 mb-2">{user?.disputesCount || 0}</h3>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-500">
                  <Activity size={12} /> Incidents
                </div>
             </Card>
          </div>

          {/* Personal Information Form */}
          <Card className="p-8">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-8 flex items-center gap-2">
              <User size={20} className="text-[var(--text-accent)]" />
              Informations du Compte
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Prénom"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                readOnly={!isEditing}
              />
              <Input 
                label="Nom"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                readOnly={!isEditing}
              />
              <Input 
                label="E-mail"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                readOnly={!isEditing}
                icon={<Mail size={16} />}
              />
              <Input 
                label="Téléphone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                readOnly={!isEditing}
                icon={<Phone size={16} />}
              />
              <Input 
                label="Ville"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                readOnly={!isEditing}
                icon={<MapPin size={16} />}
              />
              <Input 
                label="Adresse"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                readOnly={!isEditing}
                icon={<MapPin size={16} />}
              />
            </div>
          </Card>

          {/* Historical Data */}
          <div className="space-y-4">
             <div className="flex items-center justify-between px-2">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">Historique Transactionnel</h3>
                <p className="text-[12px] text-[var(--text-muted)] font-medium">Flux récent de l'acteur</p>
             </div>
             <DataTable 
               columns={columns}
               data={user?.recentOrders || []}
               emptyMessage="Aucune transaction récente pour cet utilisateur."
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetailPage;
