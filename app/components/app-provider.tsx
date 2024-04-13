'use client'
import { WagmiProvider, useAccount } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/config'
import WalletOptions from '@/components/wallet-options'
import MyAccount from '@/components/my-account'
import Profile from '@/components/profile'

const queryClient = new QueryClient()

function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div style={{ padding: 10 }}>{children}</div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default AppProvider
