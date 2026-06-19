export interface Answer {
  text: string;
  votesCount: number;
  coefficientVotes?: number;
}

export interface Survey {
  id?: string;
  question: string;
  options: Answer[];
  timeUsed?: string;
  createDate?: string | Date;
  createdAt?: string;
  status: 'OPEN' | 'CLOSED';
}
