import React, { memo, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';

// Páginas públicas (carregamento imediato)
import Landing from '../pages/Landing';
import Login from '../modules/auth/Login';
import NotFound from '../modules/errors/NotFound';

// Lazy loading para páginas menos críticas
const Testimonials = React.lazy(() => import('../pages/Testimonials'));
const Pricing = React.lazy(() => import('../pages/Pricing'));
const Contact = React.lazy(() => import('../pages/Contact'));
const Integrations = React.lazy(() => import('../pages/Integrations'));
const Features = React.lazy(() => import('../pages/Features'));

// Layout e componentes internos (lazy loading)
const MainLayout = React.lazy(() => import('../layouts/MainLayout'));
const Dashboard = React.lazy(() => import('../modules/dashboard/Dashboard'));
const Vendas = React.lazy(() => import('../modules/vendas/Vendas'));
const Clientes = React.lazy(() => import('../modules/crm/Clientes'));
const Financeiro = React.lazy(() => import('../modules/financeiro/Financeiro'));
const Configuracoes = React.lazy(() => import('../modules/configuracoes/Configuracoes'));
const ProtectedRoute = React.lazy(() => import('../components/ProtectedRoute'));

function AppRoutes() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner message="Carregando página..." />}>
          <Routes>
        {/* Páginas públicas (sem layout) */}
        <Route path="/" element={<Landing />} />
        <Route path="/integracoes" element={<Integrations />} />
        <Route path="/funcionalidades" element={<Features />} />
        <Route path="/depoimentos" element={<Testimonials />} />
        <Route path="/planos" element={<Pricing />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        
        {/* Páginas internas (com MainLayout e proteção) */}
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
        </Route>
        
        <Route path="/vendas/*" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="*" element={<Vendas />} />
        </Route>
        
        <Route path="/crm" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<Clientes />} />
        </Route>
        
        <Route path="/financeiro" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<Financeiro />} />
        </Route>
        
        <Route path="/configuracoes" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<Configuracoes />} />
        </Route>
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default memo(AppRoutes);