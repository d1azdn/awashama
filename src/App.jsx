import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Community from './pages/community.jsx'
import Article from './pages/article.jsx'
import Layout from './pages/layout.jsx'
import ShopLayout from './pages/ShopLayout.jsx'
import Shop from './pages/shop.jsx';
import Product from './pages/product.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="komunitas" element={<Community />} />
          <Route path="artikel" element={<Article />} />
        </Route>

        <Route path="/toko" element={<ShopLayout />}>
          <Route index element={<Shop />} />
        </Route>

        <Route path="/produk" element={<ShopLayout />}>
          <Route index element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
