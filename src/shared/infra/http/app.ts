import '@config/environment';
import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

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
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));
app.use(cors());
app.use(router);

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

export { app };
