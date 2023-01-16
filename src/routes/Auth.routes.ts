import { Router } from 'express';

import { AuthService } from '../services/Auth.service';

const authRoutes = Router();
const authService = new AuthService();

authRoutes.post('/login', authService.authenticate);
authRoutes.get('/profiles', authService.profiles);
authRoutes.get('/profiles/sapej', authService.profilesSapej);
authRoutes.get('/user/exists/:cpf', authService.findUsuarioByCpf);
authRoutes.post('/forgotpassword', authService.forgotPass);
authRoutes.post('/resetpassword', authService.resetPassword);
authRoutes.post('/cancelrequest', authService.cancelRequest);
authRoutes.post('/verify', authService.verifyRole);
authRoutes.post('/verify-token', authService.verifyJWT);
authRoutes.post('/logout', authService.logout);
authRoutes.post('/reset-pass', authService.updatePassword);
authRoutes.post('/refresh-token', authService.refreshToken);
export { authRoutes };
