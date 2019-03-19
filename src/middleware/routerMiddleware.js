import HttpMethodsEnum from 'http-methods-enum';
import { Router } from 'express';
import { notFoundAction } from '../controller/errorController';
import routerConfig from '../config/router';
import authMiddleware from './authMiddleware';

const router = Router();

Object.values(routerConfig).forEach((route) => {
  switch (route.method) {
    case HttpMethodsEnum.POST:
      if (!route.security) {
        router.route(route.path).post(route.action);
      } else {
        router.route(route.path).post(authMiddleware(route), route.action);
      }

      break;
    case HttpMethodsEnum.PUT:
      if (!route.security) {
        router.route(route.path).put(route.action);
      } else {
        router.route(route.path).put(authMiddleware(route), route.action);
      }

      break;
    case HttpMethodsEnum.DELETE:
      if (!route.security) {
        router.route(route.path).delete(route.action);
      } else {
        router.route(route.path).delete(authMiddleware(route), route.action);
      }

      break;
    default:
      if (!route.security) {
        router.route(route.path).get(route.action);
      } else {
        router.route(route.path).get(authMiddleware(route), route.action);
      }

      break;
  }
});

router.route('*').all(notFoundAction);

export default router;
