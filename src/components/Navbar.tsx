import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link, useLocation } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/" },
  { name: "Transfer Assets", path: "/transfer-assets" },
  { name: "Voting", path: "/voting" },
];
export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white/80 shadow-md">
      {/* App Logo on the left */}
      <div className="flex-1 flex items-center">
        <span className="text-xl font-bold text-purple-700 tracking-wide">
          REACT-WEB3
        </span>
      </div>

      {/* Center menu can go here if needed */}
      <ul className="flex gap-8 justify-center flex-1">
        {menu.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`${
                location.pathname === item.path
                  ? "text-purple-600"
                  : "text-gray-700"
              } hover:text-purple-600 transition-colors`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Connect Wallet button on the right */}
      <div className="flex-1 flex justify-end">
        <ConnectButton />
      </div>
    </nav>
  );
}
