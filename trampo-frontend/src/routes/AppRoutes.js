import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import App from "../App";
// páginas logadas
import { AppDashboardPage } from "../pages/AppDashboardPage";
import { AppAnuncioPage } from "../pages/AppAnuncioPage";
import { AppMessagesPage } from "../pages/AppMessagesPage";
import { AppProfilePage } from "../pages/AppProfilePage";
import ProtectedRoute from "./ProtectedRoute";
export function AppRoutes() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/app", element: _jsx(ProtectedRoute, { children: _jsx(AppDashboardPage, {}) }) }), _jsx(Route, { path: "/app/anuncio", element: _jsx(ProtectedRoute, { children: _jsx(AppAnuncioPage, {}) }) }), _jsx(Route, { path: "/app/mensagens", element: _jsx(ProtectedRoute, { children: _jsx(AppMessagesPage, {}) }) }), _jsx(Route, { path: "/app/perfil", element: _jsx(ProtectedRoute, { children: _jsx(AppProfilePage, {}) }) })] }));
}
