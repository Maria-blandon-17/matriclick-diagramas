// =============================================================================
// MATRI-CLICK: DEFINICIÓN DE DATOS Y METADATOS DE LA BASE DE DATOS
// Tablas, columnas, tipos de datos, llaves (PK/FK) y relaciones entre tablas.
// Basado fielmente en los diagramas del sistema Matri-Click.
// =============================================================================

function dbCol(name, type, kind, desc) {
    return {
        name: name,
        type: type,
        isPK: kind === "pk",
        isFK: kind === "fk",
        desc: desc
    };
}

const DATABASE_METADATA = {
    info: {
        title: "matriclick - Esquema físico",
        description: "Esquema relacional de Matriclick con las tablas, tipos y llaves de la lámina.",
        schemas: ["matriclick"],
        totalTables: 10,
        totalRelations: 12
    },
    tables: [
        {
            id: "grados",
            name: "grados",
            schema: "matriclick",
            fullName: "matriclick.grados",
            displayNameER: "GRADOS",
            displayNameUML: "grados",
            color: "#1A73E8",
            posOriginal: { x: -860, y: 430, z: 0 },
            posLayered: { x: -860, y: 430, z: -120 },
            posOrbital: { x: -700, y: 360, z: -80 },
            shape: "dbtable",
            anchor: "rect",
            description: "Grados académicos: primaria y bachillerato.",
            columns: [
                dbCol("id_grado", "char(36)", "pk", "Identificador del grado"),
                dbCol("nombre_grado", "varchar(100)", "", "Nombre del grado"),
                dbCol("nivel_educativo", "enum('Primaria','Bachillerato')", "", "Nivel educativo")
            ]
        },
        {
            id: "sedes",
            name: "sedes",
            schema: "matriclick",
            fullName: "matriclick.sedes",
            displayNameER: "SEDES",
            displayNameUML: "sedes",
            color: "#1A73E8",
            posOriginal: { x: -250, y: 500, z: 0 },
            posLayered: { x: -250, y: 500, z: -80 },
            posOrbital: { x: -180, y: 420, z: 40 },
            shape: "dbtable",
            anchor: "rect",
            description: "Sedes físicas de la institución.",
            columns: [
                dbCol("id_sede", "char(36)", "pk", "Identificador de la sede"),
                dbCol("nombre_sede", "varchar(255)", "", "Nombre de la sede"),
                dbCol("direccion", "text", "", "Dirección"),
                dbCol("telefono", "varchar(50)", "", "Teléfono"),
                dbCol("imagen_url", "text", "", "Imagen de la sede"),
                dbCol("created_at", "datetime", "", "Fecha de creación")
            ]
        },
        {
            id: "auth_usuarios",
            name: "auth_usuarios",
            schema: "matriclick",
            fullName: "matriclick.auth_usuarios",
            displayNameER: "AUTH_USUARIOS",
            displayNameUML: "auth_usuarios",
            color: "#1A73E8",
            posOriginal: { x: 430, y: 520, z: 0 },
            posLayered: { x: 430, y: 520, z: -40 },
            posOrbital: { x: 360, y: 440, z: 60 },
            shape: "dbtable",
            anchor: "rect",
            sqliteName: "auth_users",
            description: "Credenciales de acceso: correo y contraseña.",
            columns: [
                dbCol("id", "char(36)", "pk", "Identificador del usuario"),
                dbCol("email", "varchar(320)", "", "Correo"),
                dbCol("password", "varchar(255)", "", "Contraseña"),
                dbCol("created_at", "datetime", "", "Fecha de creación")
            ]
        },
        {
            id: "perfiles",
            name: "perfiles",
            schema: "matriclick",
            fullName: "matriclick.perfiles",
            displayNameER: "PERFILES",
            displayNameUML: "perfiles",
            color: "#1A73E8",
            posOriginal: { x: 1080, y: 340, z: 0 },
            posLayered: { x: 1080, y: 340, z: 40 },
            posOrbital: { x: 860, y: 280, z: -40 },
            shape: "dbtable",
            anchor: "rect",
            description: "Perfil de la cuenta: rol y vínculo con profesor, acudiente o estudiante.",
            columns: [
                dbCol("id", "char(36)", "pk", "Identificador del perfil"),
                dbCol("rol", "enum('admin','profesor','acudiente','estudiante')", "", "Rol"),
                dbCol("nombre_completo", "varchar(300)", "", "Nombre completo"),
                dbCol("documento", "varchar(50)", "", "Documento"),
                dbCol("rechazado", "tinyint(1)", "", "Marca de rechazo"),
                dbCol("terminos_aceptados_at", "datetime", "", "Aceptación de términos"),
                dbCol("terminos_version", "varchar(50)", "", "Versión de términos"),
                dbCol("id_profesor", "char(36)", "fk", "Profesor vinculado"),
                dbCol("id_acudiente", "char(36)", "fk", "Acudiente vinculado"),
                dbCol("id_estudiante", "char(36)", "fk", "Estudiante vinculado"),
                dbCol("created_at", "datetime", "", "Fecha de creación")
            ]
        },
        {
            id: "grupos",
            name: "grupos",
            schema: "matriclick",
            fullName: "matriclick.grupos",
            displayNameER: "GRUPOS",
            displayNameUML: "grupos",
            color: "#1A73E8",
            posOriginal: { x: -860, y: 40, z: 0 },
            posLayered: { x: -860, y: 40, z: 20 },
            posOrbital: { x: -720, y: 20, z: 80 },
            shape: "dbtable",
            anchor: "rect",
            description: "Grupos de un grado, en una sede, con director y cupo.",
            columns: [
                dbCol("id_grupo", "char(36)", "pk", "Identificador del grupo"),
                dbCol("id_grado", "char(36)", "fk", "Grado"),
                dbCol("id_sede", "char(36)", "fk", "Sede"),
                dbCol("nombre_grupo", "varchar(100)", "", "Nombre del grupo"),
                dbCol("cupo_maximo", "int(11)", "", "Cupo máximo"),
                dbCol("id_director_grupo", "char(36)", "fk", "Director de grupo")
            ]
        },
        {
            id: "matriculas",
            name: "matriculas",
            schema: "matriclick",
            fullName: "matriclick.matriculas",
            displayNameER: "MATRICULAS",
            displayNameUML: "matriculas",
            color: "#1A73E8",
            posOriginal: { x: 40, y: 20, z: 0 },
            posLayered: { x: 40, y: 20, z: 80 },
            posOrbital: { x: 40, y: 0, z: 0 },
            shape: "dbtable",
            anchor: "rect",
            description: "Matrícula del estudiante en un periodo y un grupo.",
            columns: [
                dbCol("id_matricula", "char(36)", "pk", "Identificador de la matrícula"),
                dbCol("codigo_matricula", "varchar(50)", "", "Código de matrícula"),
                dbCol("id_estudiante", "char(36)", "fk", "Estudiante"),
                dbCol("id_periodo", "char(36)", "fk", "Periodo académico"),
                dbCol("id_grupo", "char(36)", "fk", "Grupo"),
                dbCol("fecha_matricula", "datetime", "", "Fecha de matrícula"),
                dbCol("estado_matricula", "enum('Activa','Cancelada','Finalizada','Pendiente','En revision','Rechazada','Expirada')", "", "Estado"),
                dbCol("observaciones", "text", "", "Observaciones"),
                dbCol("id_acudiente_solicitante", "char(36)", "fk", "Acudiente que solicita"),
                dbCol("motivo_estado", "text", "", "Motivo del estado")
            ]
        },
        {
            id: "profesores",
            name: "profesores",
            schema: "matriclick",
            fullName: "matriclick.profesores",
            displayNameER: "PROFESORES",
            displayNameUML: "profesores",
            color: "#1A73E8",
            posOriginal: { x: -860, y: -430, z: 0 },
            posLayered: { x: -860, y: -430, z: -60 },
            posOrbital: { x: -700, y: -380, z: 20 },
            shape: "dbtable",
            anchor: "rect",
            description: "Profesores de la institución.",
            columns: [
                dbCol("id_profesor", "char(36)", "pk", "Identificador del profesor"),
                dbCol("documento", "varchar(50)", "", "Documento"),
                dbCol("nombres", "varchar(150)", "", "Nombres"),
                dbCol("apellidos", "varchar(150)", "", "Apellidos"),
                dbCol("telefono", "varchar(50)", "", "Teléfono"),
                dbCol("correo_electronico", "varchar(320)", "", "Correo"),
                dbCol("estado_profesor", "enum('Activo','Inactivo')", "", "Estado"),
                dbCol("created_at", "datetime", "", "Fecha de creación")
            ]
        },
        {
            id: "periodos_academicos",
            name: "periodos_academicos",
            schema: "matriclick",
            fullName: "matriclick.periodos_academicos",
            displayNameER: "PERIODOS_ACADEMICOS",
            displayNameUML: "periodos_academicos",
            color: "#1A73E8",
            posOriginal: { x: -220, y: -500, z: 0 },
            posLayered: { x: -220, y: -500, z: -100 },
            posOrbital: { x: -160, y: -460, z: -60 },
            shape: "dbtable",
            anchor: "rect",
            description: "Periodos académicos y su vigencia.",
            columns: [
                dbCol("id_periodo", "char(36)", "pk", "Identificador del periodo"),
                dbCol("nombre_periodo", "varchar(100)", "", "Nombre del periodo"),
                dbCol("fecha_inicio", "date", "", "Fecha de inicio"),
                dbCol("fecha_fin", "date", "", "Fecha de fin"),
                dbCol("estado", "enum('Planeado','Activo','Finalizado')", "", "Estado")
            ]
        },
        {
            id: "estudiantes",
            name: "estudiantes",
            schema: "matriclick",
            fullName: "matriclick.estudiantes",
            displayNameER: "ESTUDIANTES",
            displayNameUML: "estudiantes",
            color: "#1A73E8",
            posOriginal: { x: 360, y: -430, z: 0 },
            posLayered: { x: 360, y: -430, z: 60 },
            posOrbital: { x: 300, y: -380, z: 40 },
            shape: "dbtable",
            anchor: "rect",
            description: "Estudiantes y su acudiente.",
            columns: [
                dbCol("id_estudiante", "char(36)", "pk", "Identificador del estudiante"),
                dbCol("tipo_documento", "enum('TI','RC','CE','Pasaporte')", "", "Tipo de documento"),
                dbCol("documento", "varchar(50)", "", "Documento"),
                dbCol("nombres", "varchar(150)", "", "Nombres"),
                dbCol("apellidos", "varchar(150)", "", "Apellidos"),
                dbCol("fecha_nacimiento", "date", "", "Fecha de nacimiento"),
                dbCol("genero", "enum('Masculino','Femenino','Otro')", "", "Género"),
                dbCol("id_acudiente", "char(36)", "fk", "Acudiente"),
                dbCol("fecha_registro", "datetime", "", "Fecha de registro"),
                dbCol("estado_estudiante", "enum('Activo','Retirado','Graduado')", "", "Estado")
            ]
        },
        {
            id: "acudientes",
            name: "acudientes",
            schema: "matriclick",
            fullName: "matriclick.acudientes",
            displayNameER: "ACUDIENTES",
            displayNameUML: "acudientes",
            color: "#1A73E8",
            posOriginal: { x: 1120, y: -180, z: 0 },
            posLayered: { x: 1120, y: -180, z: -40 },
            posOrbital: { x: 900, y: -160, z: 80 },
            shape: "dbtable",
            anchor: "rect",
            description: "Acudientes del estudiante.",
            columns: [
                dbCol("id_acudiente", "char(36)", "pk", "Identificador del acudiente"),
                dbCol("tipo_documento", "enum('TI','CC','CE','Pasaporte')", "", "Tipo de documento"),
                dbCol("documento", "varchar(50)", "", "Documento"),
                dbCol("nombres", "varchar(150)", "", "Nombres"),
                dbCol("apellidos", "varchar(150)", "", "Apellidos"),
                dbCol("telefono", "varchar(50)", "", "Teléfono"),
                dbCol("correo_electronico", "varchar(320)", "", "Correo"),
                dbCol("direccion", "text", "", "Dirección"),
                dbCol("parentesco", "enum('Padre','Madre','Tutor','Otro')", "", "Parentesco"),
                dbCol("created_at", "datetime", "", "Fecha de creación")
            ]
        }
    ],
    relations: [
        { id: "rel_grados_grupos", fromTable: "grados", toTable: "grupos", fromCol: "id_grado", toCol: "id_grado", cardinalityPhysical: "1 : N", verbERD: "tiene", verbUML: "tiene", multUML: "1 ─── 0..*", color: "#F4C430", flat: true, description: "Un grado tiene varios grupos." },
        { id: "rel_sedes_grupos", fromTable: "sedes", toTable: "grupos", fromCol: "id_sede", toCol: "id_sede", cardinalityPhysical: "1 : N", verbERD: "tiene", verbUML: "tiene", multUML: "1 ─── 0..*", color: "#E040FB", flat: true, description: "Una sede tiene varios grupos." },
        { id: "rel_profesores_grupos", fromTable: "profesores", toTable: "grupos", fromCol: "id_profesor", toCol: "id_director_grupo", cardinalityPhysical: "1 : N", verbERD: "dirige", verbUML: "dirige", multUML: "1 ─── 0..*", color: "#1E88E5", flat: true, description: "Un profesor dirige un grupo." },
        { id: "rel_grupos_matriculas", fromTable: "grupos", toTable: "matriculas", fromCol: "id_grupo", toCol: "id_grupo", cardinalityPhysical: "1 : N", verbERD: "recibe", verbUML: "recibe", multUML: "1 ─── 0..*", color: "#43A047", flat: true, description: "Un grupo recibe varias matrículas." },
        { id: "rel_periodos_matriculas", fromTable: "periodos_academicos", toTable: "matriculas", fromCol: "id_periodo", toCol: "id_periodo", cardinalityPhysical: "1 : N", verbERD: "incluye", verbUML: "incluye", multUML: "1 ─── 0..*", color: "#43A047", flat: true, description: "Un periodo incluye varias matrículas." },
        { id: "rel_estudiantes_matriculas", fromTable: "estudiantes", toTable: "matriculas", fromCol: "id_estudiante", toCol: "id_estudiante", cardinalityPhysical: "1 : N", verbERD: "tiene", verbUML: "tiene", multUML: "1 ─── 0..*", color: "#00ACC1", flat: true, description: "Un estudiante tiene varias matrículas." },
        { id: "rel_acudientes_estudiantes", fromTable: "acudientes", toTable: "estudiantes", fromCol: "id_acudiente", toCol: "id_acudiente", cardinalityPhysical: "1 : N", verbERD: "representa", verbUML: "representa", multUML: "1 ─── 0..*", color: "#43A047", flat: true, description: "Un acudiente representa a varios estudiantes." },
        { id: "rel_acudientes_matriculas", fromTable: "acudientes", toTable: "matriculas", fromCol: "id_acudiente", toCol: "id_acudiente_solicitante", cardinalityPhysical: "1 : N", verbERD: "solicita", verbUML: "solicita", multUML: "1 ─── 0..*", color: "#66BB6A", flat: true, description: "Un acudiente solicita varias matrículas." },
        { id: "rel_profesores_perfiles", fromTable: "profesores", toTable: "perfiles", fromCol: "id_profesor", toCol: "id_profesor", cardinalityPhysical: "1 : N", verbERD: "tiene", verbUML: "tiene", multUML: "1 ─── 0..*", color: "#1E88E5", flat: true, description: "Un profesor se vincula a su perfil." },
        { id: "rel_auth_perfiles", fromTable: "auth_usuarios", toTable: "perfiles", fromCol: "id", toCol: "id", cardinalityPhysical: "1 : 1", verbERD: "tiene", verbUML: "tiene", multUML: "1 ─── 1", color: "#1E88E5", flat: true, description: "El usuario de acceso tiene un perfil." },
        { id: "rel_perfiles_acudientes", fromTable: "perfiles", toTable: "acudientes", fromCol: "id_acudiente", toCol: "id_acudiente", cardinalityPhysical: "1 : 1", verbERD: "vincula", verbUML: "vincula", multUML: "1 ─── 0..1", color: "#43A047", flat: true, description: "El perfil se vincula con un acudiente." },
        { id: "rel_perfiles_estudiantes", fromTable: "perfiles", toTable: "estudiantes", fromCol: "id_estudiante", toCol: "id_estudiante", cardinalityPhysical: "1 : 1", verbERD: "vincula", verbUML: "vincula", multUML: "1 ─── 0..1", color: "#26A69A", flat: true, description: "El perfil se vincula con un estudiante." }
    ]
};

