import { Router } from 'express';

import { TiposProcessoController } from '../controllers/TiposProcesso.controller';
import { checkJWT } from '../middlewares/CheckJWT.middleware';
import { checkRole } from '../middlewares/CheckRoles.middleware';
import { AuthService } from '../services/Auth.service';

const tiposProcessoRoutes = Router();
const controller = new TiposProcessoController();

tiposProcessoRoutes.post(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.create,
);

tiposProcessoRoutes.get(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.read,
);

tiposProcessoRoutes.get(
  '/id/:id_tipoprocesso',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.readById,
);

tiposProcessoRoutes.put(
  '/:id_tipoprocesso',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.update,
);

tiposProcessoRoutes.delete(
  '/:id_tipoprocesso',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.delete,
);

export { tiposProcessoRoutes };
