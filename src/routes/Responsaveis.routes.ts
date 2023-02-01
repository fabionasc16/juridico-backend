import { Router } from 'express';

import { ResponsaveisController } from '../controllers/Responsaveis.controller';
import { checkJWT } from '../middlewares/CheckJWT.middleware';
import { checkRole } from '../middlewares/CheckRoles.middleware';
import { AuthService } from '../services/Auth.service';

const responsaveisRoutes = Router();
const controller = new ResponsaveisController();

responsaveisRoutes.post(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.create,
);

responsaveisRoutes.delete(
  '/:id_responsavel',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.delete,
);

responsaveisRoutes.post(
  '/list',
  checkJWT,
  checkRole([
    AuthService.ROLES.ADMIN,
    AuthService.ROLES.ADVOGADO,
    AuthService.ROLES.RECEPCAO,
  ]),
  controller.read,
);

responsaveisRoutes.get(
  '/id/:id_responsavel',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.readById,
);

responsaveisRoutes.put(
  '/:id_responsavel',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.update,
);

responsaveisRoutes.get('/list', checkJWT, controller.listall);

export { responsaveisRoutes };
