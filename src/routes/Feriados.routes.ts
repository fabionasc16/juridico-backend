import { Router } from 'express';

import { FeriadosController } from '../controllers/Feriados.controller';
import { checkJWT } from '../middlewares/CheckJWT.middleware';
import { checkRole } from '../middlewares/CheckRoles.middleware';
import { AuthService } from '../services/Auth.service';

const feriadosRoutes = Router();
const controller = new FeriadosController();

feriadosRoutes.post(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.create,
);

feriadosRoutes.delete(
  '/:id_feriado',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.delete,
);

feriadosRoutes.post(
  '/list',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.read,
);

feriadosRoutes.get(
  '/id/:id_feriado',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.readById,
);

feriadosRoutes.put(
  '/:id_feriado',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.update,
);

export { feriadosRoutes };
