CREATE TABLE huesped (
    id SERIAL PRIMARY KEY,
    documento VARCHAR(50) UNIQUE NOT NULL,
    nombre_completo VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    correo VARCHAR(100)
);


CREATE TABLE habitacion (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(10) NOT NULL,
    tipo VARCHAR(50) NOT NULL, 
    capacidad INT NOT NULL,
    precio_base DECIMAL(10, 2) NOT NULL,
    descripcion TEXT
);

CREATE TABLE reserva (
    id SERIAL PRIMARY KEY,
    huesped_id INT NOT NULL REFERENCES huesped(id) ON DELETE RESTRICT,
    habitacion_id INT NOT NULL REFERENCES habitacion(id) ON DELETE RESTRICT,
    fecha_ingreso DATE NOT NULL,
    fecha_salida DATE NOT NULL,
    cantidad_personas INT NOT NULL,
    estado VARCHAR(50) NOT NULL DEFAULT 'Reservada' 
);

CREATE TABLE contacto_servicio (
    id SERIAL PRIMARY KEY,
    nombre_servicio VARCHAR(100) NOT NULL,
    encargado VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);
