import { Router } from 'express';

import { authenticateUser } from '../middlewares/AuthMiddleware';

import DynamicOptionRoute from './DynamicOptionRoute';
import GiveRoute from './GiveRoute';
import InboundWebhookRoute from './InboundWebhookRoute';
import MigrationRoute from './MigrationRoute';
import PlatformRoute from './PlatformRoute';
import UploadRoute from './UploadRoute';
import UserRoute from './UserRoute';

const router = Router();

// router.use(authenticateUser);

router.use('/options', DynamicOptionRoute);
router.use('/webhooks', InboundWebhookRoute);
router.use('/platforms', PlatformRoute);
router.use('/upload', UploadRoute);
router.use('/users', UserRoute);
router.use('/gives', GiveRoute);

router.use('/migrations', MigrationRoute);

export default router;
