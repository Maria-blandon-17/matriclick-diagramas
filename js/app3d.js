// =============================================================================
// MATRI-CLICK 3D: MOTOR GRÁFICO THREE.JS Y VISUALIZADOR INTERACTIVO MULTI-DIAGRAMA
// Soporta:
// 1. Conexión de cables a los LADOS/BORDES exteriores de las tablas (nunca por dentro).
// 2. Arrastre libre de cualquier tabla en el espacio 3D con actualización de líneas en tiempo real.
// 3. Sistema de pestañas con 3 diagramas de proyecto independientes.
// 4. Modos Físico, ERD, UML, giros 360°, paneo hacia los lados y zoom.
// =============================================================================

// Polyfill universal para roundRect en canvas
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (!r) r = 0;
        let radii = [0, 0, 0, 0];
        if (typeof r === 'number') radii = [r, r, r, r];
        else if (Array.isArray(r)) {
            if (r.length === 1) radii = [r[0], r[0], r[0], r[0]];
            else if (r.length === 2) radii = [r[0], r[1], r[0], r[1]];
            else if (r.length === 4) radii = r;
        }
        this.moveTo(x + radii[0], y);
        this.lineTo(x + w - radii[1], y);
        this.quadraticCurveTo(x + w, y, x + w, y + radii[1]);
        this.lineTo(x + w, y + h - radii[2]);
        this.quadraticCurveTo(x + w, y + h, x + w - radii[2], y + h);
        this.lineTo(x + radii[3], y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - radii[3]);
        this.lineTo(x, y + radii[0]);
        this.quadraticCurveTo(x, y, x + radii[0], y);
        this.closePath();
        return this;
    };
}

let scene, camera, renderer, controls;
let tableMeshes = {};
let relationObjects = [];
let particles = [];
let hoveredTable = null;
let selectedTable = null;
let currentMode = "physical"; // 'physical' | 'erd' | 'uml'
let currentLayout = "original"; // 'original' | 'layered' | 'orbital'
let currentWorkspaceIdx = 0; // 0: Diagrama 1, 1: Diagrama 2, 2: Diagrama 3
let isAutoRotating = false;

// Variables para arrastre libre de tablas en 3D
let isMouseDown = false;
let isDraggingTable = false;
let dragTarget = null;
const dragPlane = new THREE.Plane();
const dragOffset = new THREE.Vector3();
const mouseDownScreenPos = { x: 0, y: 0 };

// Dimensiones de tarjetas de tabla
const CARD_WIDTH = 240;
const ROW_HEIGHT = 28;
const HEADER_HEIGHT = 44;

// Inicialización cuando carga el DOM
window.addEventListener("DOMContentLoaded", () => {
    initScene();
    loadWorkspace(0);
    createDigitalDust();
    setupEventListeners();
    setupUIControls();
    animate();
});

