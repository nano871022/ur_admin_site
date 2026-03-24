export interface Answer {
  value: string;
  votes: number;
}

export interface Survey {
  question: string;
  options: Answer[];
  timeUsed: string; // Representing Time as string (e.g., "HH:mm:ss") or adjust if needed.
  createDate: Date;
}
