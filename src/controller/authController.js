import jwt from 'jsonwebtoken';
import {
  OK,
  UNAUTHORIZED,
} from 'http-status-codes';
import config from '../config/config';
import UserModel from '../model/userModel';
import {
  credentialsInFormatter,
  credentialsOutFormatter,
} from '../formatter/authFormatter';
import { userJwtTokenOutFormatter } from '../formatter/userFormatter';
import { handleErrorResponse } from '../helpers/errorResponseHelper';

export const loginAction = async (req, res) => {
  const credentials = credentialsInFormatter({}, req.body);
  let user = null;

  try {
    user = await UserModel.findOne({ email: credentials.email });
  } catch (e) {
    return handleErrorResponse(res, e);
  }

  if (user === null) {
    return res.status(UNAUTHORIZED).send({
      message: 'User has not been found or its credentials does not match.',
    });
  }

  if (!await user.comparePassword(credentials.password)) {
    return res.status(UNAUTHORIZED).send({
      message: 'User has not been found or its credentials does not match.',
    });
  }

  const token = jwt.sign(
    userJwtTokenOutFormatter(user),
    config.secret,
  );

  return res.status(OK).send(credentialsOutFormatter({ token }));
};
