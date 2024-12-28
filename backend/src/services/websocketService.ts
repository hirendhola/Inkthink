import WebSocket from 'ws';
import { Server } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { getRoom, createRoom, updateRoom } from './dynamoDBService';
import { Room } from '../models/Room';
import { Player } from '../models/Player';
import { Message } from '../models/Message';

interface GameState {
  currentWord: string;
  currentDrawer: string;
  roundTime: number;
  scores: { [playerId: string]: number };
}

export class WebSocketService {
  private wss: WebSocket.Server;
  private clients: Map<string, WebSocket> = new Map(); // clientId -> WebSocket
  private playerRooms: Map<string, string> = new Map(); // clientId -> roomId

  constructor(server: Server) {
    this.wss = new WebSocket.Server({ server });
    this.setupWebSocket();
  }

  private setupWebSocket() {
    this.wss.on('connection', (ws: WebSocket) => {
      const clientId = uuidv4();
      this.clients.set(clientId, ws);

      ws.send(JSON.stringify({
        type: 'connected',
        data: { clientId }
      }));

      ws.on('message', async (message: string) => {
        try {
          const data = JSON.parse(message.toString());
          await this.handleMessage(clientId, ws, data);
        } catch (error) {
          console.error('Error handling message:', error);
          ws.send(JSON.stringify({
            type: 'error',
            error: 'Invalid message format'
          }));
        }
      });

      ws.on('close', () => {
        this.handleDisconnect(clientId);
      });
    });
  }

  private async handleMessage(clientId: string, ws: WebSocket, data: any) {
    try {
      switch (data.type) {
        case 'joinRoom':
          await this.joinRoom(clientId, ws, data.roomId, data.player);
          break;

        case 'chat':
          await this.handleChat(clientId, data.message);
          break;

        case 'draw':
          await this.handleDraw(clientId, data.drawData);
          break;

        case 'guess':
          await this.handleGuess(clientId, data.guess);
          break;

        case 'startGame':
          await this.startGame(clientId);
          break;

        default:
          ws.send(JSON.stringify({
            type: 'error',
            error: 'Unknown message type'
          }));
      }
    } catch (error) {
      console.error('Error in handleMessage:', error);
      ws.send(JSON.stringify({
        type: 'error',
        error: 'Internal server error'
      }));
    }
  }

  private async joinRoom(clientId: string, ws: WebSocket, roomId: string, playerData: Partial<Player>) {
    try {
      if (!roomId || !clientId) {
        throw new Error("Invalid room or client ID");
      }

      let room = await getRoom(roomId);
      if (!room) {
        throw new Error("Room not found");
      }

      const existingPlayer = room.players.find(p => p.playerId === clientId);
      if (existingPlayer) {
        Object.assign(existingPlayer, {
          name: playerData.name || existingPlayer.name,
          avatarUrl: playerData.avatarUrl || existingPlayer.avatarUrl,
          connectionId: clientId,
        });
      } else {
        const newPlayer: Player = {
          playerId: clientId,
          name: playerData.name || 'Anonymous',
          avatarUrl: playerData.avatarUrl || `https://avatar.iran.liara.run/public/boy?${clientId}`,
          score: 0,
          connectionId: clientId,
          roomId: roomId
        };
        room.players.push(newPlayer);
      }

      await updateRoom({
        ...room,
        players: room.players,
        gameState: room.gameState || 'waiting',
        currentRound: room.currentRound || 0
      });

      this.playerRooms.set(clientId, roomId);

      ws.send(JSON.stringify({
        type: 'roomJoined',
        data: {
          roomId,
          players: room.players,
          gameState: room.gameState
        }
      }));

      this.broadcastToRoom(roomId, {
        type: 'playerJoined',
        data: {
          player: room.players.find(p => p.playerId === clientId)
        }
      }, [clientId]);

    } catch (error) {
      console.error('Error joining room:', error);
      ws.send(JSON.stringify({
        type: 'error',
        error: (error as Error).message || 'Failed to join room'
      }));
    }
  }

  private async handleChat(clientId: string, content: string) {
    const roomId = this.playerRooms.get(clientId);
    if (!roomId) return;

    const room = await getRoom(roomId);
    if (!room) return;
    const player = room.players.find(p => p.playerId === clientId);
    if (!player) return;

    const message: Message = {
      messageId: uuidv4(),
      roomId,
      playerId: clientId,
      content,
      type: 'chat',
      timestamp: Date.now()
    };

    this.broadcastToRoom(roomId, {
      type: 'chat',
      data: {
        ...message,
        playerName: player.name
      }
    });
  }

  private async handleDraw(clientId: string, drawData: any) {
    const roomId = this.playerRooms.get(clientId);
    if (!roomId) return;

    const room = await getRoom(roomId);
    if (!room) return;
    if (room.currentDrawer !== clientId) return;

    this.broadcastToRoom(roomId, {
      type: 'draw',
      data: drawData
    }, [clientId]);
  }

  private async handleGuess(clientId: string, guess: string) {
    const roomId = this.playerRooms.get(clientId);
    if (!roomId) return;

    const room = await getRoom(roomId);
    if (!room) return;
    if (room.currentDrawer === clientId) return;

    const isCorrect = guess.toLowerCase() === room.currentWord?.toLowerCase();

    if (isCorrect) {
      // Update scores
      const player = room.players.find(p => p.playerId === clientId);
      if (player) {
        player.score += 100;
        await updateRoom(room);
      }

      this.broadcastToRoom(roomId, {
        type: 'correctGuess',
        data: {
          playerId: clientId,
          playerName: player?.name,
          word: room.currentWord
        }
      });
    }
  }

  private async startGame(clientId: string) {
    const roomId = this.playerRooms.get(clientId);
    if (!roomId) return;

    const room = await getRoom(roomId);
    if (!room) return;
    if (room.gameState !== 'waiting') return;

    room.gameState = 'playing';
    room.currentRound = 1;
    room.currentDrawer = room.players[0].playerId;
    room.currentWord = this.getRandomWord();

    await updateRoom(room);

    this.broadcastToRoom(roomId, {
      type: 'gameStarted',
      data: {
        currentDrawer: room.currentDrawer,
        currentWord: room.currentWord,
        roundNumber: room.currentRound
      }
    });
  }

  private async handleDisconnect(clientId: string) {
    const roomId = this.playerRooms.get(clientId);
    if (roomId) {
      const room = await getRoom(roomId);
      if (room) {
        room.players = room.players.filter(p => p.playerId !== clientId);
        await updateRoom(room);

        this.broadcastToRoom(roomId, {
          type: 'playerLeft',
          data: { playerId: clientId }
        });
      }
    }

    this.clients.delete(clientId);
    this.playerRooms.delete(clientId);
  }

  private async broadcastToRoom(roomId: string, message: any, excludeIds: string[] = []) {
    const room = await getRoom(roomId);
    if (!room) return;

    room.players.forEach(player => {
      if (!excludeIds.includes(player.playerId)) {
        const client = this.clients.get(player.playerId);
        if (client?.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      }
    });
  }

  private getRandomWord(): string {
    const words = ['apple', 'banana', 'car', 'dog', 'elephant', 'fish', 'guitar'];
    return words[Math.floor(Math.random() * words.length)];
  }
}