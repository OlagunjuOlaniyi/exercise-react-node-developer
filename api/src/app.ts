import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { terrible } from './middleware/terrible';
import { AppError } from './models/AppError';
import { repos } from './routes/repos';

// CORS header configuration
const corsOptions = {
  methods: 'GET',
  allowedHeaders: 'Content-Type,Authorization',
};

export const app = express();

// Routes. Note these will fail about 25% due to "terrible" middleware.
app.use('/repos', terrible(), cors(corsOptions), repos);

// error handling middleware should be loaded after the loading the routes
app.use('/', (err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = err instanceof AppError ? err.status : 500;

  const formattedError: { status: number; message: string } = {
    status,
    message: err.message,
  };

  res.status(status);
  res.json(formattedError);
});
