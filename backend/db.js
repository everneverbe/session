import Database from "better-sqlite3";
import fs from "fs";

const exists = fs.existsSync("./session.db");
const db = new Database("session.db");

if (!exists) {
  const schema = fs.readFileSync("./schema.sql", "utf8");
  db.exec(schema);
}

export default db;
