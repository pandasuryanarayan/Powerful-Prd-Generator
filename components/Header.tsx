'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useCreateModalStore } from '@/store';

interface HeaderProps {
  showNav?: boolean;
}

export default function Header({ showNav = true }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const openCreateModal = useCreateModalStore((s) => s.openCreateModal);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger when scrolled past the hero button area (~140px)
      setScrolled(window.scrollY > 140);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';
  const showHeaderCTA = !isHome || scrolled;

  return (
    <header className="sticky top-0 z-40 border-b border-[#deded8] bg-white/90 backdrop-blur-md transition-shadow">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg overflow-hidden shadow-xs border border-[#f97316]/20 transition-transform group-hover:scale-105">
            <img src="/icon.svg" alt="PRD Generator Icon" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold text-[#171717]">
              PRD Generator
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#fff1e8] text-[#c2410c] px-1.5 py-0.5 rounded border border-[#f97316]/20">
              AI
            </span>
          </div>
        </Link>

        {/* Navigation Links on Home */}
        {showNav && isHome && (
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#how-it-works"
              className="text-sm text-[#6b6b67] hover:text-[#171717] transition-colors"
            >
              How it works
            </a>
            <a
              href="#examples"
              className="text-sm text-[#6b6b67] hover:text-[#171717] transition-colors"
            >
              Examples
            </a>
          </nav>
        )}

        {/* Desktop CTA & Navigation: Appears when scrolled on Home or always on other pages */}
        <div className="hidden md:flex md:items-center gap-3">
          {!isHome && (
            <Link
              href="/"
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-[#6b6b67] hover:text-[#171717] hover:bg-[#f1f1ee] transition-colors"
            >
              Back to home
            </Link>
          )}

          <button
            type="button"
            onClick={() => openCreateModal()}
            className={clsx(
              'inline-flex items-center gap-1.5 rounded-xl bg-[#f97316] px-5 py-2 text-sm font-semibold !text-white hover:!text-white shadow-xs transition-all duration-300 hover:bg-[#ea580c] hover:shadow active:scale-[0.98]',
              showHeaderCTA
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
            )}
          >
            Create PRD
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Mobile Actions: CTA when scrolled + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => openCreateModal()}
            className={clsx(
              'inline-flex items-center gap-1 rounded-lg bg-[#f97316] px-3.5 py-1.5 text-xs font-semibold !text-white hover:!text-white shadow-xs transition-all duration-300 hover:bg-[#ea580c]',
              showHeaderCTA
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-2 pointer-events-none'
            )}
          >
            Create PRD
          </button>

          <button
            className="rounded-lg p-2 text-[#6b6b67] hover:bg-[#f1f1ee]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#deded8] bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            <a
              href="#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-3 text-sm text-[#171717] hover:bg-[#f1f1ee]"
            >
              How it works
            </a>
            <a
              href="#examples"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-3 text-sm text-[#171717] hover:bg-[#f1f1ee]"
            >
              Examples
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openCreateModal();
              }}
              className="mt-2 rounded-lg bg-[#f97316] px-4 py-3 text-center text-sm font-medium text-white hover:bg-[#ea580c]"
            >
              Create PRD
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}