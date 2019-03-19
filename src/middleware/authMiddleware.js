import jwt from 'jsonwebtoken';
import {
  FORBIDDEN,
  UNAUTHORIZED,
} from 'http-status-codes';
import { Types } from 'mongoose';
import config from '../config/config';
import UserModel from '../model/userModel';

const authMiddleware = routeData => async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    try {
      const tokenData = await jwt.verify(token, config.security.secret);
      let userData = null;

      try {
        if (Types.ObjectId.isValid(tokenData.id)) {
          userData = await UserModel.findById(tokenData.id);
        }
      } catch (e) {
        return res.status(UNAUTHORIZED).send({
          message: 'JWT token content is not valid.',
        });
      }

      if (userData === null) {
        return res.status(UNAUTHORIZED).send({
          message: 'JWT token content is not valid.',
        });
      }

      req.authData = {
        userData,
        routeData,
      };

      if (!routeData.security) {
        next();
      }

      if (
        !(
          (routeData.security.roles && routeData.security.roles.includes(userData.role))
          || (routeData.security.allowOwnerAccess === true && userData.id === req.params.id)
        )
      ) {
        return res.status(FORBIDDEN).send({
          message: 'Insufficient permissions.',
        });
      }
    } catch (e) {
      return res.status(UNAUTHORIZED).send({
        message: 'JWT token is not valid.',
      });
    }

    return next();
  }

  return res.status(UNAUTHORIZED).send({
    message: 'JWT token is not present in `authorization` header.',
  });
};

export default authMiddleware;