// -----------------------------------------------------------------------------
// 1. CONFIGURACIÓN DE LA ESCENA 3D Y CÁMARA
// -----------------------------------------------------------------------------
function initScene() {
    const container = document.getElementById("canvas-container");
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Escena principal
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b14);
    scene.fog = new THREE.FogExp2(0x070b14, 0.00035);

    // Cámara con ángulo amplio y profundidad
    camera = new THREE.PerspectiveCamera(50, width / height, 10, 15000);
    camera.position.set(0, 120, 1300);

    // Renderizador WebGL
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Controles Orbitales (Girar 360°, Panear a los lados, Zoom)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.screenSpacePanning = true; // Permite mover libremente a los lados (pan)
    controls.minDistance = 200;
    controls.maxDistance = 3500;
    controls.target.set(0, 0, 0);

    // Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight1.position.set(400, 800, 600);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00d2ff, 0.45);
    dirLight2.position.set(-500, -300, 400);
    scene.add(dirLight2);

    // Rejilla de fondo estilo Cyber-Grid
    const gridHelper = new THREE.GridHelper(3000, 60, 0x00d2ff, 0x162447);
    gridHelper.position.y = -500;
    scene.add(gridHelper);

    // Redimensión de ventana
    window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
    const container = document.getElementById("canvas-container");
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// -----------------------------------------------------------------------------
// 2. GESTOR DE ESPACIOS DE TRABAJO (PESTAÑAS DE PROYECTO)
// -----------------------------------------------------------------------------
function loadWorkspace(idx) {
    currentWorkspaceIdx = idx;
    const workspace = PROJECT_WORKSPACES[idx];
    if (!workspace) return;

    // Limpiar tablas anteriores de la escena
    Object.values(tableMeshes).forEach(mesh => {
        scene.remove(mesh);
        if (mesh.geometry) mesh.geometry.dispose();
    });
    tableMeshes = {};

    // Limpiar relaciones anteriores
    relationObjects.forEach(obj => {
        scene.remove(obj.mesh);
        if (obj.mesh.geometry) obj.mesh.geometry.dispose();
        if (obj.badge) scene.remove(obj.badge);
    });
    relationObjects = [];

    // Limpiar partículas
    particles.forEach(p => {
        scene.remove(p.mesh);
        if (p.mesh.geometry) p.mesh.geometry.dispose();
    });
    particles = [];

    selectedTable = null;
    hoveredTable = null;
    document.getElementById("sidebar-panel")?.classList.remove("open");

    // Crear tablas y relaciones del espacio activo
    createTables(workspace.data);
    createRelationships(workspace.data);

    // Actualizar UI del banner y badge
    const badge = document.getElementById("active-diagram-badge");
    const titles = ["BASE DE DATOS", "MODELO ENTIDAD RELACIÓN", "CLASES DE USO", "CASOS DE USO"];
    if (badge) badge.textContent = titles[idx] || `DIAGRAMA ${idx + 1}`;

    const hint = document.getElementById("tab-banner-hint");
    if (hint) {
        hint.innerHTML = `<span>${workspace.bannerText}</span>`;
    }

    // Adaptar controles según la pestaña
    const dbModes = document.getElementById("diagram-modes-group");
    if (dbModes) {
        dbModes.style.display = (idx === 0) ? "flex" : "none";
    }

    // Centrar suavemente la cámara en el nuevo diagrama
    flyCameraTo(0, 100, (idx === 0) ? 1300 : 1100);

    showToast(`Pestaña activa: ${workspace.name}`);
}

// -----------------------------------------------------------------------------
// 3. GENERADOR DE TEXTURAS (CANVAS 2D A TEXTURA 3D)
// -----------------------------------------------------------------------------
function generateTableCanvas(tableData, mode) {
    const scale = 2; // Para nitidez Ultra-HD
    const colCount = tableData.columns.length;
    const canvas = document.createElement("canvas");
    const cardH = HEADER_HEIGHT + colCount * ROW_HEIGHT + 14;

    canvas.width = CARD_WIDTH * scale;
    canvas.height = cardH * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    // Fondo de la tarjeta con borde sutil
    ctx.fillStyle = "#0c1527";
    ctx.beginPath();
    ctx.roundRect(0, 0, CARD_WIDTH, cardH, 12);
    ctx.fill();

    // Borde iluminado con el color de la entidad
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = tableData.color;
    ctx.stroke();

    // Encabezado con color de la tabla
    ctx.fillStyle = tableData.color;
    ctx.beginPath();
    ctx.roundRect(0, 0, CARD_WIDTH, HEADER_HEIGHT, [12, 12, 0, 0]);
    ctx.fill();

    // Título según el modo
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
    ctx.textBaseline = "middle";

    let title = tableData.fullName;
    if (mode === "erd") {
        title = tableData.displayNameER;
    } else if (mode === "uml") {
        title = tableData.displayNameUML;
    }

    ctx.fillText("🗄️ " + title, 14, HEADER_HEIGHT / 2);

    // Esquema o tag a la derecha
    ctx.font = "bold 10px monospace";
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.textAlign = "right";
    ctx.fillText(tableData.schema.toUpperCase(), CARD_WIDTH - 12, HEADER_HEIGHT / 2);
    ctx.textAlign = "left";

    // Línea divisoria
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, HEADER_HEIGHT);
    ctx.lineTo(CARD_WIDTH, HEADER_HEIGHT);
    ctx.stroke();

    // Renderizar columnas
    let currentY = HEADER_HEIGHT + 18;

    tableData.columns.forEach((col, index) => {
        if (index % 2 === 0) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
            ctx.fillRect(4, currentY - 11, CARD_WIDTH - 8, ROW_HEIGHT - 2);
        }

        if (col.isPK) {
            ctx.fillStyle = "#FFD700";
            ctx.font = "bold 12px sans-serif";
            ctx.fillText("🔑", 12, currentY);
        } else if (col.isFK) {
            ctx.fillStyle = "#00D2FF";
            ctx.font = "bold 12px sans-serif";
            ctx.fillText("🔗", 12, currentY);
        } else {
            ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
            ctx.font = "10px sans-serif";
            ctx.fillText("•", 16, currentY);
        }

        ctx.font = "12px monospace";
        ctx.fillStyle = col.isPK ? "#FFD700" : col.isFK ? "#70D6FF" : "#E2E8F0";

        let colLabel = col.name;
        if (mode === "uml") {
            colLabel = (col.isPK ? "+ " : "- ") + col.name;
        }
        ctx.fillText(colLabel, 34, currentY);

        ctx.font = "10px monospace";
        ctx.fillStyle = "rgba(148, 163, 184, 0.85)";
        ctx.textAlign = "right";
        ctx.fillText(col.type, CARD_WIDTH - 14, currentY);
        ctx.textAlign = "left";

        currentY += ROW_HEIGHT;
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return { texture, height: cardH };
}

