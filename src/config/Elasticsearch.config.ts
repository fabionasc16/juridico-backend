import { Client } from 'es7';

export const client = new Client({
  node: 'https://192.168.107.27:9300',
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASS,
  },  
  ssl: {
    rejectUnauthorized: false
  },
  requestTimeout: 10000,
});
