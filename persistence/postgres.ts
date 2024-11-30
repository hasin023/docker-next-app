import { Client } from "pg";
import waitPort from "wait-port";

const {
  POSTGRES_HOST: HOST,
  POSTGRES_USER: USER,
  POSTGRES_PASSWORD: PASSWORD,
  POSTGRES_DB: DB,
} = process.env;

let client: Client | null = null;

async function initClient() {
  if (!client) {
    const host = HOST || "db";
    const user = USER || "postgres";
    const password = PASSWORD || "example";
    const database = DB || "example";

    // Wait for the PostgreSQL container to be ready
    await waitPort({ host, port: 5432, timeout: 10000, waitForDns: true });

    client = new Client({ host, user, password, database });

    try {
      await client.connect();
      console.log(`Connected to PostgreSQL at host: ${host}`);
      await createTables();
    } catch (err) {
      console.error("Unable to connect to the database:", err);
    }
  }
}

async function createUsersTable() {
  return client?.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      username VARCHAR(255),
      email VARCHAR(255),
      password VARCHAR(255),
      role VARCHAR(50)
    )
  `);
}

async function createNotesTable() {
  return client?.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      content TEXT,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    )
  `);
}

// Centralized function to create all tables
async function createTables() {
  try {
    await createUsersTable();
    console.log("Created users table");
    await createNotesTable();
    console.log("Created notes table");
  } catch (err) {
    console.error("Error creating tables:", err);
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
