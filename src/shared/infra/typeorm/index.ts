import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import 'dotenv/config';

export default async (host = 'rentx-db'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  );
};
