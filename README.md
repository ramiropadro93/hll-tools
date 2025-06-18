# HLL Supply Timer

Una aplicación de cronómetros para controlar las cajas de suministros en Hell Let Loose.

## Características

- Configuración de hasta 5 jugadores
- Cronómetros independientes de 5 minutos por jugador
- Interfaz moderna y responsive
- Controles individuales para cada jugador

## Cómo usar

1. **Configurar cantidad de jugadores**: Ingresa el número de jugadores (máximo 5) y presiona "OK"
2. **Ingresar nombres**: Completa los nombres de todos los jugadores y presiona "Finalizar Configuración"
3. **Controlar timers**: Cada jugador tendrá su propia tarjeta con:
   - Nombre del jugador
   - Timer de 5 minutos (05:00)
   - Botón "Iniciar Timer" para comenzar el conteo
   - Botón "Reiniciar" cuando el timer llega a 0

## Funcionalidades

- **Timers independientes**: Cada jugador puede iniciar su timer sin afectar a los demás
- **Conteo visual**: El tiempo cambia de color según el tiempo restante:
  - Verde: Tiempo normal
  - Amarillo: Último minuto
  - Rojo: Últimos 30 segundos
- **Estado visual**: Las tarjetas se resaltan cuando el timer está activo

## Tecnologías

- React 18
- Next.js 14
- TypeScript
- Tailwind CSS 3

## Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

La aplicación estará disponible en `http://localhost:3000` 