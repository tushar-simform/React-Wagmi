/**
 * Dashboard Component
 * Purpose: Main landing page displaying Web3 wallet information and voting statistics
 * Features:
 * - Shows wallet connection status and account details
 * - Displays ETH balance, current block number, and network information
 * - Presents voting contract statistics and participation status
 * - Provides navigation to Transfer and Voting features
 * - Responsive design with gradient background and card layouts
 * Usage: Accessible at the root route ("/") when wallet is connected
 */
import { useAccount, useBalance, useBlockNumber } from "wagmi";
import { useVotingContract } from "../hooks/useVotingContract";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: blockNumber } = useBlockNumber();
  const { votes, loadingOptions, hasVoted } = useVotingContract();

  // Calculate total votes
  const totalVotes = votes?.reduce((sum, vote) => sum + vote.votes, 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4 drop-shadow-lg">
            🚀 Web3 Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Welcome to your comprehensive Web3 dashboard showcasing{" "}
            <span className="font-semibold text-purple-600">Wagmi</span>,{" "}
            <span className="font-semibold text-blue-600">RainbowKit</span>, and{" "}
            <span className="font-semibold text-green-600">Smart Contract</span>{" "}
            integration
          </p>
        </div>

        {!isConnected ? (
          // Not Connected State
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-12 text-center">
            <div className="text-6xl mb-6">🔗</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Connect your wallet to access all Web3 features including ETH
              transfers and decentralized voting
            </p>
            <ConnectButton />
          </div>
        ) : (
          // Connected State
          <div className="space-y-8">
            {/* Wallet Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Wallet Address Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">
                      Wallet Address
                    </h3>
                    <p
                      className="text-lg font-mono text-gray-900 cursor-pointer hover:text-purple-600 transition-colors duration-200"
                      title={address}
                    >
                      {address
                        ? `${address.slice(0, 6)}...${address.slice(-4)}`
                        : ""}
                    </p>
                  </div>
                  <div className="text-3xl">👛</div>
                </div>
              </div>

              {/* Balance Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">
                      ETH Balance
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {balance
                        ? `${parseFloat(balance.formatted).toFixed(4)} ETH`
                        : "Loading..."}
                    </p>
                  </div>
                  <div className="text-3xl">💰</div>
                </div>
              </div>

              {/* Network Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">
                      Network
                    </h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {chain?.name || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Block: {blockNumber?.toString() || "..."}
                    </p>
                  </div>
                  <div className="text-3xl">🌐</div>
                </div>
              </div>
            </div>

            {/* Main Features Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Transfer ETH Feature */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">💸</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Transfer ETH
                    </h2>
                    <p className="text-gray-600">
                      Send Ethereum to any wallet address
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Features:
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✅ Real-time balance validation</li>
                      <li>✅ Transaction confirmation</li>
                      <li>✅ Gas fee estimation</li>
                      <li>✅ Transaction status tracking</li>
                    </ul>
                  </div>
                  <Link
                    to="/transfer-assets"
                    className="block w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg text-center"
                  >
                    Start Transfer →
                  </Link>
                </div>
              </div>

              {/* Voting Feature */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">🗳️</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Decentralized Voting
                    </h2>
                    <p className="text-gray-600">
                      Participate in blockchain-based voting
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {!loadingOptions && votes && (
                    <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Voting Stats:
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Total Votes:</span>
                          <div className="font-bold text-lg">{totalVotes}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Your Status:</span>
                          <div
                            className={`font-bold text-lg ${
                              hasVoted ? "text-green-600" : "text-orange-600"
                            }`}
                          >
                            {hasVoted ? "Voted ✅" : "Not Voted ⏳"}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Features:
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✅ Immutable vote recording</li>
                      <li>✅ Real-time vote counting</li>
                      <li>✅ One vote per wallet</li>
                      <li>✅ Transparent results</li>
                    </ul>
                  </div>
                  <Link
                    to="/voting"
                    className="block w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg text-center"
                  >
                    Vote Now →
                  </Link>
                </div>
              </div>
            </div>

            {/* Technology Stack Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                🛠️ Technology Stack
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Wagmi Card */}
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-purple-800 mb-2">
                    Wagmi
                  </h3>
                  <p className="text-purple-700 text-sm">
                    React hooks for Ethereum interactions, providing type-safe
                    contract calls and wallet management
                  </p>
                </div>

                {/* RainbowKit Card */}
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-4">🌈</div>
                  <h3 className="text-xl font-bold text-blue-800 mb-2">
                    RainbowKit
                  </h3>
                  <p className="text-blue-700 text-sm">
                    Beautiful wallet connection UI with support for multiple
                    wallets and smooth user experience
                  </p>
                </div>

                {/* Smart Contracts Card */}
                <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-4">📄</div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    Smart Contracts
                  </h3>
                  <p className="text-green-700 text-sm">
                    Deployed voting contract on Ethereum, enabling decentralized
                    and transparent voting mechanisms
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            {!loadingOptions && votes && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  📊 Live Voting Results
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {votes.map(({ option, votes }) => (
                    <div
                      key={option}
                      className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-4 border-l-4 border-indigo-500"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-800">
                          {option}
                        </span>
                        <span className="text-xl font-bold text-indigo-600">
                          {votes}
                        </span>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${
                              totalVotes > 0 ? (votes / totalVotes) * 100 : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {totalVotes > 0
                          ? `${((votes / totalVotes) * 100).toFixed(1)}%`
                          : "0%"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Info */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4 text-center">
                🎯 Project Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-300">
                    What This Demonstrates:
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Wallet connection and authentication</li>
                    <li>• Smart contract interaction</li>
                    <li>• ETH transfers and gas handling</li>
                    <li>• Decentralized voting system</li>
                    <li>• Real-time blockchain data</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-300">
                    Technical Features:
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• TypeScript for type safety</li>
                    <li>• React hooks for state management</li>
                    <li>• Responsive Tailwind CSS design</li>
                    <li>• Transaction status handling</li>
                    <li>• Error handling and validation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
