import { NextFunction, Request, Response, Router } from 'express';

import PlatformService from 'src/server/legacy/services/PlatformService';

const router = Router();

async function getPlatformsRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const platformService = new PlatformService();
    const platforms = await platformService.getAll();

    return res.json(platforms);
  } catch (e) {
    next(e);
  }
}
router.route('/').get(getPlatformsRoute);

export default router;
