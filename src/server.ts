import 'dotenv/config';
import express from 'express';
import { router as usersRouter } from './routes/userRouter';
import {router as authRouter } from './routes/authRouter';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(usersRouter);
app.use(authRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});
