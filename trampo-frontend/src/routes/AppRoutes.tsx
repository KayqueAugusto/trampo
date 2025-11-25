import { Routes, Route } from "react-router-dom";
import App from "../App";

// páginas logadas
import { AppDashboardPage } from "../pages/AppDashboardPage";
import { AppAnuncioPage } from "../pages/AppAnuncioPage";
import { AppMessagesPage } from "../pages/AppMessagesPage";
import { AppProfilePage } from "../pages/AppProfilePage";

import ProtectedRoute from "./ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>
      {/* Página pública (landing page) */}
      <Route path="/" element={<App />} />

      {/* ÁREA LOGADA */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/app/anuncio"
        element={
          <ProtectedRoute>
            <AppAnuncioPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/app/mensagens"
        element={
          <ProtectedRoute>
            <AppMessagesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/app/perfil"
        element={
          <ProtectedRoute>
            <AppProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
