import { NextFunction, Request, Response, Router } from 'express';

import config from 'src/server/config/config';
import { createTask } from 'src/server/libs/TaskCreator';

import {
  migrateAlternateEmails,
  migrateDonorEthnicities,
  migrateDonorGenders,
  migrateDonorGroups,
  migrateDonorLinkedAccounts,
  migrateDonors,
  migrateDonorStats,
  migrateEthnicities,
  migrateFriendlyIdSlugs,
  migrateGenders,
  migrateGives,
  migrateGiveTags,
  migrateGoals,
  migrateGroupGives,
  migrateGroupRecipients,
  migrateGroups,
  migrateImages,
  migrateMoments,
  migrateOrganizations,
  migratePageRecipients,
  migratePages,
  migratePersonalPractices,
  migratePersonalReflections,
  migratePlatforms,
  migratePlatformStats,
  migrateRecipients,
  migrateRecipientStats,
  migrateRegexes,
  migrateTags,
  migrateUsers,
} from 'src/server/services/MigrationService';

type MakeMigrationRouteParams = {
  endpoint: string;
  migrateServiceFn: Function;
  nextEndpoint: string;
  nextInitialPage: number;
  nextTableDisplayName: string;
  tableDisplayName: string;
};

const MIGRATION_INTERVAL_IN_SECONDS = 2;

const router = Router();

function makeMigrationRoute(params: MakeMigrationRouteParams) {
  const {
    endpoint,
    migrateServiceFn,
    nextEndpoint,
    nextInitialPage,
    tableDisplayName,
  } = params;

  async function migrateRoute(req: Request, res: Response, next: NextFunction) {
    const { page = 1 } = req.body;

    req.log.info(`Page ${page}`);

    try {
      const { count } = await migrateServiceFn(Number(page));

      if (config.IS_PROD) {
        if (count > 0) {
          await createTask({
            delayInSeconds: MIGRATION_INTERVAL_IN_SECONDS,
            path: `/api/1.0/migrations${endpoint}`,
            payload: {
              page: Number(page) + 1, // next page
            },
            queueName: config.MIGRATION_TASK_QUEUE_NAME,
          });
        } else if (nextEndpoint && nextInitialPage) {
          await createTask({
            delayInSeconds: MIGRATION_INTERVAL_IN_SECONDS,
            path: `/api/1.0/migrations${nextEndpoint}`,
            payload: {
              page: nextInitialPage,
            },
            queueName: config.MIGRATION_TASK_QUEUE_NAME,
          });
        }
      }

      return res.json({
        message: `Successfully migrated ${count} ${tableDisplayName} for page ${page}.`,
      });
    } catch (e) {
      req.log.error(
        `Failed to migrate ${tableDisplayName} for page ${page}.`,
        e
      );

      next(e);
    }
  }

  return migrateRoute;
}

