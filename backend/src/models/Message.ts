export interface Message {
  messageId: string;
  roomId: string;
  playerId: string;
  content: string;
  type: 'chat' | 'guess' | 'system';
  timestamp: number;
}