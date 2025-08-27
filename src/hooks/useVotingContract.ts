import { useAccount, useConfig } from "wagmi";
import { useReadContract, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import votingAbi from "../contracts/voting.json";
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`;

export function useVotingContract() {
  const { address } = useAccount();
  const config = useConfig();

  // Fetch options
  const { data: options, isLoading: loadingOptions } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "getOptions",
  });

  // Check if user has voted
  const { data: hasVoted } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "hasVoted",
    args: [address!],
    query: {
      enabled: !!address,
    },
  });

  const { data: allVotes, refetch: refetchAllVotes } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "getAllVotes",
  });

  const votes = (options as string[])?.map((option, i) => ({
    option,
    votes: Number((allVotes as bigint[])?.[i] ?? 0),
  }));

  const { writeContractAsync, isPending, isSuccess, isError, error } =
    useWriteContract();

  async function vote(option: string) {
    const tx = await writeContractAsync({
      address: contractAddress,
      abi: votingAbi,
      functionName: "vote",
      args: [option],
    });
    if (tx) {
      // Wait for transaction to be mined
      await waitForTransactionReceipt(config, {
        hash: tx,
      });
      // Refetch votes after confirmation
      refetchAllVotes();
    }
  }

  return {
    options,
    loadingOptions,
    votes,
    hasVoted,
    vote,
    isPending,
    isSuccess,
    isError,
    error,
  };
}
