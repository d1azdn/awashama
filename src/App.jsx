import { useState } from 'react'

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Community from './pages/community.jsx'
import Article from './pages/article.jsx'
import ArticleInfo from './pages/articleInfo.jsx'
import Layout from './pages/layout.jsx'
import ShopLayout from './pages/ShopLayout.jsx'
import Shop from './pages/shop.jsx';
import Product from './pages/product.jsx';
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Cart from './pages/cart.jsx';
import AdminLayout from './pages/adminLayout.jsx';
import DashboardProduct from './pages/admin/dashboardProduct.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="artikel" element={<Article />} />
          <Route path="artikel/:id" element={<ArticleInfo />} />
          <Route path="tentang" element={<About />} />
        </Route>

        <Route path="/toko" element={<ShopLayout />}>
          <Route index element={<Shop />} />
        </Route>

        <Route path="/keranjang" element={<ShopLayout />}>
          <Route index element={<Cart />} />
        </Route>

        <Route path="/produk/:id" element={<ShopLayout />}>
          <Route index element={<Product />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<AdminLayout />}>
          <Route path="produk" element={<DashboardProduct />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
