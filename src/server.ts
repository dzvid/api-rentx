import { categoriesRoutes } from '@routes/categories.routes';
import express from 'express';

const app = express();
const port = 3333;

app.use(express.json());

app.use('/categories', categoriesRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}.`));
