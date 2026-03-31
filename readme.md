# Gestion de hotel

Este repositorio es un mvp de un proyecto de gestion hotelera, es una app tipo SPA.

## Funcionalidades Implementadas

* **HU-01: Registrar huésped:** Registro de clientes con validación para evitar carnet de identidad duplicado.
* **HU-02: Crear reserva de habitación:** Manejo de reservas que valida las fechas, capacidad máxima de la habitación y previene que la habitacion sea doblemente reservada segun las fechas.
* **HU-03: Consultar reservas:** Listado de las estadías activas y futuras.
* **HU-04: Registrar check-in:** Actualización de estado de las reservas a "En curso".
* **HU-05: Factory de habitaciones:** Implementación del patrón de diseño Factory para asignar de forma dinamica las características según la habitación seleccionada.
* **HU-06: Visualizar contactos:** lectura para los servicios del hotel.
* **HU-10: Consultar huésped:** Buscador por documento de identidad.

## Persistencia de Datos

La persistencia esta en **PostgreSQL**. 
La comunicación entre el backend y la base de datos se realiza mediante el ORM **Prisma**, que viene con sus herramientas y seguridad del ORM
## Estructura del Proyecto

**1. Backend con node y express**
* `src/routes/`: endpoints HTTP.
* `src/controllers/`: Recepcion de peticiones y respuestas https.
* `src/services/`: Logica de negocio que se contacta con prisma.

**2. Frontend (Angular)**
* `src/app/core/services/`: Consumo de las apis
* `src/app/features/`: Componentes de cada integracion, huespedes, hab, etc.
* `src/app/shared/`: Componente de navbar.

## Instrucciones

Se debe tener node, postgre y angular
### Config del Backend

1. Abrir carpetas.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear archivo .env y declarar la db:
   ```env
   DATABASE_URL=""
   ```
4. Sincronizar db con Prisma:
   ```bash
   npx prisma db push
   ```
5. Ejecutar
   ```bash
   npm run dev
   ```

### Config del Frontend

1. Abrir carpeta front.
2. Instalar  dependencias:
   ```bash
   npm install
   ```
3. Levantar Angular:
   ```bash
   ng serve
   ```
4. Se abre el navegador