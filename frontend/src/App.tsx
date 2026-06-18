// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";
import ProductTypes from "./pages/ProductTypes";

import { ProductsProvider } from "./context/ProductContext";
import { ProductTypesProvider } from "./context/ProductTypesContext";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota principal usando o Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/estoque"
            element={
              <ProductTypesProvider>
                <ProductsProvider>
                  <Stock />
                </ProductsProvider>
              </ProductTypesProvider>
            }
          />
          <Route
            path="/product-types"
            element={
              <ProductTypesProvider>
                <ProductTypes />
              </ProductTypesProvider>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
