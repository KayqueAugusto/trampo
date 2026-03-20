import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AppRoutes } from "./routes/AppRoutes";
createRoot(document.getElementById("root")).render(_jsx(StrictMode, { children: _jsx(BrowserRouter, { children: _jsx(AppRoutes, {}) }) }));
