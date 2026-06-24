import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";

import StockView from "./views/StockView";
import ProductTypesView from "./views/ProductTypesView";
import StockMovementView from "./views/StockMovementView";
import MovementInView from "./views/MovementInView";
import MovementOutView from "./views/MovementOutView";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/stock" element={<StockView />} />
        <Route path="/product-types" element={<ProductTypesView />} />
        <Route path="/movements" element={<StockMovementView />} />
        <Route path="/movements/in" element={<MovementInView />} />
        <Route path="/movements/out" element={<MovementOutView />} />
      </Route>
    </Routes>
  );
}