// -----------------------------------------------------------------------------
// 4. CREACIÓN DE TABLAS 3D (NODOS ARRASTRABLES)
// -----------------------------------------------------------------------------
function createTables(data) {
    data.tables.forEach(tableData => {
        const { texture, height } = generateTableCanvas(tableData, currentMode);

        const frontMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.3,
            metalness: 0.1
        });

        const edgeMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(tableData.color).multiplyScalar(0.4),
            roughness: 0.4,
            metalness: 0.8
        });

        const backMaterial = new THREE.MeshStandardMaterial({
            color: 0x0c1527,
            roughness: 0.6,
            metalness: 0.5
        });

        const materials = [
            edgeMaterial, // derecha
            edgeMaterial, // izquierda
            edgeMaterial, // arriba
            edgeMaterial, // abajo
            frontMaterial, // frontal
            backMaterial   // trasera
        ];

        const depth = 12;
        const geometry = new THREE.BoxGeometry(CARD_WIDTH, height, depth);
        const mesh = new THREE.Mesh(geometry, materials);

        const pos = getTablePosition(tableData, currentLayout);
        mesh.position.set(pos.x, pos.y, pos.z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        mesh.userData = {
            id: tableData.id,
            tableData: tableData,
            cardHeight: height,
            targetPos: new THREE.Vector3(pos.x, pos.y, pos.z),
            frontMaterial: frontMaterial
        };

        // Borde exterior resaltador de selección y hover
        const outlineGeo = new THREE.BoxGeometry(CARD_WIDTH + 6, height + 6, depth + 2);
        const outlineMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(tableData.color),
            wireframe: true,
            transparent: true,
            opacity: 0.0
        });
        const outlineMesh = new THREE.Mesh(outlineGeo, outlineMat);
        mesh.add(outlineMesh);
        mesh.userData.outlineMesh = outlineMesh;

        // Terminales de conexión visibles en los 4 bordes (puertos de cable)
        addConnectionPorts(mesh, height);

        scene.add(mesh);
        tableMeshes[tableData.id] = mesh;
    });
}

function addConnectionPorts(mesh, height) {
    const portGeo = new THREE.SphereGeometry(3.5, 10, 10);
    const portMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });

    // Puerto Izquierdo
    const portLeft = new THREE.Mesh(portGeo, portMat);
    portLeft.position.set(-(CARD_WIDTH / 2 + 2), 0, 0);
    mesh.add(portLeft);

    // Puerto Derecho
    const portRight = new THREE.Mesh(portGeo, portMat);
    portRight.position.set((CARD_WIDTH / 2 + 2), 0, 0);
    mesh.add(portRight);
}

function getTablePosition(tableData, layout) {
    if (layout === "layered" && tableData.posLayered) return tableData.posLayered;
    if (layout === "orbital" && tableData.posOrbital) return tableData.posOrbital;
    return tableData.posOriginal || { x: 0, y: 0, z: 0 };
}

