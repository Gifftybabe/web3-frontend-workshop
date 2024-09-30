import React, { useState } from 'react';
import Web3Modal from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      const providerOptions = {
        coinbaseWallet: {
          package: CoinbaseWalletSDK,
          options: {
            appName: "Web3Modal Demo",
            infuraId: "ddc544836ea247b98ba7fecf7f1c3470", // Your Infura ID
            chainId: 11155111, // Sepolia chain ID
            darkMode: false
          }
        },
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "ddc544836ea247b98ba7fecf7f1c3470" // Your Infura ID
          }
        }
      };
      console.log("Coinbase Wallet package:", CoinbaseWalletSDK);
      console.log("Provider Options:", providerOptions);
      
      const web3Modal = new Web3Modal({
        network: "sepolia",
        cacheProvider: false,
        providerOptions,
        theme: "dark"
      });
      
      console.log("Web3Modal Providers:", web3Modal.providerController.providers);

      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      
      setAccount(address);
      
      console.log("Connected provider:", provider);
      console.log("Connected address:", address);

      // Listen for account changes
      instance.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });

    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  return (
    <div className='App'>
      <header className="App-header">
        <h1>Web3Modal Connection!</h1>
        {
          !account ? (
            <button onClick={connectWallet}>
              Connect Wallet
            </button>
          ) : (
            <div>
              <p>Connected!</p>
              <p>Address: {account}</p>
            </div>
          )
        }
      </header>
    </div>
  );
}

export default App;