import { http, createConfig } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, base],
  multiInjectedProviderDiscovery: true,
  ssr: true,
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})
