import express from 'express';
import http from 'http';
import cors from 'cors';
import apiRoutes from './routes/api';
import websocketStatus from './routes/api';
import { WebSocketService } from './services/websocketService';

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/websocket', websocketStatus);
app.get('/', (req, res) => {
  console.log('POST request to the homepage');
  res.send('Hello World');
});

new WebSocketService(server);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});