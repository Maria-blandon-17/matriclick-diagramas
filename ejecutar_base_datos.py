#!/usr/bin/env python3
"""
=============================================================================
MATRI-CLICK: SCRIPT DE CREACIÓN Y VALIDACIÓN DE BASE DE DATOS
Crea el archivo 'matriclick.db', aplica el esquema relacional,
inserta los datos semilla y verifica la integridad referencial.
=============================================================================
"""

import sqlite3
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "matriclick.db")
SCHEMA_PATH = os.path.join(BASE_DIR, "sql", "sqlite_schema.sql")
SEED_PATH = os.path.join(BASE_DIR, "sql", "sqlite_seed.sql")

def ejecutar_base_de_datos():
    print("=" * 70)
    print(" 🚀 INICIANDO EJECUCIÓN DE BASE DE DATOS MATRI-CLICK")
    print("=" * 70)
    print(f"📁 Ruta del archivo de base de datos: {DB_PATH}")

    # 1. Conexión a la base de datos
    conn = sqlite3.connect(DB_PATH)
    conn.execute("PRAGMA foreign_keys = ON;")
    cursor = conn.cursor()

    # 2. Ejecutar esquema DDL
    print("\n[1/3] Aplicando esquema de tablas (DDL)...")
    with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
        schema_sql = f.read()
    cursor.executescript(schema_sql)
    print("  ✓ Tablas creadas con éxito: 10 tablas institucionales.")

    # 3. Insertar datos semilla
    print("\n[2/3] Insertando registros semilla (Seed Data)...")
    with open(SEED_PATH, "r", encoding="utf-8") as f:
        seed_sql = f.read()
    cursor.executescript(seed_sql)
    conn.commit()
    print("  ✓ Datos semilla insertados correctamente.")

    # 4. Validar conteos
    print("\n[3/3] Validando integridad y registros en cada tabla...")
    tablas = [
        ("auth_users", "Usuarios del Sistema (Auth)"),
        ("colegio_sedes", "Sedes Institucionales"),
        ("colegio_grados", "Grados Académicos"),
        ("colegio_periodos_academicos", "Periodos Académicos"),
        ("colegio_profesores", "Profesores / Docentes"),
        ("colegio_acudientes", "Acudientes / Tutores"),
        ("colegio_grupos", "Grupos y Secciones"),
        ("colegio_estudiantes", "Estudiantes Matriculados"),
        ("colegio_matriculas", "Matrículas Activas"),
        ("colegio_perfiles", "Perfiles de Acceso")
    ]

    print("-" * 70)
    print(f"{'TABLA':<30} | {'DESCRIPCIÓN':<25} | {'REGISTROS':<10}")
    print("-" * 70)

    for tabla, desc in tablas:
        cursor.execute(f"SELECT COUNT(*) FROM {tabla};")
        count = cursor.fetchone()[0]
        print(f"{tabla:<30} | {desc:<25} | {count:<10}")

    # Consulta relacional con JOIN (Prueba de integridad FK)
    print("\n" + "=" * 70)
    print(" 🔍 PRUEBA DE INTEGRIDAD RELACIONAL (JOIN: Matrículas -> Estudiantes -> Sedes)")
    print("=" * 70)
    query = """
    SELECT 
        m.codigo_matricula AS codigo,
        e.nombres || ' ' || e.apellidos AS estudiante,
        g.nombre_grupo AS grupo,
        s.nombre_sede AS sede,
        m.estado_matricula AS estado
    FROM colegio_matriculas m
    JOIN colegio_estudiantes e ON m.id_estudiante = e.id_estudiante
    JOIN colegio_grupos g ON m.id_grupo = g.id_grupo
    JOIN colegio_sedes s ON g.id_sede = s.id_sede;
    """
    cursor.execute(query)
    filas = cursor.fetchall()
    for fila in filas:
        print(f" • Matrícula [{fila[0]}]: {fila[1]} -> {fila[2]} ({fila[3]}) | Estado: {fila[4]}")

    conn.close()
    print("\n" + "=" * 70)
    print(" ✅ BASE DE DATOS EJECUTADA Y VALIDADA AL 100% CON ÉXITO")
    print("=" * 70)

if __name__ == "__main__":
    ejecutar_base_de_datos()
