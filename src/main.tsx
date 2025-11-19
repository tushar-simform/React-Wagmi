/**
 * Main entry point for the React-Wagmi Web3 application
 * Sets up the necessary providers for Web3 functionality:
 * - WagmiProvider: Core Web3 React hooks and utilities
 * - QueryClientProvider: React Query for data fetching and caching
 * - RainbowKitProvider: Wallet connection UI and management
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "./config/config.ts";

// Initialize React Query client for caching and data synchronization
/**
 * Creates a new QueryClient instance for managing server state and caching.
 * This client handles query caching, background updates, and synchronization
 * across components in the React application.
 */
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
