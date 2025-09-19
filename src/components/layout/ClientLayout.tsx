// src/components/layout/ClientLayout.tsx

"use client";

import { useState } from "react";
import { GameRules } from "@/components/ui/GameRules";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showRules, setShowRules] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowRules(true)}
        className="fixed top-4 left-4 p-3 rounded-full bg-[#402E2A]/70 text-white shadow-lg hover:bg-[#402E2A] transition-colors z-50"
        aria-label="شرح طريقة اللعب"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712L12 16.5l-2.121-2.121m4.242 0L12 16.5m-2.121-2.121L9.879 7.519M12 16.5v2.25m-2.25-4.5H12m2.25 0H12"
          />
        </svg>
      </button>

      {children}

      <GameRules isOpen={showRules} onClose={() => setShowRules(false)} />
    </>
  );
}