-- =============================================================================
-- SISTEMA MATRI-CLICK: DATOS SEMILLA (SEED DATA) DE PRUEBA
-- =============================================================================

-- 1. Usuarios en auth.users
INSERT INTO auth.users (id, nombre, email, password) VALUES
('a0000001-0000-0000-0000-000000000001', 'Admin Principal', 'admin@matriclick.edu.co', '$2a$12$eImiTXuWVxfM379Y4MARx.eG8m19V.kG7U0gUv1N3dIe1k/oM0Cee'),
('a0000001-0000-0000-0000-000000000002', 'Carlos Mario Restrepo', 'profesor.carlos@matriclick.edu.co', '$2a$12$eImiTXuWVxfM379Y4MARx.eG8m19V.kG7U0gUv1N3dIe1k/oM0Cee'),
('a0000001-0000-0000-0000-000000000003', 'Marta Elena Gómez', 'acudiente.marta@gmail.com', '$2a$12$eImiTXuWVxfM379Y4MARx.eG8m19V.kG7U0gUv1N3dIe1k/oM0Cee'),
('a0000001-0000-0000-0000-000000000004', 'Santiago Blandón', 'estudiante.santiago@matriclick.edu.co', '$2a$12$eImiTXuWVxfM379Y4MARx.eG8m19V.kG7U0gUv1N3dIe1k/oM0Cee')
ON CONFLICT (email) DO NOTHING;

-- 2. Sedes
INSERT INTO colegio.sedes (id_sede, nombre_sede, direccion, telefono) VALUES
(1, 'Sede Central - Los Rosales', 'Cra 43A # 12-45', '6044445501'),
(2, 'Sede Bachillerato - El Poblado', 'Calle 10 # 32-15', '6044445502'),
(3, 'Sede Primaria - La Floresta', 'Av San Juan # 78-20', '6044445503')
ON CONFLICT (id_sede) DO NOTHING;

-- 3. Grados
INSERT INTO colegio.grados (id_grado, nombre_grado, nivel_educativo) VALUES
(1, 'Primero (1°)', 'Básica Primaria'),
(2, 'Segundo (2°)', 'Básica Primaria'),
(3, 'Tercero (3°)', 'Básica Primaria'),
(4, 'Sexto (6°)', 'Básica Secundaria'),
(5, 'Séptimo (7°)', 'Básica Secundaria'),
(6, 'Décimo (10°)', 'Media Académica'),
(7, 'Undécimo (11°)', 'Media Académica')
ON CONFLICT (id_grado) DO NOTHING;

-- 4. Periodos Académicos
INSERT INTO colegio.periodos_academicos (id_periodo, nombre_periodo, fecha_inicio, fecha_fin, estado) VALUES
(1, '2026 - Primer Periodo', '2026-01-20', '2026-04-10', 'Activo'),
(2, '2026 - Segundo Periodo', '2026-04-13', '2026-06-26', 'Planificado'),
(3, '2026 - Tercer Periodo', '2026-07-13', '2026-09-18', 'Planificado'),
(4, '2026 - Cuarto Periodo', '2026-09-21', '2026-11-27', 'Planificado')
ON CONFLICT (id_periodo) DO NOTHING;

-- 5. Profesores
INSERT INTO colegio.profesores (id_profesor, user_id, documento, nombres, apellidos, telefono, correo_electronico, estado_profesor) VALUES
(1, 'a0000001-0000-0000-0000-000000000002', '71234567', 'Carlos Mario', 'Restrepo Jaramillo', '3104567890', 'profesor.carlos@matriclick.edu.co', 'Activo'),
(2, NULL, '43987654', 'Diana Marcela', 'Ospina Duque', '3157891234', 'diana.ospina@matriclick.edu.co', 'Activo')
ON CONFLICT (id_profesor) DO NOTHING;

-- 6. Acudientes
INSERT INTO colegio.acudientes (id_acudiente, user_id, tipo_documento, documento, nombres, apellidos, correo_electronico, direccion, parentesco) VALUES
(1, 'a0000001-0000-0000-0000-000000000003', 'CC', '43123890', 'Marta Elena', 'Gómez Zuluaga', 'acudiente.marta@gmail.com', 'Calle 45 # 80-12 Apto 302', 'Madre'),
(2, NULL, 'CC', '70987123', 'Rodrigo Andrés', 'Blandón Ortiz', 'rodrigo.blandon@yahoo.com', 'Calle 45 # 80-12 Apto 302', 'Padre')
ON CONFLICT (id_acudiente) DO NOTHING;

-- 7. Grupos
INSERT INTO colegio.grupos (id_grupo, id_grado, id_sede, nombre_grupo, cupo_maximo, id_director_grupo) VALUES
(1, 6, 2, 'Grupo 10-A', 35, 1),
(2, 6, 2, 'Grupo 10-B', 35, 2),
(3, 7, 2, 'Grupo 11-A', 32, 1)
ON CONFLICT (id_grupo) DO NOTHING;

-- 8. Estudiantes
INSERT INTO colegio.estudiantes (id_estudiante, user_id, tipo_documento, documento, nombres, apellidos, fecha_nacimiento, genero, id_acudiente, estado_estudiante) VALUES
(1, 'a0000001-0000-0000-0000-000000000004', 'TI', '1035987654', 'Santiago', 'Blandón Gómez', '2009-08-14', 'M', 1, 'Activo'),
(2, NULL, 'TI', '1035987655', 'Valentina', 'Hernández Castro', '2009-11-22', 'F', 2, 'Activo')
ON CONFLICT (id_estudiante) DO NOTHING;

-- 9. Matrículas
INSERT INTO colegio.matriculas (id_matricula, codigo_matricula, id_estudiante, id_periodo, id_grupo, fecha_matricula, estado_matricula, observaciones) VALUES
(1, 'MAT-2026-00101', 1, 1, 1, '2026-01-15', 'Matriculado', 'Matrícula ordinaria completada con paz y salvo'),
(2, 'MAT-2026-00102', 2, 1, 1, '2026-01-16', 'Matriculado', 'Estudiante remitida de traslado interinstitucional')
ON CONFLICT (id_matricula) DO NOTHING;

-- 10. Perfiles
INSERT INTO colegio.perfiles (id, rol, nombre_completo, id_profesor, id_acudiente, id_estudiante) VALUES
(1, 'Profesor', 'Carlos Mario Restrepo Jaramillo', 1, NULL, NULL),
(2, 'Acudiente', 'Marta Elena Gómez Zuluaga', NULL, 1, NULL),
(3, 'Estudiante', 'Santiago Blandón Gómez', NULL, NULL, 1)
ON CONFLICT (id) DO NOTHING;
