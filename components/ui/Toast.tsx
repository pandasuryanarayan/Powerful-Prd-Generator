'use client';

import { useEffect } from 'react';
import { clsx } from 'clsx';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'info', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles = {
    success: 'bg-[#16803c] text-white',
    error: 'bg-[#c2410c] text-white',
    info: 'bg-[#171717] text-white',
  };

  return (
    <div
      className={clsx(
        'flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg animate-fade-in',
        styles[type]
      )}
      role="alert"
    >
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 opacity-70 hover:opacity-100 text-base leading-none"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}