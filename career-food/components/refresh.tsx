"use client";

import { RefreshCcw } from "lucide-react";

export const RefreshButton = () => {
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <button className="" onClick={refreshPage}>
      <RefreshCcw className="h-4 w-4 text-black dark:text-stone-100" />
      {/*  <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2c-.823 0-1.378-.448-1.78-1.228C17.94 11.592 16.912 10 16 10h-7.26c-.627 0-1.178.448-1.78 1.228 0 .803.448 1.228 1.228 1.228v3.296c0 .553.448 1 1.228 1 .83 0 1.512-.447 1.78-1.228C18.356 14.056 19 13.612 19 12V4m0 5h.582m-3.958-3h14.542"
        />
      </svg> */}
    </button>
  );
};
