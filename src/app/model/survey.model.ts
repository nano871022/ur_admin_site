export interface Answer {
  value: string;
  votes: number;
}

export interface Survey {
  id?: string;
  question: string;
  options: Answer[];
  timeUsed: string;
  createDate: Date;
  status: 'OPEN' | 'CLOSED';
}
