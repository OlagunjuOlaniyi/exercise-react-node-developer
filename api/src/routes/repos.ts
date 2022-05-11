import { Router, Request, Response } from 'express';
import repository from '../../data/repos.json';
import { Repo } from '../models/Repo';


export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {

  // Sent response header
  res.header('Cache-Control', 'no-store');

  const rep: Repo[] = [...repository]

  // Filter repositories
  const reps2 = rep.filter((e) => { return e.fork == false; });

  // Set response code
  res.status(200);

  // Send response to client
  res.json(reps2);
});
