-- =============================================================================
-- SISTEMA MATRI-CLICK: MODELO DE BASE DE DATOS INSTITUCIONAL
-- Esquemas: 'auth' (Seguridad y Usuarios) y 'colegio' (Gestión Académica)
-- Compatible con PostgreSQL 13+ / Supabase
-- Generado a partir de los diagramas del sistema Matri-Click
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. CREACIÓN DE ESQUEMAS
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS colegio;

-- 2. TIPOS PERSONALIZADOS / ENUMS
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_nivel_educativo') THEN
        CREATE TYPE colegio.enum_nivel_educativo AS ENUM ('Preescolar', 'Básica Primaria', 'Básica Secundaria', 'Media');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_tipo_documento') THEN
        CREATE TYPE colegio.enum_tipo_documento AS ENUM ('RC', 'TI', 'CC', 'CE', 'Pasaporte', 'NES');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_genero') THEN
        CREATE TYPE colegio.enum_genero AS ENUM ('M', 'F', 'Otro');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_parentesco') THEN
        CREATE TYPE colegio.enum_parentesco AS ENUM ('Madre', 'Padre', 'Tutor Legal', 'Abuelo/a', 'Tío/a', 'Hermano/a', 'Otro');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_estado_profesor') THEN
        CREATE TYPE colegio.enum_estado_profesor AS ENUM ('Activo', 'Inactivo', 'Licencia');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_estado_estudiante') THEN
        CREATE TYPE colegio.enum_estado_estudiante AS ENUM ('Activo', 'Inactivo', 'Egresado', 'Suspendido');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_estado_periodo') THEN
        CREATE TYPE colegio.enum_estado_periodo AS ENUM ('Activo', 'Cerrado', 'Planificado');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_estado_matricula') THEN
        CREATE TYPE colegio.enum_estado_matricula AS ENUM ('Matriculado', 'Retirado', 'Graduado', 'Pendiente');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_rol') THEN
        CREATE TYPE colegio.enum_rol AS ENUM ('Administrador', 'Rector', 'Profesor', 'Acudiente', 'Estudiante');
    END IF;
END $$;

