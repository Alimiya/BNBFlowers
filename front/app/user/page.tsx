"use client"

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useRouter, useSearchParams } from 'next/navigation';
import flowerContractABI from '../../app/contracts/FlowerContractABI';

export default function Page() {
  const [transactions, setTransactions] = useState([]);
  const [rows, setRows] = useState([]);
  const [userBalance, setUserBalance] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const userAddressInQuery = params.get('userAddress');

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error("CONTRACT_ADDRESS environment variable is not defined");
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const flowerContract = new ethers.Contract(contractAddress, flowerContractABI, signer);
  const userBalanceInPromise = signer.getBalance()

  userBalanceInPromise.then((result) => {
    setUserBalance(result._hex)
  });

  useEffect(() => { 
      const handleAccountsChanged = async (accounts: string | any[]) => {
      
    if (accounts.length === 0) {
        router.replace(`/notFound?errorType=${'authorizationFailed'}`);
      } else {
        const userAddressCurrent = await signer.getAddress();
      console.log(userAddressCurrent)
      console.log(userAddressInQuery)
        if (userAddressInQuery?.toLowerCase() !== userAddressCurrent.toLowerCase()) {
          router.replace(`/notFound?errorType=${'authorizationFailed'}`);
        }
      }
    };
    handleAccountsChanged(window.ethereum.selectedAddress || []);
    
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('disconnect', handleAccountsChanged);
    return () => {
      window.ethereum.off('accountsChanged', handleAccountsChanged);
      window.ethereum.off('disconnect', handleAccountsChanged)
    };
  })

  useEffect(() => {
    const getTransactionsByCaller = async () => {
      try {
        const rawTransactions = await flowerContract.getTransactionsByCaller(await signer.getAddress());
        setTransactions(rawTransactions);

        const rows = rawTransactions.map(async (transaction: {
          map(arg0: (flowerSlug: any) => Promise<{ flowerName: any; flowerCost: any; }>): any; _hex: string; 
            }[], index: React.Key | null | undefined) => {
          const flowerDetails = await Promise.all(
            transaction[4].map(async (flowerSlug) => {
              const flowerName = await flowerContract.getFlowerName(flowerSlug);
              const flowerCost = await flowerContract.getFlowerCost(flowerSlug);
              return { flowerName, flowerCost };
            })
          );

          return (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {hexToDecimal(transaction[0]._hex)}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {convertWeiToEth(transaction[2]._hex)}{' '}
                <span style={{ color: 'rgb(47, 105, 203)', fontWeight: 'bold' }}>ETH</span>
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {hexToDecimal(transaction[3]._hex) * 0.01}{' '}
                <span style={{ fontWeight: 'bold', color: 'green' }}>$</span>
              </td>
              <td style={{ border: '1px solid black', padding: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px'}}>
                {flowerDetails.map((flower, flowerIndex) => (
                  <div key={flowerIndex} style={{}}>
                    <p style={{ margin: 0 }}>
                      <span>{flower.flowerName}: {' '}</span>
                      <span>{hexToDecimal(flower.flowerCost._hex) * 0.01}{' '}</span>
                      <span style={{ fontWeight: 'bold', color: 'green' }}>$</span>
                    </p>
                  </div>
                ))}
              </td>
            </tr>
          );
        });

        setRows(rows);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    getTransactionsByCaller();
  });

  function hexToDecimal(hex: string) {
    const hexWithoutPrefix = hex.startsWith('0x') ? hex.slice(2) : hex;
    const decimal = parseInt(hexWithoutPrefix, 16);
    return decimal;
  }

  function convertWeiToEth(wei: ethers.BigNumberish) {
    const ethValue = ethers.utils.formatUnits(wei, 'ether');
    return ethValue;
  }  

  return (
    <div>
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h4 className="font-bold tracking-tight sm:text-3xl mb-10">
          User Info
        </h4>
        <div className='my-5'>
          <p className='mb-5'><span className='mr-20 font-bold'>Wallet Address:</span> {userAddressInQuery}</p>
          <p><span className='mr-20 font-bold'>Wallet Balance:</span> {hexToDecimal(userBalance) * 0.000000000000000001} <span className='text-blue-500 font-bold ml-2'>ETH</span></p>
        </div>

        <div className='mt-12'>
          <h1 className="text-3xl font-extrabold mb-8">Transactions</h1>
           {transactions.length > 0 ? (
            <div className='border border-white-500 rounded p-6'>
              <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center' }}>
                <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Transaction ID</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Transaction Value</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Transaction Cost</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Transaction Products</th>
                </tr>
              </thead>
                <tbody>
                  {rows}
                </tbody>
                </table>

              </div>
            ) : (
              <p className='border border-white-500 rounded p-6 text-yellow-500'>No transactions found.</p>
            )}
          
        </div>
        
      </main>
      </div>
  ); 
}

