import { NextFunction, Request, Response, Router } from 'express';
import HttpStatus from 'http-status-codes';
import { PassportStatic } from 'passport';

import { register as registerUser } from 'src/server/services/AuthService';
import { formatUser } from 'src/server/utils/UserUtils';

const router = Router();

export default function makeAuthRoutes(passport: PassportStatic) {
  async function login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', (error, user, info) => {
      if (error) throw error;

      if (!user) {
        return res.status(HttpStatus.BAD_REQUEST).json(info);
      }

      req.logIn(user, (e) => {
        if (e) throw e;

        res.sendStatus(HttpStatus.OK);
      });
    })(req, res, next);
  }

  function logout(req: Request, res: Response, next: NextFunction) {
    req.logout();

    return res.sendStatus(HttpStatus.OK);
  }

  async function register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await registerUser({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });

      res.json({
        data: formatUser(user),
        code: HttpStatus.OK,
        message: 'User registered successfully',
      });
    } catch (error) {
      req.log.info('Something went wrong upon registration');
      req.log.error(error);

      next(error);
    }
  }

  router.route('/logout').post(logout);
  router.route('/login').post(login);
  router.route('/register').post(register);

  return router;
}
