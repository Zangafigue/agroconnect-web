import React from 'react';

export type StatusType = 
  | 'PENDING' | 'CONFIRMED' | 'TRANSIT' | 'DELIVERED' 
  | 'DISPUTE' | 'CANCELLED' | 'HELD' | 'DISPONIBLE' 
  | 'RUPTURE' | 'ACTIF' | 'SUSPENDU';

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const s = status?.toUpperCase();
  
  const getStatusStyles = () => {
    switch (s) {
      case 'PENDING':
      case 'EN ATTENTE':
        return { bg: 'var(--badge-pending-bg)', text: 'var(--badge-pending-text)' };
      case 'CONFIRMED':
      case 'CONFIRMÉE':
        return { bg: 'var(--badge-confirmed-bg)', text: 'var(--badge-confirmed-text)' };
      case 'TRANSIT':
      case 'EN TRANSIT':
        return { bg: 'var(--badge-transit-bg)', text: 'var(--badge-transit-text)' };
      case 'DELIVERED':
      case 'LIVRÉE':
        return { bg: 'var(--badge-delivered-bg)', text: 'var(--badge-delivered-text)' };
      case 'DISPUTE':
      case 'LITIGE':
        return { bg: 'var(--badge-dispute-bg)', text: 'var(--badge-dispute-text)' };
      case 'CANCELLED':
      case 'ANNULÉE':
        return { bg: 'var(--badge-cancelled-bg)', text: 'var(--badge-cancelled-text)' };
      case 'HELD':
      case 'RETENU':
        return { bg: 'var(--badge-held-bg)', text: 'var(--badge-held-text)' };
      case 'DISPONIBLE':
        return { bg: 'var(--badge-disponible-bg)', text: 'var(--badge-disponible-text)' };
      case 'RUPTURE':
        return { bg: 'var(--badge-rupture-bg)', text: 'var(--badge-rupture-text)' };
      case 'ACTIF':
        return { bg: 'var(--badge-actif-bg)', text: 'var(--badge-actif-text)' };
      case 'SUSPENDU':
        return { bg: 'var(--badge-suspendu-bg)', text: 'var(--badge-suspendu-text)' };
      default:
        return { bg: 'var(--bg-muted)', text: 'var(--text-secondary)' };
    }
  };

  const { bg, text } = getStatusStyles();

  return (
    <div 
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-[11px] font-medium ${className}`}
      style={{ backgroundColor: bg, color: text }}
    >
      <span 
        className="w-[6px] h-[6px] rounded-full flex-shrink-0"
        style={{ backgroundColor: text }}
      ></span>
      {status}
    </div>
  );
};

export default StatusBadge;
