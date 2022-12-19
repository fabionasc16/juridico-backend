import { Router } from 'express';
import { checkJWT } from 'middlewares/CheckJWT.middleware';
import { checkRole } from 'middlewares/CheckRoles.middleware';
import { AuthService } from 'services/Auth.service';

import { ResponsaveisController } from '../controllers/Responsaveis.controller';

const responsaveisRoutes = Router();
const controller = new ResponsaveisController();

responsaveisRoutes.post(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.create,
);

responsaveisRoutes.delete(
  '/:id_responsavel',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.delete,
);

responsaveisRoutes.post(
  '/list',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.read,
);

responsaveisRoutes.get(
  '/id/:id_responsavel',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.readById,
);

responsaveisRoutes.put(
  '/:id_responsavel',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.update,
);

export { responsaveisRoutes };
