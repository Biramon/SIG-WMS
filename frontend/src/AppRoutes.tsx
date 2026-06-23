import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";

import StockView from "./views/StockView";
import ProductTypesView from "./views/ProductTypesView";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/estoque" element={<StockView />} />
        <Route path="/product-types" element={<ProductTypesView />} />
      </Route>
    </Routes>
  );
}
