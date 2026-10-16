#!/usr/bin/env python3
"""
=============================================================================
MATRI-CLICK 3D: SERVIDOR WEB LOCAL CON API DE BASE DE DATOS
Sirve el visor 3D interactivo y provee endpoints JSON para consultar la BD.
=============================================================================
"""

import http.server
import socketserver
import sqlite3
import json
import os
import urllib.parse
import webbrowser
import threading
import time

PORT = 8080
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "matriclick.db")

class MatriClickHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        # API: Obtener resumen de todas las tablas y conteos en vivo
        if parsed.path == "/api/status":
            self.send_json_response(self.get_db_status())
            return
            
        # API: Obtener registros de una tabla específica
        if parsed.path == "/api/records":
            params = urllib.parse.parse_qs(parsed.query)
            table_name = params.get("table", [None])[0]
            if table_name:
                self.send_json_response(self.get_table_records(table_name))
            else:
                self.send_json_response({"error": "Parámetro 'table' requerido"}, status=400)
            return

        # Servir archivos estáticos normalmente
        super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def get_db_status(self):
        if not os.path.exists(DB_PATH):
            return {"status": "error", "message": "Base de datos no encontrada"}
        try:
            conn = sqlite3.connect(DB_PATH)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
            tables = [row["name"] for row in cursor.fetchall()]
            summary = {}
            for t in tables:
                cursor.execute(f"SELECT COUNT(*) as count FROM {t};")
                summary[t] = cursor.fetchone()["count"]
            conn.close()
            return {"status": "ok", "tables": summary, "totalTables": len(tables)}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def get_table_records(self, table_name):
        # Sanitizar nombre de tabla
        allowed_tables = [
            "auth_users", "colegio_sedes", "colegio_grados", "colegio_periodos_academicos",
            "colegio_profesores", "colegio_acudientes", "colegio_grupos", "colegio_estudiantes",
            "colegio_matriculas", "colegio_perfiles"
        ]
        if table_name not in allowed_tables:
            return {"status": "error", "message": "Tabla no permitida o inexistente"}
        try:
            conn = sqlite3.connect(DB_PATH)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute(f"SELECT * FROM {table_name} LIMIT 20;")
            rows = [dict(row) for row in cursor.fetchall()]
            conn.close()
            return {"status": "ok", "table": table_name, "count": len(rows), "records": rows}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def send_json_response(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

def open_browser():
    time.sleep(1.2)
    url = f"http://localhost:{PORT}"
    print(f"\n🌐 Abriendo navegador en: {url}")
    webbrowser.open(url)

def main():
    os.chdir(BASE_DIR)
    
    # Iniciar hilo para abrir el navegador
    threading.Thread(target=open_browser, daemon=True).start()

    print("=" * 70)
    print(" 🚀 SERVIDOR MATRI-CLICK 3D INICIADO CON ÉXITO")
    print("=" * 70)
    print(f" • Dirección local: http://localhost:{PORT}")
    print(f" • Base de datos activa: {DB_PATH}")
    print(" • Presiona Ctrl + C para detener el servidor")
    print("=" * 70)

    with socketserver.TCPServer(("", PORT), MatriClickHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido por el usuario.")

if __name__ == "__main__":
    main()
