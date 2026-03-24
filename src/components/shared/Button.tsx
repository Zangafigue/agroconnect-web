import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-body font-medium transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100 outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  
  const variants = {
    primary: 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-none hover:bg-[var(--btn-primary-hover)] focus-visible:ring-[var(--btn-primary-bg)] disabled:bg-[var(--text-muted)] disabled:text-[var(--bg-muted)]',
    secondary: 'bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)] hover:bg-[var(--btn-secondary-hover-bg)] hover:border-[var(--btn-secondary-hover-border)] focus-visible:ring-[var(--btn-secondary-border)] disabled:opacity-50',
    danger: 'bg-[var(--btn-danger-bg)] text-[var(--btn-danger-text)] border border-[var(--btn-danger-border)] hover:bg-[var(--btn-danger-hover-bg)] hover:border-[var(--btn-danger-text)] focus-visible:ring-[var(--btn-danger-text)] disabled:opacity-50',
    ghost: 'bg-transparent text-[var(--text-secondary)] border-none hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] focus-visible:ring-[var(--bg-muted)] disabled:opacity-50',
  };

  const sizes = {
    sm: 'h-[30px] px-3 text-[13px] rounded-[var(--radius-sm)]',
    md: 'h-[36px] px-4 text-[14px] rounded-[var(--radius-md)]',
    lg: 'h-[40px] px-5 text-[15px] rounded-[var(--radius-lg)]',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;
  const gap = 'gap-[6px]';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${gap} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
             <span className="flex items-center" style={{ fontSize: iconSize }}>{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
             <span className="flex items-center" style={{ fontSize: iconSize }}>{icon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
