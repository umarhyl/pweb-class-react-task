import React from 'react';
import { formatPrice } from '../utils/format';

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <span className="text-xs font-semibold text-slate-400">ID: {product.id}</span>
        <h3 className="text-lg font-bold text-slate-900 mt-1">{product.name}</h3>
        <p className="text-base font-bold text-blue-600 mt-0.5">{formatPrice(product.price)}</p>
      </div>
      <div className="flex items-center gap-2.5 mt-5">
        <button
          type="button"
          onClick={() => onEdit && onEdit(product)}
          className="flex-1 py-1.5 px-4 text-sm font-medium text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete && onDelete(product)}
          className="flex-1 py-1.5 px-4 text-sm font-medium text-red-500 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