// -----------------------------------------------------------------------------
// 5. CÁLCULO DE PUNTOS DE ANCLAJE EN LOS BORDES / LATERALES (NUNCA POR DENTRO)
// -----------------------------------------------------------------------------
function calculateTableAnchors(fromMesh, toMesh) {
    const pA = fromMesh.position;
    const pB = toMesh.position;

    const wA = CARD_WIDTH / 2;
    const hA = (fromMesh.userData.cardHeight || 200) / 2;
    const wB = CARD_WIDTH / 2;
    const hB = (toMesh.userData.cardHeight || 200) / 2;

    const dx = pB.x - pA.x;
    const dy = pB.y - pA.y;

    const start = new THREE.Vector3();
    const end = new THREE.Vector3();
    const normA = new THREE.Vector3();
    const normB = new THREE.Vector3();

    // Determinar si la conexión es predominantemente lateral o vertical
    const isHorizontal = Math.abs(dx) * hA >= Math.abs(dy) * wA * 0.7;

    if (isHorizontal) {
        if (dx >= 0) {
            // Salir por el lateral DERECHO de A
            start.set(pA.x + wA + 4, pA.y, pA.z);
            normA.set(1, 0, 0);

            // Entrar por el lateral IZQUIERDO de B
            end.set(pB.x - wB - 4, pB.y, pB.z);
            normB.set(-1, 0, 0);
        } else {
            // Salir por el lateral IZQUIERDO de A
            start.set(pA.x - wA - 4, pA.y, pA.z);
            normA.set(-1, 0, 0);

            // Entrar por el lateral DERECHO de B
            end.set(pB.x + wB + 4, pB.y, pB.z);
            normB.set(1, 0, 0);
        }
    } else {
        if (dy >= 0) {
            // Salir por el borde SUPERIOR de A
            start.set(pA.x, pA.y + hA + 4, pA.z);
            normA.set(0, 1, 0);

            // Entrar por el borde INFERIOR de B
            end.set(pB.x, pB.y - hB - 4, pB.z);
            normB.set(0, -1, 0);
        } else {
            // Salir por el borde INFERIOR de A
            start.set(pA.x, pA.y - hA - 4, pA.z);
            normA.set(0, -1, 0);

            // Entrar por el borde SUPERIOR de B
            end.set(pB.x, pB.y + hB + 4, pB.z);
            normB.set(0, 1, 0);
        }
    }

    const dist = start.distanceTo(end);
    const curveOffset = Math.min(dist * 0.32, 110);

    // Control points saliendo limpiamente de los bordes sin entrar en el cuerpo
    const c1 = start.clone().addScaledVector(normA, curveOffset);
    const c2 = end.clone().addScaledVector(normB, curveOffset);

    // Elevación suave en el eje Z para formar arco tridimensional
    const mid = start.clone().lerp(end, 0.5);
    mid.z += Math.min(dist * 0.16, 85);
    c1.z += 20;
    c2.z += 20;

    const curve = new THREE.CatmullRomCurve3([start, c1, mid, c2, end], false, 'catmullrom', 0.25);
    return { start, end, mid, curve };
}

// -----------------------------------------------------------------------------
// 6. CREACIÓN DE CABLES 3D LATERALES Y ETIQUETAS
// -----------------------------------------------------------------------------
function createRelationships(data) {
    relationObjects.forEach(obj => {
        scene.remove(obj.mesh);
        if (obj.badge) scene.remove(obj.badge);
    });
    relationObjects = [];

    data.relations.forEach(rel => {
        const fromMesh = tableMeshes[rel.fromTable];
        const toMesh = tableMeshes[rel.toTable];
        if (!fromMesh || !toMesh) return;

        // Calcular anclajes en los laterales de las tablas
        const anchorData = calculateTableAnchors(fromMesh, toMesh);

        const tubeGeo = new THREE.TubeGeometry(anchorData.curve, 40, 2.4, 8, false);
        const tubeMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(rel.color),
            roughness: 0.2,
            metalness: 0.5,
            emissive: new THREE.Color(rel.color).multiplyScalar(0.4)
        });
        const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);

        // Placa / Badge flotante en el centro de la curva
        const badgeSprite = createRelationBadge(rel, currentMode);
        badgeSprite.position.copy(anchorData.mid);

        scene.add(tubeMesh);
        scene.add(badgeSprite);

        const relObj = {
            id: rel.id,
            meta: rel,
            curve: anchorData.curve,
            mesh: tubeMesh,
            badge: badgeSprite,
            fromId: rel.fromTable,
            toId: rel.toTable
        };

        relationObjects.push(relObj);

        // Partículas luminosas que viajan a través del cable
        for (let i = 0; i < 2; i++) {
            const pGeo = new THREE.SphereGeometry(3.5, 12, 12);
            const pMat = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.95
            });
            const pMesh = new THREE.Mesh(pGeo, pMat);
            scene.add(pMesh);
            particles.push({
                relObj: relObj,
                mesh: pMesh,
                offset: i * 0.5,
                speed: 0.003
            });
        }
    });
}

function createRelationBadge(rel, mode) {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 72;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgba(7, 15, 30, 0.88)";
    ctx.beginPath();
    ctx.roundRect(4, 4, 248, 64, 30);
    ctx.fill();

    ctx.lineWidth = 3;
    ctx.strokeStyle = rel.color;
    ctx.stroke();

    let text = "";
    if (mode === "erd") {
        text = `"${rel.verbERD}"`;
    } else if (mode === "uml") {
        text = rel.multUML;
    } else {
        text = `${rel.cardinalityPhysical} [FK]`;
    }

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 128, 36);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(70, 20, 1);
    return sprite;
}

