import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ProductDetailPage } from './pages/ProductDetailPage.tsx'
import { CategoryPage } from './pages/CategoryPage.tsx'
import { CheckoutPage } from './pages/CheckoutPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/"></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
