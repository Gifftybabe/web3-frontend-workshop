"use client"

import Image from "next/image";
import { ConnectBtn } from "../../components/ConnectBtn";
import { useAccount, useDisconnect } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();  // Fixed: Added parentheses to call the hook

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>UX-Heaven</h1>
      <ConnectBtn />

      {isConnected ? (
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <p>Connected Address: {address}</p>
          <button className="border p-2 rounded" onClick={() => disconnect()}>Disconnect</button>
        </main>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  );
}