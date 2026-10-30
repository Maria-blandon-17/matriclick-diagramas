// =============================================================================
// MATRI-CLICK: DEFINICIÓN DE DATOS Y METADATOS DE LA BASE DE DATOS
// Tablas, columnas, tipos de datos, llaves (PK/FK) y relaciones entre tablas.
// Basado fielmente en los diagramas del sistema Matri-Click.
// =============================================================================

const DATABASE_METADATA = {
    info: {
        title: "Matri-Click - Base de Datos Institucional",
        description: "Sistema integral de gestión de matrículas, sedes, estudiantes, docentes y usuarios.",
        schemas: ["colegio", "auth"],
        totalTables: 10,
        totalRelations: 13
    },
    tables: [
        {
            id: "sedes",
            name: "sedes",
            schema: "colegio",
            fullName: "colegio.sedes",
            displayNameER: "SEDES",
            displayNameUML: "sedes",
            color: "#9C27B0", // Violeta institucional
            accentColor: "#E1BEE7",
            posOriginal: { x: -480, y: 240, z: 20 },
            posLayered: { x: -450, y: 220, z: -100 },
            posOrbital: { x: -420, y: 150, z: -200 },
            description: "Registra los planteles físicos e infraestructura de la institución educativa.",
            columns: [
                { name: "id_sede", type: "int", isPK: true, isFK: false, desc: "Identificador único de la sede" },
                { name: "nombre_sede", type: "varchar(100)", isPK: false, isFK: false, desc: "Nombre oficial del plantel" },
                { name: "direccion", type: "varchar(150)", isPK: false, isFK: false, desc: "Ubicación física" },
                { name: "telefono", type: "varchar(20)", isPK: false, isFK: false, desc: "Línea de contacto" },
                { name: "created_at", type: "timestamp", isPK: false, isFK: false, desc: "Fecha de registro" }
            ]
        },
        {
            id: "grados",
            name: "grados",
            schema: "colegio",
            fullName: "colegio.grados",
            displayNameER: "GRADOS",
            displayNameUML: "grados",
            color: "#00ACC1", // Cian / Turquesa
            accentColor: "#B2EBF2",
            posOriginal: { x: -480, y: 20, z: 20 },
            posLayered: { x: -450, y: 0, z: -100 },
            posOrbital: { x: -420, y: -120, z: -150 },
            description: "Grados académicos impartidos (1° a 11°, preescolar, secundaria, media).",
            columns: [
                { name: "id_grado", type: "int", isPK: true, isFK: false, desc: "Identificador único del grado" },
                { name: "nombre_grado", type: "varchar(50)", isPK: false, isFK: false, desc: "Nombre del grado (ej: Décimo)" },
                { name: "nivel_educativo", type: "varchar(50)", isPK: false, isFK: false, desc: "Nivel escolar (Primaria, Media, etc.)" }
            ]
        },
        {
            id: "periodos_academicos",
            name: "periodos_academicos",
            schema: "colegio",
            fullName: "colegio.periodos_academicos",
            displayNameER: "PERIODOS_ACADEMICOS",
            displayNameUML: "periodos_academicos",
            color: "#FFA000", // Ámbar / Dorado
            accentColor: "#FFE082",
            posOriginal: { x: -480, y: -200, z: 20 },
            posLayered: { x: -450, y: -220, z: -100 },
            posOrbital: { x: -200, y: -280, z: 0 },
            description: "Vigencias lectivas anuales y trimestres/semestres de calificación.",
            columns: [
                { name: "id_periodo", type: "int", isPK: true, isFK: false, desc: "Identificador único del periodo" },
                { name: "nombre_periodo", type: "varchar(50)", isPK: false, isFK: false, desc: "Ej: 2026 - Periodo 1" },
                { name: "fecha_inicio", type: "date", isPK: false, isFK: false, desc: "Inicio de actividades académicas" },
                { name: "fecha_fin", type: "date", isPK: false, isFK: false, desc: "Cierre del periodo" },
                { name: "estado", type: "varchar(20)", isPK: false, isFK: false, desc: "Activo, Cerrado, Planificado" }
            ]
        },
        {
            id: "grupos",
            name: "grupos",
            schema: "colegio",
            fullName: "colegio.grupos",
            displayNameER: "GRUPOS",
            displayNameUML: "grupos",
            color: "#E91E63", // Rosa fucsia
            accentColor: "#F8BBD0",
            posOriginal: { x: -160, y: 240, z: 0 },
            posLayered: { x: -150, y: 150, z: 0 },
            posOrbital: { x: 0, y: 250, z: -250 },
            description: "Aulas o secciones de clase por grado y sede institucional.",
            columns: [
                { name: "id_grupo", type: "int", isPK: true, isFK: false, desc: "Identificador del grupo" },
                { name: "id_grado", type: "int", isPK: false, isFK: true, desc: "Grado asignado", ref: "colegio.grados(id_grado)" },
                { name: "id_sede", type: "int", isPK: false, isFK: true, desc: "Sede física", ref: "colegio.sedes(id_sede)" },
                { name: "nombre_grupo", type: "varchar(50)", isPK: false, isFK: false, desc: "Ej: 10-A, 11-B" },
                { name: "cupo_maximo", type: "int", isPK: false, isFK: false, desc: "Límite de estudiantes en aula" },
                { name: "id_director_grupo", type: "int", isPK: false, isFK: true, desc: "Docente a cargo", ref: "colegio.profesores(id_profesor)" }
            ]
        },
        {
            id: "profesores",
            name: "profesores",
            schema: "colegio",
            fullName: "colegio.profesores",
            displayNameER: "PROFESORES",
            displayNameUML: "profesores",
            color: "#1E88E5", // Azul docente
            accentColor: "#BBDEFB",
            posOriginal: { x: 170, y: 240, z: 0 },
            posLayered: { x: 180, y: 200, z: 0 },
            posOrbital: { x: 300, y: 180, z: -150 },
            description: "Plantel docente y directores de aula de la institución.",
            columns: [
                { name: "id_profesor", type: "int", isPK: true, isFK: false, desc: "Identificador de profesor" },
                { name: "documento", type: "varchar(20)", isPK: false, isFK: false, desc: "Cédula o documento oficial" },
                { name: "nombres", type: "varchar(100)", isPK: false, isFK: false, desc: "Nombres del docente" },
                { name: "apellidos", type: "varchar(100)", isPK: false, isFK: false, desc: "Apellidos del docente" },
                { name: "telefono", type: "varchar(20)", isPK: false, isFK: false, desc: "Teléfono móvil o fijo" },
                { name: "correo_electronico", type: "varchar(100)", isPK: false, isFK: false, desc: "Email de contacto" },
                { name: "estado_profesor", type: "varchar(20)", isPK: false, isFK: false, desc: "Activo, Inactivo, Licencia" }
            ]
        },
        {
            id: "matriculas",
            name: "matriculas",
            schema: "colegio",
            fullName: "colegio.matriculas",
            displayNameER: "MATRICULAS",
            displayNameUML: "matriculas",
            color: "#E53935", // Rojo vibrante (nodo central)
            accentColor: "#FFCDD2",
            posOriginal: { x: -160, y: -100, z: 0 },
            posLayered: { x: 0, y: -50, z: 120 },
            posOrbital: { x: 0, y: 0, z: 0 },
            description: "Núcleo de matrículas: vincula estudiante, periodo lectivo y grupo.",
            columns: [
                { name: "id_matricula", type: "int", isPK: true, isFK: false, desc: "Identificador único de la matrícula" },
                { name: "codigo_matricula", type: "varchar(50)", isPK: false, isFK: false, desc: "Código único de radicado escolar" },
                { name: "id_estudiante", type: "int", isPK: false, isFK: true, desc: "Estudiante matriculado", ref: "colegio.estudiantes(id_estudiante)" },
                { name: "id_periodo", type: "int", isPK: false, isFK: true, desc: "Periodo lectivo", ref: "colegio.periodos_academicos(id_periodo)" },
                { name: "id_grupo", type: "int", isPK: false, isFK: true, desc: "Grupo asignado", ref: "colegio.grupos(id_grupo)" },
                { name: "fecha_matricula", type: "date", isPK: false, isFK: false, desc: "Fecha de expedición" },
                { name: "estado_matricula", type: "varchar(20)", isPK: false, isFK: false, desc: "Matriculado, Retirado, Pendiente" },
                { name: "observaciones", type: "text", isPK: false, isFK: false, desc: "Anotaciones disciplinarias o médicas" }
            ]
        },
        {
            id: "estudiantes",
            name: "estudiantes",
            schema: "colegio",
            fullName: "colegio.estudiantes",
            displayNameER: "ESTUDIANTES",
            displayNameUML: "estudiantes",
            color: "#2E7D32", // Verde bosque
            accentColor: "#C8E6C9",
            posOriginal: { x: 170, y: -110, z: 0 },
            posLayered: { x: 200, y: -100, z: 80 },
            posOrbital: { x: 380, y: -80, z: 80 },
            description: "Registro de alumnos y su vínculo con acudientes responsables.",
            columns: [
                { name: "id_estudiante", type: "int", isPK: true, isFK: false, desc: "Identificador del estudiante" },
                { name: "tipo_documento", type: "varchar(20)", isPK: false, isFK: false, desc: "TI, RC, CC, CE" },
                { name: "documento", type: "varchar(20)", isPK: false, isFK: false, desc: "Número de identificación" },
                { name: "nombres", type: "varchar(100)", isPK: false, isFK: false, desc: "Nombres completos" },
                { name: "apellidos", type: "varchar(100)", isPK: false, isFK: false, desc: "Apellidos completos" },
                { name: "fecha_nacimiento", type: "date", isPK: false, isFK: false, desc: "Fecha de nacimiento" },
                { name: "genero", type: "varchar(10)", isPK: false, isFK: false, desc: "M, F, Otro" },
                { name: "id_acudiente", type: "int", isPK: false, isFK: true, desc: "Tutor o acudiente legal", ref: "colegio.acudientes(id_acudiente)" },
                { name: "fecha_registro", type: "timestamp", isPK: false, isFK: false, desc: "Fecha de alta en plataforma" },
                { name: "estado_estudiante", type: "varchar(20)", isPK: false, isFK: false, desc: "Activo, Egresado, Retirado" }
            ]
        },
        {
            id: "acudientes",
            name: "acudientes",
            schema: "colegio",
            fullName: "colegio.acudientes",
            displayNameER: "ACUDIENTES",
            displayNameUML: "acudientes",
            color: "#00897B", // Verde azulado / Teal
            accentColor: "#B2DFDB",
            posOriginal: { x: 500, y: -110, z: 20 },
            posLayered: { x: 480, y: -120, z: -50 },
            posOrbital: { x: 280, y: -240, z: 200 },
            description: "Padres de familia, tutores o acudientes autorizados para el menor.",
            columns: [
                { name: "id_acudiente", type: "int", isPK: true, isFK: false, desc: "Identificador del acudiente" },
                { name: "tipo_documento", type: "varchar(20)", isPK: false, isFK: false, desc: "CC, Pasaporte, CE" },
                { name: "documento", type: "varchar(20)", isPK: false, isFK: false, desc: "Número de identificación" },
                { name: "nombres", type: "varchar(100)", isPK: false, isFK: false, desc: "Nombres del acudiente" },
                { name: "apellidos", type: "varchar(100)", isPK: false, isFK: false, desc: "Apellidos del acudiente" },
                { name: "correo_electronico", type: "varchar(100)", isPK: false, isFK: false, desc: "Email de notificación" },
                { name: "direccion", type: "varchar(150)", isPK: false, isFK: false, desc: "Dirección de residencia" },
                { name: "parentesco", type: "varchar(50)", isPK: false, isFK: false, desc: "Madre, Padre, Tutor, Abuelo/a" },
                { name: "created_at", type: "timestamp", isPK: false, isFK: false, desc: "Fecha de registro" }
            ]
        },
        {
            id: "auth_users",
            name: "users",
            schema: "auth",
            fullName: "auth.users",
            displayNameER: "USERS",
            displayNameUML: "users",
            color: "#3F51B5", // Índigo / Violeta azulado
            accentColor: "#C5CAE9",
            posOriginal: { x: -160, y: -380, z: 20 },
            posLayered: { x: -200, y: -360, z: 100 },
            posOrbital: { x: -150, y: 120, z: 250 },
            description: "Esquema de autenticación centralizado (estilo Supabase/PostgreSQL Auth).",
            columns: [
                { name: "id", type: "uuid", isPK: true, isFK: false, desc: "UUID global de seguridad" },
                { name: "nombre", type: "varchar(50)", isPK: false, isFK: false, desc: "Nombre de cuenta" },
                { name: "email", type: "varchar(100)", isPK: false, isFK: false, desc: "Correo electrónico único" },
                { name: "email_verified_at", type: "timestamp", isPK: false, isFK: false, desc: "Verificación de email" },
                { name: "password", type: "varchar(255)", isPK: false, isFK: false, desc: "Hash criptográfico de contraseña" },
                { name: "created_at", type: "timestamp", isPK: false, isFK: false, desc: "Fecha de alta" },
                { name: "updated_at", type: "timestamp", isPK: false, isFK: false, desc: "Última modificación" }
            ]
        },
        {
            id: "perfiles",
            name: "perfiles",
            schema: "colegio",
            fullName: "colegio.perfiles",
            displayNameER: "PERFILES",
            displayNameUML: "perfiles",
            color: "#7B1FA2", // Púrpura oscuro
            accentColor: "#E1BEE7",
            posOriginal: { x: 500, y: 240, z: 20 },
            posLayered: { x: 450, y: 150, z: -50 },
            posOrbital: { x: 100, y: -160, z: -280 },
            description: "Control de roles y vinculaciones transversales de usuarios del sistema.",
            columns: [
                { name: "id", type: "int", isPK: true, isFK: false, desc: "Identificador del perfil" },
                { name: "rol", type: "varchar(50)", isPK: false, isFK: false, desc: "Profesor, Acudiente, Estudiante, etc." },
                { name: "nombre_completo", type: "varchar(200)", isPK: false, isFK: false, desc: "Nombre consolidado" },
                { name: "id_profesor", type: "int", isPK: false, isFK: true, desc: "Enlace si es docente", ref: "colegio.profesores(id_profesor)" },
                { name: "id_acudiente", type: "int", isPK: false, isFK: true, desc: "Enlace si es acudiente", ref: "colegio.acudientes(id_acudiente)" },
                { name: "id_estudiante", type: "int", isPK: false, isFK: true, desc: "Enlace si es estudiante", ref: "colegio.estudiantes(id_estudiante)" },
                { name: "created_at", type: "timestamp", isPK: false, isFK: false, desc: "Fecha de vinculación" }
            ]
        }
    ],
    relations: [
        {
            id: "rel_sedes_grupos",
            fromTable: "sedes",
            toTable: "grupos",
            fromCol: "id_sede",
            toCol: "id_sede",
            cardinalityPhysical: "1 : ∞",
            verbERD: "tiene",
            verbUML: "se encuentra en",
            multUML: "1  ───  0..*",
            color: "#9C27B0",
            description: "Una sede institucional alberga varios grupos de estudiantes."
        },
        {
            id: "rel_grados_grupos",
            fromTable: "grados",
            toTable: "grupos",
            fromCol: "id_grado",
            toCol: "id_grado",
            cardinalityPhysical: "1 : ∞",
            verbERD: "tiene",
            verbUML: "tiene",
            multUML: "1  ───  0..*",
            color: "#00ACC1",
            description: "Un grado académico cuenta con múltiples grupos (ej: 10-A, 10-B)."
        },
        {
            id: "rel_profesores_grupos",
            fromTable: "profesores",
            toTable: "grupos",
            fromCol: "id_profesor",
            toCol: "id_director_grupo",
            cardinalityPhysical: "1 : 1",
            verbERD: "tiene",
            verbUML: "dicta",
            multUML: "1  ───  0..*",
            color: "#1E88E5",
            description: "Un profesor actúa como director de grupo para la sección."
        },
        {
            id: "rel_grupos_matriculas",
            fromTable: "grupos",
            toTable: "matriculas",
            fromCol: "id_grupo",
            toCol: "id_grupo",
            cardinalityPhysical: "1 : ∞",
            verbERD: "tiene",
            verbUML: "tiene",
            multUML: "1  ───  0..*",
            color: "#E91E63",
            description: "Un grupo agrupa múltiples matrículas de estudiantes."
        },
        {
            id: "rel_periodos_matriculas",
            fromTable: "periodos_academicos",
            toTable: "matriculas",
            fromCol: "id_periodo",
            toCol: "id_periodo",
            cardinalityPhysical: "1 : ∞",
            verbERD: "abarca",
            verbUML: "se realiza en",
            multUML: "1  ───  0..*",
            color: "#FFA000",
            description: "Un periodo académico abarca todas las matrículas activas del ciclo."
        },
        {
            id: "rel_estudiantes_matriculas",
            fromTable: "estudiantes",
            toTable: "matriculas",
            fromCol: "id_estudiante",
            toCol: "id_estudiante",
            cardinalityPhysical: "1 : ∞",
            verbERD: "realiza",
            verbUML: "tiene",
            multUML: "1  ───  0..*",
            color: "#2E7D32",
            description: "El estudiante realiza una matrícula por cada año/periodo escolar."
        },
        {
            id: "rel_acudientes_estudiantes",
            fromTable: "acudientes",
            toTable: "estudiantes",
            fromCol: "id_acudiente",
            toCol: "id_acudiente",
            cardinalityPhysical: "1 : ∞",
            verbERD: "responsable_por",
            verbUML: "tiene",
            multUML: "1  ───  0..*",
            color: "#00897B",
            description: "El acudiente o apoderado es responsable legal del estudiante."
        },
        {
            id: "rel_perfiles_profesores",
            fromTable: "perfiles",
            toTable: "profesores",
            fromCol: "id_profesor",
            toCol: "id_profesor",
            cardinalityPhysical: "1 : 1",
            verbERD: "impartio_a",
            verbUML: "dicta",
            multUML: "1  ───  1",
            color: "#7B1FA2",
            description: "El perfil de docente asignado a profesores."
        },
        {
            id: "rel_perfiles_acudientes",
            fromTable: "perfiles",
            toTable: "acudientes",
            fromCol: "id_acudiente",
            toCol: "id_acudiente",
            cardinalityPhysical: "1 : 1",
            verbERD: "tiene",
            verbUML: "tiene",
            multUML: "1  ───  1",
            color: "#7B1FA2",
            description: "El perfil correspondiente al rol de acudiente."
        },
        {
            id: "rel_perfiles_estudiantes",
            fromTable: "perfiles",
            toTable: "estudiantes",
            fromCol: "id_estudiante",
            toCol: "id_estudiante",
            cardinalityPhysical: "1 : 1",
            verbERD: "vinculado_a",
            verbUML: "tiene",
            multUML: "1  ───  1",
            color: "#7B1FA2",
            description: "El perfil de acceso para el estudiante."
        },
        {
            id: "rel_auth_profesores",
            fromTable: "auth_users",
            toTable: "profesores",
            fromCol: "id",
            toCol: "user_id",
            cardinalityPhysical: "1 : 1",
            verbERD: "autentica",
            verbUML: "seguridad",
            multUML: "1  ───  1",
            color: "#3F51B5",
            description: "Credenciales de login para el profesor en auth.users."
        },
        {
            id: "rel_auth_estudiantes",
            fromTable: "auth_users",
            toTable: "estudiantes",
            fromCol: "id",
            toCol: "user_id",
            cardinalityPhysical: "1 : 1",
            verbERD: "autentica",
            verbUML: "seguridad",
            multUML: "1  ───  1",
            color: "#3F51B5",
            description: "Credenciales de login para el estudiante en auth.users."
        },
        {
            id: "rel_auth_acudientes",
            fromTable: "auth_users",
            toTable: "acudientes",
            fromCol: "id",
            toCol: "user_id",
            cardinalityPhysical: "1 : 1",
            verbERD: "autentica",
            verbUML: "seguridad",
            multUML: "1  ───  1",
            color: "#3F51B5",
            description: "Credenciales de login para el acudiente en auth.users."
        }
    ]
};

