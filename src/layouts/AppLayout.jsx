import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/organisms/Navbar';

function AppLayout({ isBackendConnected }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      <Navbar isBackendConnected={isBackendConnected} />
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        Pemrograman Web - Week 13: React Router & Tailwind CSS
      </footer>
    </div>
  );
}

export default AppLayout;
