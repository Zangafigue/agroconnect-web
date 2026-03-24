import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Download, 
  MoreHorizontal,
  X
} from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import userService from '../../services/userService';
import toast from 'react-hot-toast';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import StatusBadge from '../../components/shared/StatusBadge';
import Avatar from '../../components/shared/Avatar';
import DataTable from '../../components/shared/DataTable';

const AdminUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { users, fetchUsers, loading } = useUserStore() as any;
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const [isRecruitModalOpen, setIsRecruitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recruitForm, setRecruitForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'ADMIN'
  });

  const handleRecruit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await userService.createUser(recruitForm);
      toast.success('Administrateur recruté avec succès');
      setIsRecruitModalOpen(false);
      fetchUsers();
      setRecruitForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        role: 'ADMIN'
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors du recrutement');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredUsers = users.filter((u: any) => {
    const name = `${u.firstName || ''} ${u.lastName || u.name || ''}`.toLowerCase();
    const matchesSearch = name.includes(searchTerm.toLowerCase()) || 
                          (u.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const columns = [
    {
      header: 'Utilisateur',
      accessor: (user: any) => (
        <div className="flex items-center gap-3">
          <Avatar name={user.firstName || user.name} role={user.role} size="sm" />
          <div className="flex flex-col">
            <span className="font-semibold text-[var(--text-primary)]">
              {user.firstName || user.name} {user.lastName || ''}
            </span>
            <span className="text-[12px] text-[var(--text-muted)] lowercase">{user.email}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Rôle',
      accessor: (user: any) => (
        <StatusBadge status={user.role} />
      )
    },
    {
      header: 'Statut',
      accessor: (user: any) => (
        <StatusBadge status={user.isActive !== false ? 'ACTIF' : 'SUSPENDU'} />
      )
    },
    {
      header: 'Adhésion',
      accessor: (user: any) => (
        <span className="text-[12px]">{new Date(user.createdAt).toLocaleDateString()}</span>
      ),
      isMono: true
    },
    {
      header: '',
      accessor: (user: any) => (
        <div className="flex justify-end gap-2">
           <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 min-w-0"
            onClick={(e) => { e.stopPropagation(); navigate(`/admin/users/${user._id}`); }}
           >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
           </Button>
           <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 min-w-0 text-[var(--btn-danger-text)] hover:bg-[var(--badge-dispute-bg)]"
            onClick={(e) => { e.stopPropagation(); /* Logic for block */ }}
           >
              <span className="material-symbols-outlined text-[18px]">block</span>
           </Button>
        </div>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-6 pb-12 font-body">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-[var(--text-primary)] tracking-tight mb-2">Annuaire des Acteurs</h1>
          <p className="text-[14px] text-[var(--text-secondary)]">Gérez les accès et les privilèges de la communauté.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="secondary" 
            size="md" 
            icon={<Download size={16} />}
          >
            Exporter
          </Button>
          <Button 
            variant="primary" 
            size="md" 
            icon={<Plus size={18} />}
            onClick={() => setIsRecruitModalOpen(true)}
          >
            Recruter Admin
          </Button>
        </div>
      </header>

      {/* Toolbar */}
      <Card className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <Input 
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={16} />}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-[36px] px-3 bg-[var(--input-bg)] text-[var(--input-text)] border border-[var(--input-border)] rounded-[var(--radius-md)] text-[13px] outline-none focus:border-[var(--input-border-focus)] transition-all min-w-[150px]"
          >
            <option value="ALL">Tous les rôles</option>
            <option value="ADMIN">Administrateurs</option>
            <option value="FARMER">Producteurs</option>
            <option value="BUYER">Acheteurs</option>
            <option value="TRANSPORTER">Logistique</option>
          </select>
        </div>
      </Card>

      {/* Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <p className="text-[12px] font-medium text-[var(--text-secondary)]">
            Total : <span className="text-[var(--text-primary)]">{filteredUsers.length} acteurs</span>
          </p>
        </div>
        <DataTable 
          columns={columns} 
          data={filteredUsers} 
          isLoading={loading}
          onRowClick={(user: any) => navigate(`/admin/users/${user._id}`)}
          emptyMessage="Aucun utilisateur trouvé."
        />
      </section>

      {/* Recruitment Modal */}
      {isRecruitModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={() => !isSubmitting && setIsRecruitModalOpen(false)}></div>
          <Card className="relative w-full max-w-lg shadow-2xl p-0 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-[var(--border-light)] flex items-center justify-between bg-[var(--bg-muted)]/30">
              <h3 className="text-[18px] font-bold text-[var(--text-primary)]">Recrutement Administrateur</h3>
              <button onClick={() => !isSubmitting && setIsRecruitModalOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleRecruit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Prénom"
                  required
                  value={recruitForm.firstName}
                  onChange={(e) => setRecruitForm({...recruitForm, firstName: e.target.value})}
                  placeholder="ex: Moussa"
                />
                <Input 
                  label="Nom"
                  required
                  value={recruitForm.lastName}
                  onChange={(e) => setRecruitForm({...recruitForm, lastName: e.target.value})}
                  placeholder="ex: Traoré"
                />
              </div>
              <Input 
                label="Email"
                type="email"
                required
                value={recruitForm.email}
                onChange={(e) => setRecruitForm({...recruitForm, email: e.target.value})}
                placeholder="m.traore@agroconnect.bf"
              />
              <Input 
                label="Téléphone"
                type="tel"
                required
                value={recruitForm.phone}
                onChange={(e) => setRecruitForm({...recruitForm, phone: e.target.value})}
                placeholder="+226 XX XX XX XX"
              />
              <Input 
                label="Mot de passe"
                type="password"
                required
                value={recruitForm.password}
                onChange={(e) => setRecruitForm({...recruitForm, password: e.target.value})}
                placeholder="••••••••"
              />
              
              <div className="pt-4 flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => setIsRecruitModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  isLoading={isSubmitting}
                >
                  Confirmer
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
