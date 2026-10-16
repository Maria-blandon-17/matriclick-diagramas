const { openDb } = require("./_db");

const ALLOWED_TABLES = [
  "auth_users", "colegio_sedes", "colegio_grados", "colegio_periodos_academicos",
  "colegio_profesores", "colegio_acudientes", "colegio_grupos", "colegio_estudiantes",
  "colegio_matriculas", "colegio_perfiles"
];

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");

  const tableName = req.query.table;

  if (!tableName) {
    res.status(400).json({ error: "Parámetro 'table' requerido" });
    return;
  }

  if (!ALLOWED_TABLES.includes(tableName)) {
    res.status(200).json({ status: "error", message: "Tabla no permitida o inexistente" });
    return;
  }

  try {
    const db = openDb();
    const records = db.prepare(`SELECT * FROM ${tableName} LIMIT 20;`).all();
    db.close();

    res.status(200).json({ status: "ok", table: tableName, count: records.length, records });
  } catch (err) {
    res.status(200).json({ status: "error", message: err.message });
  }
};
