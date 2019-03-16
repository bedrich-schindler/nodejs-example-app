import jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from 'http-status-codes';
import config from '../config/config';

const authMiddleware = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    try {
      await jwt.verify(token, config.secret);
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
