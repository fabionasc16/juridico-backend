import { Router } from 'express';

import { tiposProcesso } from './TiposProcesso.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.status(200).json({ message: 'Hello, API' });
});

routes.use('/tipos-processo', tiposProcesso);

export { routes };
