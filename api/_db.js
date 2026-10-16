const path = require("path");
const Database = require("better-sqlite3");

const DB_PATH = path.join(process.cwd(), "matriclick.db");

function openDb() {
  return new Database(DB_PATH, { readonly: true, fileMustExist: true });
}

module.exports = { openDb, DB_PATH };
