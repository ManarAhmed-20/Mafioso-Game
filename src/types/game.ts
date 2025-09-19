export interface Role {
  name: string;
  isMafioso: boolean;
}

export interface Case {
  id: string;
  title: string;
  story: string;
  playerCount: number;
  roles: Role[];
  clues: string[];
}

export interface Player {
  name: string;
  role: Role;
  isEliminated: boolean;
}