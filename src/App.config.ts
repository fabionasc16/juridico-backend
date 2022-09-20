import 'reflect-metadata';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';
import YAML from 'yamljs';

import { AppError } from './errors/AppError.class';

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

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        acknowledge: error.acknowledge,
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      acknowledge: false,
      status: 'Internal Server Error',
      message: `Error Log: ${error.message}`,
    });
  },
);

export { app };
