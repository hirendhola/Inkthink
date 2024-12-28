import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createRoom } from '../services/dynamoDBService';
import { Room } from '../models/Room';
import { error } from 'console';

const router = express.Router();

router.post('/create-room', async (req, res) => {
  const roomId = uuidv4();
  const adminId = req.body.playerId;
  const room: Room = {
    roomId,
    players: [],
    currentRound: 0,
    gameState: 'waiting', 
    createdAt: Date.now(),
    adminId
  };
  await createRoom(room);
  res.json({ roomId });
});

export default router;