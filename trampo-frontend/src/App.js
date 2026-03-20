import { jsx as _jsx } from "react/jsx-runtime";
import HomePage from "./pages/HomePage";
function App() {
    // App agora é só a página pública inicial.
    // Quem cuida de rotas é o AppRoutes.tsx + main.tsx
    return _jsx(HomePage, {});
}
export default App;
