import React, { useState } from 'react';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import AddProductModal from './components/AddProductModal';
import EditProductModal from './components/EditProductModal';
import DeleteProductModal from './components/DeleteProductModal';
import { initialProducts } from './data/initialProducts';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (newProductData) => {
    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const newProduct = {
      id: nextId,
      ...newProductData,
    };
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
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
            + Tambah Produk
          </button>
        </div>

        {/* Search Bar & Counter */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          count={filteredProducts.length}
        />

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={(item) => setEditingProduct(item)}
                onDelete={(item) => setDeletingProduct(item)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 mt-6">
            <p className="text-slate-500 text-sm">
              Tidak ada produk yang sesuai dengan pencarian &quot;{searchTerm}&quot;
            </p>
          </div>
        )}

        {/* Bottom Footer Info */}
        <div className="mt-8 text-sm text-slate-500">
          Menampilkan {filteredProducts.length} dari {products.length} produk
        </div>

        {/* Modals */}
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddProduct={handleAddProduct}
        />

        <EditProductModal
          isOpen={Boolean(editingProduct)}
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdateProduct={handleUpdateProduct}
        />

        <DeleteProductModal
          isOpen={Boolean(deletingProduct)}
          product={deletingProduct}
          onClose={() => setDeletingProduct(null)}
          onConfirmDelete={handleDeleteProduct}
        />
      </div>
    </div>
  );
}

export default App;
