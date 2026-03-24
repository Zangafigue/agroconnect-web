import React from 'react';

interface AvatarProps {
  name?: string;
  role?: 'FARMER' | 'BUYER' | 'TRANSPORTER' | 'ADMIN' | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  name = 'User', 
  role = 'USER', 
  size = 'md', 
  className = '' 
}) => {
  const getInitials = (n: string) => {
    return n.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2);
  };

  const getRoleStyles = () => {
    const r = role?.toUpperCase();
    switch (r) {
      case 'FARMER':
        return { bg: 'var(--avatar-farmer-bg)', text: 'var(--avatar-farmer-text)' };
      case 'BUYER':
        return { bg: 'var(--avatar-buyer-bg)', text: 'var(--avatar-buyer-text)' };
      case 'TRANSPORTER':
        return { bg: 'var(--avatar-transporter-bg)', text: 'var(--avatar-transporter-text)' };
      case 'ADMIN':
        return { bg: 'var(--avatar-admin-bg)', text: 'var(--avatar-admin-text)' };
      default:
        return { bg: 'var(--bg-muted)', text: 'var(--text-secondary)' };
    }
  };

  const sizes = {
    sm: 'w-8 h-8 text-[11px]',
    md: 'w-10 h-10 text-[13px]',
    lg: 'w-12 h-12 text-[15px]',
  };

  const { bg, text } = getRoleStyles();

  return (
    <div 
      className={`rounded-full flex items-center justify-center font-bold flex-shrink-0 ${sizes[size]} ${className}`}
      style={{ backgroundColor: bg, color: text }}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
