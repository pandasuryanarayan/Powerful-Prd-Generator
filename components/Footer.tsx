import React from 'react';
import Link from 'next/link';
import { useCreateModalStore } from '@/store';

export default function Footer() {
  const openCreateModal = useCreateModalStore((s) => s.openCreateModal);

  return (
    <footer className="w-full border-t border-[#deded8] bg-white py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-5">
        {/* Surya Labs Brand & Tagline */}
        <div className="flex items-center gap-3 text-left">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#deded8] bg-white shadow-xs shrink-0 flex items-center justify-center p-0.5">
            <img
              src="/surya-labs-logo.png"
              alt="Surya Labs"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#6b6b67]">Made by</span>
              <span className="font-bold text-[#171717]">Surya Labs</span>
            </div>
            <p className="text-[11px] text-[#8c8c85]">
              Building Software, AI &amp; Digital Products.
            </p>
          </div>
        </div>

        {/* Navigation links & Copyright */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#6b6b67]">
          <Link href="/" className="hover:text-[#f97316] transition-colors">
            Home
          </Link>
          <span className="text-[#deded8]">•</span>
          <button
            type="button"
            onClick={() => openCreateModal()}
            className="hover:text-[#f97316] transition-colors cursor-pointer"
          >
            Create PRD
          </button>
          <span className="text-[#deded8]">•</span>
          <span className="text-[11px] text-[#8c8c85]">
            © {new Date().getFullYear()} Surya Labs. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

