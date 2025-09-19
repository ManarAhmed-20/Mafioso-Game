"use client";

import { motion } from "framer-motion";
import { Player } from "@/types/game";

interface RoleRevealCardProps {
  player: Player;
  isFlipped: boolean;
  onFlip: () => void;
}

export function RoleRevealCard({ player, isFlipped, onFlip }: RoleRevealCardProps) {
  return (
    <div
      className="w-[300px] h-[420px] cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={onFlip}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div
          className="absolute w-full h-full bg-[#F5EFE6] border-4 border-[#402E2A] rounded-xl flex flex-col items-center justify-center p-4"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h2 className="text-3xl text-center text-[#402E2A]">
            اضغط للكشف عن دورك
          </h2>
          <p className="mt-4 text-xl">يا</p>
          <p className="text-5xl mt-2 text-[#8C2B2B]">{player.name}</p>
        </div>

        <div
          className="absolute w-full h-full bg-[#402E2A] border-4 border-[#F5EFE6] rounded-xl flex flex-col items-center justify-center p-6 text-white text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-lg">وظيفتك هي</p>
          <h3 className="text-5xl my-4 text-[#F5EFE6] drop-shadow-lg">
            {player.role.name}
          </h3>
          {player.role.isMafioso && (
            <div className="mt-4 bg-[#8C2B2B] p-3 rounded-lg">
              <p className="text-2xl font-bold">أنت المافيوسو!</p>
              <p>مهمتك هي الخداع والتضليل. لا تدعهم يكشفونك.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}