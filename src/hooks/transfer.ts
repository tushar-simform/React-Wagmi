import { useState, useEffect } from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { toast } from "react-toastify";

export function useTransfer() {
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { sendTransaction, isPending } = useSendTransaction();

  const { isSuccess, error: receiptError } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsError(false);
      setError(null);
      toast.success(
        "Transaction confirmed! ETH transfer completed successfully."
      );
    }
  }, [isSuccess]);

  useEffect(() => {
    if (receiptError) {
      setIsError(true);
      setError(receiptError.message);
      toast.error("Transaction failed! Please try again.");
    }
  }, [receiptError]);

  const transfer = (to: string, amount: string) => {
    setIsError(false);
    setError(null);
    try {
      sendTransaction(
        {
          to: to as `0x${string}`,
          value: parseEther(amount),
        },
        {
          onSuccess: (data) => {
            setHash(data);
            toast.info(
              "Transaction submitted! Please wait for confirmation...",
              {
                autoClose: 8000, // Longer duration for info messages
              }
            );
          },
          onError: (err) => {
            setIsError(true);
            setError(err.message);
            toast.error("Transaction failed to submit. Please try again.");
          },
        }
      );
    } catch (err: unknown) {
      setIsError(true);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      toast.error(`Error: ${errorMessage}`);
    }
  };

  return {
    transfer,
    isLoading: isPending,
    isSuccess,
    isError,
    error,
  };
}