// -----------------------------------------------------------------------------
// 7. ACTUALIZACIÓN DINÁMICA DE GEOMETRÍAS (AL ARRASTRAR O MOVER)
// -----------------------------------------------------------------------------
function updateRelationshipGeometries() {
    relationObjects.forEach(relObj => {
        const fromMesh = tableMeshes[relObj.fromId];
        const toMesh = tableMeshes[relObj.toId];
        if (!fromMesh || !toMesh) return;

        // Recalcular anclajes laterales en tiempo real
        const anchorData = calculateTableAnchors(fromMesh, toMesh);
        relObj.curve = anchorData.curve;

        relObj.mesh.geometry.dispose();
        relObj.mesh.geometry = new THREE.TubeGeometry(relObj.curve, 40, 2.4, 8, false);
        relObj.badge.position.copy(anchorData.mid);
    });
}

// -----------------------------------------------------------------------------
// 8. INTERACCIÓN DE RATÓN: ARRASTRE LIBRE 3D, ROTACIÓN Y SELECCIÓN
// -----------------------------------------------------------------------------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function setupEventListeners() {
    const canvas = renderer.domElement;

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerUp);
}

function onPointerDown(event) {
    // Solo clic izquierdo principal
    if (event.button !== 0) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const meshes = Object.values(tableMeshes);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
        dragTarget = intersects[0].object;
        isMouseDown = true;
        isDraggingTable = false;
        mouseDownScreenPos.x = event.clientX;
        mouseDownScreenPos.y = event.clientY;

        // Crear plano de arrastre paralelo a la vista de la cámara
        const camDir = camera.getWorldDirection(new THREE.Vector3()).negate();
        dragPlane.setFromNormalAndCoplanarPoint(camDir, dragTarget.position);

        const hit = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(dragPlane, hit)) {
            dragOffset.copy(dragTarget.position).sub(hit);
        }
    }
}

function onPointerMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Caso A: Arrastrando una tabla libremente por el espacio 3D
    if (isMouseDown && dragTarget) {
        const dist = Math.hypot(event.clientX - mouseDownScreenPos.x, event.clientY - mouseDownScreenPos.y);
        if (dist > 4) {
            isDraggingTable = true;
            controls.enabled = false; // Desactivar rotación de cámara mientras se arrastra la tabla
            document.body.style.cursor = "grabbing";

            raycaster.setFromCamera(mouse, camera);
            const hit = new THREE.Vector3();
            if (raycaster.ray.intersectPlane(dragPlane, hit)) {
                const newPos = hit.add(dragOffset);
                dragTarget.position.copy(newPos);
                dragTarget.userData.targetPos.copy(newPos);

                // ACTUALIZAR TODAS LAS LÍNEAS CONECTADAS EN TIEMPO REAL
                updateRelationshipGeometries();
            }

            if (dragTarget.userData.outlineMesh) {
                dragTarget.userData.outlineMesh.material.opacity = 1.0;
                dragTarget.userData.outlineMesh.material.color.setHex(0x00e5ff);
            }
            return;
        }
    }

    // Caso B: Movimiento normal del ratón (Hover)
    raycaster.setFromCamera(mouse, camera);
    const meshes = Object.values(tableMeshes);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
        const topMesh = intersects[0].object;
        if (hoveredTable !== topMesh) {
            if (hoveredTable && hoveredTable !== selectedTable) {
                hoveredTable.userData.outlineMesh.material.opacity = 0.0;
            }
            hoveredTable = topMesh;
            hoveredTable.userData.outlineMesh.material.opacity = 0.7;
            hoveredTable.userData.outlineMesh.material.color.setHex(hoveredTable.userData.tableData.color);
            document.body.style.cursor = "grab";
        }
    } else {
        if (hoveredTable && hoveredTable !== selectedTable) {
            hoveredTable.userData.outlineMesh.material.opacity = 0.0;
        }
        hoveredTable = null;
        if (!isDraggingTable) {
            document.body.style.cursor = "default";
        }
    }
}

function onPointerUp(event) {
    if (isDraggingTable && dragTarget) {
        // Fin de arrastre de tabla
        controls.enabled = true;
        isDraggingTable = false;
        document.body.style.cursor = "grab";
        updateRelationshipGeometries();

        if (dragTarget !== selectedTable && dragTarget.userData.outlineMesh) {
            dragTarget.userData.outlineMesh.material.opacity = 0.0;
        }
    } else if (isMouseDown && dragTarget) {
        // Clic directo sobre la tabla para inspeccionar
        selectTable(dragTarget);
    }

    isMouseDown = false;
    dragTarget = null;
    controls.enabled = true;
}

