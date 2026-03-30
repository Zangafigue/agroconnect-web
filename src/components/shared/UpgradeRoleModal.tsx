import React, { useState } from 'react';
import { X, Leaf, Tractor, Loader2, ArrowRight, ArrowLeft, Send } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import profileService from '../../services/profileService';

export default function UpgradeRoleModal() {
  const { showUpgradeModal, setShowUpgradeModal, updateUser } = useAuthStore() as any;
  const [step, setStep] = useState<0 | 1>(0);
  const [selectedRole, setSelectedRole] = useState<'FARMER' | 'TRANSPORTER' | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    farmName: '',
    location: '',
    mainCrops: '',
    description: '',
    vehicleType: '',
    vehiclePlate: '',
    coverageArea: '',
  });

  if (!showUpgradeModal) return null;

  const onClose = () => {
    setShowUpgradeModal(false);
    setStep(0);
    setSelectedRole(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedRole) return;
    setLoading(true);
    try {
      if (selectedRole === 'TRANSPORTER') {
        const transporterData = {
          canDeliver: true,
          vehicle: {
            type: formData.vehicleType,
            plate: formData.vehiclePlate,
          },
          coverageArea: formData.coverageArea
        };
        await profileService.updateProfile(transporterData);
        updateUser(transporterData);
        toast.success("Espace Livreur activé avec succès !");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        await api.post('/support/role-requests', { 
          requestedRole: 'FARMER',
          details: {
            farmName: formData.farmName,
            location: formData.location,
            mainCrops: formData.mainCrops,
            description: formData.description
          }
        });
        toast.success("Votre demande a été envoyée à l'administration.");
      }
      onClose();
    } catch (err: any) {
      toast.error("Une erreur est survenue lors du traitement.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep0 = () => (
    <div className="p-6 space-y-4">
      <button
        onClick={() => setSelectedRole('FARMER')}
        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
          selectedRole === 'FARMER' 
            ? 'border-[var(--green-600)] bg-[var(--green-600)]/5 shadow-md shadow-[var(--green-600)]/10' 
            : 'border-[var(--border-light)] hover:border-[var(--green-600)]/40 hover:bg-[var(--bg-muted)]'
        }`}
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
          selectedRole === 'FARMER' ? 'bg-[var(--green-600)] text-white' : 'bg-[var(--bg-page)] text-[var(--text-secondary)]'
        }`}>
          <Leaf size={24} />
        </div>
        <div className="text-left flex-1">
          <h3 className="font-bold text-[var(--text-primary)]">Devenir Producteur</h3>
          <p className="text-[12px] text-[var(--text-secondary)] leading-tight mt-0.5">Vendez vos récoltes et gérez vos stocks</p>
        </div>
        {selectedRole === 'FARMER' && <div className="text-[var(--green-600)]"><ArrowRight size={20} /></div>}
      </button>

      <button
        onClick={() => setSelectedRole('TRANSPORTER')}
        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
          selectedRole === 'TRANSPORTER' 
            ? 'border-blue-500 bg-blue-500/5 shadow-md shadow-blue-500/10' 
            : 'border-[var(--border-light)] hover:border-blue-500/40 hover:bg-[var(--bg-muted)]'
        }`}
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
          selectedRole === 'TRANSPORTER' ? 'bg-blue-500 text-white' : 'bg-[var(--bg-page)] text-[var(--text-secondary)]'
        }`}>
          <Tractor size={24} />
        </div>
        <div className="text-left flex-1">
          <h3 className="font-bold text-[var(--text-primary)]">Devenir Livreur</h3>
          <p className="text-[12px] text-[var(--text-secondary)] leading-tight mt-0.5">Effectuez des missions de logistique</p>
        </div>
        {selectedRole === 'TRANSPORTER' && <div className="text-blue-500"><ArrowRight size={20} /></div>}
      </button>
    </div>
  );

  const renderStep1Farmer = () => (
    <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider ml-1">Nom de l'exploitation</label>
        <input 
          name="farmName"
          value={formData.farmName}
          onChange={handleInputChange}
          placeholder="Ex: Ferme de la Vallée"
          className="w-full px-4 py-3 bg-[var(--bg-muted)] border border-[var(--border-light)] rounded-xl text-[14px] focus:outline-none focus:border-[var(--green-600)] transition-colors"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider ml-1">Localisation</label>
        <input 
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Ex: Bobo-Dioulasso, Secteur 22"
          className="w-full px-4 py-3 bg-[var(--bg-muted)] border border-[var(--border-light)] rounded-xl text-[14px] focus:outline-none focus:border-[var(--green-600)] transition-colors"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider ml-1">Cultures principales</label>
        <input 
          name="mainCrops"
          value={formData.mainCrops}
          onChange={handleInputChange}
          placeholder="Ex: Maïs, Tomates, Oignons"
          className="w-full px-4 py-3 bg-[var(--bg-muted)] border border-[var(--border-light)] rounded-xl text-[14px] focus:outline-none focus:border-[var(--green-600)] transition-colors"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider ml-1">Pourquoi devenir producteur ?</label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          placeholder="Décrivez brièvement votre activité..."
          className="w-full px-4 py-3 bg-[var(--bg-muted)] border border-[var(--border-light)] rounded-xl text-[14px] focus:outline-none focus:border-[var(--green-600)] transition-colors resize-none"
        />
      </div>
    </div>
  );

  const renderStep1Transporter = () => (
    <div className="p-6 space-y-4">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider ml-1">Type de véhicule</label>
        <select 
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-[var(--bg-muted)] border border-[var(--border-light)] rounded-xl text-[14px] focus:outline-none focus:border-blue-500 transition-colors appearance-none"
        >
          <option value="">Sélectionner un type</option>
          <option value="MOTO">Moto (Livraison rapide)</option>
          <option value="TRICYCLE">Tricycle</option>
          <option value="CAMION_LEGER">Camion Léger</option>
          <option value="CAMION_POURD">Camion Poids lourd</option>
        </select>
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider ml-1">Numéro de plaque</label>
        <input 
          name="vehiclePlate"
          value={formData.vehiclePlate}
          onChange={handleInputChange}
          placeholder="Ex: 11 BB 4455"
          className="w-full px-4 py-3 bg-[var(--bg-muted)] border border-[var(--border-light)] rounded-xl text-[14px] focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider ml-1">Zone de couverture</label>
        <input 
          name="coverageArea"
          value={formData.coverageArea}
          onChange={handleInputChange}
          placeholder="Ex: Ouagadougou et environs"
          className="w-full px-4 py-3 bg-[var(--bg-muted)] border border-[var(--border-light)] rounded-xl text-[14px] focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[var(--bg-surface)] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-light)]">
          <div className="flex items-center gap-3">
            {step === 1 && (
              <button 
                onClick={() => setStep(0)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--bg-muted)] text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div>
              <h2 className="text-xl font-bold font-display text-[var(--text-primary)]">
                {step === 0 ? 'Nouvel espace' : selectedRole === 'FARMER' ? 'Profil Producteur' : 'Profil Livreur'}
              </h2>
              <p className="text-[13px] text-[var(--text-secondary)]">
                {step === 0 ? 'Demandez l\'activation d\'un module' : 'Complétez vos informations'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--bg-muted)] text-[var(--text-secondary)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {step === 0 ? renderStep0() : (selectedRole === 'FARMER' ? renderStep1Farmer() : renderStep1Transporter())}

        <div className="p-6 pt-2 border-t border-[var(--border-light)] bg-[var(--bg-muted)]/30 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-[14px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-light)] rounded-xl transition-colors"
          >
            Annuler
          </button>
          
          {step === 0 ? (
            <button
              onClick={() => setStep(1)}
              disabled={!selectedRole}
              className="flex-[2] flex items-center justify-center gap-2 py-3 text-[14px] font-bold bg-[var(--text-accent)] text-white rounded-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[var(--text-accent)]/20"
            >
              Suivant <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-[2] flex items-center justify-center gap-2 py-3 text-[14px] font-bold bg-[var(--text-accent)] text-white rounded-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[var(--text-accent)]/20"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : (
                <>
                  {selectedRole === 'TRANSPORTER' ? 'Activer maintenant' : 'Envoyer la demande'}
                  <Send size={18} className="ml-1" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
