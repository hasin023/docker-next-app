import { Client } from "pg";
import fs from "fs";
import waitPort from "wait-port";

const {
  POSTGRES_HOST: HOST,
  POSTGRES_HOST_FILE: HOST_FILE,
  POSTGRES_USER: USER,
  POSTGRES_USER_FILE: USER_FILE,
  POSTGRES_PASSWORD: PASSWORD,
  POSTGRES_PASSWORD_FILE: PASSWORD_FILE,
  POSTGRES_DB: DB,
  POSTGRES_DB_FILE: DB_FILE,
} = process.env;

let client: Client | null = null;

async function initClient() {
  if (!client) {
    const host = HOST_FILE ? fs.readFileSync(HOST_FILE, "utf8") : HOST;
    const user = USER_FILE ? fs.readFileSync(USER_FILE, "utf8") : USER;
    const password = PASSWORD_FILE ? fs.readFileSync(PASSWORD_FILE, "utf8") : PASSWORD;
    const database = DB_FILE ? fs.readFileSync(DB_FILE, "utf8") : DB;

    await waitPort({ host, port: 5432, timeout: 10000, waitForDns: true });

    client = new Client({ host, user, password, database });

    await client.connect();
    console.log(`Connected to postgres db at host ${HOST}`);

    await client.query(
      "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255), username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), role VARCHAR(50))"
    );
    console.log("Connected to db and created table users if it did not exist");
  }
}

async function teardownClient() {
  if (client) {
    await client.end();
    client = null;
    console.log("Database client ended");
  }
}

function getClient() {
  if (!client) throw new Error("Client not initialized. Call initClient first.");
  return client;
}

export { initClient, teardownClient, getClient };
