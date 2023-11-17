"use client"

import Link from "next/link";
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ethers } from 'ethers';

import flowerContractABI from '../../app/contracts/FlowerContractABI';
import { CheckCircle2Icon } from "lucide-react";

interface TransactionData {
  result: {
    hash: string;
    blockHash: string;
    blockNumber: string;
    from: string;
    to: string;
    value: string;
    gas: string;
    gasPrice: string;
  };
}

export default function Page() {
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
  
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error("CONTRACT_ADDRESS environment variable is not defined");
  }

  const etherScanApiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  if (!etherScanApiKey) {
    throw new Error("NEXT_PUBLIC_ETHERSCAN_API_KEY environment variable is not defined");
  }

  function hexToDecimal(hex: string) {
    const hexWithoutPrefix = hex.startsWith('0x') ? hex.slice(2) : hex;

    const decimal = parseInt(hexWithoutPrefix, 16);
    return decimal;
  }

  function convertWeiToEth(wei: ethers.BigNumberish) {
    const ethValue = ethers.utils.formatUnits(wei, 'ether');
    return ethValue;
  }

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const transactionHash = params.get('transactionHash');
    setTransactionHash(transactionHash)
  }, [pathname, searchParams]);

  console.log(transactionHash)

  const transactionHandler = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const flowerContract = new ethers.Contract(contractAddress, flowerContractABI, signer);

    const apiUrl = `https://api-sepolia.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${transactionHash}&apikey=${etherScanApiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    setTransactionData(data)
    console.log(data);
  } catch (error) {
    console.error('Error retrieving transaction:', error);
  }
};


  useEffect(() => {
  if (transactionHash) {
    transactionHandler();
  }
}, [transactionHash]);

  return (
    
    <div className="container mx-auto" style={{maxWidth: '1200px'}}>
      <main className="grid min-h-full place-items-center px-6 py-12 sm:py-10 lg:px-8">
        <h1 className="text-3xl font-extrabold mb-8">Transaction Details</h1>
        {transactionData && (
        <div className="border border-white-500 rounded p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="font-semibold">Transaction Hash:</div>
            <div>{transactionData.result.hash }</div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="font-semibold">Status:</div>
              <div className="flex items-center text-green-500" >
                <CheckCircle2Icon className="mr-2" />
                <span className="">Success!</span>
              </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="font-semibold">Block Hash:</div>
            <div>{transactionData.result.blockHash }</div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="font-semibold">Block Number:</div>
            <div>{hexToDecimal(transactionData.result.blockNumber) }</div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="font-semibold">From:</div>
            <div>{transactionData.result.from }</div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="font-semibold">To:</div>
            <div>{contractAddress }</div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="font-semibold">Value:</div>
              <div>
                {convertWeiToEth(transactionData.result.value)} <span className="text-blue-400 ml-2 font-bold">ETH</span></div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="font-semibold">Gas:</div>
            <div>{hexToDecimal(transactionData.result.gas)}</div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="font-semibold">Gas Price:</div>
            <div>{convertWeiToEth(transactionData.result.gasPrice)} <span className="text-blue-400 ml-2 font-bold">ETH</span></div>
          </div>
          </div>
           )}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
          
        </div>
      </main>
    </div>
  );
}
