import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: (e?: any) => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', hoverable = false, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-[var(--bg-surface)] border border-[var(--border-light)] 
        rounded-[var(--radius-lg)] p-5 transition-all duration-200
        shadow-[var(--shadow-sm)]
        ${hoverable ? 'hover:shadow-[var(--shadow-md)] hover:-translate-y-[1px]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
