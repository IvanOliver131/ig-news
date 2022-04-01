import { Client } from 'faunadb';

// utilizar o fauna DB
export const fauna = new Client({
  secret: process.env.FAUNADB_KEY
});

