import React from 'react';
import { LogOut } from 'lucide-react';
import Button from './Button';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-[var(--bg-surface)] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-[var(--border-light)] transform transition-all">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogOut size={28} />
          </div>
          
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-2">
            Déconnexion
          </h2>
          <p className="text-[14px] text-[var(--text-secondary)] mb-8">
            Êtes-vous sûr de vouloir vous déconnecter de votre compte ?
          </p>

          <div className="flex flex-col gap-3">
            <Button 
              variant="primary" 
              className="w-full bg-red-500 hover:bg-red-600 text-white border-transparent"
              size="md"
              onClick={onConfirm}
            >
              Oui, me déconnecter
            </Button>
            <Button 
              variant="ghost" 
              className="w-full text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]"
              size="md"
              onClick={onClose}
            >
              Annuler
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
