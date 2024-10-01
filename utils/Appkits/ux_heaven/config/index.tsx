
// config/index.tsx

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { base, baseSepolia, mainnet, sepolia } from 'wagmi/chains'

// Your Reown Cloud project ID
export const projectId = process.env.NEXT_PUBLIC_PRODUCT_ID;

// Create a metadata object
const metadata = {
  name: 'UX-Heaven',
  description: 'Getting to learn AppKit',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// Create wagmiConfig
const chains = [base, baseSepolia, mainnet, sepolia] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  ...wagmiOptions // Optional - Override createConfig parameters
})