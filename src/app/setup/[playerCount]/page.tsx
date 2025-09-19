"use client";

import { useState, useEffect, use } from "react";
import { StyledButton } from "@/components/ui/StyledButton";
import { PlayerInput } from "@/components/ui/PlayerInput";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function SetupPage({ params }: { params: Promise<{ playerCount: string }> }) {
  const actualParams = use(params);
  const playerCount = parseInt(actualParams.playerCount);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    const name = searchParams.get("groupName");
    if (name) {
      setGroupName(decodeURIComponent(name));
    }
  }, [searchParams]);

  const [playerNames, setPlayerNames] = useState<string[]>(() =>
    Array(playerCount).fill("")
  );

  const handleNameChange = (index: number, newName: string) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = newName;
    setPlayerNames(updatedNames);
  };

  const handleStartGame = () => {
    const allNamesEntered = playerNames.every((name) => name.trim() !== "");
    if (!allNamesEntered || !groupName) {
      alert("الرجاء إدخال جميع أسماء اللاعبين واسم الشلة.");
      return;
    }

    const sessionData = {
      groupName: groupName,
      players: playerNames,
      playedCaseIds: [],
    };

    localStorage.setItem("mafioso_session", JSON.stringify(sessionData));
    router.push(`/game`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <Link
          href="/"
          className="text-lg text-[#402E2A] hover:text-[#8C2B2B] mb-4 block"
        >
          &larr; العودة
        </Link>
        <div className="bg-[#F5EFE6]/70 backdrop-blur-sm p-8 rounded-lg border-4 border-[#402E2A] shadow-[8px_8px_0px_0px_#402E2A]">
          <h1 className="text-4xl md:text-5xl text-[#8C2B2B] mb-4">
            تسجيل اللاعبين لشلة "{groupName}"
          </h1>
          <p className="text-lg text-[#402E2A] mb-8">
            أدخل أسماء {playerCount} لاعبين
          </p>

          <div className="space-y-4 mb-8">
            {playerNames.map((name, index) => (
              <PlayerInput
                key={index}
                type="text"
                placeholder={`اسم اللاعب رقم ${index + 1}`}
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
              />
            ))}
          </div>

          <StyledButton className="w-full" onClick={handleStartGame}>
            ابدأ اللعبة!
          </StyledButton>
        </div>
      </div>
    </main>
  );
}
