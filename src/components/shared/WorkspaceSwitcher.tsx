import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Check, Plus } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { getUserRole, getRoleSlug } from '../../utils/auth';

export default function WorkspaceSwitcher() {
  const { user, setShowUpgradeModal } = useAuthStore() as any;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const role = getUserRole(user);
  const roleSlug = getRoleSlug(role);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwitch = (slug: string) => {
    navigate(`/${slug}/dashboard`);
    setIsOpen(false);
  };

  return (
    <div className="px-4 py-3 border-b border-[var(--border-light)] bg-[var(--bg-surface)]/50 relative" ref={containerRef}>
      <p className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-secondary)] mb-2">Espace de travail</p>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-[var(--bg-muted)] border border-[var(--border-light)] text-[var(--text-primary)] rounded-xl py-2 px-3 hover:border-[var(--text-accent)]/50 transition-colors shadow-sm"
      >
        <span className="text-[13px] font-bold">
          {roleSlug === 'buyer' ? 'Acheteur' : roleSlug === 'farmer' ? 'Producteur' : 'Livreur'}
        </span>
        <ChevronDown size={16} className={`text-[var(--text-secondary)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-xl shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-1.5 space-y-1">
            {(user?.canBuy || role === 'BUYER') && (
              <button 
                onClick={() => handleSwitch('buyer')}
                className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-bold transition-colors ${
                  roleSlug === 'buyer' ? 'bg-[var(--text-accent)]/10 text-[var(--text-accent)]' : 'text-[var(--text-primary)] hover:bg-[var(--bg-muted)]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  Acheteur
                </div>
                {roleSlug === 'buyer' && <Check size={16} />}
              </button>
            )}
            {(user?.canSell || role === 'FARMER') && (
              <button 
                onClick={() => handleSwitch('farmer')}
                className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-bold transition-colors ${
                  roleSlug === 'farmer' ? 'bg-[var(--text-accent)]/10 text-[var(--text-accent)]' : 'text-[var(--text-primary)] hover:bg-[var(--bg-muted)]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">storefront</span>
                  Producteur
                </div>
                {roleSlug === 'farmer' && <Check size={16} />}
              </button>
            )}
            {(user?.canDeliver || role === 'TRANSPORTER') && (
              <button 
                onClick={() => handleSwitch('transporter')}
                className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-bold transition-colors ${
                  roleSlug === 'transporter' ? 'bg-[var(--text-accent)]/10 text-[var(--text-accent)]' : 'text-[var(--text-primary)] hover:bg-[var(--bg-muted)]'
                }`}
              >
                 <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  Livreur
                </div>
                {roleSlug === 'transporter' && <Check size={16} />}
              </button>
            )}
          </div>
          
          {!(user?.canBuy && user?.canSell && user?.canDeliver) && (
            <div className="p-1.5 border-t border-[var(--border-light)] bg-[var(--bg-muted)]/30">
              <button 
                type="button"
                onClick={(e) => { 
                  e.stopPropagation();
                  setShowUpgradeModal(true); 
                  setIsOpen(false); 
                }}
                className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-light)] transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded-md bg-[var(--bg-surface)] flex items-center justify-center border border-[var(--border-light)] shadow-sm">
                  <Plus size={14} className="text-[var(--text-accent)]" />
                </div>
                Demander un nouvel espace
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
