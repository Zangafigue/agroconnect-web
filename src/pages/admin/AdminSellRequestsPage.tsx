import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, User, Clock, AlertCircle } from 'lucide-react';
import userService from '../../services/userService';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Avatar from '../../components/shared/Avatar';
import DataTable from '../../components/shared/DataTable';

const AdminSellRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await userService.getSellRequests('pending');
      setRequests(data);
    } catch (err) {
      console.error('Erreur fetch requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (userId: string) => {
    setProcessing(userId);
    try {
      await userService.approveSellRequest(userId);
      fetchRequests();
    } catch (err) {
      console.error('Erreur approbation:', err);
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (userId: string, reason: string) => {
    setProcessing(userId);
    try {
      await userService.rejectSellRequest(userId, reason);
      fetchRequests();
    } catch (err) {
      console.error('Erreur rejet:', err);
    } finally {
      setProcessing(null);
    }
  };

  const columns = [
    {
      header: 'Utilisateur',
      accessor: (item: any) => (
        <div className="flex items-center gap-3">
          <Avatar name={item.firstName} size="sm" />
          <div className="flex flex-col">
            <span className="font-bold text-[13px]">{item.firstName} {item.lastName}</span>
            <span className="text-[11px] text-[var(--text-secondary)]">{item.email}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Date Demande',
      accessor: (item: any) => (
        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
          <Clock size={14} />
          <span className="text-[12px]">{new Date(item.updatedAt).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: (item: any) => (
        <div className="flex items-center gap-2 justify-end">
          <Button 
            variant="primary" 
            size="sm" 
            icon={<CheckCircle size={16} />}
            onClick={() => handleApprove(item._id)}
            disabled={processing === item._id}
          >
            Approuver
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-600 hover:bg-red-50"
            icon={<XCircle size={16} />}
            onClick={() => {
              const reason = window.prompt('Raison du rejet ?');
              if (reason) handleReject(item._id, reason);
            }}
            disabled={processing === item._id}
          >
            Rejeter
          </Button>
        </div>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <header>
        <h1 className="text-3xl font-serif-display text-[var(--text-primary)] mb-2">Demandes de Vendeurs</h1>
        <p className="text-sm text-[var(--text-secondary)]">Validez les comptes souhaitant ouvrir une boutique sur la marketplace.</p>
      </header>

      <Card className="p-0 overflow-hidden border-[var(--border-light)]/40 shadow-xl shadow-black/5">
        <DataTable 
          columns={columns} 
          data={requests} 
          isLoading={loading}
          emptyMessage="Aucune demande de vendeur en attente."
        />
      </Card>
      
      {requests.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center p-12 bg-[var(--bg-muted)]/30 rounded-3xl border-2 border-dashed border-[var(--border-light)]">
           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--gray-300)] mb-4">
              <CheckCircle size={24} />
           </div>
           <p className="text-sm font-medium text-[var(--text-secondary)]">Tout est à jour !</p>
        </div>
      )}
    </div>
  );
};

export default AdminSellRequestsPage;
