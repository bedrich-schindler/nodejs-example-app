import HttpMethodsEnum from 'http-methods-enum';
import { Router } from 'express';
import { notFoundAction } from '../controller/errorController';
import routerConfig from '../config/router';
import authMiddleware from './authMiddleware';

const router = Router();

Object.values(routerConfig).forEach((route) => {
  switch (route.method) {
    case HttpMethodsEnum.POST:
      if (route.isAnonymous) {
        router.route(route.path).post(route.action);
      } else {
        router.route(route.path).post(authMiddleware, route.action);
      }

      break;
    case HttpMethodsEnum.PUT:
      if (route.isAnonymous) {
        router.route(route.path).put(route.action);
      } else {
        router.route(route.path).put(authMiddleware, route.action);
      }

      break;
    case HttpMethodsEnum.DELETE:
      if (route.isAnonymous) {
        router.route(route.path).delete(route.action);
      } else {
        router.route(route.path).delete(authMiddleware, route.action);
      }

      break;
    default:
      if (route.isAnonymous) {
        router.route(route.path).get(route.action);
      } else {
        router.route(route.path).get(authMiddleware, route.action);
      }

      break;
  }
});

router.route('*').all(notFoundAction);

export default router;
