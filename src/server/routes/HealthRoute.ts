import { NextFunction, Request, Response } from 'express';
import { OK } from 'http-status-codes';

async function isLive(req: Request, res: Response, next: NextFunction) {
  res.sendStatus(OK);
}

async function isReady(req: Request, res: Response, next: NextFunction) {
  res.sendStatus(OK);
}

const healthRoutes = {
  isLive,
  isReady,
};

export default healthRoutes;