// =============================================================================
// SISTEMA DE 4 PESTAÑAS DE DIAGRAMAS INSTITUCIONALES DEL PROYECTO
// 1. Bases de Datos (Esquema Físico Relacional)
// 2. Diagrama de Casos de Uso (Actores y Procesos)
// 3. Diagrama Modelo Entidad Relación (ERD Conceptual - Imagen 2)
// 4. Diagrama de Clases (UML Estructural - Imagen 3)
// =============================================================================
const PROJECT_WORKSPACES = [
    // -------------------------------------------------------------------------
    // PESTAÑA 1: BASES DE DATOS (ESQUEMA FÍSICO)
    // -------------------------------------------------------------------------
    {
        id: "tab_db",
        name: "Base de Datos",
        subtitle: "Esquema Físico Relacional (PostgreSQL / SQLite)",
        status: "active",
        bannerText: "🗄️ Pestaña 1: Base de Datos Institucional Matri-Click (10 Tablas físicas con datos en vivo desde matriclick.db). Arrastra cualquier tabla a donde desees.",
        data: DATABASE_METADATA
    },

    // -------------------------------------------------------------------------    // PESTAÑA 2: DIAGRAMA MODELO ENTIDAD RELACIÓN (IMAGEN 2 DEL USUARIO)
    // -------------------------------------------------------------------------
    {
        id: "tab_erd",
        name: "Modelo Entidad Relación",
        subtitle: "Modelo Conceptual ERD (Basado fielmente en tu Imagen 2)",
        status: "active",
        bannerText: "🏷️ Pestaña 2: Modelo Entidad Relación (ERD Conceptual idéntico a tu Imagen 2 con los verbos de relación 'tiene', 'abarca', 'realiza', 'responsable_por', etc.). Arrastra las entidades libremente.",
        data: {
            info: {
                title: "Modelo Entidad-Relación Conceptual - Matri-Click",
                description: "Representación conceptual ERD idéntica a la Imagen 2 compartida por el usuario.",
                schemas: ["colegio"],
                totalTables: 9,
                totalRelations: 12
            },
            tables: [
                {
                    id: "erd_sedes",
                    name: "SEDES",
                    schema: "colegio",
                    fullName: "SEDES",
                    displayNameER: "SEDES",
                    displayNameUML: "SEDES",
                    color: "#9C27B0",
                    posOriginal: { x: -480, y: 240, z: 20 },
                    description: "Entidad SEDES con identificador UUID y datos de contacto.",
                    columns: [
                        { name: "id_sede", type: "UUID [PK]", isPK: true, isFK: false, desc: "Llave primaria" },
                        { name: "nombre_sede", type: "string", isPK: false, isFK: false, desc: "Nombre de sede" },
                        { name: "direccion", type: "string", isPK: false, isFK: false, desc: "Dirección física" },
                        { name: "telefono", type: "string", isPK: false, isFK: false, desc: "Línea telefónica" }
                    ]
                },
                {
                    id: "erd_grados",
                    name: "GRADOS",
                    schema: "colegio",
                    fullName: "GRADOS",
                    displayNameER: "GRADOS",
                    displayNameUML: "GRADOS",
                    color: "#00ACC1",
                    posOriginal: { x: -240, y: 240, z: 20 },
                    description: "Entidad GRADOS con nivel educativo en enumeración.",
                    columns: [
                        { name: "id_grado", type: "UUID [PK]", isPK: true, isFK: false, desc: "Llave primaria" },
                        { name: "nombre_grado", type: "string", isPK: false, isFK: false, desc: "Nombre de grado" },
                        { name: "nivel_educativo", type: "enum", isPK: false, isFK: false, desc: "Primaria/Secundaria/Media" }
                    ]
                },
                {
                    id: "erd_profesores",
                    name: "PROFESORES",
                    schema: "colegio",
                    fullName: "PROFESORES",
                    displayNameER: "PROFESORES",
                    displayNameUML: "PROFESORES",
                    color: "#1E88E5",
                    posOriginal: { x: 120, y: 240, z: 20 },
                    description: "Entidad PROFESORES con documento oficial y estado del docente.",
                    columns: [
                        { name: "id_profesor", type: "UUID [PK]", isPK: true, isFK: false, desc: "Llave primaria" },
                        { name: "documento", type: "string", isPK: false, isFK: false, desc: "Cédula" },
                        { name: "nombres", type: "string", isPK: false, isFK: false, desc: "Nombres" },
                        { name: "apellidos", type: "string", isPK: false, isFK: false, desc: "Apellidos" },
                        { name: "estado_profesor", type: "enum", isPK: false, isFK: false, desc: "Activo/Licencia" }
                    ]
                },
                {
                    id: "erd_acudientes",
                    name: "ACUDIENTES",
                    schema: "colegio",
                    fullName: "ACUDIENTES",
                    displayNameER: "ACUDIENTES",
                    displayNameUML: "ACUDIENTES",
                    color: "#00897B",
                    posOriginal: { x: 480, y: 240, z: 20 },
                    description: "Entidad ACUDIENTES con parentesco del menor.",
                    columns: [
                        { name: "id_acudiente", type: "UUID [PK]", isPK: true, isFK: false, desc: "Llave primaria" },
                        { name: "tipo_documento", type: "UUID", isPK: false, isFK: false, desc: "Tipo de doc" },
                        { name: "documento", type: "string", isPK: false, isFK: false, desc: "Cédula acudiente" },
                        { name: "nombres", type: "string", isPK: false, isFK: false, desc: "Nombres" },
                        { name: "apellidos", type: "string", isPK: false, isFK: false, desc: "Apellidos" },
                        { name: "parentesco", type: "enum", isPK: false, isFK: false, desc: "Madre/Padre/Tutor" }
                    ]
                },
                {
                    id: "erd_grupos",
                    name: "GRUPOS",
                    schema: "colegio",
                    fullName: "GRUPOS",
                    displayNameER: "GRUPOS",
                    displayNameUML: "GRUPOS",
                    color: "#E91E63",
                    posOriginal: { x: -240, y: -20, z: 0 },
                    description: "Entidad GRUPOS que vincula grado, sede y director de grupo.",
                    columns: [
                        { name: "id_grupo", type: "UUID [PK]", isPK: true, isFK: false, desc: "Llave primaria" },
                        { name: "id_grado", type: "UUID [FK]", isPK: false, isFK: true, desc: "Grado" },
                        { name: "id_sede", type: "UUID [FK]", isPK: false, isFK: true, desc: "Sede" },
                        { name: "nombre_grupo", type: "string", isPK: false, isFK: false, desc: "Sección" },
                        { name: "cupo_maximo", type: "int", isPK: false, isFK: false, desc: "Límite cupos" },
                        { name: "id_director_grupo", type: "UUID [FK]", isPK: false, isFK: true, desc: "Profesor director" }
                    ]
                },
                {
                    id: "erd_periodos",
                    name: "PERIODOS_ACADEMICOS",
                    schema: "colegio",
                    fullName: "PERIODOS_ACADEMICOS",
                    displayNameER: "PERIODOS_ACADEMICOS",
                    displayNameUML: "PERIODOS_ACADEMICOS",
                    color: "#FFA000",
                    posOriginal: { x: 120, y: -20, z: 0 },
                    description: "Entidad PERIODOS_ACADEMICOS para el control de ciclos escolares.",
                    columns: [
                        { name: "id_periodo", type: "UUID [PK]", isPK: true, isFK: false, desc: "Llave primaria" },
                        { name: "nombre_periodo", type: "string", isPK: false, isFK: false, desc: "Ciclo lectivo" },
                        { name: "fecha_inicio", type: "date", isPK: false, isFK: false, desc: "Inicio" },
                        { name: "fecha_fin", type: "date", isPK: false, isFK: false, desc: "Cierre" },
                        { name: "estado", type: "enum", isPK: false, isFK: false, desc: "Estado periodo" }
                    ]
                },
                {
                    id: "erd_estudiantes",
                    name: "ESTUDIANTES",
                    schema: "colegio",
                    fullName: "ESTUDIANTES",
                    displayNameER: "ESTUDIANTES",
                    displayNameUML: "ESTUDIANTES",
                    color: "#2E7D32",
                    posOriginal: { x: 480, y: -20, z: 0 },
                    description: "Entidad ESTUDIANTES asociada a su acudiente responsable.",
                    columns: [
                        { name: "id_estudiante", type: "UUID [PK]", isPK: true, isFK: false, desc: "Llave primaria" },
                        { name: "tipo_documento", type: "enum", isPK: false, isFK: false, desc: "TI/RC" },
                        { name: "documento", type: "string", isPK: false, isFK: false, desc: "Identificación" },
                        { name: "nombres", type: "string", isPK: false, isFK: false, desc: "Nombres" },
                        { name: "apellidos", type: "string", isPK: false, isFK: false, desc: "Apellidos" },
                        { name: "genero", type: "enum", isPK: false, isFK: false, desc: "Género" },
                        { name: "id_acudiente", type: "UUID [FK]", isPK: false, isFK: true, desc: "Acudiente" },
                        { name: "estado_estudiante", type: "enum", isPK: false, isFK: false, desc: "Activo/Egresado" }
                    ]
                },
                {
                    id: "erd_matriculas",
                    name: "MATRICULAS",
                    schema: "colegio",
                    fullName: "MATRICULAS",
                    displayNameER: "MATRICULAS",
                    displayNameUML: "MATRICULAS",
                    color: "#E53935",
                    posOriginal: { x: -60, y: -280, z: 0 },
                    description: "Entidad central MATRICULAS con códigos y vínculos académicos.",
                    columns: [
                        { name: "id_matricula", type: "UUID [PK]", isPK: true, isFK: false, desc: "Llave primaria" },
                        { name: "codigo_matricula", type: "string", isPK: false, isFK: false, desc: "Código único" },
                        { name: "id_estudiante", type: "UUID [FK]", isPK: false, isFK: true, desc: "Estudiante" },
                        { name: "id_periodo", type: "UUID [FK]", isPK: false, isFK: true, desc: "Periodo" },
                        { name: "id_grupo", type: "UUID [FK]", isPK: false, isFK: true, desc: "Grupo" },
                        { name: "estado_matricula", type: "enum", isPK: false, isFK: false, desc: "Matriculado/Pendiente" },
                        { name: "observaciones", type: "string", isPK: false, isFK: false, desc: "Notas" }
                    ]
                },
                {
                    id: "erd_perfiles",
                    name: "PERFILES",
                    schema: "colegio",
                    fullName: "PERFILES",
                    displayNameER: "PERFILES",
                    displayNameUML: "PERFILES",
                    color: "#7B1FA2",
                    posOriginal: { x: 420, y: -280, z: 0 },
                    description: "Entidad PERFILES transversal a estudiantes, profesores y acudientes.",
                    columns: [
                        { name: "id", type: "UUID [PK]", isPK: true, isFK: false, desc: "Llave primaria" },
                        { name: "rol", type: "enum", isPK: false, isFK: false, desc: "Rol sistema" },
                        { name: "nombre_completo", type: "string", isPK: false, isFK: false, desc: "Nombre" },
                        { name: "id_profesor", type: "UUID [PK/FK]", isPK: false, isFK: true, desc: "Profesor" },
                        { name: "id_acudiente", type: "UUID [FK]", isPK: false, isFK: true, desc: "Acudiente" },
                        { name: "id_estudiante", type: "UUID [FK]", isPK: false, isFK: true, desc: "Estudiante" }
                    ]
                }
            ],
            relations: [
                {
                    id: "rel_e_sedes_grupos",
                    fromTable: "erd_sedes",
                    toTable: "erd_grupos",
                    fromCol: "id_sede",
                    toCol: "id_sede",
                    cardinalityPhysical: "tiene",
                    verbERD: "tiene",
                    verbUML: "tiene",
                    multUML: "tiene",
                    color: "#9C27B0",
                    description: "SEDES tiene GRUPOS"
                },
                {
                    id: "rel_e_grados_grupos",
                    fromTable: "erd_grados",
                    toTable: "erd_grupos",
                    fromCol: "id_grado",
                    toCol: "id_grado",
                    cardinalityPhysical: "tiene",
                    verbERD: "tiene",
                    verbUML: "tiene",
                    multUML: "tiene",
                    color: "#00ACC1",
                    description: "GRADOS tiene GRUPOS"
                },
                {
                    id: "rel_e_prof_grupos",
                    fromTable: "erd_profesores",
                    toTable: "erd_grupos",
                    fromCol: "id_profesor",
                    toCol: "id_director_grupo",
                    cardinalityPhysical: "tiene",
                    verbERD: "tiene",
                    verbUML: "tiene",
                    multUML: "tiene",
                    color: "#1E88E5",
                    description: "PROFESORES tiene GRUPOS"
                },
                {
                    id: "rel_e_per_grupos",
                    fromTable: "erd_periodos",
                    toTable: "erd_grupos",
                    fromCol: "id_periodo",
                    toCol: "id_grupo",
                    cardinalityPhysical: "tiene",
                    verbERD: "tiene",
                    verbUML: "se ofrece en",
                    multUML: "tiene",
                    color: "#FFA000",
                    description: "PERIODOS_ACADEMICOS tiene GRUPOS"
                },
                {
                    id: "rel_e_grupos_mat",
                    fromTable: "erd_grupos",
                    toTable: "erd_matriculas",
                    fromCol: "id_grupo",
                    toCol: "id_grupo",
                    cardinalityPhysical: "tiene",
                    verbERD: "tiene",
                    verbUML: "tiene",
                    multUML: "tiene",
                    color: "#E91E63",
                    description: "GRUPOS tiene MATRICULAS"
                },
                {
                    id: "rel_e_per_mat",
                    fromTable: "erd_periodos",
                    toTable: "erd_matriculas",
                    fromCol: "id_periodo",
                    toCol: "id_periodo",
                    cardinalityPhysical: "abarca",
                    verbERD: "abarca",
                    verbUML: "abarca",
                    multUML: "abarca",
                    color: "#FFA000",
                    description: "PERIODOS_ACADEMICOS abarca MATRICULAS"
                },
                {
                    id: "rel_e_est_mat",
                    fromTable: "erd_estudiantes",
                    toTable: "erd_matriculas",
                    fromCol: "id_estudiante",
                    toCol: "id_estudiante",
                    cardinalityPhysical: "realiza",
                    verbERD: "realiza",
                    verbUML: "realiza",
                    multUML: "realiza",
                    color: "#2E7D32",
                    description: "ESTUDIANTES realiza MATRICULAS"
                },
                {
                    id: "rel_e_est_per",
                    fromTable: "erd_estudiantes",
                    toTable: "erd_periodos",
                    fromCol: "id_estudiante",
                    toCol: "id_periodo",
                    cardinalityPhysical: "incluido_en",
                    verbERD: "incluido_en",
                    verbUML: "incluido_en",
                    multUML: "incluido_en",
                    color: "#2E7D32",
                    description: "ESTUDIANTES incluido_en PERIODOS_ACADEMICOS"
                },
                {
                    id: "rel_e_acud_est",
                    fromTable: "erd_acudientes",
                    toTable: "erd_estudiantes",
                    fromCol: "id_acudiente",
                    toCol: "id_acudiente",
                    cardinalityPhysical: "responsable_por",
                    verbERD: "responsable_por",
                    verbUML: "responsable_por",
                    multUML: "responsable_por",
                    color: "#00897B",
                    description: "ACUDIENTES responsable_por ESTUDIANTES"
                },
                {
                    id: "rel_e_perf_est",
                    fromTable: "erd_perfiles",
                    toTable: "erd_estudiantes",
                    fromCol: "id_estudiante",
                    toCol: "id_estudiante",
                    cardinalityPhysical: "vinculado_a",
                    verbERD: "vinculado_a",
                    verbUML: "vinculado_a",
                    multUML: "vinculado_a",
                    color: "#7B1FA2",
                    description: "PERFILES vinculado_a ESTUDIANTES"
                },
                {
                    id: "rel_e_perf_prof",
                    fromTable: "erd_perfiles",
                    toTable: "erd_profesores",
                    fromCol: "id_profesor",
                    toCol: "id_profesor",
                    cardinalityPhysical: "impartio_a",
                    verbERD: "impartio_a",
                    verbUML: "impartio_a",
                    multUML: "impartio_a",
                    color: "#7B1FA2",
                    description: "PERFILES impartio_a PROFESORES"
                },
                {
                    id: "rel_e_perf_mat",
                    fromTable: "erd_perfiles",
                    toTable: "erd_matriculas",
                    fromCol: "id",
                    toCol: "id_matricula",
                    cardinalityPhysical: "tiene",
                    verbERD: "tiene",
                    verbUML: "tiene",
                    multUML: "tiene",
                    color: "#7B1FA2",
                    description: "PERFILES tiene MATRICULAS"
                }
            ]
        }
    },

    // -------------------------------------------------------------------------    // PESTAÑA 3: DIAGRAMA DE CLASES UML (IMAGEN 3 DEL USUARIO)
    // -------------------------------------------------------------------------
    {
        id: "tab_clases",
        name: "Clases de Uso",
        subtitle: "Diagrama de Clases UML (Basado fielmente en tu Imagen 3)",
        status: "active",
        bannerText: "📐 Pestaña 3: Clases de Uso (UML) (Idéntico a tu Imagen 3 con atributos tipados, multiplicidades 1..* y asociaciones como 'se encuentra en', 'dicta', etc.). Arrastra las clases libremente.",
        data: {
            info: {
                title: "Diagrama de Clases UML - Matri-Click",
                description: "Estructura formal de clases UML idéntica a la Imagen 3 compartida por el usuario.",
                schemas: ["clases_uml"],
                totalTables: 9,
                totalRelations: 11
            },
            tables: [
                {
                    id: "uml_grados",
                    name: "grados",
                    schema: "clase",
                    fullName: "grados",
                    displayNameER: "grados",
                    displayNameUML: "grados",
                    color: "#00ACC1",
                    posOriginal: { x: -480, y: 240, z: 20 },
                    description: "Clase grados con nivel educativo en enumeración.",
                    columns: [
                        { name: "- id_grado", type: "int", isPK: true, isFK: false, desc: "Identificador" },
                        { name: "- nombre_grado", type: "string", isPK: false, isFK: false, desc: "Nombre de grado" },
                        { name: "- nivel_educativo", type: "enum", isPK: false, isFK: false, desc: "Nivel escolar" }
                    ]
                },
                {
                    id: "uml_sedes",
                    name: "sedes",
                    schema: "clase",
                    fullName: "sedes",
                    displayNameER: "sedes",
                    displayNameUML: "sedes",
                    color: "#9C27B0",
                    posOriginal: { x: -220, y: 240, z: 20 },
                    description: "Clase sedes con ubicación física y teléfono institucional.",
                    columns: [
                        { name: "- id_sede", type: "int", isPK: true, isFK: false, desc: "Identificador sede" },
                        { name: "- nombre_sede", type: "string", isPK: false, isFK: false, desc: "Nombre sede" },
                        { name: "- direccion", type: "string", isPK: false, isFK: false, desc: "Dirección" },
                        { name: "- telefono", type: "string", isPK: false, isFK: false, desc: "Teléfono" }
                    ]
                },
                {
                    id: "uml_profesores",
                    name: "profesores",
                    schema: "clase",
                    fullName: "profesores",
                    displayNameER: "profesores",
                    displayNameUML: "profesores",
                    color: "#1E88E5",
                    posOriginal: { x: 120, y: 240, z: 20 },
                    description: "Clase profesores con estado y métodos docentes.",
                    columns: [
                        { name: "- id_profesor", type: "int", isPK: true, isFK: false, desc: "ID docente" },
                        { name: "- documento", type: "string", isPK: false, isFK: false, desc: "Documento oficial" },
                        { name: "- nombres", type: "string", isPK: false, isFK: false, desc: "Nombres" },
                        { name: "- apellidos", type: "string", isPK: false, isFK: false, desc: "Apellidos" },
                        { name: "- estado_profesor", type: "enum", isPK: false, isFK: false, desc: "Estado" }
                    ]
                },
                {
                    id: "uml_acudientes",
                    name: "acudientes",
                    schema: "clase",
                    fullName: "acudientes",
                    displayNameER: "acudientes",
                    displayNameUML: "acudientes",
                    color: "#00897B",
                    posOriginal: { x: 480, y: 240, z: 20 },
                    description: "Clase acudientes con tipo de documento y parentesco.",
                    columns: [
                        { name: "- id_acudiente", type: "int", isPK: true, isFK: false, desc: "ID acudiente" },
                        { name: "- tipo_documento", type: "string", isPK: false, isFK: false, desc: "Tipo de doc" },
                        { name: "- documento", type: "string", isPK: false, isFK: false, desc: "Número" },
                        { name: "- nombres", type: "string", isPK: false, isFK: false, desc: "Nombres" },
                        { name: "- apellidos", type: "string", isPK: false, isFK: false, desc: "Apellidos" },
                        { name: "- parentesco", type: "enum", isPK: false, isFK: false, desc: "Parentesco" }
                    ]
                },
                {
                    id: "uml_grupos",
                    name: "grupos",
                    schema: "clase",
                    fullName: "grupos",
                    displayNameER: "grupos",
                    displayNameUML: "grupos",
                    color: "#E91E63",
                    posOriginal: { x: -280, y: -20, z: 0 },
                    description: "Clase grupos con clave foránea a director de grupo.",
                    columns: [
                        { name: "- id_grupo", type: "int", isPK: true, isFK: false, desc: "ID grupo" },
                        { name: "- id_grado", type: "int", isPK: false, isFK: true, desc: "FK Grado" },
                        { name: "- id_sede", type: "int", isPK: false, isFK: true, desc: "FK Sede" },
                        { name: "- nombre_grupo", type: "string", isPK: false, isFK: false, desc: "Nombre" },
                        { name: "- cupo_maximo", type: "int", isPK: false, isFK: false, desc: "Cupo" },
                        { name: "- id_director_grupo", type: "int", isPK: false, isFK: true, desc: "FK Director" }
                    ]
                },
                {
                    id: "uml_periodos",
                    name: "periodos_academicos",
                    schema: "clase",
                    fullName: "periodos_academicos",
                    displayNameER: "periodos_academicos",
                    displayNameUML: "periodos_academicos",
                    color: "#FFA000",
                    posOriginal: { x: 80, y: -20, z: 0 },
                    description: "Clase periodos_academicos con fechas de inicio y fin.",
                    columns: [
                        { name: "- id_periodo", type: "int", isPK: true, isFK: false, desc: "ID periodo" },
                        { name: "- nombre_periodo", type: "string", isPK: false, isFK: false, desc: "Periodo" },
                        { name: "- fecha_inicio", type: "date", isPK: false, isFK: false, desc: "Inicio" },
                        { name: "- fecha_fin", type: "date", isPK: false, isFK: false, desc: "Fin" },
                        { name: "- estado", type: "enum", isPK: false, isFK: false, desc: "Estado" }
                    ]
                },
                {
                    id: "uml_estudiantes",
                    name: "estudiantes",
                    schema: "clase",
                    fullName: "estudiantes",
                    displayNameER: "estudiantes",
                    displayNameUML: "estudiantes",
                    color: "#2E7D32",
                    posOriginal: { x: 440, y: -20, z: 0 },
                    description: "Clase estudiantes con documento, género y acudiente.",
                    columns: [
                        { name: "- id_estudiante", type: "int", isPK: true, isFK: false, desc: "ID estudiante" },
                        { name: "- tipo_documento", type: "enum", isPK: false, isFK: false, desc: "Tipo doc" },
                        { name: "- documento", type: "string", isPK: false, isFK: false, desc: "Número doc" },
                        { name: "- nombres", type: "string", isPK: false, isFK: false, desc: "Nombres" },
                        { name: "- apellidos", type: "string", isPK: false, isFK: false, desc: "Apellidos" },
                        { name: "- genero", type: "enum", isPK: false, isFK: false, desc: "Género" },
                        { name: "- id_acudiente", type: "int", isPK: false, isFK: true, desc: "FK Acudiente" },
                        { name: "- estado_estudiante", type: "enum", isPK: false, isFK: false, desc: "Estado" }
                    ]
                },
                {
                    id: "uml_matriculas",
                    name: "matriculas",
                    schema: "clase",
                    fullName: "matriculas",
                    displayNameER: "matriculas",
                    displayNameUML: "matriculas",
                    color: "#E53935",
                    posOriginal: { x: -60, y: -280, z: 0 },
                    description: "Clase central matriculas vinculada a estudiantes y grupos.",
                    columns: [
                        { name: "- id_matricula", type: "int", isPK: true, isFK: false, desc: "ID matrícula" },
                        { name: "- codigo_matricula", type: "string", isPK: false, isFK: false, desc: "Código" },
                        { name: "- id_estudiante", type: "int", isPK: false, isFK: true, desc: "FK Estudiante" },
                        { name: "- id_periodo", type: "int", isPK: false, isFK: true, desc: "FK Periodo" },
                        { name: "- id_grupo", type: "int", isPK: false, isFK: true, desc: "FK Grupo" },
                        { name: "- estado_matricula", type: "enum", isPK: false, isFK: false, desc: "Estado" },
                        { name: "- observaciones", type: "string", isPK: false, isFK: false, desc: "Notas" }
                    ]
                },
                {
                    id: "uml_perfiles",
                    name: "perfiles",
                    schema: "clase",
                    fullName: "perfiles",
                    displayNameER: "perfiles",
                    displayNameUML: "perfiles",
                    color: "#7B1FA2",
                    posOriginal: { x: 420, y: -280, z: 0 },
                    description: "Clase perfiles con rol en enum y vinculaciones polimórficas.",
                    columns: [
                        { name: "- id", type: "int", isPK: true, isFK: false, desc: "ID perfil" },
                        { name: "- rol", type: "enum", isPK: false, isFK: false, desc: "Rol sistema" },
                        { name: "- nombre_completo", type: "string", isPK: false, isFK: false, desc: "Nombre" },
                        { name: "- id_profesor", type: "int", isPK: false, isFK: true, desc: "FK Profesor" },
                        { name: "- id_acudiente", type: "int", isPK: false, isFK: true, desc: "FK Acudiente" },
                        { name: "- id_estudiante", type: "int", isPK: false, isFK: true, desc: "FK Estudiante" }
                    ]
                }
            ],
            relations: [
                {
                    id: "rel_u_grados_grupos",
                    fromTable: "uml_grados",
                    toTable: "uml_grupos",
                    fromCol: "id_grado",
                    toCol: "id_grado",
                    cardinalityPhysical: "tiene",
                    verbERD: "tiene",
                    verbUML: "tiene",
                    multUML: "1 ─── 0..*",
                    color: "#00ACC1",
                    description: "grados (1) tiene (0..*) grupos"
                },
                {
                    id: "rel_u_sedes_grupos",
                    fromTable: "uml_sedes",
                    toTable: "uml_grupos",
                    fromCol: "id_sede",
                    toCol: "id_sede",
                    cardinalityPhysical: "se encuentra en",
                    verbERD: "se encuentra en",
                    verbUML: "se encuentra en",
                    multUML: "1 ─── 0..*",
                    color: "#9C27B0",
                    description: "sedes (1) se encuentra en (0..*) grupos"
                },
                {
                    id: "rel_u_prof_grupos",
                    fromTable: "uml_profesores",
                    toTable: "uml_grupos",
                    fromCol: "id_profesor",
                    toCol: "id_director_grupo",
                    cardinalityPhysical: "dicta",
                    verbERD: "dicta",
                    verbUML: "dicta",
                    multUML: "1 ─── 0..*",
                    color: "#1E88E5",
                    description: "profesores (1) dicta (0..*) grupos"
                },
                {
                    id: "rel_u_per_grupos",
                    fromTable: "uml_periodos",
                    toTable: "uml_grupos",
                    fromCol: "id_periodo",
                    toCol: "id_grupo",
                    cardinalityPhysical: "se ofrece en",
                    verbERD: "se ofrece en",
                    verbUML: "se ofrece en",
                    multUML: "1 ─── 0..*",
                    color: "#FFA000",
                    description: "periodos_academicos (1) se ofrece en (0..*) grupos"
                },
                {
                    id: "rel_u_grupos_mat",
                    fromTable: "uml_grupos",
                    toTable: "uml_matriculas",
                    fromCol: "id_grupo",
                    toCol: "id_grupo",
                    cardinalityPhysical: "tiene",
                    verbERD: "tiene",
                    verbUML: "tiene",
                    multUML: "1 ─── 0..*",
                    color: "#E91E63",
                    description: "grupos (1) tiene (0..*) matriculas"
                },
                {
                    id: "rel_u_per_mat",
                    fromTable: "uml_periodos",
                    toTable: "uml_matriculas",
                    fromCol: "id_periodo",
                    toCol: "id_periodo",
                    cardinalityPhysical: "se realiza en",
                    verbERD: "se realiza en",
                    verbUML: "se realiza en",
                    multUML: "1 ─── 0..*",
                    color: "#FFA000",
                    description: "periodos_academicos (1) se realiza en (0..*) matriculas"
                },
                {
                    id: "rel_u_est_mat",
                    fromTable: "uml_estudiantes",
                    toTable: "uml_matriculas",
                    fromCol: "id_estudiante",
                    toCol: "id_estudiante",
                    cardinalityPhysical: "tiene",
                    verbERD: "tiene",
                    verbUML: "tiene",
                    multUML: "1 ─── 0..*",
                    color: "#2E7D32",
                    description: "estudiantes (1) tiene (0..*) matriculas"
                },
                {
                    id: "rel_u_est_per",
                    fromTable: "uml_estudiantes",
                    toTable: "uml_periodos",
                    fromCol: "id_estudiante",
                    toCol: "id_periodo",
                    cardinalityPhysical: "incluido_en",
                    verbERD: "incluido_en",
                    verbUML: "incluido_en",
                    multUML: "1 ─── 0..*",
                    color: "#2E7D32",
                    description: "estudiantes (1) incluido_en (0..*) periodos_academicos"
                },
                {
                    id: "rel_u_acud_est",
                    fromTable: "uml_acudientes",
                    toTable: "uml_estudiantes",
                    fromCol: "id_acudiente",
                    toCol: "id_acudiente",
                    cardinalityPhysical: "tiene",
                    verbERD: "tiene",
                    verbUML: "tiene",
                    multUML: "1 ─── 0..*",
                    color: "#00897B",
                    description: "acudientes (1) tiene (0..*) estudiantes"
                },
                {
                    id: "rel_u_perf_est",
                    fromTable: "uml_perfiles",
                    toTable: "uml_estudiantes",
                    fromCol: "id_estudiante",
                    toCol: "id_estudiante",
                    cardinalityPhysical: "tiene",
                    verbERD: "tiene",
                    verbUML: "tiene",
                    multUML: "1 ─── 1",
                    color: "#7B1FA2",
                    description: "perfiles (1) tiene (1) estudiantes"
                },
                {
                    id: "rel_u_perf_mat",
                    fromTable: "uml_perfiles",
                    toTable: "uml_matriculas",
                    fromCol: "id",
                    toCol: "id_matricula",
                    cardinalityPhysical: "tiene",
                    verbERD: "tiene",
                    verbUML: "tiene",
                    multUML: "1 ─── 0..*",
                    color: "#7B1FA2",
                    description: "perfiles (1) tiene (0..*) matriculas"
                }
            ]
        }
    },

    // -------------------------------------------------------------------------
    // PESTAÑA 4: CASO DE USO - SISTEMA MATRICLIK (lámina de referencia)
    // -------------------------------------------------------------------------
    {
        id: "tab_casos_uso",
        name: "Casos de Uso",
        subtitle: "Caso de Uso - Sistema Matriclik",
        status: "active",
        bannerText: "👥 Caso de Uso del Sistema Matriclik: actores, óvalos y asociaciones como en la lámina. Los marcados en gris son nuevos. Arrastra cualquier nodo; las líneas lo siguen.",
        data: {
            info: {
                title: "Caso de Uso - Sistema Matriclik",
                description: "Diagrama de casos de uso del sistema Matriclik, con actores externos, casos nuevos y la base de datos.",
                schemas: ["ACTOR", "CASO DE USO", "NOTA", "BASE DE DATOS"],
                totalTables: 19,
                totalRelations: 21
            },
            frame: {
                minX: -510,
                maxX: 510,
                minY: -590,
                maxY: 560,
                title: "SISTEMA MATRICLIK",
                slideTitle: "CASO DE USO - SISTEMA MATRICLIK",
                footer: "PROYECTO: MATRICLIK"
            },
            tables: [
                {
                    id: "act_acudiente",
                    name: "Acudiente",
                    schema: "ACTOR",
                    fullName: "Acudiente",
                    displayNameER: "ACUDIENTE",
                    displayNameUML: "Acudiente",
                    color: "#C62828",
                    posOriginal: { x: -740, y: 430, z: 0 },
                    shape: "actor",
                    variant: "acudiente",
                    anchor: "rect",
                    box: { w: 150, h: 220 },
                    description: "Acudiente del estudiante. Se asocia con el registro, la matrícula, la solicitud y el perfil.",
                    columns: [
                        { name: "actor", type: "Externo", isPK: true, isFK: false, desc: "Acudiente" }
                    ]
                },
                {
                    id: "act_profesor",
                    name: "Profesor",
                    schema: "ACTOR",
                    fullName: "Profesor",
                    displayNameER: "PROFESOR",
                    displayNameUML: "Profesor",
                    color: "#1565C0",
                    posOriginal: { x: -740, y: 20, z: 0 },
                    shape: "actor",
                    variant: "profesor",
                    anchor: "rect",
                    box: { w: 150, h: 220 },
                    description: "Profesor. Consulta el perfil, analiza grados, organiza la matrícula y gestiona estudiantes.",
                    columns: [
                        { name: "actor", type: "Externo", isPK: true, isFK: false, desc: "Profesor" }
                    ]
                },
                {
                    id: "act_admin",
                    name: "Administrador",
                    schema: "ACTOR",
                    fullName: "Administrador",
                    displayNameER: "ADMINISTRADOR",
                    displayNameUML: "Administrador",
                    color: "#0D2C6B",
                    posOriginal: { x: -740, y: -370, z: 0 },
                    shape: "actor",
                    variant: "administrador",
                    anchor: "rect",
                    box: { w: 150, h: 220 },
                    description: "Administrador. Organiza la matrícula, gestiona estudiantes, almacena la información y da el visto bueno.",
                    columns: [
                        { name: "actor", type: "Externo", isPK: true, isFK: false, desc: "Administrador" }
                    ]
                },
                {
                    id: "act_estudiante",
                    name: "Estudiante",
                    schema: "ACTOR",
                    fullName: "Estudiante",
                    displayNameER: "ESTUDIANTE",
                    displayNameUML: "Estudiante",
                    color: "#1976D2",
                    posOriginal: { x: 770, y: 400, z: 0 },
                    shape: "actor",
                    variant: "estudiante",
                    anchor: "rect",
                    box: { w: 150, h: 220 },
                    description: "Estudiante. Se registra, consulta su matrícula y participa en la gestión académica marcada en la lámina.",
                    columns: [
                        { name: "actor", type: "Externo", isPK: true, isFK: false, desc: "Estudiante" }
                    ]
                },
                {
                    id: "cu_reg",
                    name: "Reg. Usuario, Inicio Sesion",
                    schema: "CASO DE USO",
                    fullName: "Reg. Usuario, Inicio Sesion",
                    displayNameER: "REG_USUARIO_INICIO_SESION",
                    displayNameUML: "RegUsuarioInicioSesion",
                    color: "#2E75B6",
                    posOriginal: { x: 0, y: 430, z: 0 },
                    shape: "usecase",
                    anchor: "ellipse",
                    box: { w: 240, h: 86 },
                    labelLines: ["Reg. Usuario,", "Inicio Sesion"],
                    description: "Registro de usuario e inicio de sesión.",
                    columns: [
                        { name: "caso", type: "Uso", isPK: true, isFK: false, desc: "Acceso" }
                    ]
                },
                {
                    id: "cu_mat_est",
                    name: "Matricula Est",
                    schema: "CASO DE USO",
                    fullName: "Matricula Est",
                    displayNameER: "MATRICULA_EST",
                    displayNameUML: "MatriculaEst",
                    color: "#2E75B6",
                    posOriginal: { x: 0, y: 310, z: 0 },
                    shape: "usecase",
                    anchor: "ellipse",
                    box: { w: 200, h: 74 },
                    labelLines: ["Matricula Est"],
                    description: "Matrícula del estudiante.",
                    columns: [
                        { name: "caso", type: "Uso", isPK: true, isFK: false, desc: "Matrícula" }
                    ]
                },
                {
                    id: "cu_solicitud",
                    name: "Solicitud Matricula",
                    schema: "CASO DE USO",
                    fullName: "Solicitud Matricula",
                    displayNameER: "SOLICITUD_MATRICULA",
                    displayNameUML: "SolicitudMatricula",
                    color: "#2E75B6",
                    posOriginal: { x: -270, y: 235, z: 0 },
                    shape: "usecase",
                    anchor: "ellipse",
                    isNew: true,
                    badgeSide: "left",
                    box: { w: 190, h: 86 },
                    labelLines: ["Solicitud", "Matricula"],
                    description: "Caso nuevo: el acudiente radica la solicitud de matrícula.",
                    columns: [
                        { name: "caso", type: "Nuevo", isPK: true, isFK: false, desc: "Solicitud" }
                    ]
                },
                {
                    id: "cu_perfil",
                    name: "Visualizar Perfil Completo",
                    schema: "CASO DE USO",
                    fullName: "Visualizar Perfil Completo",
                    displayNameER: "VISUALIZAR_PERFIL_COMPLETO",
                    displayNameUML: "VisualizarPerfilCompleto",
                    color: "#2E75B6",
                    posOriginal: { x: 15, y: 165, z: 0 },
                    shape: "usecase",
                    anchor: "ellipse",
                    isNew: true,
                    badgeSide: "left",
                    box: { w: 230, h: 90 },
                    labelLines: ["Visualizar Perfil", "Completo"],
                    description: "Caso nuevo: consulta del perfil completo.",
                    columns: [
                        { name: "caso", type: "Nuevo", isPK: true, isFK: false, desc: "Perfil" }
                    ]
                },
                {
                    id: "cu_gest_prof",
                    name: "Gestionar Profesores",
                    schema: "CASO DE USO",
                    fullName: "Gestionar Profesores",
                    displayNameER: "GESTIONAR_PROFESORES",
                    displayNameUML: "GestionarProfesores",
                    color: "#2E75B6",
                    posOriginal: { x: 280, y: 250, z: 0 },
                    shape: "usecase",
                    anchor: "ellipse",
                    isNew: true,
                    badgeSide: "right",
                    box: { w: 190, h: 86 },
                    labelLines: ["Gestionar", "Profesores"],
                    description: "Caso nuevo: gestión de profesores.",
                    columns: [
                        { name: "caso", type: "Nuevo", isPK: true, isFK: false, desc: "Profesores" }
                    ]
                },
                {
                    id: "cu_analiza",
                    name: "Analiza Grados",
                    schema: "CASO DE USO",
                    fullName: "Analiza Grados",
                    displayNameER: "ANALIZA_GRADOS",
                    displayNameUML: "AnalizaGrados",
                    color: "#2E75B6",
                    posOriginal: { x: 0, y: 40, z: 0 },
                    shape: "usecase",
                    anchor: "ellipse",
                    box: { w: 200, h: 74 },
                    labelLines: ["Analiza Grados"],
                    description: "Análisis de los grados escolares.",
                    columns: [
                        { name: "caso", type: "Uso", isPK: true, isFK: false, desc: "Grados" }
                    ]
                },
                {
                    id: "cu_director",
                    name: "Asignar Director de Grupo",
                    schema: "CASO DE USO",
                    fullName: "Asignar Director de Grupo",
                    displayNameER: "ASIGNAR_DIRECTOR_DE_GRUPO",
                    displayNameUML: "AsignarDirectorDeGrupo",
                    color: "#2E75B6",
                    posOriginal: { x: 285, y: 45, z: 0 },
                    shape: "usecase",
                    anchor: "ellipse",
                    isNew: true,
                    badgeSide: "right",
                    box: { w: 210, h: 90 },
                    labelLines: ["Asignar", "Director de Grupo"],
                    description: "Caso nuevo: asignación del director de grupo.",
                    columns: [
                        { name: "caso", type: "Nuevo", isPK: true, isFK: false, desc: "Director" }
                    ]
                },
                {
                    id: "cu_gest_org",
                    name: "Gestiona org., Crea matric.",
                    schema: "CASO DE USO",
                    fullName: "Gestiona org., Crea matric.",
                    displayNameER: "GESTIONA_ORG_CREA_MATRIC",
                    displayNameUML: "GestionaOrgCreaMatric",
                    color: "#2E75B6",
                    posOriginal: { x: -30, y: -100, z: 0 },
                    shape: "usecase",
                    anchor: "ellipse",
                    box: { w: 220, h: 86 },
                    labelLines: ["Gestiona org.,", "Crea matric."],
                    description: "Organización académica y creación de la matrícula.",
                    columns: [
                        { name: "caso", type: "Uso", isPK: true, isFK: false, desc: "Organización" }
                    ]
                },
                {
                    id: "cu_periodos",
                    name: "Gestionar Periodos Académicos",
                    schema: "CASO DE USO",
                    fullName: "Gestionar Periodos Académicos",
                    displayNameER: "GESTIONAR_PERIODOS_ACADEMICOS",
                    displayNameUML: "GestionarPeriodosAcademicos",
                    color: "#2E75B6",
                    posOriginal: { x: 275, y: -95, z: 0 },
                    shape: "usecase",
                    anchor: "ellipse",
                    isNew: true,
                    badgeSide: "both",
                    box: { w: 230, h: 90 },
                    labelLines: ["Gestionar Periodos", "Académicos"],
                    description: "Caso nuevo: gestión de periodos académicos.",
                    columns: [
                        { name: "caso", type: "Nuevo", isPK: true, isFK: false, desc: "Periodos" }
                    ]
                },
                {
                    id: "cu_gest_est",
                    name: "Gestionar Estudiantes",
                    schema: "CASO DE USO",
                    fullName: "Gestionar Estudiantes",
                    displayNameER: "GESTIONAR_ESTUDIANTES",
                    displayNameUML: "GestionarEstudiantes",
                    color: "#2E75B6",
                    posOriginal: { x: -15, y: -230, z: 0 },
                    shape: "usecase",
                    anchor: "ellipse",
                    box: { w: 210, h: 86 },
                    labelLines: ["Gestionar", "Estudiantes"],
                    description: "Gestión del padrón de estudiantes.",
                    columns: [
                        { name: "caso", type: "Uso", isPK: true, isFK: false, desc: "Estudiantes" }
                    ]
                },
                {
                    id: "cu_almacena",
                    name: "Almacena (Guarda Info)",
                    schema: "CASO DE USO",
                    fullName: "Almacena (Guarda Info)",
                    displayNameER: "ALMACENA_GUARDA_INFO",
                    displayNameUML: "AlmacenaGuardaInfo",
                    color: "#2E75B6",
                    posOriginal: { x: -70, y: -360, z: 0 },
                    shape: "usecase",
                    anchor: "ellipse",
                    box: { w: 200, h: 86 },
                    labelLines: ["Almacena", "(Guarda Info)"],
                    description: "Almacenamiento de la información en la base de datos.",
                    columns: [
                        { name: "caso", type: "Uso", isPK: true, isFK: false, desc: "Persistencia" }
                    ]
                },
                {
                    id: "cu_dots",
                    name: "(............)",
                    schema: "CASO DE USO",
                    fullName: "(............)",
                    displayNameER: "OTRAS_FUNCIONES",
                    displayNameUML: "OtrasFunciones",
                    color: "#2E75B6",
                    posOriginal: { x: 185, y: -350, z: 0 },
                    shape: "usecase",
                    anchor: "ellipse",
                    dotted: true,
                    box: { w: 170, h: 64 },
                    labelLines: ["(............)"],
                    description: "Otras funciones del sistema, enlazadas con la base de datos.",
                    columns: [
                        { name: "caso", type: "Uso", isPK: true, isFK: false, desc: "Otras funciones" }
                    ]
                },
                {
                    id: "cu_visto",
                    name: "Da visto bueno Acepta Mat.",
                    schema: "CASO DE USO",
                    fullName: "Da visto bueno Acepta Mat.",
                    displayNameER: "DA_VISTO_BUENO_ACEPTA_MAT",
                    displayNameUML: "DaVistoBuenoAceptaMat",
                    color: "#2E75B6",
                    posOriginal: { x: -70, y: -485, z: 0 },
                    shape: "usecase",
                    anchor: "ellipse",
                    box: { w: 220, h: 86 },
                    labelLines: ["Da visto bueno", "Acepta Mat."],
                    description: "Visto bueno y aceptación de la matrícula.",
                    columns: [
                        { name: "caso", type: "Uso", isPK: true, isFK: false, desc: "Aceptación" }
                    ]
                },
                {
                    id: "nota_otras",
                    name: "Other System Functions",
                    schema: "NOTA",
                    fullName: "Other System Functions",
                    displayNameER: "OTRAS_FUNCIONES_ESQUEMA",
                    displayNameUML: "OtrasFuncionesEsquema",
                    color: "#1A1A1A",
                    posOriginal: { x: 230, y: -495, z: 0 },
                    shape: "note",
                    anchor: "rect",
                    box: { w: 280, h: 150 },
                    labelLines: [
                        "Other System Functions",
                        "(as per DB Schema):",
                        "• Validación de Términos",
                        "• Asignación de Roles",
                        "• Control de Cupos"
                    ],
                    description: "Funciones adicionales tomadas del esquema de base de datos: validación de términos, asignación de roles y control de cupos.",
                    columns: [
                        { name: "nota", type: "Texto", isPK: true, isFK: false, desc: "Funciones del esquema" }
                    ]
                },
                {
                    id: "nodo_bd",
                    name: "BD",
                    schema: "BASE DE DATOS",
                    fullName: "Base de Datos Matriclik",
                    displayNameER: "BD_MATRICLIK",
                    displayNameUML: "BaseDeDatosMatriclik",
                    color: "#1E5AA8",
                    posOriginal: { x: 780, y: -270, z: 0 },
                    shape: "database",
                    anchor: "ellipse",
                    box: { w: 150, h: 130 },
                    captionAbove: "Base de Datos\nMatriclik",
                    captionBelow: "(auth_usuarios, perfiles,\nestudiantes, acudientes,\nprofesores, matriculas,\ngrupos, grados, sedes,\nperiodos_academicos)",
                    description: "Base de datos Matriclik. Guarda usuarios, perfiles, estudiantes, acudientes, profesores, matrículas, grupos, grados, sedes y periodos académicos.",
                    columns: [
                        { name: "almacen", type: "PostgreSQL", isPK: true, isFK: false, desc: "Esquemas auth y colegio" }
                    ]
                }
            ],
            relations: [
                { id: "rel_acu_reg", fromTable: "act_acudiente", toTable: "cu_reg", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Acudiente se asocia con Reg. Usuario, Inicio Sesion." },
                { id: "rel_acu_mat", fromTable: "act_acudiente", toTable: "cu_mat_est", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Acudiente se asocia con Matricula Est." },
                { id: "rel_acu_sol", fromTable: "act_acudiente", toTable: "cu_solicitud", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Acudiente se asocia con Solicitud Matricula." },
                { id: "rel_acu_per", fromTable: "act_acudiente", toTable: "cu_perfil", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Acudiente se asocia con Visualizar Perfil Completo." },
                { id: "rel_pro_per", fromTable: "act_profesor", toTable: "cu_perfil", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Profesor se asocia con Visualizar Perfil Completo." },
                { id: "rel_pro_ana", fromTable: "act_profesor", toTable: "cu_analiza", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Profesor se asocia con Analiza Grados." },
                { id: "rel_pro_org", fromTable: "act_profesor", toTable: "cu_gest_org", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Profesor se asocia con Gestiona org., Crea matric." },
                { id: "rel_pro_est", fromTable: "act_profesor", toTable: "cu_gest_est", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Profesor se asocia con Gestionar Estudiantes." },
                { id: "rel_pro_dir", fromTable: "act_profesor", toTable: "cu_director", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Profesor se asocia con Asignar Director de Grupo." },
                { id: "rel_adm_org", fromTable: "act_admin", toTable: "cu_gest_org", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Administrador se asocia con Gestiona org., Crea matric." },
                { id: "rel_adm_est", fromTable: "act_admin", toTable: "cu_gest_est", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Administrador se asocia con Gestionar Estudiantes." },
                { id: "rel_adm_alm", fromTable: "act_admin", toTable: "cu_almacena", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Administrador se asocia con Almacena (Guarda Info)." },
                { id: "rel_adm_vis", fromTable: "act_admin", toTable: "cu_visto", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Administrador se asocia con Da visto bueno Acepta Mat." },
                { id: "rel_est_reg", fromTable: "act_estudiante", toTable: "cu_reg", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Estudiante se asocia con Reg. Usuario, Inicio Sesion." },
                { id: "rel_est_mat", fromTable: "act_estudiante", toTable: "cu_mat_est", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Estudiante se asocia con Matricula Est." },
                { id: "rel_est_gpr", fromTable: "act_estudiante", toTable: "cu_gest_prof", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Estudiante se asocia con Gestionar Profesores." },
                { id: "rel_est_dir", fromTable: "act_estudiante", toTable: "cu_director", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Estudiante se asocia con Asignar Director de Grupo." },
                { id: "rel_est_ana", fromTable: "act_estudiante", toTable: "cu_analiza", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Estudiante se asocia con Analiza Grados." },
                { id: "rel_est_per", fromTable: "act_estudiante", toTable: "cu_periodos", fromCol: "actor", toCol: "caso", cardinalityPhysical: "asocia", verbERD: "asocia", verbUML: "asocia", multUML: "—", color: "#2E75B6", flat: true, description: "Estudiante se asocia con Gestionar Periodos Académicos." },
                { id: "rel_alm_bd", fromTable: "cu_almacena", toTable: "nodo_bd", fromCol: "caso", toCol: "almacen", cardinalityPhysical: "guarda", verbERD: "guarda", verbUML: "guarda", multUML: "—", color: "#2E75B6", flat: true, description: "Almacena (Guarda Info) persiste en la base de datos Matriclik." },
                { id: "rel_dot_bd", fromTable: "cu_dots", toTable: "nodo_bd", fromCol: "caso", toCol: "almacen", cardinalityPhysical: "guarda", verbERD: "guarda", verbUML: "guarda", multUML: "—", color: "#2E75B6", flat: true, description: "Las demás funciones se apoyan en la base de datos Matriclik." }
            ]
        }
    }
];
