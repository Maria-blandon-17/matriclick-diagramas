-- =============================================================================
-- SISTEMA MATRI-CLICK: BASE DE DATOS SQLITE EJECUTABLE LOCALMENTE
-- =============================================================================

PRAGMA foreign_keys = ON;

-- 1. TABLA: auth_users
CREATE TABLE IF NOT EXISTS auth_users (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    email_verified_at TEXT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- 2. TABLA: colegio_sedes
CREATE TABLE IF NOT EXISTS colegio_sedes (
    id_sede INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_sede TEXT NOT NULL,
    direccion TEXT NOT NULL,
    telefono TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

-- 3. TABLA: colegio_grados
CREATE TABLE IF NOT EXISTS colegio_grados (
    id_grado INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_grado TEXT NOT NULL,
    nivel_educativo TEXT NOT NULL
);

-- 4. TABLA: colegio_periodos_academicos
CREATE TABLE IF NOT EXISTS colegio_periodos_academicos (
    id_periodo INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_periodo TEXT NOT NULL,
    fecha_inicio TEXT NOT NULL,
    fecha_fin TEXT NOT NULL,
    estado TEXT DEFAULT 'Activo'
);

-- 5. TABLA: colegio_profesores
CREATE TABLE IF NOT EXISTS colegio_profesores (
    id_profesor INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT REFERENCES auth_users(id) ON DELETE SET NULL,
    documento TEXT NOT NULL UNIQUE,
    nombres TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    telefono TEXT,
    correo_electronico TEXT NOT NULL,
    estado_profesor TEXT DEFAULT 'Activo'
);

-- 6. TABLA: colegio_acudientes
CREATE TABLE IF NOT EXISTS colegio_acudientes (
    id_acudiente INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT REFERENCES auth_users(id) ON DELETE SET NULL,
    tipo_documento TEXT NOT NULL,
    documento TEXT NOT NULL UNIQUE,
    nombres TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    correo_electronico TEXT,
    direccion TEXT,
    parentesco TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
);

-- 7. TABLA: colegio_grupos
CREATE TABLE IF NOT EXISTS colegio_grupos (
    id_grupo INTEGER PRIMARY KEY AUTOINCREMENT,
    id_grado INTEGER NOT NULL REFERENCES colegio_grados(id_grado),
    id_sede INTEGER NOT NULL REFERENCES colegio_sedes(id_sede),
    nombre_grupo TEXT NOT NULL,
    cupo_maximo INTEGER NOT NULL DEFAULT 35,
    id_director_grupo INTEGER REFERENCES colegio_profesores(id_profesor) ON DELETE SET NULL
);

-- 8. TABLA: colegio_estudiantes
CREATE TABLE IF NOT EXISTS colegio_estudiantes (
    id_estudiante INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT REFERENCES auth_users(id) ON DELETE SET NULL,
    tipo_documento TEXT NOT NULL,
    documento TEXT NOT NULL UNIQUE,
    nombres TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    fecha_nacimiento TEXT NOT NULL,
    genero TEXT NOT NULL,
    id_acudiente INTEGER NOT NULL REFERENCES colegio_acudientes(id_acudiente),
    fecha_registro TEXT DEFAULT (datetime('now')),
    estado_estudiante TEXT DEFAULT 'Activo'
);

-- 9. TABLA: colegio_matriculas
CREATE TABLE IF NOT EXISTS colegio_matriculas (
    id_matricula INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_matricula TEXT NOT NULL UNIQUE,
    id_estudiante INTEGER NOT NULL REFERENCES colegio_estudiantes(id_estudiante) ON DELETE CASCADE,
    id_periodo INTEGER NOT NULL REFERENCES colegio_periodos_academicos(id_periodo),
    id_grupo INTEGER NOT NULL REFERENCES colegio_grupos(id_grupo),
    fecha_matricula TEXT DEFAULT (date('now')),
    estado_matricula TEXT DEFAULT 'Matriculado',
    observaciones TEXT
);

-- 10. TABLA: colegio_perfiles
CREATE TABLE IF NOT EXISTS colegio_perfiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rol TEXT NOT NULL,
    nombre_completo TEXT NOT NULL,
    id_profesor INTEGER REFERENCES colegio_profesores(id_profesor) ON DELETE CASCADE,
    id_acudiente INTEGER REFERENCES colegio_acudientes(id_acudiente) ON DELETE CASCADE,
    id_estudiante INTEGER REFERENCES colegio_estudiantes(id_estudiante) ON DELETE CASCADE,
    created_at TEXT DEFAULT (datetime('now'))
);
