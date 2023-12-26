export interface ChatResponse {
  choices: Choice[];
}

export interface Choice {
  index: number;
  message: Message;
}

export interface Message {
  role: string;
  content: string;
}
