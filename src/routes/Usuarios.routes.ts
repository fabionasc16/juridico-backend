import { Router } from 'express';

import { checkJWT } from '../middlewares/CheckJWT.middleware';
import { checkRole } from '../middlewares/CheckRoles.middleware';
import { AuthService } from '../services/Auth.service';

const userRoutes = Router();
const authService = new AuthService();

userRoutes.post('/', authService.createUsuario);
userRoutes.get('/all', authService.listAllUsuario);
userRoutes.get('/detalhes/:id', authService.listUsuarioById);
userRoutes.get('/cpf/:cpf', authService.listUsuarioByCPF);
userRoutes.delete('/:id', authService.deleteUsuario);
userRoutes.put('/:id', authService.updateUsuario);
userRoutes.put('/mudar-status/:id', authService.mudarStatusUsuario);

export { userRoutes };
