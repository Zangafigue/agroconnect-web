import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-[var(--bg-page)] overflow-hidden text-[var(--text-primary)] font-body">
      {/* Vertical Sidebar */}
      <Sidebar />

      {/* Main Content Vertical Wrapper */}
      <div className="flex-1 flex flex-col h-screen relative">
        <Header />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[var(--bg-page)] p-6 md:p-8 relative">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
