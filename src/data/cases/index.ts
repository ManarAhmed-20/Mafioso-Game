import { Case } from "@/types/game";
import { casesFor4Players } from "./4-players";
import { casesFor5Players } from "./5-players";
import { casesFor6Players } from "./6-players";

export const gameCases: Case[] = [
  ...casesFor4Players,
  ...casesFor5Players,
  ...casesFor6Players,
];