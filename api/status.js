const fs = require("fs");
const { openDb, DB_PATH } = require("./_db");

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");

  if (!fs.existsSync(DB_PATH)) {
    res.status(200).json({ status: "error", message: "Base de datos no encontrada" });
    return;
  }

  try {
    const db = openDb();
    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
      .all()
      .map((row) => row.name);

    const summary = {};
    for (const t of tables) {
      const { count } = db.prepare(`SELECT COUNT(*) as count FROM ${t};`).get();
      summary[t] = count;
    }
    db.close();

    res.status(200).json({ status: "ok", tables: summary, totalTables: tables.length });
  } catch (err) {
    res.status(200).json({ status: "error", message: err.message });
  }
};
