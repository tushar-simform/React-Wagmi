import { useVotingContract } from "../hooks/useVotingContract";
import { useAccount } from "wagmi";

const Voting = () => {
  const {
    loadingOptions,
    votes,
    hasVoted,
    vote,
    isPending,
    isSuccess,
    isError,
    error,
  } = useVotingContract();
  const { isConnected } = useAccount();

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl shadow-2xl p-10 animate-fade-in">
      <h2 className="text-4xl font-extrabold text-purple-700 mb-8 text-center drop-shadow-lg animate-fade-in-down">
        🗳️ Voting DApp
      </h2>
      {loadingOptions ? (
        <div className="text-center text-gray-500 animate-pulse">
          Loading options...
        </div>
      ) : (
        <form
          className="flex flex-col gap-8"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-6">
            {votes?.map(({ option, votes }) => (
              <button
                key={option}
                type="button"
                className={`w-full flex justify-between items-center px-8 py-6 rounded-xl border-2 shadow-lg transition-all duration-300 hover:scale-105 hover:border-purple-400 hover:bg-purple-50 bg-white/80 backdrop-blur-sm ${
                  hasVoted
                    ? "bg-gray-100 cursor-not-allowed opacity-70"
                    : "bg-white"
                } animate-fade-in-up`}
                disabled={!!hasVoted || !!isPending || !isConnected}
                onClick={() => vote(option)}
              >
                <span className="font-semibold text-gray-800 text-lg">
                  {option}
                </span>
                <span className="text-purple-600 font-bold text-xl bg-purple-100 px-4 py-2 rounded-lg shadow">
                  {votes ?? 0} votes
                </span>
              </button>
            ))}
          </div>
          {!isConnected && (
            <div className="text-center text-red-500 font-medium mt-4 animate-fade-in">
              Please connect your wallet to vote.
            </div>
          )}
          {!!hasVoted && (
            <div className="text-center text-blue-600 font-medium mt-4 animate-fade-in">
              You have already voted.
            </div>
          )}
          {isPending && (
            <div className="text-center text-purple-500 font-medium mt-4 animate-pulse">
              Voting in progress...
            </div>
          )}
          {isSuccess && (
            <div className="text-center text-green-600 font-medium mt-4 animate-fade-in">
              Vote successful!
            </div>
          )}
          {isError && (
            <div className="text-center text-red-600 font-medium mt-4 animate-fade-in">
              {error?.message || "Vote failed."}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default Voting;

// Add these to your tailwind.config.js for custom animations if not present:
/*
theme: {
  extend: {
    animation: {
      'fade-in': 'fadeIn 0.8s ease-out',
      'fade-in-down': 'fadeInDown 0.8s ease-out',
      'fade-in-up': 'fadeInUp 0.8s ease-out',
    },
    keyframes: {
      fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
      fadeInDown: { '0%': { opacity: 0, transform: 'translateY(-20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      fadeInUp: { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
    },
  },
}
*/
