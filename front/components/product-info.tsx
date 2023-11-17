"use client"

import { useState, useEffect } from "react";
import {
  formatCurrencyString,
  useShoppingCart,
} from "use-shopping-cart";

import { SanityProduct } from "@/config/inventory";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";

interface Props {
  product: SanityProduct;
}

export function ProductInfo({ product }: Props) {
  const { addItem, cartDetails, incrementItem } = useShoppingCart();
  const isInCart = !!cartDetails?.[product._id];
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

 useEffect(() => {
    if (window.ethereum) {
      setIsMetaMaskConnected(!!window.ethereum.selectedAddress);
      window.ethereum.on("accountsChanged", (accounts: any[]) => {
        setIsMetaMaskConnected(!!accounts[0]);
      });
    }
  }, []);

  useEffect(() => {
    setIsAddedToCart(isInCart);
  }, [isInCart]);

  useEffect(() => {
    localStorage.setItem("cartDetails", JSON.stringify(cartDetails));
  }, [cartDetails]);

  function addToCart() {
    if (isMetaMaskConnected) {
      setIsAddedToCart(true);
      const item = {
        ...product,
        product_data: {},
      };
      isInCart ? incrementItem(item._id) : addItem(item);
    } else {
      alert("Please, login with MetaMask to add items to the cart.");
    }
  }

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

      <div className="mt-3">
        <p className="text-3xl tracking-tight">
          {formatCurrencyString({
            value: product.price,
            currency: product.currency,
          })}
        </p>
      </div>

      <div className="mt-6">
        <div className="space-y-6 text-base">{product.description}</div>
      </div>

      <form className="mt-6">
        <div className="mt-4 flex">
          {isMetaMaskConnected ? (
            <Button
              type="button"
              onClick={addToCart}
              disabled={isAddedToCart}
              className="w-full bg-blue-500 py-6 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {isAddedToCart ? "Added to Cart" : "Add to Cart"}
            </Button>
          ) : (
              <>
                <AlertCircleIcon className="text-yellow-500 mr-2" />
                <p className="text-yellow-500">Please, login with MetaMask to add items to the cart.</p>
              </>
          
          )}
        </div>
      </form>
    </div>
  );
}
