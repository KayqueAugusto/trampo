import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
import LandingTail from "../components/LandingTail";
export default function HomePage() {
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, { variant: "public", surface: "light" }), _jsxs("main", { children: [_jsx(Hero, {}), _jsx(FeatureCards, {}), _jsx(LandingTail, {})] })] }));
}
