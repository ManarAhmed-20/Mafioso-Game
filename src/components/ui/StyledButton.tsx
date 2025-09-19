"use client";

import { motion, MotionProps } from "framer-motion"; 
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps & {
  children: React.ReactNode;
};

export function StyledButton({ children, className, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        bg-[#8C2B2B] text-[#F5EFE6] font-lalezar text-2xl 
        py-4 px-8 rounded-lg border-2 border-[#402E2A] 
        shadow-[5px_5px_0px_0px_#402E2A] 
        transition-all hover:shadow-[2px_2px_0px_0px_#402E2A]
        disabled:bg-gray-500 disabled:shadow-none disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}