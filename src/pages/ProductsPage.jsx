import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import AddProductModal from '../components/AddProductModal';
import EditProductModal from '../components/EditProductModal';
import DeleteProductModal from '../components/DeleteProductModal';
import { Plus } from 'lucide-react';

function ProductsPage() {
  const { products, loading, displayMode, addProduct, updateProduct, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Manajemen Produk
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola daftar produk dan harga dalam satu tempat.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-sm transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus size={18} /> Tambah Produk
        </button>
      </div>

      {/* Search Bar & Counter */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        count={filteredProducts.length}
      />

      {/* Loading state */}
      {loading ? (
        <div className="py-16 text-center text-slate-400">
          <div className="inline-block w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-2" />
          <p className="text-sm">Menghubungkan ke API backend...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        displayMode === 'list' ? (
          <div className="flex flex-col gap-3 mt-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                layout="list"
                onEdit={(item) => setEditingProduct(item)}
                onDelete={(item) => setDeletingProduct(item)}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                layout="grid"
                onEdit={(item) => setEditingProduct(item)}
                onDelete={(item) => setDeletingProduct(item)}
              />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 mt-6">
          <p className="text-slate-500 text-sm">
            {searchTerm
              ? `Tidak ada produk yang sesuai dengan pencarian "${searchTerm}"`
              : 'Belum ada produk yang terdaftar.'}
          </p>
        </div>
      )}

      {/* Bottom Footer Info */}
      <div className="mt-8 text-sm text-slate-500 flex items-center justify-between">
        <span>Menampilkan {filteredProducts.length} dari {products.length} produk</span>
        <span className="text-xs text-slate-400">Mode tampilan: <strong className="capitalize">{displayMode}</strong></span>
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={addProduct}
      />

      <EditProductModal
        isOpen={Boolean(editingProduct)}
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onUpdateProduct={(data) => updateProduct(data.id, data)}
      />

      <DeleteProductModal
        isOpen={Boolean(deletingProduct)}
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirmDelete={deleteProduct}
      />
    </div>
  );
}

export default ProductsPage;
