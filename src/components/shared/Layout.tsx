import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-surface overflow-hidden text-on-surface font-body">
      {/* Vertical Sidebar */}
      <Sidebar />

      {/* Main Content Vertical Wrapper */}
      <div className="flex-1 flex flex-col h-screen relative">
        <Header />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-surface p-6 md:p-10 relative">
          {/* Subtle Background Pattern / Gradient */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
          
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
