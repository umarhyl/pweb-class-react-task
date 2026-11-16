import React, { useState } from 'react';
import { X } from 'lucide-react';

function AddProductModal({ isOpen, onClose, onAddProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Nama produk tidak boleh kosong.');
      return;
    }
    const numPrice = Number(price);
    if (!price || isNaN(numPrice) || numPrice <= 0) {
      setError('Harga harus lebih dari 0.');
      return;
    }

    onAddProduct({
      name: name.trim(),
      price: numPrice,
    });

    setName('');
    setPrice('');
    setError('');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setPrice('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative animate-scale-up">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors p-1"
          aria-label="Tutup"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-slate-900">Tambah Produk</h2>
        <p className="text-sm text-slate-500 mt-1">
          Masukkan informasi produk baru.
        </p>

        {error && (
          <div className="mt-3 p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Nama Produk
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Contoh: Pulpen"
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Harga (Rp)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (error) setError('');
              }}
              placeholder="Contoh: 5000"
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
              min="1"
            />
            <p className="text-xs text-slate-400 mt-1.5">
              Harga harus lebih dari 0.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow-sm transition-colors"
            >
              Simpan Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
