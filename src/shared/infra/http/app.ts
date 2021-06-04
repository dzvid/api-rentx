import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import errorHandler from '@shared/infra/http/middlewares/errorHandler';
import createConnection from '@shared/infra/typeorm';
/** Dependency injection */
import '@shared/container';

import { router } from '@shared/infra/http/routes';

import swaggerConfig from '../../../swagger.json';

createConnection();
const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use(router);
app.use(errorHandler);

export { app };
