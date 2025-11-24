/**
 * Transfer Component
 * Purpose: ETH transfer interface allowing users to send ETH to other addresses
 * Features:
 * - Form-based ETH transfer with recipient address and amount inputs
 * - Real-time transaction status feedback (loading, success, error states)
 * - Wallet connection requirement with fallback to connect button
 * - Input validation and user-friendly error messages
 * - Responsive design with accessible form controls
 * Usage: Accessible at "/transfer-assets" route for connected wallets
 */
import { useState } from "react";
import { useTransfer } from "../hooks/transfer";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Transfer = () => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const { transfer, isLoading, isSuccess, isError, error } = useTransfer();
  const { isConnected } = useAccount();

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-12">
      <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
        Transfer ETH
      </h2>
      <form
        className="flex flex-col gap-6"
        onSubmit={async (e) => {
          e.preventDefault();
          transfer(to, amount);
        }}
      >
        <label className="font-medium text-gray-700">
          Receiver Address
          <input
            type="text"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm text-sm md:text-base px-4 py-3 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 font-mono"
            placeholder="0x..."
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            size={42}
            autoComplete="off"
          />
        </label>
        <label className="font-medium text-gray-700">
          Amount (ETH)
          <input
            type="number"
            min="0"
            step="any"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 px-4 py-3"
            placeholder="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        {isConnected ? (
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300 shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? "Transferring..." : "Transfer"}
          </button>
        ) : (
          <div className="mt-4 flex justify-center">
            <ConnectButton />
          </div>
        )}
        {isSuccess && (
          <div className="text-green-600 font-medium mt-2 text-center">
            Transfer successful!
          </div>
        )}
        {isError && (
          <div className="text-red-600 font-medium mt-2 text-center">
            {error || "Transfer failed."}
          </div>
        )}
      </form>
    </div>
  );
};

export default Transfer;
