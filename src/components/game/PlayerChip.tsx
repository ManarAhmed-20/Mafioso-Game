"use client";

import { motion } from "framer-motion";

interface PlayerChipProps {
  playerName: string;
  isSelected: boolean;
  onClick: () => void;
}

export function PlayerChip({ playerName, isSelected, onClick }: PlayerChipProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        scale: isSelected ? 1.05 : 1,
        backgroundColor: isSelected ? "#8C2B2B" : "#F5EFE6",
        color: isSelected ? "#F5EFE6" : "#402E2A",
        borderColor: isSelected ? "#F5EFE6" : "#402E2A",
      }}
      transition={{ duration: 0.2 }}
      className={`
        w-full p-4 rounded-lg border-4 font-bold text-2xl
        shadow-[4px_4px_0px_0px_#402E2A]
      `}
    >
      {playerName}
    </motion.button>
  );
}