function selectTable(mesh) {
    if (selectedTable && selectedTable !== mesh) {
        selectedTable.userData.outlineMesh.material.opacity = 0.0;
    }

    selectedTable = mesh;
    selectedTable.userData.outlineMesh.material.opacity = 1.0;
    selectedTable.userData.outlineMesh.material.color.setHex(0x00e5ff);

    // Volar suavemente con la cámara hacia la tabla
    flyCameraTo(mesh.position.x, mesh.position.y, mesh.position.z + 450);

    // Mostrar panel lateral de detalles
    showTableDetails(mesh.userData.tableData);
}

function flyCameraTo(targetX, targetY, targetZ) {
    const startPos = camera.position.clone();
    const targetPos = new THREE.Vector3(targetX, targetY, targetZ);
    const startTarget = controls.target.clone();
    const newTarget = new THREE.Vector3(targetX, targetY, targetZ - 450);

    let progress = 0;
    const duration = 35;

    function step() {
        progress++;
        const t = progress / duration;
        const ease = 1 - Math.pow(1 - t, 3);

        camera.position.lerpVectors(startPos, targetPos, ease);
        controls.target.lerpVectors(startTarget, newTarget, ease);

        if (progress < duration) {
            requestAnimationFrame(step);
        }
    }
    step();
}

// -----------------------------------------------------------------------------
// 9. CONFIGURACIÓN DE LA INTERFAZ DE USUARIO (HUD, PESTAÑAS, MODALES)
// -----------------------------------------------------------------------------
function setupUIControls() {
    // Selectores de Pestaña del Proyecto
    document.querySelectorAll(".project-tab-btn[data-workspace-idx]").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".project-tab-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const idx = parseInt(btn.dataset.workspaceIdx, 10);
            loadWorkspace(idx);
        });
    });

    // Selectores de Modo de Representación
    document.querySelectorAll(".pill-btn[data-mode]").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".pill-btn[data-mode]").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            switchDiagramMode(btn.dataset.mode);
        });
    });

    // Selectores de Layout Espacial
    document.querySelectorAll(".pill-btn[data-layout]").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".pill-btn[data-layout]").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            switchLayout(btn.dataset.layout);
        });
    });

    // Buscador interactivo
    const searchInput = document.getElementById("table-search");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) return;

            const workspace = PROJECT_WORKSPACES[currentWorkspaceIdx];
            const found = workspace.data.tables.find(t =>
                t.name.toLowerCase().includes(query) ||
                t.fullName.toLowerCase().includes(query) ||
                t.columns.some(c => c.name.toLowerCase().includes(query))
            );

            if (found && tableMeshes[found.id]) {
                selectTable(tableMeshes[found.id]);
            }
        });
    }

    // Botones de Cámara del HUD
    document.getElementById("btn-rotate-auto")?.addEventListener("click", function() {
        isAutoRotating = !isAutoRotating;
        this.classList.toggle("active", isAutoRotating);
        showToast(isAutoRotating ? "Auto-Giro Activado (360°)" : "Auto-Giro Pausado");
    });

    document.getElementById("btn-view-isometric")?.addEventListener("click", () => {
        flyCameraTo(500, 600, 1100);
        showToast("Vista Isométrica 3D");
    });

    document.getElementById("btn-view-2d")?.addEventListener("click", () => {
        flyCameraTo(0, 0, 1400);
        showToast("Vista Frontal Plana");
    });

    document.getElementById("btn-view-top")?.addEventListener("click", () => {
        flyCameraTo(0, 1500, 200);
        showToast("Vista Aérea Superior");
    });

    document.getElementById("btn-zoom-in")?.addEventListener("click", () => {
        controls.dollyIn(1.25);
    });

    document.getElementById("btn-zoom-out")?.addEventListener("click", () => {
        controls.dollyOut(1.25);
    });

    document.getElementById("btn-reset-cam")?.addEventListener("click", () => {
        flyCameraTo(0, 120, 1300);
        controls.target.set(0, 0, 0);
        showToast("Cámara Restablecida");
    });

    // Desplazamiento lateral (Pan a los lados)
    document.getElementById("btn-pan-left")?.addEventListener("click", () => {
        controls.target.x -= 150;
        camera.position.x -= 150;
    });

    document.getElementById("btn-pan-right")?.addEventListener("click", () => {
        controls.target.x += 150;
        camera.position.x += 150;
    });

    document.getElementById("btn-pan-up")?.addEventListener("click", () => {
        controls.target.y += 150;
        camera.position.y += 150;
    });

    document.getElementById("btn-pan-down")?.addEventListener("click", () => {
        controls.target.y -= 150;
        camera.position.y -= 150;
    });

    // Captura de pantalla en HD
    document.getElementById("btn-screenshot")?.addEventListener("click", takeScreenshot);

    // Modales de Fotos de Referencia y SQL
    setupModals();
}

