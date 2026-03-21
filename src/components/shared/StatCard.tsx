import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'primary-container';
  trend?: {
    value: string;
    isUp: boolean;
  };
}

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  color = 'primary',
  trend 
}: StatCardProps) {
  
  const colorClasses = {
    primary: 'text-primary bg-primary/10',
    secondary: 'text-secondary bg-secondary/10',
    tertiary: 'text-tertiary bg-tertiary/10',
    error: 'text-error bg-error/10',
    'primary-container': 'text-on-primary-container bg-primary-container/20',
  };

  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${trend.isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend.isUp ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-1">{title}</h3>
        <p className="text-2xl font-black text-on-surface font-mono tracking-tighter">{value}</p>
      </div>
    </div>
  );
}
