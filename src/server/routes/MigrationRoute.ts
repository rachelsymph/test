import { NextFunction, Request, Response, Router } from 'express';

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
} from 'src/server/services/MigrationService';

type MakeMigrationRouteParams = {
  migrateServiceFn: Function;
  tableDisplayName: string;
};

const router = Router();


function makeMigrationRoute(params: MakeMigrationRouteParams) {
  const { migrateServiceFn, tableDisplayName } = params;

  async function migrateRoute(req: Request, res: Response, next: NextFunction) {
    const { page = 1 } = req.body;

    try {
      const { count } = await migrateServiceFn(page);

      if (count > 0) {
        // TODO: Create task
      }

      return res.json({
        message: `Successfully migrated ${count} ${tableDisplayName} for page ${page}.`,
      });
    } catch (e) {
      req.log.error(`Failed to migrate ${tableDisplayName} for page ${page}.`, e);

      next(e);
    }
  }

  return migrateRoute;
}

const MIGRATION_ROUTE_CONFIG = {
  '/alternate-emails': {
    tableDisplayName: 'Alternate Emails',
    migrateServiceFn: migrateAlternateEmails,
  },
  '/donor-ethnicities': {
    tableDisplayName: 'Donor Ethnicities',
    migrateServiceFn: migrateDonorEthnicities,
  },
  '/donor-genders': {
    tableDisplayName: 'Donor Genders',
    migrateServiceFn: migrateDonorGenders,
  },
  '/donor-groups': {
    tableDisplayName: 'Donor Groups',
    migrateServiceFn: migrateDonorGroups,
  },
  '/donor-linked-accounts': {
    tableDisplayName: 'Donor Linked Accounts',
    migrateServiceFn: migrateDonorLinkedAccounts,
  },
  '/donors': {
    tableDisplayName: 'Donors',
    migrateServiceFn: migrateDonors,
  },
  '/donor-stats': {
    tableDisplayName: 'Donor Stats',
    migrateServiceFn: migrateDonorStats,
  },
  '/ethnicities': {
    tableDisplayName: 'Ethnicities',
    migrateServiceFn: migrateEthnicities,
  },
  '/friendly-id-slugs': {
    tableDisplayName: 'Friendly ID Slugs',
    migrateServiceFn: migrateFriendlyIdSlugs,
  },
  '/genders': {
    tableDisplayName: 'Genders',
    migrateServiceFn: migrateGenders,
  },
  '/gives': {
    tableDisplayName: 'Gives',
    migrateServiceFn: migrateGives,
  },
  '/give-tags': {
    tableDisplayName: 'Give Tags',
    migrateServiceFn: migrateGiveTags,
  },
  '/goals': {
    tableDisplayName: 'Goals',
    migrateServiceFn: migrateGoals,
  },
  '/group-gives': {
    tableDisplayName: 'Group Gives',
    migrateServiceFn: migrateGroupGives,
  },
  '/group-recipients': {
    tableDisplayName: 'Group Recipients',
    migrateServiceFn: migrateGroupRecipients,
  },
  '/groups': {
    tableDisplayName: 'Groups',
    migrateServiceFn: migrateGroups,
  },
  '/images': {
    tableDisplayName: 'Images',
    migrateServiceFn: migrateImages,
  },
  '/moments': {
    tableDisplayName: 'Moments',
    migrateServiceFn: migrateMoments,
  },
  '/organizations': {
    tableDisplayName: 'Organizations',
    migrateServiceFn: migrateOrganizations,
  },
  '/page-recipients': {
    tableDisplayName: 'Page Recipients',
    migrateServiceFn: migratePageRecipients,
  },
  '/pages': {
    tableDisplayName: 'Pages',
    migrateServiceFn: migratePages,
  },
  '/personal-practices': {
    tableDisplayName: 'Personal Practices',
    migrateServiceFn: migratePersonalPractices,
  },
  '/personal-reflections': {
    tableDisplayName: 'Personal Reflections',
    migrateServiceFn: migratePersonalReflections,
  },
  '/platforms': {
    tableDisplayName: 'Platforms',
    migrateServiceFn: migratePlatforms,
  },
  '/platform-stats': {
    tableDisplayName: 'Platform Stats',
    migrateServiceFn: migratePlatformStats,
  },
  '/recipients': {
    tableDisplayName: 'Recipients',
    migrateServiceFn: migrateRecipients,
  },
  '/recipient-stats': {
    tableDisplayName: 'Recipient Stats',
    migrateServiceFn: migrateRecipientStats,
  },
  '/regexes': {
    tableDisplayName: 'Regexes',
    migrateServiceFn: migrateRegexes,
  },
  '/tags': {
    tableDisplayName: 'Tags',
    migrateServiceFn: migrateTags,
  },
};

Object.entries(MIGRATION_ROUTE_CONFIG).forEach(([routeStr, routeParams]) => {
  router.route(routeStr).post(makeMigrationRoute(routeParams));
});

export default router;
