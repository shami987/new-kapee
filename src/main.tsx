import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import { ProductDetailPage } from './pages/ProductDetailPage.tsx'
import { CategoryPage } from './pages/CategoryPage.tsx'
import { CheckoutPage } from './pages/CheckoutPage.tsx'
import { OrderCompletePage } from './pages/OrderCompletePage.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { AdminDashboard, OrdersPage, ProductsPage, CustomersPage } from './admin'
import { AdminAddProduct } from './pages/admin/AdminAddProduct.tsx'


// Create React Query client
// This manages all server state and caching
const queryClient = new QueryClient()

// Create root element and render app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* QueryClientProvider: Provides React Query functionality to all child components */}
    <QueryClientProvider client={queryClient}>
      {/* AuthProvider: Provides global authentication state to all child components */}
      <AuthProvider>
        {/* BrowserRouter: Enables client-side routing */}
        <BrowserRouter>
          {/* Routes: Define all the pages/routes in the application */}
          <Routes>
            {/* Home page */}
            <Route path="/" element={<App />} />
            
            {/* Product detail page - parameter :id comes from URL */}
            <Route path="/product/:id" element={<ProductDetailPage />} />
            
            {/* Category page - parameter :categoryName comes from URL */}
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            
            {/* Checkout page */}
            <Route path="/checkout" element={<CheckoutPage />} />
            
            {/* Order completion page */}
            <Route path="/order-complete" element={<OrderCompletePage />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<OrdersPage />} />
            <Route path="/admin/products" element={<ProductsPage />} />
            <Route path="/admin/products/add" element={<AdminAddProduct />} />
            <Route path="/admin/customers" element={<CustomersPage />} />
            
            {/* Fallback empty route */}
            <Route path="/"></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
