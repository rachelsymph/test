import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import NotFoundError from '../errors/NotFoundError';
import UnauthenticatedError from '../errors/UnauthenticatedError';
import { findOne as findUser } from '../models/UserModel';
import { authenticate } from '../services/AuthService';

export function configurePassport(passport: PassportStatic) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await authenticate({
          password,
          username,
        });

        return done(null, user);
      } catch (error) {
        switch (error.constructor) {
          case NotFoundError:
          case UnauthenticatedError:
            return done(null, false, {
              error: {
                code: error.errorCode,
                data: {
                  message: error.message,
                },
                message: error.message,
              },
            } as any);
          default:
            return done(error);
        }
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await findUser({
        id: id as string,
      });

      if (!user) {
        throw new NotFoundError();
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}
