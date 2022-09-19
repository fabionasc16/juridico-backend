import 'reflect-metadata';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';
import YAML from 'yamljs';

const app = express();
const swaggerDocument = YAML.load('./src/docs/swagger.yaml');

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  }),
);
app.use(express.json());
app.use(morgan('combined'));
app.use(
  '/api/v1/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customSiteTitle: 'Juridico API - Docs',
  }),
);

export { app };
