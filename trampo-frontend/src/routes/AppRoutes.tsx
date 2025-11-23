import { Routes, Route } from "react-router-dom";
import App from "../App";
import { AppDashboardPage } from "../pages/AppDashboardPage";
import ProtectedRoute from "./ProtectedRoute"; // ⬅️ ajustado aqui

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppDashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
