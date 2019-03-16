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

export default {
  index: {
    action: indexAction,
    method: HttpMethodsEnum.GET,
    path: '/',
  },
  login: {
    method: HttpMethodsEnum.POST,
    action: loginAction,
    path: '/auth/login',
    isAnonymous: true,
  },
  user: {
    method: HttpMethodsEnum.GET,
    action: getUserAction,
    path: '/users/:id',
  },
  userCreate: {
    method: HttpMethodsEnum.POST,
    action: createUserAction,
    path: '/users',
  },
  userDelete: {
    method: HttpMethodsEnum.DELETE,
    action: deleteUserAction,
    path: '/users/:id',
  },
  userEdit: {
    method: HttpMethodsEnum.PUT,
    action: editUserAction,
    path: '/users/:id',
  },
  users: {
    method: HttpMethodsEnum.GET,
    action: getUserListAction,
    path: '/users',
  },
};
