import React from "react";

interface DialogueBoxProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogueBox({ children, className }: DialogueBoxProps) {
  return (
    <div
      className={`
        bg-[#F5EFE6]/80 backdrop-blur-sm p-6 rounded-lg 
        border-4 border-[#402E2A] 
        shadow-[8px_8px_0px_0px_#402E2A]
        w-full text-center
        ${className}
      `}
    >
      {children}
    </div>
  );
}