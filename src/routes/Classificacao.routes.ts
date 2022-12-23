import { Router } from 'express';

import { ClassificacaoController } from '../controllers/Classificacao.controller';
import { checkJWT } from '../middlewares/CheckJWT.middleware';
import { checkRole } from '../middlewares/CheckRoles.middleware';
import { AuthService } from '../services/Auth.service';

const classificacaoRoutes = Router();
const controller = new ClassificacaoController();

classificacaoRoutes.post(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.create,
);

classificacaoRoutes.delete(
  '/:id_classificacao',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.delete,
);

classificacaoRoutes.get(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.read,
);

classificacaoRoutes.get(
  '/id/:id_classificacao',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.readById,
);

classificacaoRoutes.put(
  '/:id_classificacao',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.update,
);

export { classificacaoRoutes };
