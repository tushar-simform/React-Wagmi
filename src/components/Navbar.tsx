/**
 * Navbar Component
 * Purpose: Top navigation bar providing app branding, menu navigation, and wallet connection
 * Features:
 * - App logo/branding on the left side
 * - Central navigation menu with active route highlighting
 * - Wallet connect button on the right side
 * - Responsive design with hamburger menu for mobile devices
 * - Hover effects and smooth transitions
 * - Uses React Router for navigation between pages
 * Usage: Rendered globally in RootLayout for all pages
 */
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

// Navigation menu configuration
const menu = [
  { name: "Dashboard", path: "/" },
  { name: "Transfer Assets", path: "/transfer-assets" },
  { name: "Voting", path: "/voting" },
];
export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white/80 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-8 py-4">
        {/* App Logo on the left */}
        <div className="flex items-center">
          <span className="text-xl font-bold text-purple-700 tracking-wide">
            REACT-WEB3
          </span>
        </div>

        {/* Desktop menu - hidden on mobile */}
        <ul className="hidden md:flex gap-8 justify-center">
          {menu.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? "text-purple-600"
                    : "text-gray-700"
                } hover:text-purple-600 transition-colors font-medium`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Connect Wallet button - hidden on mobile */}
        <div className="hidden md:flex">
          <ConnectButton />
        </div>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile menu - shown when hamburger is clicked */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 bg-white/95 backdrop-blur-sm border-t border-gray-200">
          <ul className="flex flex-col space-y-4">
            {menu.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`block py-2 px-4 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "text-purple-600 bg-purple-50"
                      : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  } font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Connect Wallet button */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
