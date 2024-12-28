import { Player } from './Player';
export interface Room {
  roomId: string;
  players: Player[];
  currentRound: number;
  gameState: 'waiting' | 'playing' | 'finished'; // changed from 'status'
  createdAt: number;
  currentWord?: string;
  currentDrawer?: string;
  adminId : string;
}