const MIGRATION_ROUTE_CONFIG = {
  '/alternate-emails': {
    endpoint: '/alternate-emails',
    nextEndpoint: '/donor-ethnicities',
    nextInitialPage: 1,
    nextTableDisplayName: 'Donor Ethnicities',
    tableDisplayName: 'Alternate Emails',
    migrateServiceFn: migrateAlternateEmails,
  },
  '/donor-ethnicities': {
    endpoint: '/donor-ethnicities',
    nextEndpoint: '/donor-genders',
    nextInitialPage: 1,
    nextTableDisplayName: 'Donor Genders',
    tableDisplayName: 'Donor Ethnicities',
    migrateServiceFn: migrateDonorEthnicities,
  },
  '/donor-genders': {
    endpoint: '/donor-genders',
    nextEndpoint: '/donor-groups',
    nextInitialPage: 1,
    nextTableDisplayName: 'Donor Groups',
    tableDisplayName: 'Donor Genders',
    migrateServiceFn: migrateDonorGenders,
  },
  '/donor-groups': {
    endpoint: '/donor-groups',
    nextEndpoint: '/donor-linked-accounts',
    nextInitialPage: 1,
    nextTableDisplayName: 'Donor Linked Accounts',
    tableDisplayName: 'Donor Groups',
    migrateServiceFn: migrateDonorGroups,
  },
  '/donor-linked-accounts': {
    endpoint: '/donor-linked-accounts',
    nextEndpoint: '/donors',
    nextInitialPage: 1,
    nextTableDisplayName: 'Donors',
    tableDisplayName: 'Donor Linked Accounts',
    migrateServiceFn: migrateDonorLinkedAccounts,
  },
  '/donors': {
    endpoint: '/donors',
    nextEndpoint: '/donor-stats',
    nextInitialPage: 1,
    nextTableDisplayName: 'Donor Stats',
    tableDisplayName: 'Donors',
    migrateServiceFn: migrateDonors,
  },
  '/donor-stats': {
    endpoint: '/donor-stats',
    nextEndpoint: '/ethnicities',
    nextInitialPage: 1,
    nextTableDisplayName: 'Ethnicities',
    tableDisplayName: 'Donor Stats',
    migrateServiceFn: migrateDonorStats,
  },
  '/ethnicities': {
    endpoint: '/ethnicities',
    nextEndpoint: '/friendly-id-slugs',
    nextInitialPage: 1,
    nextTableDisplayName: 'Friendly ID Slugs',
    tableDisplayName: 'Ethnicities',
    migrateServiceFn: migrateEthnicities,
  },
  '/friendly-id-slugs': {
    endpoint: '/friendly-id-slugs',
    nextEndpoint: '/genders',
    nextInitialPage: 1,
    nextTableDisplayName: 'Genders',
    tableDisplayName: 'Friendly ID Slugs',
    migrateServiceFn: migrateFriendlyIdSlugs,
  },
  '/genders': {
    endpoint: '/genders',
    nextEndpoint: '/gives',
    nextInitialPage: 1,
    nextTableDisplayName: 'Gives',
    tableDisplayName: 'Genders',
    migrateServiceFn: migrateGenders,
  },
  '/gives': {
    endpoint: '/gives',
    nextEndpoint: '/give-tags',
    nextInitialPage: 1,
    nextTableDisplayName: 'Give Tags',
    tableDisplayName: 'Gives',
    migrateServiceFn: migrateGives,
  },
  '/give-tags': {
    endpoint: '/give-tags',
    nextEndpoint: '/goals',
    nextInitialPage: 1,
    nextTableDisplayName: 'Goals',
    tableDisplayName: 'Give Tags',
    migrateServiceFn: migrateGiveTags,
  },
  '/goals': {
    endpoint: '/goals',
    nextEndpoint: '/group-gives',
    nextInitialPage: 1,
    nextTableDisplayName: 'Group Gives',
    tableDisplayName: 'Goals',
    migrateServiceFn: migrateGoals,
  },
  '/group-gives': {
    endpoint: '/group-gives',
    nextEndpoint: '/group-recipients',
    nextInitialPage: 1,
    nextTableDisplayName: 'Group Recipients',
    tableDisplayName: 'Group Gives',
    migrateServiceFn: migrateGroupGives,
  },
  '/group-recipients': {
    endpoint: '/group-recipients',
    nextEndpoint: '/groups',
    nextInitialPage: 1,
    nextTableDisplayName: 'Groups',
    tableDisplayName: 'Group Recipients',
    migrateServiceFn: migrateGroupRecipients,
  },
  '/groups': {
    endpoint: '/groups',
    nextEndpoint: '/images',
    nextInitialPage: 1,
    nextTableDisplayName: 'Images',
    tableDisplayName: 'Groups',
    migrateServiceFn: migrateGroups,
  },
  '/images': {
    endpoint: '/images',
    nextEndpoint: '/moments',
    nextInitialPage: 1,
    nextTableDisplayName: 'Moments',
    tableDisplayName: 'Images',
    migrateServiceFn: migrateImages,
  },
  '/moments': {
    endpoint: '/moments',
    nextEndpoint: '/organizations',
    nextInitialPage: 1,
    nextTableDisplayName: 'Organizations',
    tableDisplayName: 'Moments',
    migrateServiceFn: migrateMoments,
  },
  '/organizations': {
    endpoint: '/organizations',
    nextEndpoint: '/page-recipients',
    nextInitialPage: 1,
    nextTableDisplayName: 'Page Recipients',
    tableDisplayName: 'Organizations',
    migrateServiceFn: migrateOrganizations,
  },
  '/page-recipients': {
    endpoint: '/page-recipients',
    nextEndpoint: '/pages',
    nextInitialPage: 1,
    nextTableDisplayName: 'Pages',
    tableDisplayName: 'Page Recipients',
    migrateServiceFn: migratePageRecipients,
  },
  '/pages': {
    endpoint: '/pages',
    nextEndpoint: '/personal-practices',
    nextInitialPage: 1,
    nextTableDisplayName: 'Personal Practices',
    tableDisplayName: 'Pages',
    migrateServiceFn: migratePages,
  },
  '/personal-practices': {
    endpoint: '/personal-practices',
    nextEndpoint: '/personal-reflections',
    nextInitialPage: 1,
    nextTableDisplayName: 'Personal Reflections',
    tableDisplayName: 'Personal Practices',
    migrateServiceFn: migratePersonalPractices,
  },
  '/personal-reflections': {
    endpoint: '/personal-reflections',
    nextEndpoint: '/platforms',
    nextInitialPage: 1,
    nextTableDisplayName: 'Platforms',
    tableDisplayName: 'Personal Reflections',
    migrateServiceFn: migratePersonalReflections,
  },
  '/platforms': {
    endpoint: '/platforms',
    nextEndpoint: '/platform-stats',
    nextInitialPage: 1,
    nextTableDisplayName: 'Platform Stats',
    tableDisplayName: 'Platforms',
    migrateServiceFn: migratePlatforms,
  },
  '/platform-stats': {
    endpoint: '/platform-stats',
    nextEndpoint: '/recipients',
    nextInitialPage: 1,
    nextTableDisplayName: 'Recipients',
    tableDisplayName: 'Platform Stats',
    migrateServiceFn: migratePlatformStats,
  },
  '/recipients': {
    endpoint: '/recipients',
    nextEndpoint: '/recipient-stats',
    nextInitialPage: 1,
    nextTableDisplayName: 'Recipient Stats',
    tableDisplayName: 'Recipients',
    migrateServiceFn: migrateRecipients,
  },
  '/recipient-stats': {
    endpoint: '/recipient-stats',
    nextEndpoint: '/regexes',
    nextInitialPage: 1,
    nextTableDisplayName: 'Regexes',
    tableDisplayName: 'Recipient Stats',
    migrateServiceFn: migrateRecipientStats,
  },
  '/regexes': {
    endpoint: '/regexes',
    nextEndpoint: '/tags',
    nextInitialPage: 1,
    nextTableDisplayName: 'Tags',
    tableDisplayName: 'Regexes',
    migrateServiceFn: migrateRegexes,
  },
  '/tags': {
    endpoint: '/tag',
    nextEndpoint: '',
    nextInitialPage: 1,
    nextTableDisplayName: 'Users',
    tableDisplayName: 'Tags',
    migrateServiceFn: migrateTags,
  },
  '/users': {
    endpoint: '/users',
    nextEndpoint: '',
    nextInitialPage: 0,
    nextTableDisplayName: '',
    tableDisplayName: 'User',
    migrateServiceFn: migrateUsers,
  },
};

Object.entries(MIGRATION_ROUTE_CONFIG).forEach(([routeStr, routeParams]) => {
  router.route(routeStr).post(makeMigrationRoute(routeParams));
});

export default router;
