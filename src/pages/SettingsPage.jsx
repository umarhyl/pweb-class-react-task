import React from 'react';
import { useProducts } from '../context/ProductContext';
import { LayoutGrid, List, Check, Server, RefreshCw } from 'lucide-react';

function SettingsPage() {
  const { displayMode, setDisplayMode, isBackendConnected, refreshProducts } = useProducts();

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Pengaturan Aplikasi
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Sesuaikan tata letak antarmuka dan preferensi konektivitas data.
        </p>
      </div>

      {/* Display Mode Settings */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Tata Letak Daftar Produk</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pilih bagaimana produk ditampilkan pada halaman utama katalog.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Grid Option */}
          <button
            type="button"
            onClick={() => setDisplayMode('grid')}
            className={`p-4 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
              displayMode === 'grid'
                ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl ${
                  displayMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                <LayoutGrid size={20} />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-800 block">Mode Grid</span>
                <span className="text-xs text-slate-400 block mt-0.5">Tata letak kartu multi-kolom responsif</span>
              </div>
            </div>
            {displayMode === 'grid' && (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Check size={12} />
              </span>
            )}
          </button>

          {/* List Option */}
          <button
            type="button"
            onClick={() => setDisplayMode('list')}
            className={`p-4 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
              displayMode === 'list'
                ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl ${
                  displayMode === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                <List size={20} />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-800 block">Mode List</span>
                <span className="text-xs text-slate-400 block mt-0.5">Daftar memanjang satu per satu</span>
              </div>
            </div>
            {displayMode === 'list' && (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Check size={12} />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Backend Integration Info */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Status Layanan Backend</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Service API ExpressJS (Prisma ORM & SQLite)
            </p>
          </div>
          <button
            type="button"
            onClick={refreshProducts}
            className="p-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
            title="Cek Ulang Koneksi"
          >
            <RefreshCw size={16} />
          </button>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Server size={20} className={isBackendConnected ? 'text-emerald-600' : 'text-amber-500'} />
            <div>
              <span className="text-xs font-semibold text-slate-700 block">
                {isBackendConnected ? 'Backend API Terhubung' : 'Backend Sedang Offline (Fallback Lokal Aktif)'}
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">
                Target endpoint: http://localhost:3000/products
              </span>
            </div>
          </div>
          <span
            className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
              isBackendConnected
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            {isBackendConnected ? 'Aktif 200 OK' : 'Local Fallback'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
