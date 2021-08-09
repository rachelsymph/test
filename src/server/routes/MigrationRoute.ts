import { NextFunction, Request, Response, Router } from 'express';

import {
  migrateDonors,
  migrateGives,
  migratePlatforms,
  migrateRecipients,
  migrateRegexes,
} from 'src/server/services/MigrationService';

const router = Router();

async function migrateDonorsRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const { page = 1 } = req.body;
    const { count } = await migrateDonors(page);

    return res.json({
      message: `Successfully migrated ${count} donors for page ${page}.`,
    });
  } catch (e) {
    req.log.error('Failed to migrate donors', e);

    next(e);
  }
}

async function migrateGivesRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const { page = 1 } = req.body;
    const { count } = await migrateGives(page);

    if (count > 0) {
      // TODO: Create task since there are 14,530 gives
    }

    return res.json({
      message: `Successfully migrated ${count} gives for page ${page}.`,
    });
  } catch (e) {
    req.log.error('Failed to migrate gives', e);

    next(e);
  }
}

async function migratePlatformsRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const { count } = await migratePlatforms();

    return res.json({
      message: `Successfully migrated ${count} platforms.`,
    });
  } catch (e) {
    req.log.error('Failed to migrate platforms', e);

    next(e);
  }
}

async function migrateRecipientsRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const { page = 1 } = req.body;
    const { count } = await migrateRecipients(page);

    if (count > 0) {
      // TODO: Create task since there are 4,578 recipients
    }

    return res.json({
      message: `Successfully migrated ${count} recipients.`,
    });
  } catch (e) {
    req.log.error('Failed to migrate recipients', e);

    next(e);
  }
}

async function migrateRegexesRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const { count } = await migrateRegexes();

    return res.json({
      message: `Successfully migrated ${count} regexes.`,
    });
  } catch (e) {
    req.log.error('Failed to migrate regexes', e);

    next(e);
  }
}

router.route('/donors').post(migrateDonorsRoute);
router.route('/gives').post(migrateGivesRoute);
router.route('/platforms').post(migratePlatformsRoute);
router.route('/recipients').post(migrateRecipientsRoute);
router.route('/regexes').post(migrateRegexesRoute);

export default router;
