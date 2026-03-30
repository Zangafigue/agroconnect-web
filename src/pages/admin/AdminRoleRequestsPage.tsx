import React, { useState, useEffect } from 'react';
import { 
  Users, CheckCircle2, XCircle, Search, Filter, Clock, Leaf, Tractor
} from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import DataTable from '../../components/shared/DataTable';
import StatusBadge from '../../components/shared/StatusBadge';
import Card from '../../components/shared/Card';

export default function AdminRoleRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRequests = async () => {
    setLoading(true);
    try {
      // Mock fetching logic vs real API endpoint
      // If the backend is not yet ready, we will mock data and handle errors gracefully.
      const response = await api.get('/admin/role-requests');
      if (response && response.data) {
        setRequests(response.data.data || response.data);
      }
    } catch (err) {
      toast.error("Erreur lors de la récupération des requêtes d'extensions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (request: any) => {
    try {
       await api.patch(`/admin/role-requests/${request._id}/approve`);
       
       toast.success("Demande approuvée avec succès.");
       setRequests(prev => prev.map(r => r._id === request._id ? { ...r, status: 'APPROVED' } : r));
    } catch(err) {
       toast.error("Échec de l'approbation.");
    }
  };

  const handleReject = async (requestId: string) => {
    try {
       await api.patch(`/admin/role-requests/${requestId}/reject`);
       toast.success("Demande rejetée.");
       setRequests(prev => prev.map(r => r._id === requestId ? { ...r, status: 'REJECTED' } : r));
    } catch(err) {
       toast.error("Échec du rejet.");
    }
  };

  const columns = [
    {
      header: 'Date',
      accessor: (r: any) => (
        <span className="text-[13px] text-[var(--text-secondary)]">
          {new Date(r.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      ),
    },
    {
      header: 'Utilisateur',
      accessor: (r: any) => (
        <div className="flex flex-col">
          <span className="font-bold text-[var(--text-primary)] text-[14px]">
            {r.user?.firstName} {r.user?.lastName}
          </span>
          <span className="text-[12px] text-[var(--text-secondary)]">{r.user?.email || 'N/A'}</span>
        </div>
      ),
    },
    {
      header: 'Espace Demandé',
      accessor: (r: any) => (
        <div className="flex items-center gap-2">
           {r.requestedRole === 'FARMER' ? (
             <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--green-600)]/10 text-[var(--green-600)] text-[12px] font-bold">
               <Leaf size={14} /> Producteur
             </div>
           ) : (
             <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500 text-[12px] font-bold">
               <Tractor size={14} /> Livreur
             </div>
           )}
        </div>
      ),
    },
    {
      header: 'Statut',
      accessor: (r: any) => (
         <StatusBadge status={r.status} />
      ),
    },
    {
      header: 'Actions',
      accessor: (r: any) => (
        <div className="flex items-center gap-2 justify-end">
          {r.status === 'PENDING' ? (
             <>
               <button 
                 onClick={() => handleApprove(r)} 
                 className="p-2 rounded-lg bg-[var(--green-600)]/10 text-[var(--green-600)] hover:bg-[var(--green-600)] hover:text-white transition-colors"
                 title="Approuver"
               >
                 <CheckCircle2 size={18} />
               </button>
               <button 
                 onClick={() => handleReject(r._id)} 
                 className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                 title="Rejeter"
               >
                 <XCircle size={18} />
               </button>
             </>
          ) : (
            <span className="text-[12px] font-bold text-[var(--text-muted)] italic">Traité</span>
          )}
        </div>
      ),
      className: 'text-right'
    }
  ];

  const renderDetails = (r: any) => {
    const details = r.details || {};
    if (r.requestedRole === 'FARMER') {
      return (
        <div className="p-6 bg-[var(--bg-muted)]/30 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 border border-[var(--border-light)] m-4 shadow-inner">
          <div className="space-y-4">
             <div>
                <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Exploitation</p>
                <p className="text-[14px] font-bold text-[var(--text-primary)]">{details.farmName || 'N/A'}</p>
             </div>
             <div>
                <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Localisation</p>
                <p className="text-[14px] font-medium text-[var(--text-primary)]">{details.location || 'N/A'}</p>
             </div>
          </div>
          <div className="space-y-4">
             <div>
                <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Cultures</p>
                <p className="text-[14px] font-medium text-[var(--text-primary)]">{details.mainCrops || 'N/A'}</p>
             </div>
             <div>
                <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Motivation</p>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed italic">"{details.description || 'Aucune description fournie.'}"</p>
             </div>
          </div>
        </div>
      );
    }
    return (
       <div className="p-6 bg-blue-50/20 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 border border-blue-100/50 m-4 shadow-inner">
          <div>
             <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Véhicule</p>
             <p className="text-[14px] font-bold text-[var(--text-primary)]">{details.vehicleType || 'N/A'}</p>
          </div>
          <div>
             <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Plaque</p>
             <p className="text-[14px] font-medium text-[var(--text-primary)]">{details.vehiclePlate || 'N/A'}</p>
          </div>
          <div>
             <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Zone</p>
             <p className="text-[14px] font-medium text-[var(--text-primary)]">{details.coverageArea || 'N/A'}</p>
          </div>
       </div>
    );
  };

  const filteredRequests = requests.filter(r => 
    (r.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     r.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     r.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    r.requestedRole === 'FARMER'
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-light)] flex items-center justify-center text-[var(--text-primary)]">
               <Clock size={20} />
             </div>
             <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] tracking-tight">Demandes d'Extensions</h1>
           </div>
           <p className="text-[var(--text-secondary)] text-[14px]">Examinez et approuvez les demandes de création d'espace des utilisateurs.</p>
        </div>
      </header>

      <Card className="p-0 border overflow-hidden">
        <div className="p-6 border-b border-[var(--border-light)] bg-white/50 backdrop-blur-sm flex flex-col sm:flex-row items-center gap-4 justify-between">
           <div className="relative w-full sm:w-96 group">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] transition-colors" size={18} />
             <input
               type="text"
               placeholder="Rechercher par nom ou email..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-page)] border border-[var(--border-light)] rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--text-primary)] transition-all"
             />
           </div>
           
           <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-[var(--border-light)] rounded-xl text-[13px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-page)] transition-colors">
                <Filter size={16} /> Tous les statuts
              </button>
           </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredRequests}
          isLoading={loading}
          expandable
          renderExpansion={renderDetails}
          emptyMessage="Aucune demande d'extension trouvée."
        />
      </Card>
    </div>
  );
}
