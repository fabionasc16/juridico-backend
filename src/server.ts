import * as dotenv from 'dotenv';

import { app } from './App.config';

dotenv.config({
  path: '../.env',
});

app.listen(process.env.PORT, () => {
  console.log(`Conectado na porta ${process.env.PORT}`);
});
