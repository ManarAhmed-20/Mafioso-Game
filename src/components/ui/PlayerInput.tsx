import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function PlayerInput(props: InputProps) {
  return (
    <input
      {...props}
      className={`
        w-full bg-[#F5EFE6] text-[#402E2A] font-amiri font-bold text-xl
        p-3 rounded-md border-2 border-[#402E2A] 
        focus:ring-2 focus:ring-[#8C2B2B] focus:outline-none
        placeholder:text-[#402E2A]/50
        transition-all
        ${props.className}
      `}
    />
  );
}