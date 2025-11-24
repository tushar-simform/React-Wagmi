/**
 * Main App Component
 * Purpose: Root component that sets up React Router and provides the main application structure
 * Features:
 * - Configures React Router with BrowserRouter for client-side routing
 * - Renders routes defined in the route configuration
 * - Applies global styling with Tailwind CSS classes
 */
import { BrowserRouter, useRoutes } from "react-router-dom";
import "./App.css";
import { routes } from "./config/route";

/**
 * AppContent Component
 * Purpose: Renders the configured routes and applies global layout styles
 * Usage: Internal component used within the BrowserRouter context
 */
function AppContent() {
  const appRoutes = useRoutes(routes);
  return <div className="bg-gray-100 min-h-screen">{appRoutes}</div>;
}

/**
 * App Component
 * Purpose: Main application wrapper that provides routing context
 * Usage: Root component rendered in main.tsx within the Web3 providers
 */
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
