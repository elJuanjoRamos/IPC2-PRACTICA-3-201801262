-- DROP IF EXIST DATABASE
DROP DATABASE IF EXISTS Practica3;

-- CREATE DATABASE
CREATE DATABASE Practica3;

-- USE DATABASE
USE Practica3;

-- CREATE TABLE TYPE OF USER
CREATE TABLE RolUsuario(
	idRolUsuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(100) NOT NULL
);

-- CREATE TABLE USER
CREATE TABLE Usuario(
	idUsuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(100) NOT NULL,
	password VARCHAR(255) NOT NULL,
	nombre VARCHAR(100) NULL,
	apellido VARCHAR(100) NULL,
	conexion DATETIME NULL,
    idRolUsuario INT NOT NULL,
	FOREIGN KEY (idRolUsuario ) REFERENCES RolUsuario(idRolUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- CREATE TABLE MESSAGES
DROP TABLE IF EXISTS Mensaje;
CREATE TABLE Mensaje(
    idMensaje INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idRemitente INT NOT NULL,
    idDestinatario INT NOT NULL,
    cuerpo VARCHAR(255) NOT NULL,
    fecha DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    fechaLeido DATETIME NULL,
    leido TINYINT NULL DEFAULT 0,
    estado TINYINT NULL DEFAULT 0,
    FOREIGN KEY (idRemitente) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (idDestinatario) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- CREATE TABLE MESSAGES
DROP TABLE IF EXISTS DetalleMensaje;
CREATE TABLE DetalleMensaje(
    idDetalleMensaje INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idMensaje INT NOT NULL,
    cuerpo VARCHAR(255) NOT NULL,
    FOREIGN KEY (idMensaje) REFERENCES Mensaje(idMensaje)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- SP CREAR MENSAJE
DELIMITER $$
CREATE PROCEDURE SP_CreateMensaje
(IN _idRemitente INT, _idDestinatario INT, _cuerpo VARCHAR(255))
BEGIN
	INSERT INTO Mensaje(idRemitente, idDestinatario, cuerpo) VALUES(_idRemitente, _idDestinatario, _cuerpo);
END;
$$


-- SP GET Usuarios
DELIMITER $$
CREATE PROCEDURE SP_GetUsuarios
()
BEGIN
	SELECT concat(Usuario.nombre, " ", apellido) as nombreCompleto, password, username, conexion, RolUsuario.nombre as rol From Usuario
INNER JOIN RolUsuario on Usuario.idRolUsuario = RolUsuario.idRolUsuario;
END;
$$
-- SP GET Usuarios
DELIMITER $$
CREATE PROCEDURE SP_Autenticar
(IN _username VARCHAR(100), _pass VARCHAR(100))
BEGIN
	SELECT Usuario.idUsuario, concat(Usuario.nombre, " ", apellido) as nombreCompleto, password, username, conexion, RolUsuario.nombre as rol From Usuario
INNER JOIN RolUsuario on Usuario.idRolUsuario = RolUsuario.idRolUsuario WHERE Usuario.username = _username AND Usuario.password = _pass;
END;
$$

-- SP GET Usuario
DELIMITER $$
CREATE PROCEDURE SP_GetUsuario
(IN id INT)
BEGIN
	SELECT Usuario.idUsuario, concat(Usuario.nombre, " ", apellido) as nombreCompleto, password, username, conexion, RolUsuario.nombre as rol From Usuario
INNER JOIN RolUsuario on Usuario.idRolUsuario = RolUsuario.idRolUsuario WHERE Usuario.idUsuario = id;
END;
$$

