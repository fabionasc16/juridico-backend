import { Router } from 'express';

import { AssuntoController } from '../controllers/Assunto.controller';
import { checkJWT } from '../middlewares/CheckJWT.middleware';
import { checkRole } from '../middlewares/CheckRoles.middleware';
import { AuthService } from '../services/Auth.service';

const assuntoRoutes = Router();
const controller = new AssuntoController();

assuntoRoutes.post(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.create,
);

assuntoRoutes.delete(
  '/:id_assunto',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.delete,
);

assuntoRoutes.post(
  '/list',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.read,
);

assuntoRoutes.get(
  '/id/:id_assunto',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.readById,
);

assuntoRoutes.put(
  '/:id_assunto',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.update,
);

export { assuntoRoutes };
