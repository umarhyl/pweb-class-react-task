import React from 'react';
import { NavLink } from 'react-router';
import { LayoutDashboard, Package, Settings, Database } from 'lucide-react';

function Navbar({ isBackendConnected }) {
  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-50 text-blue-600 font-semibold shadow-xs'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
    }`;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
              <Package size={20} />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                Manajemen Produk
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-slate-400 font-medium border border-slate-200 rounded-md px-1.5 py-0.5">
                PWeb Week 13
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <NavLink to="/" end className={navLinkClass}>
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              <Package size={18} />
              <span>Produk</span>
            </NavLink>
            <NavLink to="/settings" className={navLinkClass}>
              <Settings size={18} />
              <span className="hidden sm:inline">Pengaturan</span>
            </NavLink>
          </nav>

          {/* Backend Status Indicator */}
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                isBackendConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="text-slate-500 font-medium">
              {isBackendConnected ? 'API Connected' : 'Offline Mode'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
