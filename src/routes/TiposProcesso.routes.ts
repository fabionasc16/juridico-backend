import { Router } from 'express';
import { checkJWT } from 'middlewares/CheckJWT.middleware';
import { checkRole } from 'middlewares/CheckRoles.middleware';
import { AuthService } from 'services/Auth.service';

import { TiposProcessoController } from '../controllers/TiposProcesso.controller';

const tiposProcessoRoutes = Router();
const controller = new TiposProcessoController();

tiposProcessoRoutes.post(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.create,
);

tiposProcessoRoutes.get(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.read,
);

tiposProcessoRoutes.get(
  '/id/:id_tipoprocesso',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.readById,
);

tiposProcessoRoutes.put(
  '/:id_tipoprocesso',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.update,
);

tiposProcessoRoutes.delete(
  '/:id_tipoprocesso',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.delete,
);

export { tiposProcessoRoutes };
