import { Router } from 'express';

import { TiposProcessoController } from '../controllers/TiposProcess.controller';

const tiposProcesso = Router();
const controller = new TiposProcessoController();

tiposProcesso.post('/', controller.create);
tiposProcesso.get('/', controller.read);

export { tiposProcesso };
