"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { AlertCircleIcon, Loader2 } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"
import { ethers } from 'ethers'
import { Button } from "@/components/ui/button"

import flowerContractABI from '../app/contracts/FlowerContractABI'

export function CartSummary() {
  const { totalPrice, cartDetails, cartCount, clearCart } = useShoppingCart()
  const cartItems = Object.entries(cartDetails!).map(([_, product]) => product)
  const totalAmount = totalPrice!

  const [isLoading, setLoading] = useState(false)
  const isDisabled = isLoading || cartCount! === 0

  const [walletError, setWalletError] = useState(null);

  const names: string[] = [];
  const costs: number[] = [];

  cartItems.forEach((product) => {
    for (let i = 0; i < product.quantity; i++) {
      names.push(product.name);
      costs.push(product.price);
    }
  });

  function toLowerAndHyphen(name: string) {
    return name.toLowerCase().replace(/\s+/g, '-');
  }

  const slugs: string[] = names.map(toLowerAndHyphen)  

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error("CONTRACT_ADDRESS environment variable is not defined");
  }

  const totalAmountInWei = ethers.utils.parseUnits(totalAmount.toString(), 9);
  const totalAmountInEth = ethers.utils.formatUnits(totalAmountInWei, 18);

  const router = useRouter()
  const purchaseFlowers = async () => {
    try {
      setLoading(true);


      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      const signer = provider.getSigner();
      const flowerContract = new ethers.Contract(contractAddress, flowerContractABI, signer);

      const transaction = await flowerContract.purchase(slugs, names, costs, {
        value: ethers.utils.parseEther(totalAmountInEth),
        gasLimit: process.env.NEXT_PUBLIC_GAS_LIMIT,
      });
      const receipt = await transaction.wait();

      // Extract and log the transaction hash
      const transactionHash = receipt.transactionHash;
      console.log('Transaction Hash:', transactionHash);

      console.log('Flowers purchased successfully!');
      setWalletError(null);
      router.push(`/success?transactionHash=${transactionHash}`);
      clearCart()
    } catch (error: any) {
      const trimmedString = error.toString().replace(/\([^]*\)/g, '');
      setWalletError(trimmedString);
      console.error(error);
    } finally {
      setLoading(false)
    }
  };

  const cartUpdate = () => {
    window.ethereum.on('accountsChanged', () => {
      setWalletError(null)
    });

    window.ethereum.on('disconnect', () => {
      setWalletError(null)
    });
  }

  useEffect(() => {
    cartUpdate
  }, [])

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg border-2 bg-gray-50 px-4 py-6 shadow-md dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
        <div className="flex items-center justify-between">
				  <dt className="text-base font-medium">Total</dt>
          <dd className="text-base font-medium">{formatCurrencyString({value: totalAmount, currency: "USD"})}</dd>
        </div>

      <div className="mt-6">
        <Button type="button" className="w-full" onClick={purchaseFlowers} disabled={ isDisabled}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Loading..." : "Pay"}
        </Button>
        {walletError && (
          <span className="flex items-center" style={{ marginTop: 20}}>
            <AlertCircleIcon className="text-yellow-500" />
            <span className="text-yellow-500" style={{ marginLeft: 10 }}>{walletError }</span>
          </span>
        )}
      </div>
    </section>
  )
}

