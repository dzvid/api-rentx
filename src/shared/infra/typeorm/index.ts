import { createConnection, getConnectionOptions } from 'typeorm';

require('dotenv/config');

interface IOptions {
  host: string;
}

getConnectionOptions().then((options) => {
  const newOptions = options as IOptions;
  // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados no docker
  newOptions.host = process.env.DB_SERVICE_NAME;
  createConnection({
    ...options,
  });
});
