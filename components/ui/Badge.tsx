import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  default: 'bg-[#f1f1ee] text-[#6b6b67] border-[#deded8]',
  primary: 'bg-[#fff1e8] text-[#c2410c] border-[#fed7aa]',
  success: 'bg-[#e6f4ea] text-[#16803c] border-[#bbf7d0]',
  warning: 'bg-[#fef9c3] text-[#854d0e] border-[#fde047]',
  error: 'bg-[#fef2f2] text-[#b91c1c] border-[#fecaca]',
  info: 'bg-[#dbeafe] text-[#1e40af] border-[#bfdbfe]',
};

export default function Badge({
  variant = 'default',
  size = 'sm',
  children,
  className = '',
  ...props
}: BadgeProps) {
  const sizeStyle = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';
  const colorStyle = variantStyles[variant] || variantStyles.default;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${sizeStyle} ${colorStyle} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

