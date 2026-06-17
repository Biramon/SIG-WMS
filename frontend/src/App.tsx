import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";
//import { useState } from "react";
import ProductTypes from "./pages/ProductTypes";

import { ProdutosProvider } from "./api/ProductContext";
import { ProductTypesProvider } from "./api/ProductTypesContext";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
        <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
          <div className="p-6 text-2xl font-bold border-b border-slate-800 tracking-wider">
            📦 SIG-WMS
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/estoque"
              className={({ isActive }) =>
                `block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              Gerenciar Estoque
            </NavLink>
            <NavLink
              to="/product-types"
              className={({ isActive }) =>
                `block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              Tipos de Produto
            </NavLink>
          </nav>
        </aside>

        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/estoque"
              element={
                <ProdutosProvider>
                  <ProductTypesProvider>
                    <Stock />
                  </ProductTypesProvider>
                </ProdutosProvider>
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
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
