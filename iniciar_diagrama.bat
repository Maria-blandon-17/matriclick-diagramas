@echo off
title MATRI-CLICK 3D - Base de Datos y Visualizador Interactivo
echo ========================================================
echo   MATRI-CLICK 3D: EJECUCIÓN COMPLETA DEL SISTEMA
echo ========================================================
echo.
cd /d "D:\matri-click"

echo [1/2] Verificando y ejecutando base de datos local SQLite...
py ejecutar_base_datos.py
if %ERRORLEVEL% NEQ 0 (
    echo [ADVERTENCIA] No se pudo ejecutar python directamente, intentando abrir navegador...
    start "" "index.html"
    pause
    exit /b
)

echo.
echo [2/2] Iniciando servidor Web 3D interactivo en http://localhost:8080...
py servidor.py

pause