// =============================================================================
// SISTEMA DE 4 PESTAÑAS DE DIAGRAMAS INSTITUCIONALES DEL PROYECTO
// 1. Bases de Datos (Esquema Físico Relacional)
// 2. Diagrama de Casos de Uso (Actores y Procesos)
// 3. Diagrama Modelo Entidad Relación (ERD Conceptual - Imagen 2)
// 4. Diagrama de Clases (UML Estructural - Imagen 3)
// =============================================================================
// -----------------------------------------------------------------------------
// HELPERS DEL DIAGRAMA DE FLUJO (coordenadas en píxeles de la lámina)
// -----------------------------------------------------------------------------
function flowNode(id, name, kind, cx, cy, w, h, opts) {
    const o = opts || {};
    return {
        id: id,
        name: name,
        schema: "PROCESO",
        fullName: name,
        displayNameER: id.toUpperCase(),
        displayNameUML: name,
        color: o.border || "#2E4A9A",
        shape: "flow",
        kind: kind,
        flowPx: true,
        anchor: "rect",
        posOriginal: { x: cx, y: cy, z: 0 },
        box: { w: w, h: h },
        fill: o.fill || "#FFFFFF",
        border: o.border || "#2E4A9A",
        textColor: o.textColor || "#1D2B3A",
        icon: o.icon || "",
        iconPos: o.iconPos || "left",
        bold: !!o.bold,
        labelLines: o.lines || [name],
        description: name,
        columns: [
            { name: "paso", type: kind, isPK: true, isFK: false, desc: name }
        ]
    };
}

