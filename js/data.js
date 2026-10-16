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
    // PESTAÑA 4: DIAGRAMA DE CASOS DE USO (SISTEMA MATRICLICK - IMAGEN EXACTA)
    // -------------------------------------------------------------------------
    {
        id: "tab_casos_uso",
        name: "Casos de Uso",
        subtitle: "Diagrama de Casos de Uso - Sistema Matriclick",
        status: "active",
        bannerText: "👥 Pestaña 4: Diagrama de Casos de Uso - Sistema Matriclick (Exacto a tu diseño con los 6 módulos: Acceso Público, Mi Cuenta, Académico, Matrículas, Administración y Comunidad). Arrastra los nodos libremente.",
        data: {
            info: {
                title: "Diagrama de Casos de Uso - Sistema Matriclick",
                description: "Arquitectura de Casos de Uso y Actores correspondiente fielmente a tu diseño institucional.",
                schemas: ["ACCESO PÚBLICO", "INICIO Y MI CUENTA", "ACADÉMICO", "MATRÍCULAS", "ADMINISTRACIÓN", "COMUNIDAD"],
                totalTables: 26,
                totalRelations: 24
            },
            tables: [
                // ==================== ACTORES ====================
                {
                    id: "act_visitante",
                    name: "Visitante",
                    schema: "ACTOR",
                    fullName: "🧍 Visitante",
                    displayNameER: "VISITANTE",
                    displayNameUML: "Visitante",
                    color: "#94A3B8",
                    posOriginal: { x: -680, y: 300, z: 20 },
                    isActor: true,
                    description: "Usuario no autenticado que explora el portal público institucional.",
                    columns: [
                        { name: "tipo", type: "Actor Externo", isPK: true, isFK: false, desc: "Sin credenciales" },
                        { name: "alcance", type: "Público", isPK: false, isFK: false, desc: "Landing y Login" }
                    ]
                },
                {
                    id: "act_user_auth",
                    name: "Usuario autenticado",
                    schema: "ACTOR BASE",
                    fullName: "🧍 Usuario autenticado",
                    displayNameER: "USUARIO_AUTH",
                    displayNameUML: "UsuarioAutenticado",
                    color: "#64748B",
                    posOriginal: { x: -680, y: 50, z: 20 },
                    isActor: true,
                    isAbstract: true,
                    description: "Actor abstracto que agrupa los permisos comunes de todo usuario con sesión iniciada.",
                    columns: [
                        { name: "tipo", type: "Actor Abstracto", isPK: true, isFK: false, desc: "Heredable" },
                        { name: "alcance", type: "Cuenta y Catálogo", isPK: false, isFK: false, desc: "Permisos base" }
                    ]
                },
                {
                    id: "act_admin",
                    name: "Admin",
                    schema: "ACTOR",
                    fullName: "🧍 Admin",
                    displayNameER: "ADMIN",
                    displayNameUML: "Admin",
                    color: "#F59E0B",
                    posOriginal: { x: -480, y: -20, z: 20 },
                    isActor: true,
                    isGold: true,
                    description: "Administrador con privilegios globales sobre la gestión académica y comunitaria.",
                    columns: [
                        { name: "tipo", type: "Administrador", isPK: true, isFK: false, desc: "Privilegios altos" },
                        { name: "alcance", type: "Gestión Total", isPK: false, isFK: false, desc: "Sedes, Profesores, etc." }
                    ]
                },
                {
                    id: "act_profesor",
                    name: "Profesor",
                    schema: "ACTOR",
                    fullName: "🧍 Profesor",
                    displayNameER: "PROFESOR",
                    displayNameUML: "Profesor",
                    color: "#94A3B8",
                    posOriginal: { x: -480, y: -160, z: 20 },
                    isActor: true,
                    description: "Docente institucional que consulta sus listas de estudiantes y catálogo.",
                    columns: [
                        { name: "tipo", type: "Docente", isPK: true, isFK: false, desc: "Gestión de clase" },
                        { name: "alcance", type: "Estudiantes / Cursos", isPK: false, isFK: false, desc: "Consulta" }
                    ]
                },
                {
                    id: "act_acudiente",
                    name: "Acudiente",
                    schema: "ACTOR",
                    fullName: "🧍 Acudiente",
                    displayNameER: "ACUDIENTE",
                    displayNameUML: "Acudiente",
                    color: "#94A3B8",
                    posOriginal: { x: -480, y: -300, z: 20 },
                    isActor: true,
                    description: "Tutor o padre de familia que radica y tramita la matrícula del menor.",
                    columns: [
                        { name: "tipo", type: "Acudiente Legal", isPK: true, isFK: false, desc: "Tutor" },
                        { name: "alcance", type: "Matrículas Familiares", isPK: false, isFK: false, desc: "Inscripción" }
                    ]
                },
                {
                    id: "act_estudiante",
                    name: "Estudiante",
                    schema: "ACTOR",
                    fullName: "🧍 Estudiante",
                    displayNameER: "ESTUDIANTE",
                    displayNameUML: "Estudiante",
                    color: "#94A3B8",
                    posOriginal: { x: -480, y: -440, z: 20 },
                    isActor: true,
                    description: "Estudiante matriculado con acceso a sus matrículas y catálogo.",
                    columns: [
                        { name: "tipo", type: "Alumno Activo", isPK: true, isFK: false, desc: "Beneficiario" },
                        { name: "alcance", type: "Consulta Ficha", isPK: false, isFK: false, desc: "Lectura" }
                    ]
                },

                // ==================== MÓDULO: ACCESO PÚBLICO ====================
                {
                    id: "cu_landing",
                    name: "Ver landing pública",
                    schema: "ACCESO PÚBLICO",
                    fullName: "Ver landing pública",
                    displayNameER: "VER_LANDING",
                    displayNameUML: "VerLandingPublica",
                    color: "#38BDF8",
                    posOriginal: { x: -240, y: 340, z: 0 },
                    isUseCase: true,
                    description: "Visualización de la página principal informativa de la institución.",
                    columns: [
                        { name: "módulo", type: "ACCESO PÚBLICO", isPK: true, isFK: false, desc: "Portal web" }
                    ]
                },
                {
                    id: "cu_login",
                    name: "Iniciar sesión",
                    schema: "ACCESO PÚBLICO",
                    fullName: "Iniciar sesión",
                    displayNameER: "INICIAR_SESION",
                    displayNameUML: "IniciarSesion",
                    color: "#38BDF8",
                    posOriginal: { x: 50, y: 340, z: 0 },
                    isUseCase: true,
                    description: "Acceso con credenciales para usuarios registrados en la institución.",
                    columns: [
                        { name: "módulo", type: "ACCESO PÚBLICO", isPK: true, isFK: false, desc: "Autenticación" }
                    ]
                },
                {
                    id: "cu_registro",
                    name: "Registrarse",
                    schema: "ACCESO PÚBLICO",
                    fullName: "Registrarse",
                    displayNameER: "REGISTRARSE",
                    displayNameUML: "Registrarse",
                    color: "#38BDF8",
                    posOriginal: { x: -240, y: 220, z: 0 },
                    isUseCase: true,
                    description: "Formulario para crear nueva cuenta en el sistema escolar.",
                    columns: [
                        { name: "módulo", type: "ACCESO PÚBLICO", isPK: true, isFK: false, desc: "Alta usuario" }
                    ]
                },
                {
                    id: "cu_vincular_auto",
                    name: "Vincular cuenta automática",
                    schema: "ACCESO PÚBLICO",
                    fullName: "Vincular cuenta automática",
                    displayNameER: "VINCULAR_CUENTA_AUTO",
                    displayNameUML: "VincularCuentaAuto",
                    color: "#818CF8",
                    posOriginal: { x: 50, y: 220, z: 0 },
                    isUseCase: true,
                    isSpecial: true,
                    description: "Vinculación automática con registro escolar previo (incluido en Iniciar sesión).",
                    columns: [
                        { name: "módulo", type: "ACCESO PÚBLICO", isPK: true, isFK: false, desc: "Sincronización" }
                    ]
                },

                // ==================== MÓDULO: INICIO Y MI CUENTA ====================
                {
                    id: "cu_panel_inicio",
                    name: "Ver panel de inicio",
                    schema: "INICIO Y MI CUENTA",
                    fullName: "Ver panel de inicio",
                    displayNameER: "VER_PANEL_INICIO",
                    displayNameUML: "VerPanelInicio",
                    color: "#38BDF8",
                    posOriginal: { x: 340, y: 340, z: 0 },
                    isUseCase: true,
                    description: "Dashboard principal personalizado según el rol del usuario.",
                    columns: [
                        { name: "módulo", type: "INICIO Y MI CUENTA", isPK: true, isFK: false, desc: "Dashboard" }
                    ]
                },
                {
                    id: "cu_logout",
                    name: "Cerrar sesión",
                    schema: "INICIO Y MI CUENTA",
                    fullName: "Cerrar sesión",
                    displayNameER: "CERRAR_SESION",
                    displayNameUML: "CerrarSesion",
                    color: "#38BDF8",
                    posOriginal: { x: 600, y: 340, z: 0 },
                    isUseCase: true,
                    description: "Cierre seguro de la sesión activa en el navegador.",
                    columns: [
                        { name: "módulo", type: "INICIO Y MI CUENTA", isPK: true, isFK: false, desc: "Seguridad" }
                    ]
                },
                {
                    id: "cu_perfil",
                    name: "Editar mi perfil",
                    schema: "INICIO Y MI CUENTA",
                    fullName: "Editar mi perfil",
                    displayNameER: "EDITAR_MI_PERFIL",
                    displayNameUML: "EditarMiPerfil",
                    color: "#38BDF8",
                    posOriginal: { x: 340, y: 220, z: 0 },
                    isUseCase: true,
                    description: "Actualización de datos personales, teléfono y foto de perfil.",
                    columns: [
                        { name: "módulo", type: "INICIO Y MI CUENTA", isPK: true, isFK: false, desc: "Datos personales" }
                    ]
                },
                {
                    id: "cu_password",
                    name: "Cambiar contraseña",
                    schema: "INICIO Y MI CUENTA",
                    fullName: "Cambiar contraseña",
                    displayNameER: "CAMBIAR_PASSWORD",
                    displayNameUML: "CambiarContraseña",
                    color: "#38BDF8",
                    posOriginal: { x: 600, y: 220, z: 0 },
                    isUseCase: true,
                    description: "Renovación periódica de la clave de acceso institucional.",
                    columns: [
                        { name: "módulo", type: "INICIO Y MI CUENTA", isPK: true, isFK: false, desc: "Credenciales" }
                    ]
                },

                // ==================== MÓDULO: ACADÉMICO ====================
                {
                    id: "cu_ver_catalogo",
                    name: "Ver catálogo académico",
                    schema: "ACADÉMICO",
                    fullName: "Ver catálogo académico",
                    displayNameER: "VER_CATALOGO",
                    displayNameUML: "VerCatalogoAcademico",
                    color: "#38BDF8",
                    posOriginal: { x: -240, y: 50, z: 0 },
                    isUseCase: true,
                    description: "Consulta de grados escolares, materias y plan de estudios.",
                    columns: [
                        { name: "módulo", type: "ACADÉMICO", isPK: true, isFK: false, desc: "Oferta académica" }
                    ]
                },
                {
                    id: "cu_gest_catalogo",
                    name: "Gestionar catálogo académico",
                    schema: "ACADÉMICO",
                    fullName: "Gestionar catálogo académico",
                    displayNameER: "GESTIONAR_CATALOGO",
                    displayNameUML: "GestionarCatalogoAcademico",
                    color: "#F59E0B",
                    posOriginal: { x: -240, y: -70, z: 0 },
                    isUseCase: true,
                    isGold: true,
                    description: "Creación, edición y cierre de grados y programas por parte del Admin.",
                    columns: [
                        { name: "módulo", type: "ACADÉMICO", isPK: true, isFK: false, desc: "Administración plan" }
                    ]
                },

                // ==================== MÓDULO: MATRÍCULAS ====================
                {
                    id: "cu_ver_matriculas",
                    name: "Ver matrículas",
                    schema: "MATRÍCULAS",
                    fullName: "Ver matrículas",
                    displayNameER: "VER_MATRICULAS",
                    displayNameUML: "VerMatriculas",
                    color: "#38BDF8",
                    posOriginal: { x: 340, y: 50, z: 0 },
                    isUseCase: true,
                    description: "Listado de matrículas registradas y seguimiento de su estado.",
                    columns: [
                        { name: "módulo", type: "MATRÍCULAS", isPK: true, isFK: false, desc: "Consulta matrículas" }
                    ]
                },
                {
                    id: "cu_crear_matricula",
                    name: "Crear matrícula",
                    schema: "MATRÍCULAS",
                    fullName: "Crear matrícula",
                    displayNameER: "CREAR_MATRICULA",
                    displayNameUML: "CrearMatricula",
                    color: "#38BDF8",
                    posOriginal: { x: 600, y: 50, z: 0 },
                    isUseCase: true,
                    description: "Registro y postulación formal de una nueva matrícula escolar.",
                    columns: [
                        { name: "módulo", type: "MATRÍCULAS", isPK: true, isFK: false, desc: "Nueva matrícula" }
                    ]
                },
                {
                    id: "cu_cambiar_estado_mat",
                    name: "Cambiar estado de matrícula",
                    schema: "MATRÍCULAS",
                    fullName: "Cambiar estado de matrícula",
                    displayNameER: "CAMBIAR_ESTADO_MAT",
                    displayNameUML: "CambiarEstadoMatricula",
                    color: "#F59E0B",
                    posOriginal: { x: 470, y: -70, z: 0 },
                    isUseCase: true,
                    isGold: true,
                    description: "Aprobación, rechazo o cancelación de matrículas por el Admin.",
                    columns: [
                        { name: "módulo", type: "MATRÍCULAS", isPK: true, isFK: false, desc: "Estado: Activo/Retirado" }
                    ]
                },

                // ==================== MÓDULO: ADMINISTRACIÓN ====================
                {
                    id: "cu_gest_sedes",
                    name: "Gestionar sedes",
                    schema: "ADMINISTRACIÓN",
                    fullName: "Gestionar sedes",
                    displayNameER: "GESTIONAR_SEDES",
                    displayNameUML: "GestionarSedes",
                    color: "#F59E0B",
                    posOriginal: { x: -240, y: -220, z: 0 },
                    isUseCase: true,
                    isGold: true,
                    description: "Alta, edición y configuración de planteles físicos y sedes.",
                    columns: [
                        { name: "módulo", type: "ADMINISTRACIÓN", isPK: true, isFK: false, desc: "Sedes escolares" }
                    ]
                },
                {
                    id: "cu_ver_reportes",
                    name: "Ver reportes",
                    schema: "ADMINISTRACIÓN",
                    fullName: "Ver reportes",
                    displayNameER: "VER_REPORTES",
                    displayNameUML: "VerReportes",
                    color: "#F59E0B",
                    posOriginal: { x: -240, y: -330, z: 0 },
                    isUseCase: true,
                    isGold: true,
                    description: "Estadísticas, métricas de cupos y reportes institucionales.",
                    columns: [
                        { name: "módulo", type: "ADMINISTRACIÓN", isPK: true, isFK: false, desc: "Métricas y PDF" }
                    ]
                },

                // ==================== MÓDULO: COMUNIDAD ====================
                {
                    id: "cu_gest_profesores",
                    name: "Gestionar profesores",
                    schema: "COMUNIDAD",
                    fullName: "Gestionar profesores",
                    displayNameER: "GESTIONAR_PROFESORES",
                    displayNameUML: "GestionarProfesores",
                    color: "#F59E0B",
                    posOriginal: { x: 340, y: -220, z: 0 },
                    isUseCase: true,
                    isGold: true,
                    description: "Directorio docente, asignación y contratos de profesores.",
                    columns: [
                        { name: "módulo", type: "COMUNIDAD", isPK: true, isFK: false, desc: "Docentes" }
                    ]
                },
                {
                    id: "cu_gest_acudientes",
                    name: "Gestionar acudientes",
                    schema: "COMUNIDAD",
                    fullName: "Gestionar acudientes",
                    displayNameER: "GESTIONAR_ACUDIENTES",
                    displayNameUML: "GestionarAcudientes",
                    color: "#F59E0B",
                    posOriginal: { x: 600, y: -220, z: 0 },
                    isUseCase: true,
                    isGold: true,
                    description: "Registro y control de padres de familia y acudientes legales.",
                    columns: [
                        { name: "módulo", type: "COMUNIDAD", isPK: true, isFK: false, desc: "Padres / Tutores" }
                    ]
                },
                {
                    id: "cu_gest_estudiantes",
                    name: "Gestionar estudiantes",
                    schema: "COMUNIDAD",
                    fullName: "Gestionar estudiantes",
                    displayNameER: "GESTIONAR_ESTUDIANTES",
                    displayNameUML: "GestionarEstudiantes",
                    color: "#F59E0B",
                    posOriginal: { x: 340, y: -330, z: 0 },
                    isUseCase: true,
                    isGold: true,
                    description: "Padrón general del alumnado registrado en la institución.",
                    columns: [
                        { name: "módulo", type: "COMUNIDAD", isPK: true, isFK: false, desc: "Alumnos" }
                    ]
                },
                {
                    id: "cu_consultar_estudiantes",
                    name: "Consultar estudiantes",
                    schema: "COMUNIDAD",
                    fullName: "Consultar estudiantes",
                    displayNameER: "CONSULTAR_ESTUDIANTES",
                    displayNameUML: "ConsultarEstudiantes",
                    color: "#38BDF8",
                    posOriginal: { x: 600, y: -330, z: 0 },
                    isUseCase: true,
                    description: "Consulta de fichas de estudiantes por parte del cuerpo docente.",
                    columns: [
                        { name: "módulo", type: "COMUNIDAD", isPK: true, isFK: false, desc: "Búsqueda docente" }
                    ]
                },
                {
                    id: "cu_vincular_registro",
                    name: "Vincular cuenta a registro",
                    schema: "COMUNIDAD",
                    fullName: "Vincular cuenta a registro",
                    displayNameER: "VINCULAR_CUENTA_REGISTRO",
                    displayNameUML: "VincularCuentaRegistro",
                    color: "#F59E0B",
                    posOriginal: { x: 470, y: -440, z: 0 },
                    isUseCase: true,
                    isGold: true,
                    description: "Asociación manual de cuentas auth con registros preexistentes.",
                    columns: [
                        { name: "módulo", type: "COMUNIDAD", isPK: true, isFK: false, desc: "Vinculación" }
                    ]
                }
            ],
            relations: [
                // Generalización de Actores -> Usuario autenticado
                {
                    id: "rel_gen_admin",
                    fromTable: "act_admin",
                    toTable: "act_user_auth",
                    fromCol: "tipo",
                    toCol: "tipo",
                    cardinalityPhysical: "generaliza",
                    verbERD: "hereda_de",
                    verbUML: "△ generaliza",
                    multUML: "△",
                    color: "#64748B",
                    description: "Admin hereda todas las funciones de Usuario autenticado."
                },
                {
                    id: "rel_gen_profesor",
                    fromTable: "act_profesor",
                    toTable: "act_user_auth",
                    fromCol: "tipo",
                    toCol: "tipo",
                    cardinalityPhysical: "generaliza",
                    verbERD: "hereda_de",
                    verbUML: "△ generaliza",
                    multUML: "△",
                    color: "#64748B",
                    description: "Profesor hereda todas las funciones de Usuario autenticado."
                },
                {
                    id: "rel_gen_acudiente",
                    fromTable: "act_acudiente",
                    toTable: "act_user_auth",
                    fromCol: "tipo",
                    toCol: "tipo",
                    cardinalityPhysical: "generaliza",
                    verbERD: "hereda_de",
                    verbUML: "△ generaliza",
                    multUML: "△",
                    color: "#64748B",
                    description: "Acudiente hereda todas las funciones de Usuario autenticado."
                },
                {
                    id: "rel_gen_estudiante",
                    fromTable: "act_estudiante",
                    toTable: "act_user_auth",
                    fromCol: "tipo",
                    toCol: "tipo",
                    cardinalityPhysical: "generaliza",
                    verbERD: "hereda_de",
                    verbUML: "△ generaliza",
                    multUML: "△",
                    color: "#64748B",
                    description: "Estudiante hereda todas las funciones de Usuario autenticado."
                },

                // Asociaciones: Visitante
                {
                    id: "rel_vis_landing",
                    fromTable: "act_visitante",
                    toTable: "cu_landing",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "asocia",
                    verbERD: "accede",
                    verbUML: "asocia",
                    multUML: "—",
                    color: "#94A3B8",
                    description: "Visitante accede a Ver landing pública."
                },
                {
                    id: "rel_vis_login",
                    fromTable: "act_visitante",
                    toTable: "cu_login",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "asocia",
                    verbERD: "inicia",
                    verbUML: "asocia",
                    multUML: "—",
                    color: "#94A3B8",
                    description: "Visitante accede a Iniciar sesión."
                },
                {
                    id: "rel_vis_registro",
                    fromTable: "act_visitante",
                    toTable: "cu_registro",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "asocia",
                    verbERD: "crea_cuenta",
                    verbUML: "asocia",
                    multUML: "—",
                    color: "#94A3B8",
                    description: "Visitante accede a Registrarse."
                },

                // Asociaciones: Usuario autenticado (comunes a todos)
                {
                    id: "rel_auth_panel",
                    fromTable: "act_user_auth",
                    toTable: "cu_panel_inicio",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "asocia",
                    verbERD: "visualiza",
                    verbUML: "asocia",
                    multUML: "—",
                    color: "#64748B",
                    description: "Todo Usuario autenticado puede Ver panel de inicio."
                },
                {
                    id: "rel_auth_logout",
                    fromTable: "act_user_auth",
                    toTable: "cu_logout",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "asocia",
                    verbERD: "cierra",
                    verbUML: "asocia",
                    multUML: "—",
                    color: "#64748B",
                    description: "Todo Usuario autenticado puede Cerrar sesión."
                },
                {
                    id: "rel_auth_perfil",
                    fromTable: "act_user_auth",
                    toTable: "cu_perfil",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "asocia",
                    verbERD: "modifica",
                    verbUML: "asocia",
                    multUML: "—",
                    color: "#64748B",
                    description: "Todo Usuario autenticado puede Editar mi perfil."
                },
                {
                    id: "rel_auth_pass",
                    fromTable: "act_user_auth",
                    toTable: "cu_password",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "asocia",
                    verbERD: "actualiza",
                    verbUML: "asocia",
                    multUML: "—",
                    color: "#64748B",
                    description: "Todo Usuario autenticado puede Cambiar contraseña."
                },
                {
                    id: "rel_auth_cat",
                    fromTable: "act_user_auth",
                    toTable: "cu_ver_catalogo",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "asocia",
                    verbERD: "consulta",
                    verbUML: "asocia",
                    multUML: "—",
                    color: "#64748B",
                    description: "Todo Usuario autenticado puede Ver catálogo académico."
                },
                {
                    id: "rel_auth_mat",
                    fromTable: "act_user_auth",
                    toTable: "cu_ver_matriculas",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "asocia",
                    verbERD: "consulta",
                    verbUML: "asocia",
                    multUML: "—",
                    color: "#64748B",
                    description: "Todo Usuario autenticado puede Ver matrículas."
                },

                // Asociaciones: Admin (Líneas Doradas)
                {
                    id: "rel_adm_gest_cat",
                    fromTable: "act_admin",
                    toTable: "cu_gest_catalogo",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "gestiona",
                    verbERD: "gestiona",
                    verbUML: "gestiona",
                    multUML: "—",
                    color: "#F59E0B",
                    description: "Admin gestiona el catálogo académico."
                },
                {
                    id: "rel_adm_crear_mat",
                    fromTable: "act_admin",
                    toTable: "cu_crear_matricula",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "crea",
                    verbERD: "crea",
                    verbUML: "crea",
                    multUML: "—",
                    color: "#F59E0B",
                    description: "Admin puede Crear matrícula."
                },
                {
                    id: "rel_adm_camb_mat",
                    fromTable: "act_admin",
                    toTable: "cu_cambiar_estado_mat",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "aprueba",
                    verbERD: "cambia_estado",
                    verbUML: "modifica",
                    multUML: "—",
                    color: "#F59E0B",
                    description: "Admin puede Cambiar estado de matrícula."
                },
                {
                    id: "rel_adm_sedes",
                    fromTable: "act_admin",
                    toTable: "cu_gest_sedes",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "gestiona",
                    verbERD: "administra",
                    verbUML: "gestiona",
                    multUML: "—",
                    color: "#F59E0B",
                    description: "Admin puede Gestionar sedes."
                },
                {
                    id: "rel_adm_rep",
                    fromTable: "act_admin",
                    toTable: "cu_ver_reportes",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "consulta",
                    verbERD: "revisa",
                    verbUML: "consulta",
                    multUML: "—",
                    color: "#F59E0B",
                    description: "Admin puede Ver reportes."
                },
                {
                    id: "rel_adm_prof",
                    fromTable: "act_admin",
                    toTable: "cu_gest_profesores",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "gestiona",
                    verbERD: "administra",
                    verbUML: "gestiona",
                    multUML: "—",
                    color: "#F59E0B",
                    description: "Admin puede Gestionar profesores."
                },
                {
                    id: "rel_adm_acud",
                    fromTable: "act_admin",
                    toTable: "cu_gest_acudientes",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "gestiona",
                    verbERD: "administra",
                    verbUML: "gestiona",
                    multUML: "—",
                    color: "#F59E0B",
                    description: "Admin puede Gestionar acudientes."
                },
                {
                    id: "rel_adm_est",
                    fromTable: "act_admin",
                    toTable: "cu_gest_estudiantes",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "gestiona",
                    verbERD: "administra",
                    verbUML: "gestiona",
                    multUML: "—",
                    color: "#F59E0B",
                    description: "Admin puede Gestionar estudiantes."
                },
                {
                    id: "rel_adm_vinc_reg",
                    fromTable: "act_admin",
                    toTable: "cu_vincular_registro",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "vincula",
                    verbERD: "asocia_registro",
                    verbUML: "vincula",
                    multUML: "—",
                    color: "#F59E0B",
                    description: "Admin puede Vincular cuenta a registro."
                },

                // Asociaciones: Profesor
                {
                    id: "rel_prof_consultar",
                    fromTable: "act_profesor",
                    toTable: "cu_consultar_estudiantes",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "consulta",
                    verbERD: "consulta",
                    verbUML: "consulta",
                    multUML: "—",
                    color: "#94A3B8",
                    description: "Profesor puede Consultar estudiantes."
                },

                // Asociaciones: Acudiente
                {
                    id: "rel_acud_crear_mat",
                    fromTable: "act_acudiente",
                    toTable: "cu_crear_matricula",
                    fromCol: "tipo",
                    toCol: "módulo",
                    cardinalityPhysical: "solicita",
                    verbERD: "solicita_matricula",
                    verbUML: "crea",
                    multUML: "—",
                    color: "#94A3B8",
                    description: "Acudiente puede Crear matrícula."
                },

                // Relaciones Internas de Casos de Uso
                {
                    id: "rel_reg_vinc_auto",
                    fromTable: "cu_registro",
                    toTable: "cu_vincular_auto",
                    fromCol: "módulo",
                    toCol: "módulo",
                    cardinalityPhysical: "asocia",
                    verbERD: "activa",
                    verbUML: "—",
                    multUML: "—",
                    color: "#818CF8",
                    description: "Registrarse activa Vincular cuenta automática."
                },
                {
                    id: "rel_inc_vinc_login",
                    fromTable: "cu_vincular_auto",
                    toTable: "cu_login",
                    fromCol: "módulo",
                    toCol: "módulo",
                    cardinalityPhysical: "include",
                    verbERD: "«include»",
                    verbUML: "«include»",
                    multUML: "«include»",
                    color: "#818CF8",
                    description: "Vincular cuenta automática incluye Iniciar sesión."
                }
            ]
        }
    }
];
