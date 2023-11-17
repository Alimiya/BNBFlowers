"use client"

import Link from "next/link"
import {useEffect, useState } from 'react'
import { AlertCircleIcon, LogInIcon, ShoppingCart} from "lucide-react"
import { Button } from "dias/components/ui/button"
import { MainNav } from "dias/components/main-nav"
import { ethers } from 'ethers'

declare global {
  interface Window {
    ethereum?: any
  }
}

export function SiteHeader() {
  const [walletAddress, setWalletAddress] = useState("")
  const [walletButtonClicked, setWalletButtonClicked] = useState(false);
  const [walletError, setWalletError] = useState<Error | null>(null);

  const getProvider = () => {
    return typeof window !== "undefined" && typeof window.ethereum !== "undefined"
      ? new ethers.providers.Web3Provider(window.ethereum)
      : null;
  };

  const connectWallet = async () => {
    setWalletButtonClicked(true);
    const provider = getProvider();
    if (provider) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        setWalletAddress(address);
        setWalletError(null);
        console.log("Connected wallet address:", address);
      } catch (error) {
        setWalletError(error as Error);
        console.error(error);
      }
    } else {
      console.log("User rejected");
    }
  };

  const getCurrentWalletConnected = async () => {
    const provider = getProvider()
    if (provider) {
      try {
        await window.ethereum.request({ method: "eth_accounts" });
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        if (address) {
          setWalletAddress(address);
        } else {
          console.log("Connect to MetaMask using Login Button");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    const provider = getProvider()
    if (provider) {
      window.ethereum.on("accountsChanged", async (accounts: string[]) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between space-x-4 px-6 sm:space-x-0">
        <MainNav />

        <div className="flex items-center space-x-1">
          <Link href="/cart">
            <Button size="sm" variant="ghost">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>

          {walletAddress ? (
            <Link href={`/user?userAddress=${walletAddress}`}>
              <Button size="sm" variant="ghost">
                <span>Connected: {walletAddress.substring(0, 6)}</span>
              </Button>
            </Link>
          ) : (
            <Button size="sm" variant="ghost" onClick={connectWallet}>
              <LogInIcon />
            </Button>
          )}


        </div>
      </div>
      {walletButtonClicked  && typeof window !== "undefined" && typeof window.ethereum === "undefined" &&(
      <div className="mx-auto flex h-8 max-w-6xl items-center justify-end space-x-4 px-6 sm:space-x-0 ">
          <AlertCircleIcon className="text-yellow-500" /> <span className="text-yellow-500" style={{ marginLeft: 6 }}>No crypto wallet found!</span>

        </div>
      )}

      {walletError &&(
      <div className="mx-auto flex h-8 max-w-6xl items-center justify-end space-x-4 px-6 sm:space-x-0 ">
          <AlertCircleIcon className="text-yellow-500" /> <span className="text-yellow-500" style={{ marginLeft: 6 }}>{ walletError.message}</span>

        </div>
      )}

    </header>
  )
}
