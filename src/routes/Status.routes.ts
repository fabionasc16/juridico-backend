import { Router } from 'express';

import { StatusController } from '../controllers/Status.controller';
import { checkJWT } from '../middlewares/CheckJWT.middleware';
import { checkRole } from '../middlewares/CheckRoles.middleware';
import { AuthService } from '../services/Auth.service';

const statusRoutes = Router();
const controller = new StatusController();

statusRoutes.post(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.create,
);

statusRoutes.delete(
  '/:id_status',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.delete,
);

statusRoutes.get(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.read,
);

statusRoutes.get(
  '/id/:id_status',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.readById,
);

statusRoutes.get(
  '/aplicacaostatus',
  // checkJWT,
  // checkRole([AuthService.ROLES.ADMIN]),
  controller.readByAplicacao,
);

statusRoutes.put(
  '/:id_status',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.update,
);

export { statusRoutes };
