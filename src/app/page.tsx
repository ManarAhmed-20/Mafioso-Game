"use client";

import { useState } from "react";
import { StyledButton } from "@/components/ui/StyledButton";
import Link from "next/link";
import { PlayerInput } from "@/components/ui/PlayerInput";
import Image from "next/image";

export default function Home() {
  const [groupName, setGroupName] = useState("");
  const playerCounts = [4, 5, 6];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#721016]">
      <div className="text-center w-full max-w-2xl">
        <div className="mb-12">
          <div className="relative w-full max-w-[500px] h-[200px] mx-auto">
            <Image
              src="/mafioso-logo.png"
              alt="شعار لعبة مافيوسو"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>

        <div className="bg-[#F5EFE6]/70 backdrop-blur-sm p-8 rounded-lg border-4 border-[#402E2A] shadow-[8px_8px_0px_0px_#402E2A]">
          <div className="mb-8">
            <label
              htmlFor="groupName"
              className="block text-2xl mb-2 text-[#402E2A]"
            >
              ابدأوا بإدخال اسم الشلة
            </label>
            <PlayerInput
              id="groupName"
              placeholder="مثال: شلة الأساطير"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <h2 className="text-3xl mb-8 text-[#402E2A]">
            ثم اختر عدد اللاعبين
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {playerCounts.map((count) => (
              <Link
                key={count}
                className={!groupName.trim() ? "pointer-events-none" : ""}
                href={`/setup/${count}?groupName=${encodeURIComponent(
                  groupName.trim()
                )}`}
              >
                <StyledButton className="w-full" disabled={!groupName.trim()}>
                  {count} لاعبين
                </StyledButton>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
