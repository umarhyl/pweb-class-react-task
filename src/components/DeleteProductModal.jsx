import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { formatPrice } from '../utils/format';

function DeleteProductModal({ isOpen, product, onClose, onConfirmDelete }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl relative animate-scale-up text-center">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors p-1"
          aria-label="Tutup"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mx-auto mb-3.5">
          <Trash2 size={24} />
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-xl font-bold text-slate-900">Hapus Produk?</h2>
        <p className="text-sm text-slate-500 mt-1">
          Produk yang dihapus tidak dapat dikembalikan.
        </p>

        {/* Product Preview Box */}
        <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 text-left my-5">
          <span className="text-xs font-semibold text-slate-400">ID: {product.id}</span>
          <h4 className="text-base font-bold text-slate-900 mt-0.5">{product.name}</h4>
          <p className="text-sm font-bold text-blue-600 mt-0.5">{formatPrice(product.price)}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirmDelete(product.id);
              onClose();
            }}
            className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl shadow-sm transition-colors"
          >
            Hapus Produk
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;
