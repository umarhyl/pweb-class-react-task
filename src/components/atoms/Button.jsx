import React from 'react';

const styles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm border border-transparent',
  secondary: 'bg-white text-blue-600 border border-blue-500 hover:bg-blue-50',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm border border-transparent',
  dangerOutline: 'bg-white text-red-500 border border-red-300 hover:bg-red-50',
  outline: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
};

function Button({
  variant = 'primary',
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant] || styles.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
