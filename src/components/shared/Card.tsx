import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hoverable = false }) => {
  return (
    <div 
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
