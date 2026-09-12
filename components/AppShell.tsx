'use client';

import Header from './Header';
import Footer from './Footer';
import CreateModeModal from './CreateModeModal';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f7f5]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CreateModeModal />
    </div>
  );
}