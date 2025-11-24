import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

/**
 * Root layout component that provides the main structure for the application.
 *
 * This component serves as the top-level layout wrapper that includes:
 * - A full-screen container with gradient background styling
 * - Navigation bar component
 * - Outlet for rendering nested route components
 *
 * The layout uses a flexbox column structure with a minimum height of 100vh
 * and applies a blue-to-purple gradient background.
 *
 * @returns The root layout JSX element containing navbar and route outlet
 */
const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-purple-200">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
