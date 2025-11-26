/**
 * Transfer Component
 * Purpose: ETH transfer interface allowing users to send ETH to other addresses
 * Features:
 * - Form-based ETH transfer with recipient address and amount inputs
 * - Real-time transaction status feedback with loading spinner
 * - Toast notifications for transaction submission and confirmation status
 * - Wallet connection requirement with fallback to connect button
 * - Input validation and user-friendly error messages
 * - Responsive design with accessible form controls and smooth animations
 * Usage: Accessible at "/transfer-assets" route for connected wallets
 */
import { useState, useEffect } from "react";
import { useTransfer } from "../hooks/transfer";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Transfer = () => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const { transfer, isLoading, isSuccess } = useTransfer();
  const { isConnected } = useAccount();

  // Reset form fields when transaction is confirmed
  useEffect(() => {
    if (isSuccess) {
      setTo("");
      setAmount("");
    }
  }, [isSuccess]);

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
            className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:hover:scale-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Processing Transaction...</span>
              </div>
            ) : (
              "Transfer ETH"
            )}
          </button>
        ) : (
          <div className="mt-4 flex justify-center">
            <ConnectButton />
          </div>
        )}
      </form>
    </div>
  );
};

export default Transfer;
