# MatriClick - Visualizador 3D de Diagramas

Sistema institucional de visualización interactiva 3D para el colegio **MatriClick**, desarrollado con **Three.js** puro (sin dependencias externas de servidor).

## 🎯 Características

- **4 pestañas de diagramas interactivos:**
  - 🗄️ **Base de Datos** — Esquema relacional físico completo
  - 🔗 **Modelo Entidad Relación** — ERD conceptual con entidades y relaciones
  - 📐 **Clases de Uso** — Diagrama de clases UML
  - 👥 **Casos de Uso** — Diagrama completo con actores y sistema Matriclick

- **Visualización 3D completa:**
  - Rotar 360° arrastrando el fondo
  - Acercar/alejar con la rueda del ratón
  - Pan (mover a los lados) con clic derecho
  - **Arrastrar nodos individualmente** con las líneas siguiendo en tiempo real

- **Conexiones inteligentes:** Las líneas salen por los bordes laterales de las tarjetas, nunca por dentro

- **Partículas animadas** viajando por los cables de conexión

- **Panel lateral** con detalles de cada tabla al hacer clic

## 🚀 Cómo ejecutar

```bash
# Requiere Python 3.x
py servidor.py
```

Luego abrir en el navegador: **http://localhost:8080**

## 🛠️ Tecnologías

- [Three.js](https://threejs.org/) r128 (incluido localmente)
- HTML5 / CSS3 / JavaScript ES6+
- Python 3 (servidor local simple)

## 📁 Estructura

```
matri-click/
├── index.html          # Interfaz principal
├── servidor.py         # Servidor local Python
├── assets/             # Imágenes de referencia de diagramas
├── js/
│   ├── app3d.js        # Motor 3D principal (Three.js)
│   ├── data.js         # Datos de todos los diagramas
│   ├── three.min.js    # Three.js (local)
│   └── OrbitControls.js
└── css/
    └── styles.css
```

## 📊 Base de Datos

El sistema modela la BD institucional con los esquemas:
- **`auth`** — Usuarios y autenticación
- **`colegio`** — Sedes, grados, grupos, profesores, estudiantes, acudientes, matrículas, perfiles

---

Desarrollado con ❤️ para la institución MatriClick.
