import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

/**
 * Wagmi configuration object that defines the blockchain networks and transport methods
 * for the application.
 *
 * @remarks
 * This configuration sets up connections to both Mainnet and Sepolia test networks
 * using HTTP transports for blockchain interactions.
 *
 * @example
 * ```typescript
 * import { config } from './config/config';
 *
 * // Use the config with wagmi hooks
 * const { data } = useAccount({ config });
 * ```
 */
export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