-- -----------------------------------------------------------------------------
-- TABLA: auth.users (Gestión centralizada de credenciales)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS auth.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP WITH TIME ZONE NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- TABLA: colegio.sedes (Planteles e infraestructura)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS colegio.sedes (
    id_sede SERIAL PRIMARY KEY,
    nombre_sede VARCHAR(100) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- TABLA: colegio.grados (Grados académicos ofrecidos)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS colegio.grados (
    id_grado SERIAL PRIMARY KEY,
    nombre_grado VARCHAR(50) NOT NULL,
    nivel_educativo VARCHAR(50) NOT NULL
);

-- -----------------------------------------------------------------------------
-- TABLA: colegio.periodos_academicos (Vigencias y bimestres)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS colegio.periodos_academicos (
    id_periodo SERIAL PRIMARY KEY,
    nombre_periodo VARCHAR(50) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado VARCHAR(20) DEFAULT 'Activo'
);

-- -----------------------------------------------------------------------------
-- TABLA: colegio.profesores (Docentes institucionales)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS colegio.profesores (
    id_profesor SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    documento VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    correo_electronico VARCHAR(100) NOT NULL,
    estado_profesor VARCHAR(20) DEFAULT 'Activo'
);

-- -----------------------------------------------------------------------------
-- TABLA: colegio.acudientes (Padres de familia y tutores legales)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS colegio.acudientes (
    id_acudiente SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    tipo_documento VARCHAR(20) NOT NULL,
    documento VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(100),
    direccion VARCHAR(150),
    parentesco VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- TABLA: colegio.grupos (Aulas y secciones por grado/sede)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS colegio.grupos (
    id_grupo SERIAL PRIMARY KEY,
    id_grado INT NOT NULL REFERENCES colegio.grados(id_grado) ON DELETE RESTRICT,
    id_sede INT NOT NULL REFERENCES colegio.sedes(id_sede) ON DELETE RESTRICT,
    nombre_grupo VARCHAR(50) NOT NULL,
    cupo_maximo INT NOT NULL DEFAULT 35,
    id_director_grupo INT REFERENCES colegio.profesores(id_profesor) ON DELETE SET NULL
);

-- -----------------------------------------------------------------------------
-- TABLA: colegio.estudiantes (Alumnado matriculado)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS colegio.estudiantes (
    id_estudiante SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    tipo_documento VARCHAR(20) NOT NULL,
    documento VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero VARCHAR(10) NOT NULL,
    id_acudiente INT NOT NULL REFERENCES colegio.acudientes(id_acudiente) ON DELETE RESTRICT,
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    estado_estudiante VARCHAR(20) DEFAULT 'Activo'
);

-- -----------------------------------------------------------------------------
-- TABLA: colegio.matriculas (Registro de matrícula académica activa)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS colegio.matriculas (
    id_matricula SERIAL PRIMARY KEY,
    codigo_matricula VARCHAR(50) NOT NULL UNIQUE,
    id_estudiante INT NOT NULL REFERENCES colegio.estudiantes(id_estudiante) ON DELETE CASCADE,
    id_periodo INT NOT NULL REFERENCES colegio.periodos_academicos(id_periodo) ON DELETE RESTRICT,
    id_grupo INT NOT NULL REFERENCES colegio.grupos(id_grupo) ON DELETE RESTRICT,
    fecha_matricula DATE NOT NULL DEFAULT CURRENT_DATE,
    estado_matricula VARCHAR(20) DEFAULT 'Matriculado',
    observaciones TEXT
);

-- -----------------------------------------------------------------------------
-- TABLA: colegio.perfiles (Roles y vinculación transversal en el sistema)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS colegio.perfiles (
    id SERIAL PRIMARY KEY,
    rol VARCHAR(50) NOT NULL,
    nombre_completo VARCHAR(200) NOT NULL,
    id_profesor INT REFERENCES colegio.profesores(id_profesor) ON DELETE CASCADE,
    id_acudiente INT REFERENCES colegio.acudientes(id_acudiente) ON DELETE CASCADE,
    id_estudiante INT REFERENCES colegio.estudiantes(id_estudiante) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- ÍNDICES DE RENDIMIENTO PARA LLAVES FORÁNEAS (FKs)
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_grupos_grado ON colegio.grupos(id_grado);
CREATE INDEX IF NOT EXISTS idx_grupos_sede ON colegio.grupos(id_sede);
CREATE INDEX IF NOT EXISTS idx_grupos_director ON colegio.grupos(id_director_grupo);
CREATE INDEX IF NOT EXISTS idx_estudiantes_acudiente ON colegio.estudiantes(id_acudiente);
CREATE INDEX IF NOT EXISTS idx_estudiantes_user ON colegio.estudiantes(user_id);
CREATE INDEX IF NOT EXISTS idx_profesores_user ON colegio.profesores(user_id);
CREATE INDEX IF NOT EXISTS idx_acudientes_user ON colegio.acudientes(user_id);
CREATE INDEX IF NOT EXISTS idx_matriculas_estudiante ON colegio.matriculas(id_estudiante);
CREATE INDEX IF NOT EXISTS idx_matriculas_periodo ON colegio.matriculas(id_periodo);
CREATE INDEX IF NOT EXISTS idx_matriculas_grupo ON colegio.matriculas(id_grupo);
CREATE INDEX IF NOT EXISTS idx_perfiles_profesor ON colegio.perfiles(id_profesor);
CREATE INDEX IF NOT EXISTS idx_perfiles_acudiente ON colegio.perfiles(id_acudiente);
CREATE INDEX IF NOT EXISTS idx_perfiles_estudiante ON colegio.perfiles(id_estudiante);
