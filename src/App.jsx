import React from 'react';
import { Routes, Route } from 'react-router';
import { ProductProvider, useProducts } from './context/ProductContext';
import AppLayout from './layouts/AppLayout';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

function AppContent() {
  const { isBackendConnected } = useProducts();

  return (
    <Routes>
      <Route path="/" element={<AppLayout isBackendConnected={isBackendConnected} />}>
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  return (
    <ProductProvider>
      <AppContent />
    </ProductProvider>
  );
}

export default App;
