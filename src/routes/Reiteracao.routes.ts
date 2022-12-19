import { Router } from 'express';
import { checkJWT } from 'middlewares/CheckJWT.middleware';
import { checkRole } from 'middlewares/CheckRoles.middleware';
import { AuthService } from 'services/Auth.service';

import { ReiteracaoController } from '../controllers/Reiteracao.controller';

const reiteracaoRoutes = Router();
const controller = new ReiteracaoController();

reiteracaoRoutes.post(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.create,
);

reiteracaoRoutes.delete(
  '/:id_reiteracao',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.delete,
);

reiteracaoRoutes.get(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.read,
);

reiteracaoRoutes.get(
  '/id/:id_reiteracao',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.readById,
);

reiteracaoRoutes.get(
  '/processo/:fk_processo',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.readByProcesso,
);

reiteracaoRoutes.put(
  '/:id_reiteracao',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.update,
);

export { reiteracaoRoutes };
