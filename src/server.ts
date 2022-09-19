import { app } from './App.config';

app.listen(process.env.PORT, () => {
  console.log(`Conectado na porta ${process.env.PORT}`);
});
