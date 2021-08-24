import { NextFunction, Request, Response, Router } from 'express';

import { getServices } from 'src/server/services/GiveService';

const router = Router();

async function getGivesRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const cursor = req.query.cursor as string;
    const { data, nextCursor } = await getServices({
      cursor,
    });

    return res.json({
      data,
      cursor: nextCursor,
    });
  } catch (e) {
    next(e);
  }
}

router.route('/').get(getGivesRoute);

export default router;