function flowEdge(id, from, fromSide, to, toSide, via, color, arrow, dashed, description) {
    return {
        id: id,
        fromTable: from,
        toTable: to,
        fromSide: fromSide,
        toSide: toSide,
        via: via || [],
        color: color,
        arrow: arrow,
        dashed: dashed,
        flow: true,
        cardinalityPhysical: "flujo",
        verbERD: "flujo",
        verbUML: "flujo",
        multUML: "—",
        description: description
    };
}

const PROJECT_WORKSPACES = [
    // -------------------------------------------------------------------------
    // PESTAÑA 1: BASES DE DATOS (ESQUEMA FÍSICO)
    // -------------------------------------------------------------------------
    {
        id: "tab_db",
        name: "Base de Datos",
        subtitle: "Esquema Físico Relacional (PostgreSQL / SQLite)",
        status: "active",
        bannerText: "🗄️ Esquema físico de matriclick: 10 tablas, tipos y llaves como en la lámina. Arrastra cualquier tabla; las líneas la siguen.",
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
    },

    // -------------------------------------------------------------------------
    // PESTAÑA 5: DIAGRAMA DE FLUJO - INSCRIPCIÓN DEPORTIVA (lámina de referencia)
    // Coordenadas en píxeles de la lámina (posOriginal con flowPx).
    // -------------------------------------------------------------------------
    {
        id: "tab_flujo",
        name: "Flujo de Inscripción",
        subtitle: "Diagrama de flujo - Inscripción deportiva",
        status: "active",
        bannerText: "🔀 Diagrama de flujo de la inscripción deportiva, como en la lámina. Arrastra cualquier nodo; las flechas lo siguen.",
        data: {
            info: {
                title: "Diagrama de flujo - Inscripción deportiva",
                description: "Recepción, validación, subprocesos principales, evaluación y generación de resultados.",
                schemas: ["PROCESO"],
                totalTables: 16,
                totalRelations: 17,
                labels: [
                    { text: "SÍ", x: 404, y: 280, color: "#1F3A68" },
                    { text: "NO", x: 258, y: 184, color: "#1F3A68" },
                    { text: "NO", x: 512, y: 416, color: "#E0218A" },
                    { text: "SÍ", x: 402, y: 489, color: "#1F3A68" },
                    { text: "SÍ", x: 404, y: 836, color: "#1F3A68" },
                    { text: "NO — retorna a subprocesos", x: 205, y: 766, color: "#E0218A" }
                ]
            },
            tables: [
                flowNode("inicio", "INICIO", "terminator", 387, 33, 136, 44, { fill: "#2E7D4F", border: "#1B5E36", textColor: "#ffffff", lines: ["INICIO"] }),
                flowNode("recepcion", "Recepción de solicitud", "process", 388, 109, 320, 62, { fill: "#D9E6FF", border: "#2E4A9A", icon: "📝", iconPos: "left", lines: ["Recepción de solicitud", "de inscripción deportiva"] }),
                flowNode("solicitar", "Solicitar información", "process", 123, 191, 217, 68, { fill: "#FFF2B3", border: "#D9A21B", icon: "⚠️", iconPos: "left", lines: ["Solicitar información", "faltante al solicitante"] }),
                flowNode("dec_doc", "¿Documentación completa?", "decision", 388, 212, 205, 105, { fill: "#FADCEB", border: "#E0218A", icon: "📄", lines: ["¿Documentación", "completa?"] }),
                flowNode("validacion", "Validación y registro", "process", 388, 323, 297, 63, { fill: "#BEE3F8", border: "#2B6CB0", icon: "🖥️", iconPos: "left", lines: ["Validación y registro", "del deportista en el sistema"] }),
                flowNode("dec_reg", "¿Registro aprobado?", "decision", 388, 430, 190, 100, { fill: "#FADCEB", border: "#E0218A", icon: "✅", lines: ["¿Registro", "aprobado?"] }),
                flowNode("notificar", "Notificar rechazo", "process", 667, 388, 200, 63, { fill: "#FFE9A6", border: "#E0A43A", icon: "✉️", iconPos: "left", lines: ["Notificar rechazo", "al solicitante"] }),
                flowNode("subprocesos", "SUBPROCESOS PRINCIPALES", "subprocess", 388, 527, 331, 60, { fill: "#8ED9A5", border: "#2E8B57", icon: "⚙️", iconPos: "left", bold: true, lines: ["SUBPROCESOS", "PRINCIPALES"] }),
                flowNode("sub_atletas", "Registro de Atletas", "subprocess", 94, 641, 132, 93, { fill: "#B5F2D2", border: "#1E9A62", icon: "👤", iconPos: "top", lines: ["Registro de", "Atletas"] }),
                flowNode("sub_prog", "Programación Deportiva", "subprocess", 238, 641, 132, 93, { fill: "#BFD9FF", border: "#3A7BD5", icon: "📅", iconPos: "top", lines: ["Programación", "Deportiva"] }),
                flowNode("sub_inst", "Gestión de Instalaciones", "subprocess", 388, 641, 136, 93, { fill: "#FFD98A", border: "#D9921A", icon: "🏢", iconPos: "top", lines: ["Gestión de", "Instalaciones"] }),
                flowNode("sub_eval", "Evaluación Técnica", "subprocess", 536, 641, 136, 93, { fill: "#D9C6FA", border: "#7B4FD6", icon: "📋", iconPos: "top", lines: ["Evaluación", "Técnica"] }),
                flowNode("sub_rep", "Reportes y Estadísticas", "subprocess", 684, 641, 136, 93, { fill: "#FBC4DF", border: "#D81B60", icon: "📊", iconPos: "top", lines: ["Reportes y", "Estadísticas"] }),
                flowNode("dec_eval", "¿Evaluación completa?", "decision", 387, 776, 182, 88, { fill: "#FADCEB", border: "#E0218A", icon: "🔍", lines: ["¿Evaluación", "completa?"] }),
                flowNode("generacion", "Generación de resultados", "process", 388, 880, 301, 60, { fill: "#D9CCF7", border: "#6A4FC7", icon: "📊", iconPos: "left", lines: ["Generación de resultados", "y reporte final del proceso"] }),
                flowNode("fin", "FIN", "terminator", 388, 965, 130, 44, { fill: "#2E7D4F", border: "#1B5E36", textColor: "#ffffff", lines: ["FIN"] })
            ],
            relations: [
                flowEdge("rel_inicio_recepcion", "inicio", "bottom", "recepcion", "top", [], "#1F3A68", true, false, "Inicio envía la solicitud a recepción."),
                flowEdge("rel_recepcion_dec_doc", "recepcion", "bottom", "dec_doc", "top", [], "#1F3A68", true, false, "La solicitud pasa a verificar la documentación."),
                flowEdge("rel_dec_doc_validacion", "dec_doc", "bottom", "validacion", "top", [], "#1F3A68", true, false, "Si la documentación está completa, se valida y registra."),
                flowEdge("rel_dec_doc_solicitar", "dec_doc", "left", "solicitar", "right", [], "#1F3A68", true, false, "Si falta documentación, se solicita la información faltante."),
                flowEdge("rel_solicitar_recepcion", "solicitar", "top", "recepcion", "left", [[123, 109]], "#E0218A", true, true, "La información faltante regresa a la recepción."),
                flowEdge("rel_validacion_dec_reg", "validacion", "bottom", "dec_reg", "top", [], "#1F3A68", true, false, "El registro se somete a aprobación."),
                flowEdge("rel_dec_reg_notificar", "dec_reg", "right", "notificar", "left", [[540, 430], [540, 388]], "#E0218A", true, true, "Si el registro no se aprueba, se notifica el rechazo."),
                flowEdge("rel_dec_reg_subprocesos", "dec_reg", "bottom", "subprocesos", "top", [], "#1F3A68", true, false, "Si se aprueba, inician los subprocesos principales."),
                flowEdge("rel_sub_atletas", "subprocesos", "bottom", "sub_atletas", "top", [[388, 572], [94, 572]], "#2E8B57", false, false, "Subproceso: registro de atletas."),
                flowEdge("rel_sub_prog", "subprocesos", "bottom", "sub_prog", "top", [[388, 572], [238, 572]], "#2E8B57", false, false, "Subproceso: programación deportiva."),
                flowEdge("rel_sub_inst", "subprocesos", "bottom", "sub_inst", "top", [[388, 572], [388, 572]], "#2E8B57", false, false, "Subproceso: gestión de instalaciones."),
                flowEdge("rel_sub_eval", "subprocesos", "bottom", "sub_eval", "top", [[388, 572], [536, 572]], "#2E8B57", false, false, "Subproceso: evaluación técnica."),
                flowEdge("rel_sub_rep", "subprocesos", "bottom", "sub_rep", "top", [[388, 572], [684, 572]], "#2E8B57", false, false, "Subproceso: reportes y estadísticas."),
                flowEdge("rel_atletas_eval", "sub_atletas", "bottom", "dec_eval", "top", [[94, 710], [387, 710]], "#2E8B57", false, false, "Los subprocesos alimentan la evaluación."),
                flowEdge("rel_prog_eval", "sub_prog", "bottom", "dec_eval", "top", [[238, 710], [387, 710]], "#2E8B57", false, false, "Los subprocesos alimentan la evaluación."),
                flowEdge("rel_inst_eval", "sub_inst", "bottom", "dec_eval", "top", [[388, 710], [387, 710]], "#2E8B57", false, false, "Los subprocesos alimentan la evaluación."),
                flowEdge("rel_eval_eval", "sub_eval", "bottom", "dec_eval", "top", [[536, 710], [387, 710]], "#2E8B57", false, false, "Los subprocesos alimentan la evaluación."),
                flowEdge("rel_rep_eval", "sub_rep", "bottom", "dec_eval", "top", [[684, 710], [387, 710]], "#2E8B57", false, false, "Los subprocesos alimentan la evaluación."),
                flowEdge("rel_dec_eval_loop", "dec_eval", "left", "subprocesos", "left", [[18, 776], [18, 527]], "#E0218A", true, true, "Si la evaluación no está completa, se retorna a los subprocesos."),
                flowEdge("rel_dec_eval_generacion", "dec_eval", "bottom", "generacion", "top", [], "#1F3A68", true, false, "Si la evaluación está completa, se generan los resultados."),
                flowEdge("rel_generacion_fin", "generacion", "bottom", "fin", "top", [], "#1F3A68", true, false, "Fin del proceso."),
                flowEdge("rel_notificar_fin", "notificar", "bottom", "fin", "right", [[683, 420], [683, 965]], "#E0218A", true, true, "El rechazo termina el proceso.")
            ]
        }
    }
];
