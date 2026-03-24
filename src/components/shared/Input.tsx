import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  containerClassName = '',
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-[6px] ${containerClassName}`}>
      {label && (
        <label className="text-[13px] font-medium text-[var(--text-secondary)] pl-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-muted)] group-focus-within:text-[var(--text-accent)] transition-colors">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full h-[36px] outline-none transition-all duration-200
            bg-[var(--input-bg)] text-[var(--input-text)] 
            border px-3 rounded-[var(--radius-md)] font-body text-[14px]
            placeholder:text-[var(--input-placeholder)]
            ${icon ? 'pl-10' : ''}
            ${error 
              ? 'border-[var(--btn-danger-text)] focus:ring-[var(--btn-danger-text)]' 
              : 'border-[var(--input-border)] focus:border-[var(--input-border-focus)] focus:ring-2 focus:ring-[var(--input-shadow-focus)]'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <span className="text-[11px] text-[var(--btn-danger-text)] font-medium pl-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
