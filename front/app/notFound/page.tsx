"use client"

import React from 'react';
import { useRouter } from 'next/navigation'

export default function Page() {

    const router = useRouter()

    const handleRefreshClick = () => {
        router.refresh();
    };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 border border-gray-300 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
        <p className="text-gray-600">
          We encountered an error while processing your request. Please try again later.
        </p>
          <p className="text-red-500 mt-4">
            It seems there is an issue with your authorization. Please check your wallet connection.
          </p>
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        onClick={handleRefreshClick}
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

