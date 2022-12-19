import { Router } from 'express';
import { checkJWT } from 'middlewares/CheckJWT.middleware';
import { checkRole } from 'middlewares/CheckRoles.middleware';
import { AuthService } from 'services/Auth.service';

import { AssuntoController } from '../controllers/Assunto.controller';

const assuntoRoutes = Router();
const controller = new AssuntoController();

assuntoRoutes.post(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.create,
);

assuntoRoutes.delete(
  '/:id_assunto',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.delete,
);

assuntoRoutes.get(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.read,
);

assuntoRoutes.get(
  '/id/:id_assunto',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.readById,
);

assuntoRoutes.put(
  '/:id_assunto',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.update,
);

export { assuntoRoutes };