function switchDiagramMode(mode) {
    currentMode = mode;

    Object.values(tableMeshes).forEach(mesh => {
        const { texture } = generateTableCanvas(mesh.userData.tableData, mode);
        mesh.userData.frontMaterial.map = texture;
        mesh.userData.frontMaterial.needsUpdate = true;
    });

    const workspace = PROJECT_WORKSPACES[currentWorkspaceIdx];
    createRelationships(workspace.data);
    showToast(`Modo cambiado: ${getModeName(mode)}`);
}

function getModeName(mode) {
    if (mode === "erd") return "Entidad-Relación (ERD Conceptual)";
    if (mode === "uml") return "Diagrama de Clases UML";
    return "Esquema Relacional Físico";
}

function switchLayout(layoutName) {
    currentLayout = layoutName;

    Object.values(tableMeshes).forEach(mesh => {
        const newPos = getTablePosition(mesh.userData.tableData, layoutName);
        mesh.userData.targetPos = new THREE.Vector3(newPos.x, newPos.y, newPos.z);
    });

    showToast(`Distribución 3D: ${layoutName.toUpperCase()}`);
}

// -----------------------------------------------------------------------------
// 10. DETALLES DE TABLA Y REGISTROS EN VIVO
// -----------------------------------------------------------------------------
function showTableDetails(tableData) {
    const sidebar = document.getElementById("sidebar-panel");
    if (!sidebar) return;

    document.getElementById("sidebar-table-name").textContent = tableData.fullName;
    document.getElementById("sidebar-schema-tag").textContent = `Esquema: ${tableData.schema.toUpperCase()}`;
    document.getElementById("table-color-dot").style.backgroundColor = tableData.color;
    document.getElementById("table-description-text").textContent = tableData.description;

    const colContainer = document.getElementById("sidebar-columns-list");
    colContainer.innerHTML = "";

    tableData.columns.forEach(col => {
        const row = document.createElement("div");
        row.className = "column-row";

        let keyBadge = `<span class="col-key-icon normal">•</span>`;
        if (col.isPK) keyBadge = `<span class="col-key-icon pk" title="Llave Primaria (PK)">🔑</span>`;
        if (col.isFK) keyBadge = `<span class="col-key-icon fk" title="Llave Foránea (FK)">🔗</span>`;

        row.innerHTML = `
            <div class="col-left">
                ${keyBadge}
                <span class="col-name">${col.name}</span>
            </div>
            <span class="col-type">${col.type}</span>
        `;
        colContainer.appendChild(row);
    });

    const relContainer = document.getElementById("sidebar-relations-list");
    relContainer.innerHTML = "";

    const workspace = PROJECT_WORKSPACES[currentWorkspaceIdx];
    const related = workspace.data.relations.filter(
        r => r.fromTable === tableData.id || r.toTable === tableData.id
    );

    related.forEach(rel => {
        const isFrom = rel.fromTable === tableData.id;
        const targetTableId = isFrom ? rel.toTable : rel.fromTable;
        const targetTable = workspace.data.tables.find(t => t.id === targetTableId);
        if (!targetTable) return;

        const card = document.createElement("div");
        card.className = "relation-card";
        card.innerHTML = `
            <div class="rel-header">
                <span>${isFrom ? "➡️ Hacia: " : "⬅️ Desde: "} <strong>${targetTable.fullName}</strong></span>
                <span class="rel-badge">${rel.cardinalityPhysical}</span>
            </div>
            <div class="rel-desc">${rel.description}</div>
        `;
        card.addEventListener("click", () => {
            if (tableMeshes[targetTableId]) {
                selectTable(tableMeshes[targetTableId]);
            }
        });
        relContainer.appendChild(card);
    });

    // Cargar datos en vivo si es la base de datos principal
    const liveContainer = document.getElementById("live-records-container");
    const liveRecordsDiv = document.getElementById("sidebar-live-records");
    const liveCountSpan = document.getElementById("live-records-count");

    if (liveContainer && liveRecordsDiv) {
        if (currentWorkspaceIdx === 0) {
            const sqliteName = tableData.id === "auth_users" ? "auth_users" : `colegio_${tableData.name}`;
            fetch(`/api/records?table=${sqliteName}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status === "ok" && data.records && data.records.length > 0) {
                        liveContainer.style.display = "block";
                        liveCountSpan.textContent = `${data.records.length} registro(s)`;
                        liveRecordsDiv.innerHTML = "";
                        data.records.forEach(rec => {
                            const recCard = document.createElement("div");
                            recCard.style.cssText = "background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 8px 10px; font-size: 11px; font-family: monospace; color: #94a3b8;";
                            let fieldsHtml = Object.entries(rec).map(([k, v]) => 
                                `<div style="margin-bottom: 2px;"><span style="color:#00d2ff;">${k}:</span> <span style="color:#f1f5f9;">${v === null ? '<em>null</em>' : v}</span></div>`
                            ).join("");
                            recCard.innerHTML = fieldsHtml;
                            liveRecordsDiv.appendChild(recCard);
                        });
                    } else {
                        liveContainer.style.display = "none";
                    }
                })
                .catch(() => {
                    liveContainer.style.display = "none";
                });
        } else {
            liveContainer.style.display = "none";
        }
    }

    sidebar.classList.add("open");
}

document.getElementById("sidebar-close-btn")?.addEventListener("click", () => {
    document.getElementById("sidebar-panel")?.classList.remove("open");
    if (selectedTable) {
        selectedTable.userData.outlineMesh.material.opacity = 0.0;
        selectedTable = null;
    }
});

// -----------------------------------------------------------------------------
// 11. BUCLE DE RENDERIZADO Y FÍSICAS (ANIMATE)
// -----------------------------------------------------------------------------
function animate() {
    requestAnimationFrame(animate);

    if (isAutoRotating) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.4;
    } else {
        controls.autoRotate = false;
    }

    controls.update();

    // Animación suave de movimiento si no se está arrastrando activamente
    if (!isDraggingTable) {
        let needsCurveUpdate = false;
        Object.values(tableMeshes).forEach(mesh => {
            if (mesh.position.distanceTo(mesh.userData.targetPos) > 0.5) {
                mesh.position.lerp(mesh.userData.targetPos, 0.08);
                needsCurveUpdate = true;
            }
        });

        if (needsCurveUpdate) {
            updateRelationshipGeometries();
        }
    }

    // Animación de partículas luminosas a través de los cables
    const time = performance.now();
    particles.forEach(p => {
        if (p.relObj && p.relObj.curve) {
            const t = ((time * p.speed * 0.1) + p.offset) % 1.0;
            const pt = p.relObj.curve.getPointAt(t);
            if (pt) p.mesh.position.copy(pt);
        }
    });

    renderer.render(scene, camera);
}

// -----------------------------------------------------------------------------
// 12. AMBIENTACIÓN Y UTILIDADES
// -----------------------------------------------------------------------------
function createDigitalDust() {
    const count = 350;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 3500;
        positions[i + 1] = (Math.random() - 0.5) * 2500;
        positions[i + 2] = (Math.random() - 0.5) * 2500;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
        color: 0x00d2ff,
        size: 3,
        transparent: true,
        opacity: 0.35
    });

    const dust = new THREE.Points(geometry, material);
    scene.add(dust);
}

function setupModals() {
    const modalPhotos = document.getElementById("modal-photos");
    document.getElementById("btn-open-photos")?.addEventListener("click", () => {
        modalPhotos.classList.add("open");
    });
    document.getElementById("close-modal-photos")?.addEventListener("click", () => {
        modalPhotos.classList.remove("open");
    });

    document.querySelectorAll(".gallery-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".gallery-tab-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const targetSrc = btn.dataset.src;
            const img = document.getElementById("gallery-active-img");
            if (img) img.src = targetSrc;
        });
    });

    const modalSql = document.getElementById("modal-sql");
    document.getElementById("btn-open-sql")?.addEventListener("click", () => {
        modalSql.classList.add("open");
    });
    document.getElementById("close-modal-sql")?.addEventListener("click", () => {
        modalSql.classList.remove("open");
    });

    document.getElementById("btn-copy-sql")?.addEventListener("click", () => {
        const code = document.getElementById("sql-code-block").innerText;
        navigator.clipboard.writeText(code).then(() => {
            showToast("Código SQL copiado al portapapeles");
        });
    });
}

function takeScreenshot() {
    renderer.render(scene, camera);
    const dataURL = renderer.domElement.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `matri-click-diagrama-3d-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
    showToast("Captura 3D descargada en PNG");
}

function showToast(message) {
    let toast = document.getElementById("toast-notification");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-notification";
        toast.className = "toast-msg";
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
}
