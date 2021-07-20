import { NextFunction, Request, Response, Router } from 'express';

import { User } from '../../commons/types/User.type';
import { deleteUser, findOne, findUsers } from '../models/UserModel';
import { createUser, updateUser } from '../services/UserService';

import { formatUser } from '../utils/UserUtils';

const router = Router();

async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
  try {
    return res.json(formatUser(req.user as User));
  } catch (e) {
    next(e);
  }
}

async function getUserRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await findOne({
      id: req.params.userId,
    });

    return res.json(formatUser(user));
  } catch (e) {
    next(e);
  }
}

async function getUsersRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await findUsers({
      ...req.query,
      keywords: (req.query.q as string)?.toLowerCase(),
    });

    const usersResponse = users.map(formatUser);

    return res.json(usersResponse);
  } catch (e) {
    next(e);
  }
}

async function deleteUserRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = await deleteUser(req.params.userId);

    return res.json({
      data: {
        id: userId,
      },
      message: 'Successfully deleted user!',
    });
  } catch (e) {
    next(e);
  }
}

async function createUserRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await createUser(req.body as User);
    const usersResponse = formatUser(user);

    return res.json({
      data: usersResponse,
      message: 'Successfully created user!',
    });
  } catch (e) {
    next(e);
  }
}

async function updateUserRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await updateUser({
      ...(req.body as User),
      id: req.params.userId,
    });

    const usersResponse = formatUser(user);

    return res.json({
      data: usersResponse,
      message: 'Successfully updated user!',
    });
  } catch (e) {
    next(e);
  }
}

router.route('/').get(getUsersRoute);
router.route('/').post(createUserRoute);
router.route('/me').get(getCurrentUser);
router.route('/:userId').get(getUserRoute);
router.route('/:userId').put(updateUserRoute);
router.route('/:userId').delete(deleteUserRoute);

export default router;
