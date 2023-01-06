import { Request, Response, NextFunction } from 'express';

export const checkRole = (roles: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles = req.user.roles;
    let accessDenied = true;
    if (userRoles) {
      for (let index = 0; index < userRoles.length; index += 1) {
        const role = userRoles[index];
        if (roles.includes(role)) {
          accessDenied = false;
          next();
          break;
        }
      }
    }

    if (accessDenied) {
      res.status(401).json({ message: 'Acesso negado!' });
    }
  };
};
