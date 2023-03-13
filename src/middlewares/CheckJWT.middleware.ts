import { Request, Response, NextFunction } from 'express';

import { AuthService } from '../services/Auth.service';

export const checkJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = <string>req.headers.authorization;
  try {
    const user = await AuthService.verify(token);
    if (user) {
      req.user = user;
      req.user_name = user.nome;
      req.user_unit = user.unidadeUsuario[0].unit_name;
    } else {
      res.status(401).json({ message: 'Acesso negado ou Sessão expirada!' });
      return;
    }
    next();
  } catch (error) {
    res.status(500).send();
  }
};
