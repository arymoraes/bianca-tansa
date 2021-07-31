import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes/router';
import db from '../models';
dotenv.config();

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const app = express();
const PORT = process.env.APP_PORT || 5000
app.use(express.json());
app.use(cors(corsConfig));
app.use(router);

(async function () {
  await db.sequelize.sync();
  app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
})();