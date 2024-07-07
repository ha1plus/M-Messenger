import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import connectMongoDB from './connect.js';
import router from './routes/index.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
