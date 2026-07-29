CREATE DATABASE IF NOT EXISTS ecomercado_db;
USE ecomercado_db;

-- 1. Tabla de Roles (AF-DEV-05)
CREATE TABLE IF NOT EXISTS roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE
);

INSERT IGNORE INTO roles (id_rol, nombre_rol) VALUES 
(1, 'Admin'), 
(2, 'Usuario'), 
(3, 'Auditor');

-- 2. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_rol INT NOT NULL,
    nombre_completo VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    tipo_usuario ENUM('Productor', 'Comprador', 'Otros') DEFAULT 'Productor',
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

-- 3. Tabla Categorias de Productos (Cítricos y Frutales)
CREATE TABLE IF NOT EXISTS categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL
);

INSERT IGNORE INTO categorias (id_categoria, nombre_categoria) VALUES 
(1, 'Frutales'), 
(2, 'Cítricos');

-- 4. Tabla Productos
CREATE TABLE IF NOT EXISTS productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    id_productor INT NOT NULL,
    id_categoria INT NOT NULL,
    nombre_producto VARCHAR(100) NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    unidad_medida VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_productor) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- 5. Inventario Centralizado (Cumple 2FN)
CREATE TABLE IF NOT EXISTS inventario (
    id_inventario INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    cantidad_disponible INT NOT NULL,
    fecha_cosecha DATE NOT NULL,
    ubicacion_origen VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- 6. Tabla Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_comprador INT NOT NULL,
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('Pendiente', 'Confirmado', 'Entregado', 'Cancelado') DEFAULT 'Pendiente',
    FOREIGN KEY (id_comprador) REFERENCES usuarios(id_usuario)
);

-- 7. Detalle de Pedidos
CREATE TABLE IF NOT EXISTS detalle_pedidos (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);