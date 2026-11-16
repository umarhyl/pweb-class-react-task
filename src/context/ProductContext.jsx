import React, { createContext, useContext, useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { initialProducts } from '../data/initialProducts';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [displayMode, setDisplayModeState] = useState(() => {
    return localStorage.getItem('pweb_display_mode') || 'grid';
  });

  const setDisplayMode = (mode) => {
    setDisplayModeState(mode);
    localStorage.setItem('pweb_display_mode', mode);
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data, isBackend } = await productService.getAll();
      setProducts(data);
      setIsBackendConnected(isBackend);
      localStorage.setItem('pweb_products', JSON.stringify(data));
    } catch {
      setIsBackendConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async (productData) => {
    const created = await productService.create(productData);
    await loadProducts();
    return created;
  };

  const updateProduct = async (id, productData) => {
    const updated = await productService.update(id, productData);
    await loadProducts();
    return updated;
  };

  const deleteProduct = async (id) => {
    await productService.delete(id);
    await loadProducts();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        isBackendConnected,
        displayMode,
        setDisplayMode,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts: loadProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
