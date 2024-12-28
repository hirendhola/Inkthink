export interface Player {
  playerId: string;
  name: string;
  avatarUrl: string;
  score: number;
  connectionId?: string;
  roomId?: string;
}
