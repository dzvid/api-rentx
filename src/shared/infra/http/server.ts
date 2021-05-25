import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import errorHandler from '@shared/infra/http/middlewares/errorHandler';

import '@shared/infra/typeorm';
/** Dependency injection */
import '@shared/container';

import { router } from '@shared/infra/http/routes';

import swaggerConfig from '../../../swagger.json';

const app = express();
const port = 3333;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use(router);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}.`));
