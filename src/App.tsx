import { BrowserRouter, useRoutes } from "react-router-dom";
import "./App.css";
import { routes } from "./config/route";
function AppContent() {
  const element = useRoutes(routes);
  return <div className="bg-gray-100 min-h-screen">{element}</div>;
}
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
