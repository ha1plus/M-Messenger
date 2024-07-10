import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import 'dotenv/config';
import bodyParser from 'body-parser';
import connectMongoDB from './connect.js';
import router from './routes/index.js';
import cors from 'cors';

const app = express();
const httpServer = createServer(app); // Ensure HTTP server uses Express app
const port = process.env.PORT || 3000;
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on('connection', (socket) => {
  socket.on('join chat', (room) => {
    console.log('join chat: ', room);
    socket.join(room);
  });

  socket.on('new message', (message) => {
    console.log('new message: ', message);
    // Emit the message to all clients in the room
    io.in(message.chatId).emit('new message', message);
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
};

app.use(cors(corsOptions));

const uri = process.env.MONGO_URI || null;
connectMongoDB(uri);

router(app);

httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
