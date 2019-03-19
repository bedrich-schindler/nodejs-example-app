import {
  CREATED,
  OK,
  NO_CONTENT,
} from 'http-status-codes';
import { Types } from 'mongoose';
import UserModel from '../model/userModel';
import {
  userDetailOutFormatter,
  userInFormatter,
  userListOutFormatter,
} from '../formatter/userFormatter';
import {
  handleErrorResponse,
  handleItemNotFoundResponse,
} from '../helpers/errorResponseHelper';

export const getUserAction = async (req, res) => {
  let user = null;

  try {
    if (Types.ObjectId.isValid(req.params.id)) {
      user = await UserModel.findById(req.params.id);
    }
  } catch (e) {
    return handleErrorResponse(res, e);
  }

  if (user === null) {
    return handleItemNotFoundResponse(res);
  }

  return res.status(OK).send(userDetailOutFormatter(user));
};

export const createUserAction = async (req, res) => {
  let user = new UserModel(userInFormatter({}, req.body));

  try {
    user = await user.save();
  } catch (e) {
    return handleErrorResponse(res, e);
  }

  return res.status(CREATED).send(userDetailOutFormatter(user));
};

export const deleteUserAction = async (req, res) => {
  let user = null;

  try {
    if (Types.ObjectId.isValid(req.params.id)) {
      user = await UserModel.findById(req.params.id);
    }
  } catch (e) {
    return handleErrorResponse(res, e);
  }

  if (user === null) {
    return handleItemNotFoundResponse(res);
  }

  try {
    await UserModel.remove({ id: req.params.id });
  } catch (e) {
    return handleErrorResponse(res, e);
  }

  return res.status(NO_CONTENT).send();
};

export const editUserAction = async (req, res) => {
  let user = null;

  try {
    if (Types.ObjectId.isValid(req.params.id)) {
      user = await UserModel.findById(req.params.id);
    }
  } catch (e) {
    return handleErrorResponse(res, e);
  }

  if (user === null) {
    return handleItemNotFoundResponse(res);
  }

  user = userInFormatter(user, req.body, req.authData.userData.role);

  try {
    user = await user.save();
  } catch (e) {
    return handleErrorResponse(res, e);
  }

  return res.status(OK).send(userDetailOutFormatter(user));
};

export const getUserListAction = async (req, res) => {
  let users = [];

  try {
    users = await UserModel.find();
  } catch (e) {
    return handleErrorResponse(res, e);
  }

  return res.status(OK).send(userListOutFormatter(users));
};
