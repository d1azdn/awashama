import { useState } from 'react'

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Community from './pages/community.jsx'
import Article from './pages/article.jsx'
import Layout from './pages/layout.jsx'
import ShopLayout from './pages/ShopLayout.jsx'
import Shop from './pages/shop.jsx';
import Product from './pages/product.jsx';
import Home from './pages/home.jsx';
import About from './pages/about.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="artikel" element={<Article />} />
          <Route path="tentang" element={<About />} />
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
