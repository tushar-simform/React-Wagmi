import { useState, useEffect } from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";

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
    }
  }, [isSuccess]);

  useEffect(() => {
    if (receiptError) {
      setIsError(true);
      setError(receiptError.message);
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
          onSuccess: (data) => setHash(data),
          onError: (err) => {
            setIsError(true);
            setError(err.message);
          },
        }
      );
    } catch (err: unknown) {
      setIsError(true);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
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
