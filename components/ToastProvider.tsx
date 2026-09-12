'use client';

import { useToastStore } from '@/store/toast-store';
import Toast from '@/components/ui/Toast';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts, dismissToast } = useToastStore();

  return (
    <>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => dismissToast(toast.id)}
          />
        ))}
      </div>
    </>
  );
}