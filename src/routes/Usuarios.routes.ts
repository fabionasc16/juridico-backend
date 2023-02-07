import { Router } from 'express';

import { checkJWT } from '../middlewares/CheckJWT.middleware';
import { checkRole } from '../middlewares/CheckRoles.middleware';
import { AuthService } from '../services/Auth.service';

const userRoutes = Router();
const authService = new AuthService();

userRoutes.post(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  authService.createUsuario,
);

userRoutes.post(
  '/all',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  authService.listAllUsuario,
);

userRoutes.get(
  '/detalhes/:id',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  authService.listUsuarioById,
);

userRoutes.get(
  '/cpf/:cpf',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  authService.listUsuarioByCPF,
);

userRoutes.delete(
  '/:id',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  authService.deleteUsuario,
);

userRoutes.put(
  '/:id',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  authService.updateUsuario,
);

userRoutes.put(
  '/mudar-status/:id',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  authService.mudarStatusUsuario,
);

export { userRoutes };
