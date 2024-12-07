// components/LoadingPage.tsx
"use client";

import React from "react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="flex flex-col items-center">
        <svg
          className="w-16 h-16 animate-spin text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6h2z"
          />
        </svg>
        <p className="mt-4 text-lg text-gray-600">Загрузка...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
