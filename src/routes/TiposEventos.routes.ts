import { Router } from 'express';

import { TiposEventoController } from '../controllers/TiposEvento.controller';
import { checkJWT } from '../middlewares/CheckJWT.middleware';
import { checkRole } from '../middlewares/CheckRoles.middleware';
import { AuthService } from '../services/Auth.service';

const tiposEventosRoutes = Router();
const controller = new TiposEventoController();

tiposEventosRoutes.post(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.create,
);

tiposEventosRoutes.get(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.read,
);

tiposEventosRoutes.get(
  '/id/:id_tipoevento',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.readById,
);

tiposEventosRoutes.put(
  '/:id_tipoevento',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.update,
);

tiposEventosRoutes.delete(
  '/:id_tipoevento',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.delete,
);

export { tiposEventosRoutes };
