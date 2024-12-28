import { Router } from 'express';
import { WebSocketService } from '../services/websocketService';

const router = Router();

// This endpoint can be used to check WebSocket status
router.get('/status', (req, res) => {
  res.json({ status: 'WebSocket server is running' });
});

export default router;