import '@config/environment';
import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import errorHandler from '@shared/infra/http/middlewares/errorHandler';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import createConnection from '@shared/infra/typeorm';

/** Dependency injection */
import '@shared/container';

import { router } from '@shared/infra/http/routes';

import upload from '@config/upload';

import swaggerConfig from '../../../swagger.json';

createConnection();
const app = express();

app.use(rateLimiter);
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));
app.use(cors());
app.use(router);
app.use(errorHandler);

export { app };
