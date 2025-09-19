"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Player, Case } from "@/types/game";
import { gameCases } from "@/data/cases";
import { RoleRevealCard } from "@/components/game/RoleRevealCard";
import { StyledButton } from "@/components/ui/StyledButton";
import { DialogueBox } from "@/components/ui/DialogueBox";
import { PlayerChip } from "@/components/game/PlayerChip";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

type GameStage =
  | "loading"
  | "error"
  | "roleReveal"
  | "introductions"
  | "crimeReveal"
  | "openDiscussion"
  | "clueReveal"
  | "voting"
  | "voteResult"
  | "gameOver"
  | "finalStory";

function GamePageContent() {
  const router = useRouter();

  const [gameStage, setGameStage] = useState<GameStage>("loading");
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentCase, setCurrentCase] = useState<Case | null>(null);
  const [clueIndex, setClueIndex] = useState(0);
  const [revealIndex, setRevealIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [selectedVote, setSelectedVote] = useState<string | null>(null);
  const [eliminatedPlayer, setEliminatedPlayer] = useState<Player | null>(null);
  const [winner, setWinner] = useState<"mafioso" | "innocents" | null>(null);

  const startNewRound = () => {
    setGameStage("loading");
    const sessionDataString = localStorage.getItem("mafioso_session");
    if (!sessionDataString) {
      setGameStage("error");
      return;
    }

    const sessionData = JSON.parse(sessionDataString);
    const playerNames = sessionData.players;
    let playedCaseIds = sessionData.playedCaseIds || [];

    const suitableCases = gameCases.filter(
      (c) => c.playerCount === playerNames.length
    );
    let unplayedCases = suitableCases.filter(
      (c) => !playedCaseIds.includes(c.id)
    );

    if (unplayedCases.length === 0 && suitableCases.length > 0) {
      alert("لقد لعبتم جميع القضايا المتاحة لهذه الفئة! سنبدأ من جديد.");
      playedCaseIds = [];
      unplayedCases = suitableCases;
    }

    if (unplayedCases.length === 0) {
      alert(`عذرًا، لا توجد أي قضايا متاحة حاليًا لـ ${playerNames.length} لاعبين.`);
      router.push("/");
      return;
    }

    const selectedCase =
      unplayedCases[Math.floor(Math.random() * unplayedCases.length)];

    if (!selectedCase) {
      setGameStage("error");
      return;
    }

    sessionData.playedCaseIds = [...playedCaseIds, selectedCase.id];
    localStorage.setItem("mafioso_session", JSON.stringify(sessionData));

    setCurrentCase(selectedCase);
    const shuffledRoles = shuffleArray(selectedCase.roles);
    const playersWithRoles: Player[] = playerNames.map(
      (name: string, index: number) => ({
        name,
        role: shuffledRoles[index],
        isEliminated: false,
      })
    );
    setPlayers(playersWithRoles);

    setClueIndex(0);
    setRevealIndex(0);
    setIsCardFlipped(false);
    setSelectedVote(null);
    setEliminatedPlayer(null);
    setWinner(null);

    setGameStage("roleReveal");
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleEndSession = () => {
    localStorage.removeItem("mafioso_session");
    router.push("/");
  };

  const handleNextReveal = () => {
    if (revealIndex < players.length - 1) {
      setIsCardFlipped(false);
      setTimeout(() => setRevealIndex((prev) => prev + 1), 300);
    } else {
      setGameStage("introductions");
    }
  };

  const handleVoteSubmission = () => {
    if (!selectedVote) return;
    const targetPlayer = players.find((p) => p.name === selectedVote);
    if (!targetPlayer) return;

    const updatedPlayers = players.map((p) =>
      p.name === selectedVote ? { ...p, isEliminated: true } : p
    );
    setPlayers(updatedPlayers);
    setEliminatedPlayer(targetPlayer);
    setGameStage("voteResult");
  };

  const handleNextRound = () => {
    setSelectedVote(null);
    if (currentCase && clueIndex < currentCase.clues.length - 1) {
      setClueIndex((prev) => prev + 1);
    }
    setGameStage("clueReveal");
  };

  if (gameStage === "error") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <DialogueBox>
          <h1 className="text-4xl text-red-700">حدث خطأ</h1>
          <p className="text-xl mt-4">
            لا يمكن العثور على بيانات الجلسة. الرجاء البدء من جديد.
          </p>
          <StyledButton className="mt-8" onClick={() => router.push("/")}>
            العودة للصفحة الرئيسية
          </StyledButton>
        </DialogueBox>
      </main>
    );
  }

  if (gameStage === "loading" || !currentCase) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="text-2xl">جاري إعداد الجريمة...</div>
      </main>
    );
  }

  if (gameStage === "roleReveal") {
    const currentPlayer = players[revealIndex];
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-8">
        <h1 className="text-4xl text-center">
          دور <span className="text-[#8C2B2B]">{currentPlayer.name}</span> عشان
          يعرف وظيفته
        </h1>
        <RoleRevealCard
          player={currentPlayer}
          isFlipped={isCardFlipped}
          onFlip={() => setIsCardFlipped(true)}
        />
        {isCardFlipped && (
          <StyledButton onClick={handleNextReveal}>
            {revealIndex === players.length - 1
              ? "الخطوة التالية"
              : "اللاعب التالي"}
          </StyledButton>
        )}
      </main>
    );
  }

  if (gameStage === "introductions") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <DialogueBox>
          <h1 className="text-4xl">التعريف بالوظائف</h1>
          <p className="text-2xl mt-4">
            دلوقتي لازم كل واحد يعَّرف الباقي بوظيفته
            <br />
            (بس لازم المافيوسو ميقولش ل اي حد انه مافيوسو مجرد يقول هو
            بيشتغل ايه)
          </p>
        </DialogueBox>
        <StyledButton
          className="mt-8"
          onClick={() => setGameStage("crimeReveal")}
        >
          الكشف عن الجريمة
        </StyledButton>
      </main>
    );
  }

  if (gameStage === "crimeReveal") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <DialogueBox>
          <h1 className="text-4xl text-[#8C2B2B] ">{currentCase.title}</h1>
        </DialogueBox>
        <StyledButton
          className="mt-8"
          onClick={() => setGameStage("openDiscussion")}
        >
          التالي
        </StyledButton>
      </main>
    );
  }

  if (gameStage === "openDiscussion") {
    const mafiosoCount = currentCase.roles.filter((role) => role.isMafioso)
      .length;
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <DialogueBox>
          <h1 className="text-4xl">بداية التحقيق</h1>
          <p className="text-2xl mt-4">
            تفتكروا ممكن يكون ايه اللي حصل؟
            <br />
            ناقشوا نظرياتكم الأولية.
          </p>
          <p className="text-2xl mt-4 text-[#8C2B2B]">
            في ما بينكم {mafiosoCount} مافيوسو
          </p>
        </DialogueBox>
        <StyledButton
          className="mt-8"
          onClick={() => setGameStage("clueReveal")}
        >
          يلا بينا نعرف اول دليل
        </StyledButton>
      </main>
    );
  }

  if (gameStage === "clueReveal") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <DialogueBox>
          <h2 className="text-3xl mb-4">الدليل رقم {clueIndex + 1}:</h2>
          <p className="text-2xl font-bold">{currentCase.clues[clueIndex]}</p>
        </DialogueBox>
        <StyledButton
          className="mt-8"
          onClick={() => setGameStage("voting")}
        >
          انتقلوا إلى مرحلة التصويت
        </StyledButton>
      </main>
    );
  }

  if (gameStage === "voting") {
    const activePlayers = players.filter((p) => !p.isEliminated);
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-6">
        <DialogueBox>
          <h1 className="text-4xl text-[#8C2B2B]">مرحلة التصويت</h1>
          <p className="text-xl mt-2">مين اكتر حد انتو شاكين ان هو المافيوسو</p>
        </DialogueBox>
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activePlayers.map((player) => (
            <PlayerChip
              key={player.name}
              playerName={player.name}
              isSelected={selectedVote === player.name}
              onClick={() => setSelectedVote(player.name)}
            />
          ))}
        </div>
        <StyledButton onClick={handleVoteSubmission} disabled={!selectedVote}>
          تأكيد التصويت
        </StyledButton>
      </main>
    );
  }

  if (gameStage === "voteResult") {
    const isTargetMafioso = eliminatedPlayer?.role.isMafioso;
    const totalMafiososInGame = currentCase.roles.filter((r) => r.isMafioso)
      .length;
    const mafiososFound = players.filter(
      (p) => p.isEliminated && p.role.isMafioso
    ).length;
    const activeInnocents = players.filter(
      (p) => !p.isEliminated && !p.role.isMafioso
    ).length;
    const innocentsWin = mafiososFound === totalMafiososInGame;
    const mafiososWin = !innocentsWin && activeInnocents === 0;
    const gameHasEnded = innocentsWin || mafiososWin;

    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-6">
        <DialogueBox>
          {isTargetMafioso ? (
            <>
              <h1 className="text-5xl text-yellow-500">برافو !</h1>
              <p className="text-2xl mt-4">
                كان <span className="font-bold">{eliminatedPlayer?.name}</span>{" "}
                مافيوسو فعلاً !
              </p>
              <p className="text-xl">
                وظيفته كانت:{" "}
                <span className="font-bold">{eliminatedPlayer?.role.name}</span>{" "}
                شرير
              </p>
            </>
          ) : (
            <>
              <h1 className="text-5xl text-red-700">حرام عليكو يا ظلمه !</h1>
              <p className="text-2xl mt-4">
                <span className="font-bold">{eliminatedPlayer?.name}</span> كان
                بريء
              </p>
              <p className="text-xl">
                وظيفته كانت:{" "}
                <span className="font-bold">{eliminatedPlayer?.role.name}</span>{" "}
                غلبان في حاله{" "}
              </p>
            </>
          )}
        </DialogueBox>
        {gameHasEnded ? (
          <StyledButton
            onClick={() => {
              setWinner(innocentsWin ? "innocents" : "mafioso");
              setGameStage("gameOver");
            }}
          >
            إنهاء اللعبة
          </StyledButton>
        ) : (
          <StyledButton onClick={handleNextRound}>
            اكتشفوا الدليل التالي
          </StyledButton>
        )}
      </main>
    );
  }

  if (gameStage === "gameOver") {
    const resultMessage = winner === "innocents" ? "الأبرياء فازوا!" : "المافيوسو فاز!";
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-6">
        <DialogueBox>
          <h1 className="text-5xl text-[#8C2B2B]">انتهت اللعبة!</h1>
          <p className="text-3xl my-4">{resultMessage}</p>
        </DialogueBox>
        <StyledButton onClick={() => setGameStage("finalStory")}>
          اكتشف كيف تمت الجريمة
        </StyledButton>
      </main>
    );
  }

  if (gameStage === "finalStory") {
    const mafiosoPlayers = players.filter((p) => p.role.isMafioso);
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-6">
        <DialogueBox>
          <h1 className="text-4xl text-[#8C2B2B] mb-4">القصة الكاملة</h1>
          <div className="text-xl bg-[#402E2A] text-white p-4 rounded-lg text-right">
            <p className="font-bold">المافيوسو كانوا:</p>
            <ul className="list-disc list-inside">
              {mafiosoPlayers.map((mafioso) => (
                <li key={mafioso.name}>
                  {mafioso.name} ({mafioso.role.name})
                </li>
              ))}
            </ul>
            <p className="mt-4">تفاصيل الجريمة:</p>
            <p>{currentCase.story}</p>
          </div>
        </DialogueBox>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <StyledButton onClick={startNewRound}>العب جولة أخرى</StyledButton>
          <StyledButton
            onClick={handleEndSession}
            className="bg-gray-700 hover:bg-gray-800"
          >
            إنهاء الجلسة
          </StyledButton>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-2xl">حدث خطأ ما في اللعبة.</div>
    </main>
  );
}

export default function GamePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <GamePageContent />
    </Suspense>
  );
}
