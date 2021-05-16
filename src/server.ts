import express from 'express';
import swaggerUi from 'swagger-ui-express';

import './database';
/** Dependency injection */
import './shared/container';

import { router } from './routes';
import swaggerConfig from './swagger.json';

const app = express();
const port = 3333;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use(router);

app.listen(port, () => console.log(`Server is running on port ${port}.`));
