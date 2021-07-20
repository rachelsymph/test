import { Router } from 'express';

import { authenticateUser } from '../middlewares/AuthMiddleware';

import DynamicOptionRoute from './DynamicOptionRoute';
import UploadRoute from './UploadRoute';
import UserRoute from './UserRoute';

const router = Router();

router.use(authenticateUser);

router.use('/upload', UploadRoute);
router.use('/users', UserRoute);
router.use('/options', DynamicOptionRoute);

export default router;
