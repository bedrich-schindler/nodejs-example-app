import HttpMethodsEnum from 'http-methods-enum';
import { loginAction } from '../controller/authController';
import { indexAction } from '../controller/indexController';
import {
  createUserAction,
  deleteUserAction,
  editUserAction,
  getUserAction,
  getUserListAction,
} from '../controller/userController';
import {
  ROLE_ADMIN,
  ROLE_USER,
} from '../model/userModel';

export default {
  index: {
    action: indexAction,
    method: HttpMethodsEnum.GET,
    path: '/',
    security: {
      roles: [
        ROLE_ADMIN,
        ROLE_USER,
      ],
    },
  },
  login: {
    method: HttpMethodsEnum.POST,
    action: loginAction,
    path: '/auth/login',
  },
  user: {
    method: HttpMethodsEnum.GET,
    action: getUserAction,
    path: '/users/:id',
    security: {
      allowOwnerAccess: true,
      roles: [ROLE_ADMIN],
    },
  },
  userCreate: {
    method: HttpMethodsEnum.POST,
    action: createUserAction,
    path: '/users',
    security: {
      roles: [ROLE_ADMIN],
    },
  },
  userDelete: {
    method: HttpMethodsEnum.DELETE,
    action: deleteUserAction,
    path: '/users/:id',
    security: {
      roles: [ROLE_ADMIN],
    },
  },
  userEdit: {
    method: HttpMethodsEnum.PUT,
    action: editUserAction,
    path: '/users/:id',
    security: {
      allowOwnerAccess: true,
      roles: [ROLE_ADMIN],
    },
  },
  users: {
    method: HttpMethodsEnum.GET,
    action: getUserListAction,
    path: '/users',
    security: {
      roles: [ROLE_ADMIN],
    },
  },
};
